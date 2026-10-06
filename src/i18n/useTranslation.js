import { useCallback, useMemo } from 'react';
import { useLanguage } from '@/hooks/useLanguage.js';
import { getDrupalDefaultLanguage } from '@/lib/env.js';
import { MESSAGES } from './messages.js';

function resolvePath(tree, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), tree);
}

export function getMessages(lang) {
  return MESSAGES[lang] || MESSAGES[getDrupalDefaultLanguage()] || MESSAGES.ar;
}

export function translate(lang, key) {
  const messages = getMessages(lang);
  const value = resolvePath(messages, key);
  return value == null ? key : value;
}

export function useTranslation() {
  const { language } = useLanguage();

  const t = useCallback((key) => translate(language, key), [language]);

  const messages = useMemo(() => getMessages(language), [language]);

  return { t, language, messages };
}
