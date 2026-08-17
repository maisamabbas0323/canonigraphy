import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Modality } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { BREEDS } from './src/data/breeds';
import { COUNTRIES } from './src/data/countries';

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
  generatedByApi?: boolean;
  modelUsed?: string | null;
}>();

// In-memory cache for AI-generated breed informational content (varies per seed)
const breedInfoCache = new Map<string, {
  history: string;
  superpower: { title: string; description: string; anatomicalTrait: string };
  historicalFact: string;
  loreSnippet: string;
  funFacts: string[];
  timestamp: number;
}>();

// In-memory cache for AI-generated country historical context
const countryInfoCache = new Map<string, {
  historicalContext: string;
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

// Favicon
app.get('/favicon.ico', (req: Request, res: Response) => {
  res.status(204).end();
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
      // Clear any previously cached (possibly locally-generated) narration so subsequent requests use the API
      narrationCache.clear();
      return res.json({ status: 'READY', valid: true, message: 'Archive connection established (gemini-3.1-flash-lite).' });
    }
  } catch (err: any) {
    const msg = err?.message || err?.statusMessage || String(err);
    const safeMsg = msg.includes(trimmedKey) ? msg.replace(trimmedKey, '***YOUR_KEY***') : msg;
    return res.status(400).json({ status: 'INVALID', valid: false, message: `Unable to validate gemini-3.1-flash-lite access: ${safeMsg}` });
  }

  return res.status(400).json({ status: 'INVALID', valid: false, message: 'Unable to validate gemini-3.1-flash-lite access with that key.' });
});

