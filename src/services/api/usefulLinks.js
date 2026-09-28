import { getNodes } from './drupalApi.js';
import {
  normalizeDrupalLink,
  resolveNodeImageUrl,
  resolveNodeMediaAsset,
} from './jsonApiHelpers.js';

const CONTENT_TYPE = 'useful_links';
const INCLUDE = [
  'field_image',
  'field_image.field_media_image',
  'field_image.field_media_video_file',
];

function resolveLinkImage(node, included = []) {
  const imageUrl = resolveNodeImageUrl(node, 'field_image', included);
  if (imageUrl) return imageUrl;

  const mediaAsset = resolveNodeMediaAsset(node, 'field_image', included);
  return mediaAsset?.thumbnail || mediaAsset?.url || '';
}

export function mapUsefulLinkNode(node, included = []) {
  const link = normalizeDrupalLink(node.attributes?.field_link);
  const title = node.attributes?.title || link.label || '';
  const image = resolveLinkImage(node, included);
  const href = link.href && link.href !== '#' ? link.href : '';

  if (!title && !image && !href) return null;

  return {
    id: node.id,
    nid: node.attributes?.drupal_internal__nid,
    title,
    href,
    image,
  };
}

async function fetchUsefulLinkNodes(language) {
  const baseOptions = {
    include: INCLUDE,
    sort: 'created',
    limit: 100,
  };

  const extractNodes = (response) => {
    const nodes = Array.isArray(response?.data) ? response.data : response?.data ? [response.data] : [];
    const included = response?.included || [];

    return nodes
      .map((node) => mapUsefulLinkNode(node, included))
      .filter((item) => item?.href);
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

export async function fetchUsefulLinks(language, fallbackItems = []) {
  try {
    return await fetchUsefulLinkNodes(language);
  } catch {
    return fallbackItems;
  }
}
