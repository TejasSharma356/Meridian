import type { IntelligenceData } from '@/app/intelligence/actions';

export const INTELLIGENCE_STORAGE_KEY = 'meridian-intelligence-v1';

export function loadIntelligenceFromSession(): IntelligenceData | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(INTELLIGENCE_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as IntelligenceData;
  } catch {
    return null;
  }
}

export function saveIntelligenceToSession(data: IntelligenceData): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(INTELLIGENCE_STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* quota or private mode */
  }
}
