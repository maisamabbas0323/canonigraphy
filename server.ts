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

// Operator-controlled behavior: allow using GEMINI_API_KEY from environment without user connect
// Set ALLOW_ENV_GEMINI=true to permit preconfigured env key; default is false (require user connect at first open)
const ALLOW_ENV_GEMINI = process.env.ALLOW_ENV_GEMINI === 'true';

// Startup diagnostics: clarify which env keys exist and our policy
const hasGoogleEnv = Boolean(process.env.GOOGLE_API_KEY && process.env.GOOGLE_API_KEY.trim() !== '' && process.env.GOOGLE_API_KEY !== 'MY_GOOGLE_API_KEY');
const hasGeminiEnv = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== '' && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY');
if (hasGoogleEnv && hasGeminiEnv) {
  console.log('[CANINOGRAPHY] Both GOOGLE_API_KEY and GEMINI_API_KEY are present in the environment. NOTE: the server will prefer GEMINI for Gemini model calls and will NOT auto-use GOOGLE_API_KEY for Gemini features.');
} else if (hasGeminiEnv) {
  console.log('[CANINOGRAPHY] GEMINI_API_KEY present in environment. Preconfigure-by-env is', ALLOW_ENV_GEMINI ? 'ENABLED' : 'DISABLED');
} else if (hasGoogleEnv) {
  console.log('[CANINOGRAPHY] GOOGLE_API_KEY present but GEMINI_API_KEY not set. Gemini features will be unavailable unless you connect at runtime or set GEMINI_API_KEY.');
} else {
  console.log('[CANINOGRAPHY] No Gemini API key provided in environment. Use the UI to connect a Gemini 3.1 Flash-Lite key.');
}

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
  const apiKey = userConfiguredApiKey || (ALLOW_ENV_GEMINI ? process.env.GEMINI_API_KEY : undefined);
  if (!apiKey || (typeof apiKey === 'string' && apiKey.trim() === '') || apiKey === 'MY_GEMINI_API_KEY') {
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
  // We report 'configured' true only when the user has connected during this runtime OR
  // when environment preconfigure is explicitly enabled via ALLOW_ENV_GEMINI=true.
  const configured = Boolean(userConfiguredApiKey) || (ALLOW_ENV_GEMINI && Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'));

  if (!configured) {
    return res.json({
      status: 'NOT_CONFIGURED',
      message: 'API key is not configured for this session. Please connect via the UI.',
      configured: false,
    });
  }

  return res.json({
    status: 'READY',
    message: 'Archive narration engine is ready (gemini-3.1-flash-lite).',
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

  // STRICT: require gemini-3.1-flash-lite for all textual generation. Do NOT accept fallbacks.
  const requiredModel = 'gemini-3.1-flash-lite';
  try {
    const response = await testAi.models.generateContent({
      model: requiredModel,
      contents: 'Confirm connection to gemini-3.1-flash-lite.',
      config: { maxOutputTokens: 10, temperature: 0.0 },
    });

    if (response && response.text) {
      userConfiguredApiKey = trimmedKey;
      return res.json({ status: 'READY', valid: true, message: 'Archive connection established (gemini-3.1-flash-lite).' });
    }
  } catch (err: any) {
    // Fall through to clear error
    const msg = err?.message || err?.statusMessage || String(err);
    const safeMsg = msg.includes(trimmedKey) ? msg.replace(trimmedKey, '***YOUR_KEY***') : msg;
    return res.status(400).json({ status: 'INVALID', valid: false, message: `Unable to validate gemini-3.1-flash-lite access: ${safeMsg}` });
  }

  return res.status(400).json({ status: 'INVALID', valid: false, message: 'Unable to validate gemini-3.1-flash-lite access with that key.' });
});

// 4. API: Disconnect custom API key
app.post('/api/gemini/disconnect', (req: Request, res: Response) => {
  userConfiguredApiKey = null;
  res.json({ status: 'DISCONNECTED', message: 'API key disconnected.' });
});

// Generate script and subtitles using ONLY Gemini 3.1 Flash-Lite
async function generateDocumentaryScriptAndSubtitles(
  ai: GoogleGenAI,
  breed: typeof BREEDS[0]
): Promise<{ text: string; captions: Array<{ start: number; end: number; text: string }> }> {
  const requiredModel = 'gemini-3.1-flash-lite';
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

  try {
    const response = await ai.models.generateContent({
      model: requiredModel,
      contents: prompt,
      config: {
        temperature: 0.45,
        responseMimeType: 'application/json',
        systemInstruction: 'You are an expert natural history documentary scriptwriter. Provide only valid JSON with narration and captions.',
      },
    });

    const rawJson = response.text?.trim();
    if (rawJson) {
      const parsed = JSON.parse(rawJson);
      if (parsed.narration && Array.isArray(parsed.captions) && parsed.captions.length > 0) {
        return { text: parsed.narration, captions: parsed.captions };
      }
      throw new Error('Invalid JSON structure returned by gemini-3.1-flash-lite');
    }
    throw new Error('No text returned by gemini-3.1-flash-lite');
  } catch (err: any) {
    // Bubble a clear error up so caller can respond with 502 and instruct the user
    throw new Error(`gemini-3.1-flash-lite generation failed: ${err?.message || String(err)}`);
  }
}

// Helper to generate Gemini Audio using ONLY gemini-3.1-flash-tts-preview (strict)
async function generateSpeechAudioStrict(
  ai: GoogleGenAI,
  text: string
): Promise<{ audioBase64: string; mimeType: string } | null> {
  const requiredModel = 'gemini-3.1-flash-tts-preview';
  try {
    const response = await ai.models.generateContent({
      model: requiredModel,
      contents: [
        {
          parts: [
            { text: `Read in a warm, calm, authoritative natural-history documentary tone: ${text}` },
          ],
        },
      ],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Charon' } } },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData && part.inlineData.data) {
        const { base64, mimeType } = ensureWavBuffer(part.inlineData.data, 24000, 1, 16);
        return { audioBase64: base64, mimeType };
      }
    }

    throw new Error('No audio returned by gemini-3.1-flash-tts-preview');
  } catch (err: any) {
    throw new Error(`gemini-3.1-flash-tts-preview audio generation failed: ${err?.message || String(err)}`);
  }
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
    const duration = Math.max(3.0, Math.min(8.0, wordCount / 2.1 + 0.6));
    const end = parseFloat((currentStart + duration).toFixed(1));
    result.push({ start: parseFloat(currentStart.toFixed(1)), end, text: sentence });
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

  // Check cache first
  const cached = narrationCache.get(breedSlug);
  if (cached) {
    return res.json({ breedSlug, text: cached.text, captions: cached.captions, audioBase64: cached.audioBase64, audioMimeType: cached.audioMimeType, cached: true });
  }

  const breed = BREEDS.find((b) => b.slug === breedSlug);
  if (!breed) {
    return res.status(404).json({ error: 'Breed not found in archive' });
  }

  const ai = getGeminiClient();
  if (!ai) {
    return res.status(503).json({ error: 'Gemini API key not configured for this session. Please connect using the API Setup modal.' });
  }

  try {
    // 1) Generate full dossier via gemini-3.1-flash-lite (strict). The UI relies on this.
    // We reuse the documentary script generator as the core textual generator for the short narration;
    // if you have a separate structured-dossier generator, call it here (but it must also use gemini-3.1-flash-lite).
    const { text: scriptText, captions } = await generateDocumentaryScriptAndSubtitles(ai, breed);

    // 2) Generate audio strictly with gemini-3.1-flash-tts-preview. If it fails, continue without audio but inform the client.
    let audioResult: { audioBase64: string; mimeType: string } | null = null;
    try {
      audioResult = await generateSpeechAudioStrict(ai, scriptText);
    } catch (audioErr: any) {
      // Log and continue without audio
      console.warn('[CANINOGRAPHY] Audio generation failed (strict):', audioErr?.message || audioErr);
    }

    // Save to cache
    narrationCache.set(breedSlug, { text: scriptText, captions, audioBase64: audioResult?.audioBase64, audioMimeType: audioResult?.mimeType, timestamp: Date.now() });

    return res.json({ breedSlug, text: scriptText, captions, audioBase64: audioResult?.audioBase64, audioMimeType: audioResult?.mimeType, cached: false });
  } catch (err: any) {
    // Strict enforcement: return an explicit error if gemini-3.1-flash-lite generation failed.
    console.error('[CANINOGRAPHY] Documentary generation failed:', err?.message || err);
    return res.status(502).json({ error: 'Failed to generate documentary via gemini-3.1-flash-lite. See server logs for details.' });
  }
});

// 6. API: Breeds list endpoint
app.get('/api/breeds', (req: Request, res: Response) => {
  res.json({ total: BREEDS.length, breeds: BREEDS });
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
    if (process.env.PREWARM_ON_START === 'true') {
      console.log('[CANINOGRAPHY] Starting background speech audio prewarm for initial chapters...');
      setTimeout(async () => {
        const ai = getGeminiClient();
        if (!ai) return;
        for (const breed of BREEDS.slice(0, 5)) {
          if (!narrationCache.has(breed.slug)) {
            try {
              const { text: scriptText } = await generateDocumentaryScriptAndSubtitles(ai, breed);
              const audioResult = await generateSpeechAudioStrict(ai, scriptText);
              if (audioResult) {
                narrationCache.set(breed.slug, { text: scriptText, captions: breed.captions || generateFallbackCaptions(scriptText), audioBase64: audioResult.audioBase64, audioMimeType: audioResult.mimeType, timestamp: Date.now() });
                console.log(`[CANINOGRAPHY] Prewarmed speech audio for ${breed.name}`);
              }
            } catch (err) {
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
