import { stripHtml } from '@/lib/drupal.js';
import { getNodes } from './drupalApi.js';

const CONTENT_TYPE = 'faq';

function getProcessedHtml(field) {
  return field?.processed || field?.value || '';
}

export function mapFaqNode(node) {
  const bodyHtml = getProcessedHtml(node.attributes?.field_body);
  const question = node.attributes?.title || '';

  if (!question && !bodyHtml) return null;

  return {
    id: node.id,
    nid: node.attributes?.drupal_internal__nid,
    question,
    answer: stripHtml(bodyHtml),
    answerHtml: bodyHtml,
  };
}

async function fetchFaqNodes(language) {
  const baseOptions = {
    sort: 'created',
    limit: 100,
  };

  const extractNodes = (response) => {
    const nodes = Array.isArray(response?.data) ? response.data : response?.data ? [response.data] : [];
    return nodes.map((node) => mapFaqNode(node)).filter(Boolean);
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

export async function fetchFaqItems(language, fallbackItems = []) {
  try {
    const items = await fetchFaqNodes(language);
    return items.length ? items : fallbackItems;
  } catch {
    return fallbackItems;
  }
}
