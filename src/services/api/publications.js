import { getAllNodes } from './drupalApi.js';
import { resolveNodeFileField, resolveNodeImageUrl } from './jsonApiHelpers.js';

const CONTENT_TYPE = 'publication';
const INCLUDE = ['field_document', 'field_image', 'field_image.field_media_image'];
const DEFAULT_COVER = '/publications/cover-placeholder.svg';
const PAGE_SIZE = 50;
const ALL_PUBLICATIONS_CACHE_KEY = '__all__';

const CATEGORY_TO_SLUG = {
  khtt_wstrtyjyt: 'plans-strategies',
  tqryr_wnshrt_dwry: 'reports',
  dl_tdryby: 'training-manuals',
  mlkhst_syst_w_wrq_hqy_q: 'policy-briefs',
  drst_w_bhth: 'studies-research',
};

const SLUG_TO_CATEGORY = Object.fromEntries(
  Object.entries(CATEGORY_TO_SLUG).map(([machineName, slug]) => [slug, machineName]),
);

const publicationCache = new Map();
const publicationsInflight = new Map();

function cacheKey(language, categorySlug) {
  return `${language || 'all'}:${categorySlug || ALL_PUBLICATIONS_CACHE_KEY}`;
}

function filterByCategorySlug(items, categorySlug) {
  if (!categorySlug) return items;
  return items.filter((item) => matchesCategorySlug(item, categorySlug));
}

export function peekPublicationsCache(language, categorySlug) {
  const all = publicationCache.get(cacheKey(language, ALL_PUBLICATIONS_CACHE_KEY));
  if (!all) return undefined;
  return filterByCategorySlug(all, categorySlug);
}

export function extractPublicationYear(value) {
  if (value == null || value === '') return null;

  if (typeof value === 'number' && value >= 1000 && value <= 9999) {
    return value;
  }

  const str = String(value).trim();
  if (/^\d{4}$/.test(str)) {
    return Number(str);
  }

  const isoYear = str.match(/^(\d{4})-\d{2}-\d{2}/);
  if (isoYear) {
    return Number(isoYear[1]);
  }

  const date = new Date(str);
  if (!Number.isNaN(date.getTime())) {
    return date.getUTCFullYear();
  }

  const match = str.match(/\d{4}/);
  return match ? Number(match[0]) : null;
}

export function mapCategoryToSlug(value) {
  const key = String(value || '').trim().toLowerCase();
  if (!key) return null;

  if (CATEGORY_TO_SLUG[key]) {
    return CATEGORY_TO_SLUG[key];
  }

  if (key.includes('khtt') || key.includes('strtyj') || key.includes('plans')) {
    return 'plans-strategies';
  }

  if (key.includes('tqryr') || key.includes('nshrt') || key.includes('report')) {
    return 'reports';
  }

  if (
    key.includes('tdryb') ||
    key.includes('training') ||
    key.includes('manual') ||
    key.includes('تدريب') ||
    key.includes('أدلة')
  ) {
    return 'training-manuals';
  }

  if (key.includes('mlkhst') || key.includes('hqy') || key.includes('policy') || key.includes('brief')) {
    return 'policy-briefs';
  }

  if (key.includes('drst') || key.includes('bhth') || key.includes('stud') || key.includes('research')) {
    return 'studies-research';
  }

  return null;
}

function readCategoryFromAttributes(node) {
  const raw = node.attributes?.field_category ?? node.attributes?.category;
  if (raw == null) return '';
  return String(raw).trim();
}

function matchesCategorySlug(item, expectedCategorySlug) {
  if (!expectedCategorySlug) {
    return Boolean(item.categoryId);
  }

  if (item.categoryId === expectedCategorySlug) {
    return true;
  }

  const machineName = SLUG_TO_CATEGORY[expectedCategorySlug];
  if (!machineName) return false;

  const raw = String(item.category || '').trim().toLowerCase();
  return raw === machineName;
}

export function mapPublicationNode(node, included = [], expectedCategorySlug = null) {
  const categoryRaw = readCategoryFromAttributes(node);
  const categoryId = mapCategoryToSlug(categoryRaw) || expectedCategorySlug || null;
  const document = resolveNodeFileField(node, 'field_document', included);
  const resolvedCover = resolveNodeImageUrl(node, 'field_image', included);
  const yearFromField = extractPublicationYear(node.attributes?.field_publication_year);
  const yearFromCreated = extractPublicationYear(node.attributes?.created);
  const year = yearFromField ?? yearFromCreated ?? null;

  return {
    id: node.id,
    nid: node.attributes?.drupal_internal__nid,
    categoryId,
    category: categoryRaw,
    title: node.attributes?.title || '',
    year,
    coverImage: resolvedCover || DEFAULT_COVER,
    coverFromCms: Boolean(resolvedCover),
    downloadUrl: document?.url || '',
    filename: document?.filename || '',
    hasDownload: Boolean(document?.url),
  };
}

function mapPublicationResponse(response, expectedCategorySlug = null) {
  const nodes = Array.isArray(response?.data) ? response.data : response?.data ? [response.data] : [];
  const included = response?.included || [];

  return nodes
    .map((node) => mapPublicationNode(node, included, expectedCategorySlug))
    .filter((item) => item.title)
    .filter((item) => matchesCategorySlug(item, expectedCategorySlug));
}

async function loadPublicationNodes(language) {
  const filters = {};
  if (language) {
    filters['filter[langcode]'] = language;
  }

  return getAllNodes(CONTENT_TYPE, {
    include: INCLUDE,
    sort: '-field_publication_year,-created',
    limit: PAGE_SIZE,
    lang: language,
    filters,
  });
}

async function fetchAllPublicationsForLanguage(language) {
  const key = cacheKey(language, ALL_PUBLICATIONS_CACHE_KEY);
  const cached = publicationCache.get(key);
  if (cached) {
    return cached;
  }

  const inflight = publicationsInflight.get(key);
  if (inflight) {
    return inflight;
  }

  const request = (async () => {
    const response = await loadPublicationNodes(language);
    const items = mapPublicationResponse(response, null);
    publicationCache.set(key, items);
    publicationsInflight.delete(key);
    return items;
  })();

  publicationsInflight.set(key, request);
  return request;
}

async function fetchPublicationNodes(language, { categorySlug = null } = {}) {
  const all = await fetchAllPublicationsForLanguage(language);
  return filterByCategorySlug(all, categorySlug);
}

export async function fetchPublications(language) {
  return fetchPublicationNodes(language);
}

export async function fetchPublicationsByCategory(language, categorySlug) {
  return fetchPublicationNodes(language, { categorySlug });
}
