import { GeminiStatus, DocumentaryNarrationResponse, BreedAIInfoResponse, CountryAIInfoResponse } from '../types';

export async function checkGeminiStatus(): Promise<{ status: GeminiStatus; message: string; configured: boolean }> {
  try {
    const res = await fetch('/api/gemini/status');
    if (!res.ok) {
      return { status: 'UNAVAILABLE', message: 'Archive server unreachable', configured: false };
    }
    return await res.json();
  } catch {
    return { status: 'UNAVAILABLE', message: 'Connection unavailable', configured: false };
  }
}

export async function connectApiKey(apiKey: string): Promise<{ status: GeminiStatus; valid: boolean; message: string }> {
  try {
    const res = await fetch('/api/gemini/connect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey }),
    });
    const data = await res.json();
    return data;
  } catch (err: any) {
    return { status: 'INVALID', valid: false, message: err?.message || 'Unable to connect. Check the key and try again.' };
  }
}

export async function disconnectApiKey(): Promise<void> {
  try {
    await fetch('/api/gemini/disconnect', { method: 'POST' });
  } catch {}
}

// Client-side cache keyed by breedSlug + variationSeed so different seeds cache separately.
const clientNarrationCache = new Map<string, DocumentaryNarrationResponse>();

export async function fetchDocumentaryNarration(
  breedSlug: string,
  options?: { forceRefresh?: boolean; variationSeed?: number }
): Promise<DocumentaryNarrationResponse> {
  const forceRefresh = options?.forceRefresh !== undefined ? options.forceRefresh : true;
  const variationSeed = options?.variationSeed ?? Math.floor(Math.random() * 1e9);

  const cacheKey = `${breedSlug}::seed:${variationSeed}`;
  const cached = clientNarrationCache.get(cacheKey);
  if (!forceRefresh && cached) {
    return cached;
  }

  try {
    const res = await fetch('/api/gemini/documentary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ breedSlug, forceRefresh, variationSeed }),
    });

    if (!res.ok) {
      // try to surface server JSON error if any
      const errJson = await res.json().catch(() => null);
      const errMsg = errJson?.error || `Server returned ${res.status}`;
      throw new Error(errMsg);
    }

    const data: DocumentaryNarrationResponse = await res.json();
    // Cache per-seed so repeated requests with same seed return same phrasing
    clientNarrationCache.set(cacheKey, data);
    return data;
  } catch (err) {
    console.warn(`[DocumentaryService] Failed to fetch chapter for ${breedSlug}`, err);
    throw err;
  }
}

export function prefetchDocumentaryNarration(breedSlug: string): void {
  // Kick off a fetch with a random seed but do not throw on failure
  const variationSeed = Math.floor(Math.random() * 1e9);
  if (!clientNarrationCache.has(`${breedSlug}::seed:${variationSeed}`)) {
    fetchDocumentaryNarration(breedSlug, { forceRefresh: true, variationSeed }).catch(() => {});
  }
}

// Client-side cache for breed informational content (keyed by slug + seed)
const breedInfoCache = new Map<string, BreedAIInfoResponse>();

export async function fetchBreedInfo(
  breedSlug: string,
  options?: { forceRefresh?: boolean; variationSeed?: number }
): Promise<BreedAIInfoResponse> {
  const forceRefresh = options?.forceRefresh !== undefined ? options.forceRefresh : true;
  const variationSeed = options?.variationSeed ?? Math.floor(Math.random() * 1e9);

  // When force refreshing, use timestamp-based bustCache to guarantee fresh content
  const bustCache = forceRefresh ? Date.now() : undefined;
  const cacheKey = `${breedSlug}::bust:${bustCache || variationSeed}`;

  if (!forceRefresh) {
    const cached = breedInfoCache.get(cacheKey);
    if (cached) {
      return cached;
    }
  }

  try {
    const res = await fetch('/api/gemini/breed-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ breedSlug, variationSeed, bustCache }),
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => null);
      const errMsg = errJson?.error || `Server returned ${res.status}`;
      throw new Error(errMsg);
    }

    const data: BreedAIInfoResponse = await res.json();
    breedInfoCache.set(cacheKey, data);
    return data;
  } catch (err) {
    console.warn(`[GeminiService] Failed to fetch breed info for ${breedSlug}`, err);
    throw err;
  }
}

// Client-side cache for country info (keyed by countryCode + seed)
const countryInfoCache = new Map<string, CountryAIInfoResponse>();

export async function fetchCountryInfo(
  countryCode: string,
  options?: { forceRefresh?: boolean; variationSeed?: number }
): Promise<CountryAIInfoResponse> {
  const forceRefresh = options?.forceRefresh !== undefined ? options.forceRefresh : true;
  const variationSeed = options?.variationSeed ?? Math.floor(Math.random() * 1e9);

  const bustCache = forceRefresh ? Date.now() : undefined;
  const cacheKey = `${countryCode}::bust:${bustCache || variationSeed}`;

  if (!forceRefresh) {
    const cached = countryInfoCache.get(cacheKey);
    if (cached) {
      return cached;
    }
  }

  try {
    const res = await fetch('/api/gemini/country-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ countryCode, variationSeed, bustCache }),
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => null);
      const errMsg = errJson?.error || `Server returned ${res.status}`;
      throw new Error(errMsg);
    }

    const data: CountryAIInfoResponse = await res.json();
    countryInfoCache.set(cacheKey, data);
    return data;
  } catch (err) {
    console.warn(`[GeminiService] Failed to fetch country info for ${countryCode}`, err);
    throw err;
  }
}
