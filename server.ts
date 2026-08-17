import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Modality } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { BREEDS } from './src/data/breeds';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory runtime API key store (if user provides via setup screen)
let userConfiguredApiKey: string | null = null;

// In-memory cache for documentary prose and generated audio to respect quotas & performance
const narrationCache = new Map<string, {
  text: string;
  captions: Array<{ start: number; end: number; text: string }>;
  audioBase64?: string;
  audioMimeType?: string;
  timestamp: number;
}>();

// Helper to get GoogleGenAI client safely
// NOTE: Intentionally only uses GEMINI_API_KEY or an in-memory runtime key provided by the user.
// We avoid using GOOGLE_API_KEY to prevent accidental automatic connections.
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = userConfiguredApiKey || process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Convert 16-bit Mono PCM buffer (24000Hz) to a standard WAV audio buffer with headers
function pcmToWav(pcmData: Buffer, sampleRate = 24000, numChannels = 1, bitsPerSample = 16): Buffer {
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = pcmData.length;
  const header = Buffer.alloc(44);

  header.write('RIFF', 0); // ChunkID
  header.writeUInt32LE(36 + dataSize, 4); // ChunkSize
  header.write('WAVE', 8); // Format
  header.write('fmt ', 12); // Subchunk1ID
  header.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
  header.writeUInt16LE(1, 20); // AudioFormat (1 for PCM)
  header.writeUInt16LE(numChannels, 22); // NumChannels
  header.writeUInt32LE(sampleRate, 24); // SampleRate
  header.writeUInt32LE(byteRate, 28); // ByteRate
  header.writeUInt16LE(blockAlign, 32); // BlockAlign
  header.writeUInt16LE(bitsPerSample, 34); // BitsPerSample
  header.write('data', 36); // Subchunk2ID
  header.writeUInt32LE(dataSize, 40); // Subchunk2Size

  return Buffer.concat([header, pcmData]);
}

// Ensure audio buffer is formatted as valid WAV with header
function ensureWavBuffer(base64Data: string, sampleRate = 24000, numChannels = 1, bitsPerSample = 16): { base64: string; mimeType: string } {
  try {
    const rawBuffer = Buffer.from(base64Data, 'base64');
    if (rawBuffer.length >= 12 && rawBuffer.toString('ascii', 0, 4) === 'RIFF') {
      return { base64: base64Data, mimeType: 'audio/wav' };
    }
    const wavBuffer = pcmToWav(rawBuffer, sampleRate, numChannels, bitsPerSample);
    return { base64: wavBuffer.toString('base64'), mimeType: 'audio/wav' };
  } catch {
    return { base64: base64Data, mimeType: 'audio/wav' };
  }
}

// 1. API: Health & Status
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// 2. API: Gemini Configuration Status
app.get('/api/gemini/status', async (req: Request, res: Response) => {
  const ai = getGeminiClient();
  if (!ai) {
    return res.json({
      status: 'NOT_CONFIGURED',
      message: 'API key is not configured.',
      configured: false,
    });
  }

  return res.json({
    status: 'READY',
    message: 'Archive narration engine is ready.',
    configured: true,
  });
});

// 3. API: Connect custom API key
app.post('/api/gemini/connect', async (req: Request, res: Response) => {
  const { apiKey } = req.body;
  if (!apiKey || typeof apiKey !== 'string' || apiKey.trim().length < 10) {
    return res.status(400).json({
      status: 'INVALID',
      valid: false,
      message: 'Please provide a valid API key.',
    });
  }

  const trimmedKey = apiKey.trim();
  const testAi = new GoogleGenAI({ apiKey: trimmedKey });

  // Prefer Gemini 3.1 Flash-Lite first for initial configuration and compatibility
  const modelsToTry = ['gemini-3.1-flash-lite', 'gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-3.7-flash'];
  let lastError: any = null;
  let success = false;

  for (const modelName of modelsToTry) {
    try {
      const response = await testAi.models.generateContent({
        model: modelName,
        contents: 'Confirm connection.',
        config: {
          maxOutputTokens: 5,
          temperature: 0.1,
        },
      });

      if (response && response.text) {
        success = true;
        break;
      }
    } catch (error: any) {
      lastError = error;
    }
  }

  if (success) {
    userConfiguredApiKey = trimmedKey;
    return res.json({
      status: 'READY',
      valid: true,
      message: 'Archive connection established.',
    });
  }

  // Extract clean, human-readable error from Google Gen AI client to assist debugging
  let errorMessage = 'Unable to connect. Please check the key and try again.';
  if (lastError) {
    errorMessage = lastError.message || lastError.statusMessage || String(lastError);
    // Sanitize any potential accidental echoing of the raw key in error strings
    if (errorMessage.includes(trimmedKey)) {
      errorMessage = errorMessage.replace(trimmedKey, '***YOUR_KEY***');
    }
  }

  return res.status(400).json({
    status: 'INVALID',
    valid: false,
    message: errorMessage,
  });
});

