const DEFAULT_DRUPAL_URL = 'http://localhost:8000';
const DEFAULT_LANGUAGE = 'ar';

function trimTrailingSlash(value) {
  return String(value || '').replace(/\/$/, '');
}

export function getDrupalBaseUrl() {
  return trimTrailingSlash(import.meta.env.VITE_DRUPAL_URL || DEFAULT_DRUPAL_URL);
}

export function getDrupalDefaultLanguage() {
  return (
    import.meta.env.VITE_DRUPAL_DEFAULT_LANG ||
    import.meta.env.VITE_DRUPAL_LANG ||
    DEFAULT_LANGUAGE
  );
}

export function getDrupalSupportedLanguages() {
  const raw = import.meta.env.VITE_DRUPAL_LANGS || 'ar,en';
  const languages = raw
    .split(',')
    .map((lang) => lang.trim())
    .filter(Boolean);

  return languages.length > 0 ? languages : [DEFAULT_LANGUAGE];
}

export function isSupportedLanguage(lang) {
  return getDrupalSupportedLanguages().includes(lang);
}

export function normalizeSiteLanguage(lang) {
  if (lang && isSupportedLanguage(lang)) return lang;
  return getDrupalDefaultLanguage();
}

export function getLanguageDirection(lang) {
  return lang === 'ar' ? 'rtl' : 'ltr';
}

/** Base URL for custom Drupal REST endpoints (e.g. /membership-result). */
export function getApiBaseUrl() {
  if (import.meta.env.DEV) {
    const lang = getDrupalDefaultLanguage();
    return `/api/${lang}`;
  }

  const configured = trimTrailingSlash(import.meta.env.VITE_API_BASE_URL);
  if (configured) return configured;

  const lang = getDrupalDefaultLanguage();
  return `${getDrupalBaseUrl()}/${lang}`;
}
