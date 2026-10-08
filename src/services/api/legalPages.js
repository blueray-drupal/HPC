import { getNodes } from './drupalApi.js';
import { isDefaultSiteLanguage } from './languageContent.js';

const CONTENT_TYPE = 'legal_pages';

const PAGE_CLASSIFICATIONS = {
  privacy: ['sys_lkhswsy', 'privacy', 'lkhswsy', 'خصوص'],
  terms: ['shrwt_lstkhdm', 'terms', 'lstkhdm', 'شروط'],
  disclaimer: ['khl_lmsw_wly', 'disclaimer', 'msw_wly', 'إخلاء'],
  copyright: ['hqwq_lnshr', 'copyright', 'lnshr', 'نشر'],
};

function getProcessedHtml(field) {
  return field?.processed || field?.value || '';
}

export function mapPageKey(fieldPages) {
  const raw = String(fieldPages || '').trim().toLowerCase();
  if (!raw) return null;

  const machineName = raw.split('|')[0].trim();

  for (const [pageKey, tokens] of Object.entries(PAGE_CLASSIFICATIONS)) {
    if (tokens.some((token) => machineName.includes(token) || raw.includes(token))) {
      return pageKey;
    }
  }

  return null;
}

export function mapLegalPageNode(node) {
  const pageKey = mapPageKey(node.attributes?.field_pages);
  const bodyHtml = getProcessedHtml(node.attributes?.field_body);

  if (!pageKey || !bodyHtml) return null;

  return {
    pageKey,
    bodyHtml,
    title: node.attributes?.title || '',
  };
}

async function fetchLegalPageNodes(language) {
  const baseOptions = {
    sort: 'created',
    limit: 20,
  };

  const extractNodes = (response) => {
    const nodes = Array.isArray(response?.data) ? response.data : response?.data ? [response.data] : [];
    return nodes.map((node) => mapLegalPageNode(node)).filter(Boolean);
  };

  if (language) {
    try {
      const localized = await getNodes(CONTENT_TYPE, {
        ...baseOptions,
        lang: language,
        filters: { 'filter[langcode]': language },
      });
      const localizedItems = extractNodes(localized);
      if (localizedItems.length) return localizedItems;
    } catch {
      // fall through to default language fetch
    }
  }

  const response = await getNodes(CONTENT_TYPE, {
    ...baseOptions,
    lang: language,
  });

  return extractNodes(response);
}

export async function fetchLegalPageContent(language, pageKey, fallback = {}) {
  const staticFallback = isDefaultSiteLanguage(language) ? fallback : {};

  try {
    const pages = await fetchLegalPageNodes(language);
    const match = pages.find((page) => page.pageKey === pageKey);

    if (match?.bodyHtml) {
      return {
        ...staticFallback,
        bodyHtml: match.bodyHtml,
      };
    }
  } catch {
    // use language-appropriate fallback only
  }

  return staticFallback;
}
