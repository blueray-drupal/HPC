import { getNodes } from './drupalApi.js';
import { resolveNodeFileField } from './jsonApiHelpers.js';

const CONTENT_TYPE = 'demographic_indicators';
const INCLUDE = ['field_document'];

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

function formatPublishDate(isoDate) {
  if (!isoDate) return '';

  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;

  const monthLabel = ARABIC_MONTHS[date.getUTCMonth()] ?? '';
  const year = date.getUTCFullYear();

  return `${monthLabel} ${year}`;
}

function formatFileSize(bytes) {
  if (!bytes || bytes <= 0) return '';

  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return `${(bytes / 1024).toFixed(2)} كيلوبايت`;
}

export function mapDemographicIndicatorNode(node, included = []) {
  const document = resolveNodeFileField(node, 'field_document', included);
  const created = node.attributes?.created || node.attributes?.changed || '';

  return {
    id: node.id,
    nid: node.attributes?.drupal_internal__nid,
    title: node.attributes?.title || '',
    publishDate: formatPublishDate(created),
    dateTime: created,
    fileSize: formatFileSize(document?.filesize),
    downloadUrl: document?.url || '#',
    filename: document?.filename || '',
  };
}

async function fetchIndicatorNodes(language) {
  const baseOptions = {
    include: INCLUDE,
    sort: '-created',
    limit: 50,
  };

  const extractNodes = (response) => {
    const nodes = Array.isArray(response?.data) ? response.data : response?.data ? [response.data] : [];
    const included = response?.included || [];

    return nodes
      .map((node) => mapDemographicIndicatorNode(node, included))
      .filter((item) => item.title && item.downloadUrl && item.downloadUrl !== '#');
  };

  if (language) {
    const localized = await getNodes(CONTENT_TYPE, {
      ...baseOptions,
      lang: language,
      filters: { 'filter[langcode]': language },
    });
    const localizedItems = extractNodes(localized);
    if (localizedItems.length) return localizedItems;
  }

  const response = await getNodes(CONTENT_TYPE, {
    ...baseOptions,
    lang: language,
  });

  return extractNodes(response);
}

export async function fetchDemographicIndicators(language) {
  return fetchIndicatorNodes(language);
}
