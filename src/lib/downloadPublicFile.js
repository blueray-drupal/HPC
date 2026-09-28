import { getDrupalBaseUrl } from './env.js';

function getDrupalFilePath(url) {
  if (!url) return null;

  if (url.startsWith('/sites/')) return url;

  const base = getDrupalBaseUrl();
  if (base && url.startsWith(base)) {
    return url.slice(base.length) || null;
  }

  try {
    const parsed = new URL(url);
    const baseParsed = base ? new URL(base) : null;

    if (baseParsed && parsed.origin === baseParsed.origin) {
      return `${parsed.pathname}${parsed.search}`;
    }
  } catch {
    return null;
  }

  return null;
}

function getDownloadFetchUrl(url) {
  const drupalPath = getDrupalFilePath(url);
  if (!drupalPath) return url;

  if (import.meta.env.DEV) {
    return `/api${drupalPath.startsWith('/') ? drupalPath : `/${drupalPath}`}`;
  }

  const base = getDrupalBaseUrl();
  if (base) {
    return `${base}${drupalPath.startsWith('/') ? drupalPath : `/${drupalPath}`}`;
  }

  return url;
}

/**
 * Fetch a public file URL and trigger a download with a chosen filename.
 * Drupal files are fetched through the dev /api proxy when needed.
 */
export async function downloadPublicFile(url, downloadFilename) {
  const fetchUrl = getDownloadFetchUrl(url);

  try {
    const res = await fetch(fetchUrl, { credentials: 'same-origin' });
    if (!res.ok) throw new Error('bad response');

    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = downloadFilename;
    anchor.rel = 'noopener';
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(objectUrl);
  } catch {
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = downloadFilename;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }
}
