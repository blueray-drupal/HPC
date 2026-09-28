import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import {
  getDrupalDefaultLanguage,
  getDrupalSupportedLanguages,
  getLanguageDirection,
  normalizeSiteLanguage,
} from '@/lib/env.js';

const STORAGE_KEY = 'hajfund-site-lang';

export const LanguageContext = createContext(null);

function readStoredLanguage() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeStoredLanguage(lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // ignore storage errors
  }
}

export function LanguageProvider({ children }) {
  const supportedLanguages = useMemo(() => getDrupalSupportedLanguages(), []);
  const defaultLanguage = useMemo(() => getDrupalDefaultLanguage(), []);

  const [language, setLanguageState] = useState(() =>
    normalizeSiteLanguage(readStoredLanguage() || defaultLanguage),
  );

  const setLanguage = useCallback((nextLang) => {
    const normalized = normalizeSiteLanguage(nextLang);
    setLanguageState(normalized);
    writeStoredLanguage(normalized);
  }, []);

  const toggleLanguage = useCallback(() => {
    const currentIndex = supportedLanguages.indexOf(language);
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % supportedLanguages.length;
    setLanguage(supportedLanguages[nextIndex]);
  }, [language, setLanguage, supportedLanguages]);

  useEffect(() => {
    const dir = getLanguageDirection(language);
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      supportedLanguages,
      defaultLanguage,
      dir: getLanguageDirection(language),
      isRtl: getLanguageDirection(language) === 'rtl',
    }),
    [defaultLanguage, language, setLanguage, supportedLanguages, toggleLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