// 4. API: Disconnect custom API key
app.post('/api/gemini/disconnect', (req: Request, res: Response) => {
  userConfiguredApiKey = null;
  res.json({ status: 'DISCONNECTED', message: 'API key disconnected.' });
});

// Generate script and subtitles with Gemini 3.1 Flash-Lite
async function generateDocumentaryScriptAndSubtitles(
  ai: GoogleGenAI,
  breed: typeof BREEDS[0]
): Promise<{ text: string; captions: Array<{ start: number; end: number; text: string }> }> {
  const candidateModels = ['gemini-3.1-flash-lite', 'gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-3.7-flash'];
  const prompt = `You are the lead natural-history documentary narrator and historian for CANINOGRAPHY.
Write a cinematic, warm, authoritative documentary narration script and synchronized subtitle timestamps for:

Breed: ${breed.name}
Origin: ${breed.country} (${breed.region})
Historical Era: ${breed.originEra} - ${breed.originDetailed}
Purpose & Working Lineage: ${breed.purpose}
Detailed History: ${breed.history}

RULES:
1. Narration script length: 70 to 100 words.
2. Tone: Warm, historically observant, reverent, calm natural history documentary.
3. Subtitles: Break the narration into 3 to 6 synchronized sequential subtitle segments with realistic start & end times in seconds (pacing ~2.2 words per second).
4. Output strictly valid JSON matching this schema:
{
  "narration": "Exact full script text...",
  "captions": [
    { "start": 0.0, "end": 5.5, "text": "First segment..." },
    { "start": 5.8, "end": 11.2, "text": "Second segment..." }
  ]
}`;

  for (const model of candidateModels) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          temperature: 0.5,
          responseMimeType: 'application/json',
          systemInstruction:
            'You are an expert natural history documentary scriptwriter. Provide only valid JSON with narration and captions.',
        },
      });

      const rawJson = response.text?.trim();
      if (rawJson) {
        const parsed = JSON.parse(rawJson);
        if (parsed.narration && Array.isArray(parsed.captions) && parsed.captions.length > 0) {
          return {
            text: parsed.narration,
            captions: parsed.captions,
          };
        }
      }
    } catch {
      continue;
    }
  }

  // Fallback to local verified narration and generated captions
  const scriptText = breed.cinematicNarration;
  return {
    text: scriptText,
    captions: breed.captions || generateFallbackCaptions(scriptText),
  };
}

// Helper to generate Gemini Audio via Gemini 3.1 Flash TTS Preview
async function generateSpeechAudioWithFallback(
  ai: GoogleGenAI,
  text: string
): Promise<{ audioBase64: string; mimeType: string } | null> {
  // Prefer Gemini 3.1 Flash-Lite (or Flash TTS) first for best quality audio when available
  const candidateModels = [
    'gemini-3.1-flash-lite',
    'gemini-3.1-flash-tts-preview',
    'gemini-2.5-flash-tts',
    'gemini-2.5-flash',
  ];

  for (const model of candidateModels) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: [
          {
            parts: [
              {
                text: `Read in a warm, calm, authoritative natural-history documentary tone: ${text}`,
              },
            ],
          },
        ],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Charon' }, // Warm, calm, deep, measured documentary voice
            },
          },
        },
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData && part.inlineData.data) {
          const { base64, mimeType } = ensureWavBuffer(part.inlineData.data, 24000, 1, 16);
          return { audioBase64: base64, mimeType };
        }
      }
    } catch {
      // Continue to next speech candidate model
      continue;
    }
  }

  return null;
}

// Helper to chunk sentences into realistic synchronized captions
function generateFallbackCaptions(text: string): Array<{ start: number; end: number; text: string }> {
  const sentences = text
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  let currentStart = 0;
  const result: Array<{ start: number; end: number; text: string }> = [];

  for (const sentence of sentences) {
    const wordCount = sentence.split(/\s+/).length;
    // Calm documentary pace: ~2.1 words per second
    const duration = Math.max(3.0, Math.min(8.0, wordCount / 2.1 + 0.6));
    const end = parseFloat((currentStart + duration).toFixed(1));
    result.push({
      start: parseFloat(currentStart.toFixed(1)),
      end,
      text: sentence,
    });
    currentStart = end + 0.3;
  }

  return result;
}

