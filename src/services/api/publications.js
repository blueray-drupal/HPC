import { getNodes } from './drupalApi.js';
import { resolveNodeFileField, resolveNodeImageUrl } from './jsonApiHelpers.js';

const CONTENT_TYPE = 'publication';
const INCLUDE = ['field_document', 'field_image', 'field_image.field_media_image'];
const DEFAULT_COVER = '/publications/cover-placeholder.svg';

const CATEGORY_TO_SLUG = {
  khtt_wstrtyjyt: 'plans-strategies',
  tqryr_wnshrt_dwry: 'reports',
  dl_tdryby: 'training-manuals',
  mlkhst_syst_w_wrq_hqy_q: 'policy-briefs',
  drst_w_bhth: 'studies-research',
};

function extractPublicationYear(value) {
  if (!value) return null;

  const date = new Date(value);
  if (!Number.isNaN(date.getTime())) {
    return date.getUTCFullYear();
  }

  const match = String(value).match(/\d{4}/);
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

  if (key.includes('tdryb') || key.includes('training') || key.includes('manual')) {
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

export function mapPublicationNode(node, included = []) {
  const categoryRaw = node.attributes?.category ?? node.attributes?.field_category ?? '';
  const categoryId = mapCategoryToSlug(categoryRaw);
  const document = resolveNodeFileField(node, 'field_document', included);
  const coverImage = resolveNodeImageUrl(node, 'field_image', included) || DEFAULT_COVER;
  const year =
    extractPublicationYear(node.attributes?.field_publication_year) ||
    extractPublicationYear(node.attributes?.created);

  return {
    id: node.id,
    nid: node.attributes?.drupal_internal__nid,
    categoryId,
    category: categoryRaw,
    title: node.attributes?.title || '',
    year: year || new Date().getFullYear(),
    coverImage,
    downloadUrl: document?.url || '#',
    filename: document?.filename || '',
  };
}

async function fetchPublicationNodes(language) {
  const baseOptions = {
    include: INCLUDE,
    sort: '-field_publication_year,-created',
    limit: 100,
  };

  const extractNodes = (response) => {
    const nodes = Array.isArray(response?.data) ? response.data : response?.data ? [response.data] : [];
    const included = response?.included || [];

    return nodes
      .map((node) => mapPublicationNode(node, included))
      .filter((item) => item.title && item.categoryId);
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

export async function fetchPublications(language) {
  try {
    return await fetchPublicationNodes(language);
  } catch {
    return [];
  }
}

export async function fetchPublicationsByCategory(language, categorySlug, fallbackItems = []) {
  const publications = await fetchPublications(language);
  const categoryItems = publications.filter((item) => item.categoryId === categorySlug);

  return categoryItems.length ? categoryItems : fallbackItems;
}
