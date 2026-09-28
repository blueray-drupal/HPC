import { getDrupalBaseUrl, normalizeSiteLanguage } from './env.js';

export function normalizeDrupalUrl(url) {
  if (!url) return null;
  return String(url).replace('http://modest-turquoise-bear.168-235-125-96.cpanel.site', '');
}

function toProxiedDrupalPath(path) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return import.meta.env.DEV ? `/api${normalizedPath}` : normalizedPath;
}

export function resolveDrupalFileUrl(relativeOrAbsoluteUrl) {
  if (!relativeOrAbsoluteUrl) return null;

  const url = normalizeDrupalUrl(relativeOrAbsoluteUrl);

  if (/^https?:\/\//i.test(url)) {
    const base = getDrupalBaseUrl();
    if (import.meta.env.DEV && base && url.startsWith(base)) {
      return toProxiedDrupalPath(url.slice(base.length));
    }
    return url;
  }

  if (import.meta.env.DEV) {
    return toProxiedDrupalPath(url);
  }

  const base = getDrupalBaseUrl();
  if (!base) return url;

  return `${base}${url.startsWith('/') ? url : `/${url}`}`;
}

export function buildJsonApiPath(path, lang) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const language = normalizeSiteLanguage(lang);
  return `/${language}${normalizedPath}`;
}

export function stripHtml(value = '') {
  return String(value)
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
