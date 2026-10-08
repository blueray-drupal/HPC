import { stripHtml } from '@/lib/drupal.js';
import { getNodes } from './drupalApi.js';
import { normalizeDrupalLink, resolveNodeImageUrl } from './jsonApiHelpers.js';

const SLIDER_INCLUDE = ['field_image', 'field_image.field_media_image'];

export function mapSliderNode(node, included = []) {
  const { attributes } = node;
  const link = normalizeDrupalLink(attributes?.field_link);

  return {
    id: node.id,
    badge: attributes?.field_label || '',
    title: attributes?.title || '',
    description: stripHtml(attributes?.field_body?.processed || attributes?.field_body?.value || ''),
    bodyHtml: attributes?.field_body?.processed || '',
    image: resolveNodeImageUrl(node, 'field_image', included),
    ctaLabel: link.label,
    ctaLink: link.href,
    ctaExternal: link.isExternal,
  };
}

async function requestSliders(language, options = {}) {
  try {
    return await getNodes('slider', {
      lang: language,
      ...options,
    });
  } catch (error) {
    if (options.include?.length) {
      return getNodes('slider', {
        lang: language,
        ...options,
        include: [],
      });
    }
    throw error;
  }
}

export async function fetchSliders(language) {
  const response = await requestSliders(language, {
    include: SLIDER_INCLUDE,
    sort: '-changed',
    limit: 20,
    filters: language ? { 'filter[langcode]': language } : {},
  });

  const nodes = Array.isArray(response?.data) ? response.data : response?.data ? [response.data] : [];
  const included = response?.included || [];

  return nodes.map((node) => mapSliderNode(node, included)).filter((slide) => slide.title);
}