// 5. API: Documentary Chapter Narration & Audio
app.post('/api/gemini/documentary', async (req: Request, res: Response) => {
  const { breedSlug } = req.body;
  if (!breedSlug) {
    return res.status(400).json({ error: 'breedSlug is required' });
  }

  // Check cache first for instant (<10ms) delivery
  const cached = narrationCache.get(breedSlug);
  if (cached) {
    return res.json({
      breedSlug,
      text: cached.text,
      captions: cached.captions,
      audioBase64: cached.audioBase64,
      audioMimeType: cached.audioMimeType,
      cached: true,
    });
  }

  // Find local breed metadata
  const breed = BREEDS.find((b) => b.slug === breedSlug);
  if (!breed) {
    return res.status(404).json({ error: 'Breed not found in archive' });
  }

  const ai = getGeminiClient();
  if (!ai) {
    // Unconfigured state fallback
    const scriptText = breed.cinematicNarration;
    const captions = breed.captions || generateFallbackCaptions(scriptText);
    return res.json({
      breedSlug,
      text: scriptText,
      captions,
      cached: false,
    });
  }

  try {
    // 1. Generate rich documentary text and synchronized subtitles with Gemini 3.1 Flash-Lite
    const { text: scriptText, captions } = await generateDocumentaryScriptAndSubtitles(ai, breed);

    // 2. Generate natural documentary voice audio via Gemini 3.1 Flash TTS Preview
    let audioResult: { audioBase64: string; mimeType: string } | null = null;
    try {
      audioResult = await generateSpeechAudioWithFallback(ai, scriptText);
    } catch {
      audioResult = null;
    }

    // Save to cache for instant sub-second playback on subsequent requests
    narrationCache.set(breedSlug, {
      text: scriptText,
      captions,
      audioBase64: audioResult?.audioBase64,
      audioMimeType: audioResult?.mimeType,
      timestamp: Date.now(),
    });

    return res.json({
      breedSlug,
      text: scriptText,
      captions,
      audioBase64: audioResult?.audioBase64,
      audioMimeType: audioResult?.mimeType,
      cached: false,
    });
  } catch {
    const fallbackText = breed.cinematicNarration;
    const fallbackCaptions = breed.captions || generateFallbackCaptions(fallbackText);
    return res.json({
      breedSlug,
      text: fallbackText,
      captions: fallbackCaptions,
      cached: false,
    });
  }
});

// 6. API: Breeds list endpoint
app.get('/api/breeds', (req: Request, res: Response) => {
  res.json({
    total: BREEDS.length,
    breeds: BREEDS,
  });
});

// Start the server with Vite middleware integration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[CANINOGRAPHY] Server running on http://0.0.0.0:${PORT}`);

    // Non-blocking background pre-warming for initial breeds
    // Controlled by PREWARM_ON_START environment variable to avoid accidental API usage at startup.
    // Set PREWARM_ON_START=true to enable prewarming when you intentionally want it.
    if (process.env.PREWARM_ON_START === 'true') {
      setTimeout(async () => {
        const ai = getGeminiClient();
        if (!ai) return;
        console.log('[CANINOGRAPHY] Starting background speech audio prewarm for initial chapters...');
        for (const breed of BREEDS.slice(0, 5)) {
          if (!narrationCache.has(breed.slug)) {
            try {
              const audioResult = await generateSpeechAudioWithFallback(ai, breed.cinematicNarration);
              if (audioResult) {
                narrationCache.set(breed.slug, {
                  text: breed.cinematicNarration,
                  captions: breed.captions || generateFallbackCaptions(breed.cinematicNarration),
                  audioBase64: audioResult.audioBase64,
                  audioMimeType: audioResult.mimeType,
                  timestamp: Date.now(),
                });
                console.log(`[CANINOGRAPHY] Prewarmed speech audio for ${breed.name}`);
              }
            } catch (err) {
              // Log but continue
              console.warn('[CANINOGRAPHY] Prewarm failed for', breed.slug, err?.message || err);
            }
          }
        }
      }, 1000);
    } else {
      console.log('[CANINOGRAPHY] Background prewarm disabled. To enable, set PREWARM_ON_START=true');
    }
  });
}

startServer();
