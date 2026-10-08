import { stripHtml } from '@/lib/drupal.js';
import { getAllNodes } from './drupalApi.js';
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
const INCLUDE = ['field_document', 'field_tenders_category', 'field_tenders_category.field_icon', 'field_tenders_category.field_icon.field_media_image'];
const PAGE_SIZE = 50;

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

  const date = parseTenderDateValue(isoDate);
  if (!date) return String(isoDate);

  const day = date.getDate();
  const monthLabel = ARABIC_MONTHS[date.getMonth()] ?? '';
  const year = date.getFullYear();

  return `${day} ${monthLabel} ${year}`;
}

/** Supports Drupal datetime / date-only strings. */
export function parseTenderDateValue(value) {
  if (value == null || value === '') return null;

  const str = String(value).trim();
  const dateOnly = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (dateOnly) {
    const date = new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]));
    return Number.isNaN(date.getTime()) ? null : date;
  }

  const date = new Date(str);
  return Number.isNaN(date.getTime()) ? null : date;
}

function readEndDateValue(attributes) {
  if (!attributes) return null;

  return (
    attributes.field_end_date ??
    attributes.field_closing_date ??
    attributes.field_expiry_date ??
    attributes.field_date_end ??
    null
  );
}

/** Visible through end date (inclusive); no end date → always show. */
export function isTenderActive(endDateValue, referenceDate = new Date()) {
  const endDate = parseTenderDateValue(endDateValue);
  if (!endDate) return true;

  const todayStart = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate(),
  );
  const endDayStart = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

  return endDayStart >= todayStart;
}

function mapStatus(value) {
  if (value === true || value === 1 || value === '1') return 'open';
  if (value === false || value === 0 || value === '0') return 'closed';

  const key = String(value ?? '')
    .trim()
    .toLowerCase();
  if (!key) return 'closed';
  if (key.includes('eval') || key.includes('tqyym') || key === 'under_evaluation') return 'evaluation';
  if (key.includes('open') || key.includes('mft') || key === 'mftwh') return 'open';
  if (key.includes('close') || key.includes('mglq') || key === 'closed') return 'closed';

  return 'closed';
}

export function mapTenderNode(node, included = []) {
  const attributes = node.attributes || {};
  const endDateRaw = readEndDateValue(attributes);

  if (!isTenderActive(endDateRaw)) {
    return null;
  }

  const document = resolveNodeFileField(node, 'field_document', included);
  const category = resolveTaxonomyTermWithIcon(node, 'field_tenders_category', included);
  const bodyHtml = attributes.field_body?.processed || attributes.field_body?.value || '';
  const title = attributes.title || '';

  if (!title) return null;

  return {
    id: node.id,
    nid: attributes.drupal_internal__nid,
    number: attributes.field_tender_number || '',
    title,
    excerpt: truncateExcerpt(stripHtml(bodyHtml)),
    publishDate: formatTenderDate(attributes.field_date || attributes.created),
    endDate: endDateRaw,
    status: mapStatus(attributes.field_status),
    category: resolveCategoryKey(category),
    categoryLabel: category?.name || '',
    categoryIcon: category?.iconUrl || null,
    downloadUrl: document?.url || null,
    filename: document?.filename || '',
  };
}

function extractTenderItems(response) {
  const nodes = Array.isArray(response?.data) ? response.data : response?.data ? [response.data] : [];
  const included = response?.included || [];

  return nodes.map((node) => mapTenderNode(node, included)).filter(Boolean);
}

async function fetchTenderNodes(language) {
  const filters = {};
  if (language) {
    filters['filter[langcode]'] = language;
  }

  const response = await getAllNodes(CONTENT_TYPE, {
    include: INCLUDE,
    sort: '-field_date,-created',
    limit: PAGE_SIZE,
    lang: language,
    filters,
  });

  return extractTenderItems(response);
}

export async function fetchTenders(language) {
  return fetchTenderNodes(language);
}
