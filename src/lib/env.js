const DEFAULT_DRUPAL_URL = 'http://localhost:8000';
const DEFAULT_LANGUAGE = 'ar';

function trimTrailingSlash(value) {
  return String(value || '').replace(/\/$/, '');
}

export function getDrupalBaseUrl() {
  return trimTrailingSlash(import.meta.env.VITE_DRUPAL_URL || DEFAULT_DRUPAL_URL);
}

/** Same-origin /api proxy (Vite dev server or Apache on production). Avoids browser CORS to Drupal. */
export function useDrupalApiProxy() {
  if (import.meta.env.DEV) return true;
  return import.meta.env.VITE_DRUPAL_USE_PROXY === 'true';
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
export function getApiBaseUrl(lang) {
  const language = normalizeSiteLanguage(lang);

  if (useDrupalApiProxy()) {
    return `/api/${language}`;
  }

  const configured = trimTrailingSlash(import.meta.env.VITE_API_BASE_URL);
  if (configured) return configured;

  return `${getDrupalBaseUrl()}/${language}`;
}
