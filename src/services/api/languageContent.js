import { getDrupalDefaultLanguage } from '@/lib/env.js';

export function normalizeDrupalLangcode(value) {
  return String(value ?? '').trim().toLowerCase();
}

/** Strict match: no cross-language fallback (ar on en site). */
export function nodeMatchesLanguage(node, language) {
  const requested = normalizeDrupalLangcode(language);
  if (!requested) return true;

  const nodeLang = normalizeDrupalLangcode(node?.attributes?.langcode);
  if (!nodeLang) return false;
  if (nodeLang === requested) return true;

  if (nodeLang === 'und') {
    return requested === normalizeDrupalLangcode(getDrupalDefaultLanguage());
  }

  return false;
}

export function filterNodesByLanguage(nodes, language) {
  if (!language || !Array.isArray(nodes)) return nodes;
  return nodes.filter((node) => nodeMatchesLanguage(node, language));
}

export function isDefaultSiteLanguage(language) {
  return normalizeDrupalLangcode(language) === normalizeDrupalLangcode(getDrupalDefaultLanguage());
}

/** Arabic static placeholders only for default language; empty/null otherwise. */
export function localizedStaticFallback(language, fallback) {
  if (isDefaultSiteLanguage(language)) return fallback;
  if (Array.isArray(fallback)) return [];
  if (fallback && typeof fallback === 'object') return null;
  return null;
}
