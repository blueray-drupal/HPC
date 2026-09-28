import { stripHtml } from '@/lib/drupal.js';
import { getNodes } from './drupalApi.js';
import { resolveNodeImageUrl } from './jsonApiHelpers.js';

const CONTENT_TYPE = 'list_of_international_days';
const INCLUDE = ['field_image', 'field_image.field_media_image'];

function getProcessedHtml(field) {
  if (!field) return '';
  return field.processed || field.value || '';
}

function extractYear(value) {
  if (!value) return null;

  const date = new Date(value);
  if (!Number.isNaN(date.getTime())) {
    return date.getUTCFullYear();
  }

  const match = String(value).match(/\d{4}/);
  return match ? Number(match[0]) : null;
}

export function mapInternationalDaysNode(node, included = []) {
  const image = resolveNodeImageUrl(node, 'field_image', included);
  const bodyHtml = getProcessedHtml(node.attributes?.field_body);
  const year = extractYear(node.attributes?.field_year);

  if (!image && !bodyHtml) return null;

  return {
    id: node.id,
    nid: node.attributes?.drupal_internal__nid,
    title: node.attributes?.title || '',
    year,
    image: image || null,
    bodyHtml: bodyHtml || null,
    description: stripHtml(bodyHtml),
  };
}

async function fetchInternationalDaysNodes(language) {
  const baseOptions = {
    include: INCLUDE,
    sort: '-field_year,-created',
    limit: 100,
  };

  const extractNodes = (response) => {
    const nodes = Array.isArray(response?.data) ? response.data : response?.data ? [response.data] : [];
    const included = response?.included || [];

    return nodes
      .map((node) => mapInternationalDaysNode(node, included))
      .filter(Boolean);
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

export async function fetchInternationalDaysList(language) {
  try {
    const items = await fetchInternationalDaysNodes(language);
    if (!items.length) return null;

    const withImages = items.filter((item) => item.image);
    const primary = withImages[0] || items[0];

    return {
      items: withImages.length ? withImages : items,
      description: primary.description || null,
      bodyHtml: primary.bodyHtml || null,
    };
  } catch {
    return null;
  }
}
