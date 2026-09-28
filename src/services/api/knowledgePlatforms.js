import { getNodes } from './drupalApi.js';
import { normalizeDrupalLink, resolveNodeImageUrl } from './jsonApiHelpers.js';

const CONTENT_TYPE = 'knowledge_platforms';
const INCLUDE = ['field_image', 'field_image.field_media_image'];
const CARD_THEMES = ['red', 'green'];

export function mapKnowledgePlatformNode(node, included = [], index = 0) {
  const link = normalizeDrupalLink(node.attributes?.field_link);
  const title = node.attributes?.title || '';
  const brief = node.attributes?.field_brief || '';
  return {
    id: node.id,
    theme: CARD_THEMES[index % CARD_THEMES.length],
    logo: resolveNodeImageUrl(node, 'field_image', included) || '/logo.png',
    logoAlt: title,
    title,
    description: brief,
    linkLabel: 'زيارة الموقع',
    link: link.href,
  };
}

async function fetchPlatformNodes(language) {
  const baseOptions = {
    include: INCLUDE,
    sort: 'created',
    limit: 20,
  };

  const extractNodes = (response) => {
    const nodes = Array.isArray(response?.data) ? response.data : response?.data ? [response.data] : [];
    const included = response?.included || [];

    return nodes
      .map((node, index) => mapKnowledgePlatformNode(node, included, index))
      .filter((item) => item.title);
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

export async function fetchKnowledgePlatforms(language) {
  return fetchPlatformNodes(language);
}
