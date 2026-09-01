import type { PriorityLevel } from '../types';
import { SPECIALIZATION_KEYWORDS, URGENT_KEYWORDS, MEDIUM_KEYWORDS } from '../data/mockData';

export interface AnalysisResult {
  summary: string;
  keywords: string[];
  urgencyTag: PriorityLevel;
  urgencyReason: string;
  suggestedSpecialization: string;
}

const STOPWORDS = new Set([
  'i', 'me', 'my', 'a', 'an', 'the', 'is', 'am', 'are', 'have', 'has', 'had',
  'and', 'or', 'but', 'since', 'for', 'from', 'with', 'it', 'to', 'of', 'in',
  'on', 'at', 'this', 'that', 'been', 'be', 'feel', 'feeling', 'im', "i'm",
]);

/**
 * Mock "AI" symptom analysis. In production this call would hit an LLM
 * endpoint; here it approximates the same behaviour deterministically so
 * the flow can be demoed end-to-end without a backend.
 */
export function analyzeSymptomText(rawText: string): AnalysisResult {
  const text = rawText.toLowerCase().trim();

  // --- Keyword extraction ---
  const words = text
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));

  const freq: Record<string, number> = {};
  words.forEach((w) => (freq[w] = (freq[w] || 0) + 1));

  // Prefer known medical phrases first (multi-word), then fall back to frequent single words
  const matchedPhrases = new Set<string>();
  [...URGENT_KEYWORDS, ...MEDIUM_KEYWORDS, ...SPECIALIZATION_KEYWORDS.flatMap((s) => s.keywords)].forEach(
    (phrase) => {
      if (text.includes(phrase)) matchedPhrases.add(phrase);
    }
  );

  const topWords = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([w]) => w);

  const keywords = Array.from(new Set([...matchedPhrases, ...topWords])).slice(0, 6);

  // --- Urgency detection ---
  let urgencyTag: PriorityLevel = 'LOW';
  let urgencyReason = 'No red-flag symptoms detected. Routine consultation recommended.';

  if (URGENT_KEYWORDS.some((k) => text.includes(k))) {
    urgencyTag = 'URGENT';
    urgencyReason = 'Symptoms described may indicate a medical emergency. Please consider emergency care immediately.';
  } else if (MEDIUM_KEYWORDS.some((k) => text.includes(k)) || text.length > 180) {
    urgencyTag = 'MEDIUM';
    urgencyReason = 'Symptoms suggest a condition that should be reviewed within 24–48 hours.';
  }

  // --- Specialization matching ---
  let suggestedSpecialization = 'General Medicine';
  let bestScore = 0;
  for (const entry of SPECIALIZATION_KEYWORDS) {
    const score = entry.keywords.filter((k) => text.includes(k)).length;
    if (score > bestScore) {
      bestScore = score;
      suggestedSpecialization = entry.specialization;
    }
  }

  // --- Summary generation (extractive, deterministic) ---
  const firstSentence = rawText.trim().split(/(?<=[.!?])\s+/)[0] || rawText.trim();
  const summary = `Patient reports: ${firstSentence.charAt(0).toUpperCase() + firstSentence.slice(1)}${
    firstSentence.length < rawText.trim().length ? ' (additional details provided)' : ''
  }`;

  return { summary, keywords, urgencyTag, urgencyReason, suggestedSpecialization };
}

export function generateMeetingId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const seg = (n: number) =>
    Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `${seg(3)}-${seg(4)}-${seg(3)}`;
}

export function generateTokenNumber(): string {
  return `T-${Math.floor(100 + Math.random() * 900)}`;
}
