import { stripHtml } from '@/lib/drupal.js';
import { getNodes } from './drupalApi.js';
import { resolveNodeImageUrl } from './jsonApiHelpers.js';

const CONTENT_TYPE = 'programs';
const INCLUDE = ['field_image', 'field_image.field_media_image'];

const CLASSIFICATION_TO_SECTION = {
  brnmj_lskn_wltnmy: 'population-development',
  brnmj_lsh_lnjby: 'reproductive-health',
  hshd_ltyyd: 'advocacy',
  hshd_altayyd: 'advocacy',
};

function getProcessedHtml(field) {
  if (!field) return '';
  return field.processed || field.value || '';
}

function splitHtmlParagraphs(html) {
  if (!html) return [];

  const matches = String(html).match(/<p[^>]*>[\s\S]*?<\/p>/gi);
  if (matches?.length) {
    return matches.map((paragraph) => stripHtml(paragraph)).filter(Boolean);
  }

  const text = stripHtml(html);
  return text ? [text] : [];
}

export function mapClassificationToSectionId(classification) {
  const key = String(classification || '').trim().toLowerCase();
  if (!key) return null;

  if (CLASSIFICATION_TO_SECTION[key]) {
    return CLASSIFICATION_TO_SECTION[key];
  }

  if (key.includes('lskn') || key.includes('ltnmy') || key.includes('population')) {
    return 'population-development';
  }

  if (key.includes('lnjby') || key.includes('shh') || key.includes('health')) {
    return 'reproductive-health';
  }

  if (key.includes('hshd') || key.includes('tyyd') || key.includes('advocacy')) {
    return 'advocacy';
  }

  return null;
}

export function mapProgramNode(node, included = []) {
  const classification = node.attributes?.field_classification2 || '';
  const sectionId = mapClassificationToSectionId(classification);
  if (!sectionId) return null;

  const bodyHtml = getProcessedHtml(node.attributes?.field_body);
  const paragraphs = splitHtmlParagraphs(bodyHtml);
  const image = resolveNodeImageUrl(node, 'field_image', included);

  if (!bodyHtml && !paragraphs.length && !image && !node.attributes?.title) {
    return null;
  }

  return {
    sectionId,
    partial: {
      ...(node.attributes?.title ? { title: node.attributes.title } : {}),
      ...(bodyHtml ? { bodyHtml } : {}),
      ...(paragraphs.length ? { paragraphs } : {}),
      ...(image ? { image } : {}),
    },
  };
}

function mergeProgramSection(fallbackSection = {}, partial = {}) {
  if (!partial || !Object.keys(partial).length) return fallbackSection;

  return {
    ...fallbackSection,
    ...partial,
    title: partial.title || fallbackSection.title,
    paragraphs: partial.paragraphs?.length ? partial.paragraphs : fallbackSection.paragraphs,
  };
}

async function fetchProgramNodes(language) {
  const baseOptions = {
    include: INCLUDE,
    sort: 'created',
    limit: 100,
  };

  const extractNodes = (response) => ({
    nodes: Array.isArray(response?.data) ? response.data : response?.data ? [response.data] : [],
    included: response?.included || [],
  });

  if (language) {
    try {
      const localized = await getNodes(CONTENT_TYPE, {
        ...baseOptions,
        lang: language,
        filters: { 'filter[langcode]': language },
      });
      const localizedResult = extractNodes(localized);
      if (localizedResult.nodes.length) return localizedResult;
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

export async function fetchProgramSections(language, fallbackSections = {}) {
  try {
    const { nodes, included } = await fetchProgramNodes(language);
    if (!nodes.length) return fallbackSections;

    const nextSections = { ...fallbackSections };

    nodes.forEach((node) => {
      const mapped = mapProgramNode(node, included);
      if (!mapped) return;

      const { sectionId, partial } = mapped;
      nextSections[sectionId] = mergeProgramSection(
        nextSections[sectionId] || fallbackSections[sectionId] || {},
        partial,
      );
    });

    return nextSections;
  } catch {
    return fallbackSections;
  }
}
