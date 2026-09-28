import { stripHtml } from '@/lib/drupal.js';
import { getNodes } from './drupalApi.js';
import {
  resolveNodeFileField,
  resolveTaxonomyTermWithIcon,
} from './jsonApiHelpers.js';
import { TENDER_CATEGORIES } from '@/pages/tenders/tendersData.js';

const EXCERPT_MAX_LENGTH = 180;

function normalizeWhitespace(text) {
  return (text || '').replace(/\s+/g, ' ').trim();
}

function truncateExcerpt(text, max = EXCERPT_MAX_LENGTH) {
  const normalized = normalizeWhitespace(text);
  if (!normalized || normalized.length <= max) return normalized;
  return `${normalized.slice(0, max).trim()}…`;
}

function resolveCategoryKey(categoryTerm) {
  if (!categoryTerm?.name) return 'supply';

  const name = categoryTerm.name.trim();
  const match = Object.entries(TENDER_CATEGORIES).find(([, cfg]) => cfg.label === name);
  return match ? match[0] : 'supply';
}

const CONTENT_TYPE = 'tenders';
const INCLUDE = [
  'field_document',
  'field_tenders_category',
  'field_tenders_category.field_icon',
  'field_tenders_category.field_icon.field_media_image',
];

const ARABIC_MONTHS = [
  'كانون الثاني',
  'شباط',
  'آذار',
  'نيسان',
  'أيار',
  'حزيران',
  'تموز',
  'آب',
  'أيلول',
  'تشرين الأول',
  'تشرين الثاني',
  'كانون الأول',
];

function formatTenderDate(isoDate) {
  if (!isoDate) return '';

  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;

  const day = date.getUTCDate();
  const monthLabel = ARABIC_MONTHS[date.getUTCMonth()] ?? '';
  const year = date.getUTCFullYear();

  return `${day} ${monthLabel} ${year}`;
}

function mapStatus(value) {
  return value === true ? 'open' : 'closed';
}

export function mapTenderNode(node, included = []) {
  const document = resolveNodeFileField(node, 'field_document', included);
  const category = resolveTaxonomyTermWithIcon(node, 'field_tenders_category', included);
  const bodyHtml = node.attributes?.field_body?.processed || node.attributes?.field_body?.value || '';
  const title = node.attributes?.title || '';

  if (!title) return null;

  return {
    id: node.id,
    nid: node.attributes?.drupal_internal__nid,
    number: node.attributes?.field_tender_number || '',
    title,
    excerpt: truncateExcerpt(stripHtml(bodyHtml)),
    publishDate: formatTenderDate(node.attributes?.field_date || node.attributes?.created),
    status: mapStatus(node.attributes?.field_status),
    category: resolveCategoryKey(category),
    categoryLabel: category?.name || '',
    categoryIcon: category?.iconUrl || null,
    downloadUrl: document?.url || null,
    filename: document?.filename || '',
  };
}

async function fetchTenderNodes(language) {
  const baseOptions = {
    include: INCLUDE,
    sort: '-field_date',
    limit: 100,
  };

  const extractNodes = (response) => {
    const nodes = Array.isArray(response?.data) ? response.data : response?.data ? [response.data] : [];
    const included = response?.included || [];

    return nodes.map((node) => mapTenderNode(node, included)).filter(Boolean);
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

export async function fetchTenders(language, fallbackItems = []) {
  try {
    const items = await fetchTenderNodes(language);
    return items.length ? items : fallbackItems;
  } catch {
    return fallbackItems;
  }
}
