import { GeminiStatus, DocumentaryNarrationResponse } from '../types';

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

const clientNarrationCache = new Map<string, DocumentaryNarrationResponse>();

export async function fetchDocumentaryNarration(breedSlug: string): Promise<DocumentaryNarrationResponse> {
  const cached = clientNarrationCache.get(breedSlug);
  if (cached) {
    return cached;
  }

  try {
    const res = await fetch('/api/gemini/documentary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ breedSlug }),
    });

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    const data: DocumentaryNarrationResponse = await res.json();
    clientNarrationCache.set(breedSlug, data);
    return data;
  } catch (err) {
    console.warn(`[DocumentaryService] Failed to fetch chapter for ${breedSlug}`, err);
    throw err;
  }
}

export function prefetchDocumentaryNarration(breedSlug: string): void {
  if (!clientNarrationCache.has(breedSlug)) {
    fetchDocumentaryNarration(breedSlug).catch(() => {});
  }
}

