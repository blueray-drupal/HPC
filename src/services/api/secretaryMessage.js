import { stripHtml } from '@/lib/drupal.js';
import { getNodes } from './drupalApi.js';
import { resolveNodeImageUrl } from './jsonApiHelpers.js';

const CONTENT_TYPE = 'secretary_general_s_message';
const INCLUDE = ['field_image', 'field_image.field_media_image'];

function splitTitle(title = '') {
  const normalized = String(title).trim();
  if (!normalized) return { line1: '', line2: '' };

  const parts = normalized.split('\n').map((part) => part.trim()).filter(Boolean);
  if (parts.length >= 2) {
    return { line1: parts[0], line2: parts.slice(1).join(' ') };
  }

  const councilMatch = normalized.match(/^(.+?)(\s+للمجلس.+)$/);
  if (councilMatch) {
    return { line1: councilMatch[1].trim(), line2: councilMatch[2].trim() };
  }

  return { line1: normalized, line2: '' };
}

export function mapSecretaryMessageNode(node, included = []) {
  const { attributes } = node;
  const { line1, line2 } = splitTitle(attributes?.title || '');

  return {
    id: node.id,
    eyebrow: attributes?.field_label || '',
    titleLine1: line1,
    titleLine2: line2,
    body: stripHtml(attributes?.field_body?.processed || attributes?.field_body?.value || ''),
    name: attributes?.field_position || '',
    image: resolveNodeImageUrl(node, 'field_image', included),
    imageAlt: attributes?.title || 'كلمة الأمين العام للمجلس الأعلى للسكان',
  };
}

export async function fetchSecretaryMessage(language) {
  const baseOptions = {
    include: INCLUDE,
    sort: '-created',
    limit: 1,
  };

  const pickFirst = (response) => {
    const nodes = Array.isArray(response?.data) ? response.data : response?.data ? [response.data] : [];
    if (!nodes.length) return null;
    return mapSecretaryMessageNode(nodes[0], response?.included || []);
  };

  const response = await getNodes(CONTENT_TYPE, {
    ...baseOptions,
    lang: language,
    filters: language ? { 'filter[langcode]': language } : undefined,
  });

  return pickFirst(response);
}