// 4. API: Disconnect custom API key
app.post('/api/gemini/disconnect', (req: Request, res: Response) => {
  userConfiguredApiKey = null;
  narrationCache.clear();
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

// Generate breed-specific informational content using ONLY Gemini 3.1 Flash-Lite
async function generateBreedInfo(
  ai: GoogleGenAI,
  breed: typeof BREEDS[0],
  variationSeed: number
): Promise<{
  history: string;
  superpower: { title: string; description: string; anatomicalTrait: string };
  historicalFact: string;
  loreSnippet: string;
  funFacts: string[];
}> {
  const requiredModel = 'gemini-3.1-flash-lite';
  const prompt = `You are a world-renowned canine historian and evolutionary biologist for CANINOGRAPHY, a premium natural-history documentary archive.

Write rich, detailed, factually accurate informational content for this dog breed. Every statement MUST be historically and scientifically accurate. Do NOT invent false claims. Draw on real documented history, real anatomical science, and real cultural lore.

Breed: ${breed.name}
Country: ${breed.country}
Region: ${breed.region}
Group: ${breed.group}
Purpose: ${breed.purpose}
Origin Era: ${breed.originEra}
Origin Detail: ${breed.originDetailed}
Size: ${breed.size}
Temperament: ${breed.temperament.join(', ')}

Variation seed: ${variationSeed} (use this to inspire a fresh, unique angle on this breed)

RULES:
1. Write a new history paragraph (100-150 words) covering the breed's origin, working lineage, and cultural significance. Each request should emphasize different historical details, eras, or anecdotes while remaining factually correct.
2. Create a superpower section with a creative title (e.g. "Metabolic Fat-Burning Switch"), a 1-2 sentence description of a real anatomical or behavioral adaptation, and a specific anatomical trait explanation.
3. Provide ONE specific, verifiable historical fact about the breed (a date, a named dog, a documented event).
4. Write a lore snippet (1-2 sentences) about the breed's cultural significance in folklore, literature, or tradition.
5. Generate 4 unique fun facts — each 1-2 sentences, specific and verifiable. Avoid generic statements.

Output strictly valid JSON matching this schema:
{
  "history": "Full paragraph...",
  "superpower": {
    "title": "Creative Title",
    "description": "1-2 sentence description of real adaptation",
    "anatomicalTrait": "Specific anatomical explanation"
  },
  "historicalFact": "One specific verifiable fact",
  "loreSnippet": "Cultural significance 1-2 sentences",
  "funFacts": ["Fact 1...", "Fact 2...", "Fact 3...", "Fact 4..."]
}`;

  try {
    const response = await ai.models.generateContent({
      model: requiredModel,
      contents: prompt,
      config: {
        temperature: 0.7,
        responseMimeType: 'application/json',
        systemInstruction: 'You are an expert canine historian. Provide only valid JSON with historically accurate information about dog breeds.',
      },
    });

    const rawJson = response.text?.trim();
    if (rawJson) {
      const parsed = JSON.parse(rawJson);
      if (parsed.history && parsed.superpower && parsed.historicalFact && parsed.loreSnippet && Array.isArray(parsed.funFacts)) {
        return {
          history: parsed.history,
          superpower: {
            title: parsed.superpower.title || 'Unknown Adaptation',
            description: parsed.superpower.description || '',
            anatomicalTrait: parsed.superpower.anatomicalTrait || '',
          },
          historicalFact: parsed.historicalFact,
          loreSnippet: parsed.loreSnippet,
          funFacts: parsed.funFacts.slice(0, 4),
        };
      }
      throw new Error('Invalid JSON structure returned by gemini-3.1-flash-lite');
    }
    throw new Error('No text returned by gemini-3.1-flash-lite');
  } catch (err: any) {
    throw new Error(`gemini-3.1-flash-lite breed info generation failed: ${err?.message || String(err)}`);
  }
}

// Generate country historical context using ONLY Gemini 3.1 Flash-Lite
async function generateCountryInfo(
  ai: GoogleGenAI,
  countryCode: string,
  countryName: string,
  region: string,
  breedSlugs: string[],
  variationSeed: number
): Promise<{ historicalContext: string }> {
  const requiredModel = 'gemini-3.1-flash-lite';
  const breedNames = breedSlugs.map(slug => BREEDS.find(b => b.slug === slug)?.name).filter(Boolean).join(', ');
  const prompt = `You are a world-renowned canine historian for CANINOGRAPHY, a premium natural-history documentary archive.

Write a rich, detailed, factually accurate historical context paragraph about dog breeds from this country/region. Every statement MUST be historically accurate. Do NOT invent false claims.

Country: ${countryName}
Region: ${region}
Notable breeds from this region: ${breedNames || 'Various recognized breeds'}

Variation seed: ${variationSeed} (use this to inspire a fresh, unique angle)

RULES:
1. Write a 60-100 word paragraph covering the country's canine heritage, breed development, cultural significance, and working traditions.
2. Each request should emphasize different historical details while remaining factually correct.
3. Tone: authoritative, documentary, historically observant.

Output strictly valid JSON matching this schema:
{
  "historicalContext": "Full paragraph..."
}`;

  try {
    const response = await ai.models.generateContent({
      model: requiredModel,
      contents: prompt,
      config: {
        temperature: 0.65,
        responseMimeType: 'application/json',
        systemInstruction: 'You are an expert canine historian. Provide only valid JSON with historically accurate information.',
      },
    });

    const rawJson = response.text?.trim();
    if (rawJson) {
      const parsed = JSON.parse(rawJson);
      if (parsed.historicalContext) {
        return { historicalContext: parsed.historicalContext };
      }
      throw new Error('Invalid JSON structure returned by gemini-3.1-flash-lite');
    }
    throw new Error('No text returned by gemini-3.1-flash-lite');
  } catch (err: any) {
    throw new Error(`gemini-3.1-flash-lite country info generation failed: ${err?.message || String(err)}`);
  }
}

// Fallback breed info generator (used when API is unavailable) — generates from breed data
function generateFallbackBreedInfo(breed: typeof BREEDS[0]) {
  return {
    history: breed.history,
    superpower: {
      title: `${breed.purpose.split(',')[0]} Heritage`,
      description: `Evolved over centuries in ${breed.country} for specialized ${breed.purpose.toLowerCase()}, demonstrating immense environmental resilience and instinctive task mastery.`,
      anatomicalTrait: `Structural balance adapted to ${breed.region} climate with ${breed.energy.toLowerCase()} metabolic drive and ${breed.size.toLowerCase()} frame.`,
    },
    historicalFact: `Documented as originating in ${breed.originEra}, preserved through dedicated regional breeders in ${breed.country}.`,
    loreSnippet: `Revered across ${breed.region} folklore as an indispensable partner to shepherds, hunters, and guardians of historical heritage.`,
    funFacts: [
      `Historically bred in ${breed.country} specifically for ${breed.purpose.toLowerCase()}.`,
      `Possesses a typical lifespan of ${breed.lifespan} with characteristic ${breed.temperament.slice(0, 3).join(', ')} disposition.`,
      `Features distinct ${breed.height} height and ${breed.weight} weight proportional to historical working requirements.`,
      `Categorized under the ${breed.group} group with ${breed.energy} energy demands.`,
    ],
  };
}

// 5. API: Documentary Chapter Narration & Audio
app.post('/api/gemini/documentary', async (req: Request, res: Response) => {
  const { breedSlug } = req.body;
  if (!breedSlug) {
    return res.status(400).json({ error: 'breedSlug is required' });
  }

  // Check cache first
  const cached = narrationCache.get(breedSlug);
  const breed = BREEDS.find((b) => b.slug === breedSlug);
  if (!breed) {
    return res.status(404).json({ error: 'Breed not found in archive' });
  }

  const ai = getGeminiClient();

  // If we have a cache AND it was generated by the API, return it directly
  if (cached && cached.generatedByApi) {
    return res.json({ breedSlug, text: cached.text, captions: cached.captions, audioBase64: cached.audioBase64, audioMimeType: cached.audioMimeType, modelUsed: cached.modelUsed || null, cached: true });
  }

  // If no API client available, deny generation (we require gemini for authoritative content)
  if (!ai) {
    return res.status(503).json({ error: 'Gemini API key not configured for this session. Please connect using the API Setup modal.' });
  }

  try {
    // 1) Generate full narration & captions strictly via gemini-3.1-flash-lite
    const { text: scriptText, captions } = await generateDocumentaryScriptAndSubtitles(ai, breed);

    // 2) Generate audio strictly with gemini-3.1-flash-tts-preview; if it fails, continue without audio
    let audioResult: { audioBase64: string; mimeType: string } | null = null;
    try {
      audioResult = await generateSpeechAudioStrict(ai, scriptText);
    } catch (audioErr: any) {
      console.warn('[CANINOGRAPHY] Audio generation failed (strict):', audioErr?.message || audioErr);
    }

    // Save to cache as API-generated
    narrationCache.set(breedSlug, { text: scriptText, captions, audioBase64: audioResult?.audioBase64, audioMimeType: audioResult?.mimeType, timestamp: Date.now(), generatedByApi: true, modelUsed: 'gemini-3.1-flash-lite' });

    return res.json({ breedSlug, text: scriptText, captions, audioBase64: audioResult?.audioBase64, audioMimeType: audioResult?.mimeType, modelUsed: 'gemini-3.1-flash-lite', cached: false });
  } catch (err: any) {
    console.error('[CANINOGRAPHY] Documentary generation failed:', err?.message || err);
    return res.status(502).json({ error: 'Failed to generate documentary via gemini-3.1-flash-lite. See server logs for details.' });
  }
});

// 6. API: Breeds list endpoint
app.get('/api/breeds', (req: Request, res: Response) => {
  res.json({ total: BREEDS.length, breeds: BREEDS });
});

// 7. API: AI-generated breed informational content
app.post('/api/gemini/breed-info', async (req: Request, res: Response) => {
  const { breedSlug, variationSeed, bustCache } = req.body;
  if (!breedSlug) {
    return res.status(400).json({ error: 'breedSlug is required' });
  }

  const breed = BREEDS.find((b) => b.slug === breedSlug);
  if (!breed) {
    return res.status(404).json({ error: 'Breed not found in archive' });
  }

  const seed = variationSeed ?? Math.floor(Math.random() * 1e9);
  const cacheKey = bustCache ? `${breedSlug}::bust:${bustCache}` : `${breedSlug}::seed:${seed}`;

  // Check cache first (skip if bustCache is set)
  if (!bustCache) {
    const cached = breedInfoCache.get(cacheKey);
    if (cached) {
      console.log(`[CANINOGRAPHY] Breed info cache HIT for ${breedSlug} (seed:${seed})`);
      return res.json({ breedSlug, info: cached, cached: true });
    }
  }

  const ai = getGeminiClient();

  // If no API client available, return fallback content (generated from breed data)
  if (!ai) {
    console.log(`[CANINOGRAPHY] Breed info: no API key, returning fallback for ${breedSlug}`);
    const fallback = generateFallbackBreedInfo(breed);
    return res.json({ breedSlug, info: { ...fallback, generatedByApi: false }, cached: false });
  }

  try {
    console.log(`[CANINOGRAPHY] Generating breed info for ${breedSlug} via gemini-3.1-flash-lite (seed:${seed})`);
    const info = await generateBreedInfo(ai, breed, seed);

    // Save to cache
    breedInfoCache.set(cacheKey, { ...info, timestamp: Date.now() });

    return res.json({ breedSlug, info: { ...info, generatedByApi: true }, cached: false });
  } catch (err: any) {
    console.error('[CANINOGRAPHY] Breed info generation failed:', err?.message || err);
    // Return fallback on failure
    const fallback = generateFallbackBreedInfo(breed);
    return res.json({ breedSlug, info: { ...fallback, generatedByApi: false }, cached: false });
  }
});

// 8. API: AI-generated country historical context
app.post('/api/gemini/country-info', async (req: Request, res: Response) => {
  const { countryCode, variationSeed, bustCache } = req.body;
  if (!countryCode) {
    return res.status(400).json({ error: 'countryCode is required' });
  }

  const country = Object.values(COUNTRIES).find((c) => c.code === countryCode);
  if (!country) {
    return res.status(404).json({ error: 'Country not found in archive' });
  }

  const seed = variationSeed ?? Math.floor(Math.random() * 1e9);
  const cacheKey = bustCache ? `${countryCode}::bust:${bustCache}` : `${countryCode}::seed:${seed}`;

  // Check cache first (skip if bustCache is set)
  if (!bustCache) {
    const cached = countryInfoCache.get(cacheKey);
    if (cached) {
      console.log(`[CANINOGRAPHY] Country info cache HIT for ${countryCode} (seed:${seed})`);
      return res.json({ countryCode, info: { historicalContext: cached.historicalContext, generatedByApi: true }, cached: true });
    }
  }

  const ai = getGeminiClient();

  // If no API client available, return static fallback
  if (!ai) {
    console.log(`[CANINOGRAPHY] Country info: no API key, returning fallback for ${countryCode}`);
    return res.json({
      countryCode,
      info: { historicalContext: country.historicalContext || '', generatedByApi: false },
      cached: false,
    });
  }

  try {
    console.log(`[CANINOGRAPHY] Generating country info for ${countryCode} via gemini-3.1-flash-lite (seed:${seed})`);
    const info = await generateCountryInfo(ai, countryCode, country.name, country.region, country.breedSlugs, seed);

    // Save to cache
    countryInfoCache.set(cacheKey, { historicalContext: info.historicalContext, timestamp: Date.now() });

    return res.json({ countryCode, info: { ...info, generatedByApi: true }, cached: false });
  } catch (err: any) {
    console.error('[CANINOGRAPHY] Country info generation failed:', err?.message || err);
    // Return static fallback on failure
    return res.json({
      countryCode,
      info: { historicalContext: country.historicalContext || '', generatedByApi: false },
      cached: false,
    });
  }
});

// Start the server with Vite middleware integration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
      },
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
                narrationCache.set(breed.slug, { text: scriptText, captions: breed.captions || generateFallbackCaptions(scriptText), audioBase64: audioResult.audioBase64, audioMimeType: audioResult.mimeType, timestamp: Date.now(), generatedByApi: true, modelUsed: 'gemini-3.1-flash-lite' });
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
