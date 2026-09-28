import { stripHtml } from '@/lib/drupal.js';
import { getNode, getNodes } from './drupalApi.js';
import { resolveNodeImageUrl } from './jsonApiHelpers.js';

const CONTENT_TYPE = 'media_briefings';
const INCLUDE = ['field_image', 'field_image.field_media_image'];

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

function formatBriefingDate(isoDate, { withYear = false } = {}) {
  if (!isoDate) return '';

  const [year, month, day] = String(isoDate).split('-').map(Number);
  if (!year || !month || !day) return isoDate;

  const monthLabel = ARABIC_MONTHS[month - 1] ?? '';
  return withYear ? `${day} ${monthLabel} ${year}` : `${day} ${monthLabel}`;
}

function getExcerpt(html, maxLength = 180) {
  const text = stripHtml(html);
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

export function mapMediaBriefingNode(node, included = []) {
  const bodyHtml = node.attributes?.field_body?.processed || node.attributes?.field_body?.value || '';
  const fieldDate = node.attributes?.field_date || '';

  return {
    id: node.id,
    nid: node.attributes?.drupal_internal__nid,
    date: formatBriefingDate(fieldDate),
    displayDate: formatBriefingDate(fieldDate, { withYear: true }),
    dateTime: fieldDate,
    title: node.attributes?.title || '',
    categoryLabel: 'أخبار المجلس',
    description: getExcerpt(bodyHtml),
    image: resolveNodeImageUrl(node, 'field_image', included) || '/logo.png',
    link: `/media/briefings/${node.id}`,
    bodyHtml,
    body: [stripHtml(bodyHtml)].filter(Boolean),
  };
}

async function fetchBriefingNodes(language) {
  const baseOptions = {
    include: INCLUDE,
    sort: '-field_date',
    limit: 20,
  };

  const extractNodes = (response) => {
    const nodes = Array.isArray(response?.data) ? response.data : response?.data ? [response.data] : [];
    const included = response?.included || [];
    return nodes.map((node) => mapMediaBriefingNode(node, included)).filter((item) => item.title);
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

export async function fetchMediaBriefings(language) {
  return fetchBriefingNodes(language);
}

export async function fetchMediaBriefingById(id, language) {
  if (!id) return null;

  try {
    const response = await getNode(CONTENT_TYPE, id, {
      lang: language,
      include: INCLUDE,
    });

    if (response?.data) {
      return mapMediaBriefingNode(response.data, response.included || []);
    }
  } catch {
    // fall through to list lookup for legacy ids
  }

  const items = await fetchBriefingNodes(language);
  return items.find((item) => item.id === id || String(item.nid) === String(id)) ?? null;
}
