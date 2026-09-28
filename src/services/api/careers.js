import { stripHtml } from '@/lib/drupal.js';
import { getNode, getNodes } from './drupalApi.js';
import { resolveTaxonomyTermsWithIcons } from './jsonApiHelpers.js';

const CONTENT_TYPE = 'careers';
const INCLUDE = [
  'field_skills',
  'field_skills.field_icon',
  'field_skills.field_icon.field_media_image',
];

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

function getProcessedHtml(field) {
  return field?.processed || field?.value || '';
}

function normalizeMultiValueText(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  return [String(value)];
}

function formatPublishDate(isoDate) {
  if (!isoDate) return '';

  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;

  const day = date.getUTCDate();
  const monthLabel = ARABIC_MONTHS[date.getUTCMonth()] ?? '';
  const year = date.getUTCFullYear();

  return `${day} ${monthLabel} ${year}`;
}

function resolveEmploymentType(value) {
  const raw = String(value || '').trim();
  if (!raw) {
    return { type: 'fullTime', label: '' };
  }

  const key = raw.split('|')[0].trim().toLowerCase();

  if (key.includes('part') || key.includes('jzy') || key.includes('جز')) {
    return { type: 'partTime', label: 'دوام جزئي' };
  }

  if (key.includes('full') || key.includes('kml') || key.includes('كامل')) {
    return { type: 'fullTime', label: 'دوام كامل' };
  }

  return { type: 'fullTime', label: 'دوام كامل' };
}

export function mapCareerNode(node, included = []) {
  const bodyHtml = getProcessedHtml(node.attributes?.field_body);
  const summary = stripHtml(bodyHtml);
  const qualifications = normalizeMultiValueText(node.attributes?.field_qualification);
  const tasks = normalizeMultiValueText(node.attributes?.field_required_tasks);
  const skills = resolveTaxonomyTermsWithIcons(node, 'field_skills', included).map((term) => ({
    id: term.id,
    label: term.name,
    icon: term.iconUrl,
  }));
  const employment = resolveEmploymentType(node.attributes?.field_employment_type);
  const title = node.attributes?.title || '';

  if (!title) return null;

  const qualification =
    node.attributes?.field_academic_qualification || qualifications[0] || '';

  return {
    id: node.id,
    nid: node.attributes?.drupal_internal__nid,
    title,
    description: summary,
    summary,
    bodyHtml,
    type: employment.type,
    employmentTypeLabel: employment.label,
    field: node.attributes?.field_field || '',
    qualification,
    experience: node.attributes?.field_experience || '',
    publishDate: formatPublishDate(node.attributes?.field_publication_date || node.attributes?.created),
    tasks,
    qualificationsIntro: node.attributes?.field_academic_qualification || '',
    qualifications,
    skills,
    location: '',
    applyDeadline: formatPublishDate(node.attributes?.field_application_deadline),
    applyEmail: node.attributes?.field_email || '',
    details: {
      location: '',
      workingHours: node.attributes?.field_working_hours || '',
      contractType: node.attributes?.field_contract_type || '',
      salary: node.attributes?.field_salary || '',
    },
  };
}

async function fetchCareerNodes(language) {
  const baseOptions = {
    include: INCLUDE,
    sort: '-field_publication_date',
    limit: 100,
  };

  const extractNodes = (response) => {
    const nodes = Array.isArray(response?.data) ? response.data : response?.data ? [response.data] : [];
    const included = response?.included || [];

    return nodes.map((node) => mapCareerNode(node, included)).filter(Boolean);
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

export async function fetchCareers(language, fallbackItems = []) {
  try {
    const items = await fetchCareerNodes(language);
    return items.length ? items : fallbackItems;
  } catch {
    return fallbackItems;
  }
}

export async function fetchCareerItem(language, id, fallbackItem = null) {
  if (!id) return fallbackItem;

  try {
    const response = await getNode(CONTENT_TYPE, id, {
      lang: language,
      include: INCLUDE,
    });
    const node = response?.data;
    if (!node) return fallbackItem;

    const item = mapCareerNode(node, response?.included || []);
    return item || fallbackItem;
  } catch {
    return fallbackItem;
  }
}
