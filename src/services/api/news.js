import { translate } from '@/i18n/useTranslation.js';
import { stripHtml } from '@/lib/drupal.js';
import { getNode, getNodes, getTaxonomyTerms } from './drupalApi.js';
import { resolveNodeImageUrl, resolveTaxonomyTerm } from './jsonApiHelpers.js';

const CONTENT_TYPE = 'news';
const CATEGORY_VOCABULARY = 'news_category';
const INCLUDE = ['field_image', 'field_image.field_media_image', 'field_news_category'];

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

const ARABIC_WEEKDAYS = [
  'الأحد',
  'الاثنين',
  'الثلاثاء',
  'الأربعاء',
  'الخميس',
  'الجمعة',
  'السبت',
];

function formatNewsDate(isoDate, language = 'ar', { withWeekday = false } = {}) {
  if (!isoDate) return '';

  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;

  if (language === 'en') {
    const options = withWeekday
      ? { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }
      : { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  const day = date.getUTCDate();
  const monthLabel = ARABIC_MONTHS[date.getUTCMonth()] ?? '';
  const year = date.getUTCFullYear();
  const formatted = `${day} ${monthLabel} ${year}`;

  if (!withWeekday) return formatted;

  const weekday = ARABIC_WEEKDAYS[date.getUTCDay()] ?? '';
  return `${weekday}، ${formatted}`;
}

function getExcerpt(html, maxLength = 180) {
  const text = stripHtml(html);
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

function splitBodyParagraphs(html) {
  const text = stripHtml(html);
  return text.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
}

export function mapNewsCategoryTerm(term) {
  return {
    id: term.id,
    tid: term.attributes?.drupal_internal__tid,
    name: term.attributes?.name || '',
  };
}

export function mapNewsNode(node, included = [], language = 'ar') {
  const bodyHtml = node.attributes?.field_body?.processed || node.attributes?.field_body?.value || '';
  const fieldDate = node.attributes?.field_date || node.attributes?.created || '';
  const category = resolveTaxonomyTerm(node, 'field_news_category', included);
  const date = new Date(fieldDate);
  const year = Number.isNaN(date.getTime()) ? null : date.getUTCFullYear();
  const defaultCategory = translate(language, 'news.defaultCategory');
  const categoryName = category?.name || '';

  return {
    id: node.id,
    nid: node.attributes?.drupal_internal__nid,
    title: node.attributes?.title || '',
    excerpt: getExcerpt(bodyHtml),
    body: splitBodyParagraphs(bodyHtml),
    bodyHtml,
    category: categoryName,
    categoryId: category?.id || '',
    categoryLabel: categoryName || defaultCategory,
    date: formatNewsDate(fieldDate, language),
    displayDate: formatNewsDate(fieldDate, language, { withWeekday: true }),
    dateTime: fieldDate,
    year,
    image: resolveNodeImageUrl(node, 'field_image', included) || '/logo.png',
    link: `/media/news/${node.id}`,
  };
}

async function fetchCategoryTerms(language) {
  const extractTerms = (response) => {
    const terms = Array.isArray(response?.data) ? response.data : response?.data ? [response.data] : [];
    return terms.map(mapNewsCategoryTerm).filter((term) => term.name);
  };

  if (language) {
    const localized = await getTaxonomyTerms(CATEGORY_VOCABULARY, {
      lang: language,
      filters: { 'filter[langcode]': language },
    });
    const localizedTerms = extractTerms(localized);
    if (localizedTerms.length) return localizedTerms;
  }

  const response = await getTaxonomyTerms(CATEGORY_VOCABULARY, { lang: language });
  return extractTerms(response);
}

async function fetchNewsNodes(language) {
  const baseOptions = {
    include: INCLUDE,
    sort: '-field_date',
    limit: 100,
  };

  const extractNodes = (response) => {
    const nodes = Array.isArray(response?.data) ? response.data : response?.data ? [response.data] : [];
    const included = response?.included || [];
    return nodes.map((node) => mapNewsNode(node, included, language)).filter((item) => item.title);
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

export async function fetchNewsCategories(language) {
  return fetchCategoryTerms(language);
}

export async function fetchNews(language) {
  return fetchNewsNodes(language);
}

export async function fetchNewsById(id, language) {
  if (!id) return null;

  try {
    const response = await getNode(CONTENT_TYPE, id, {
      lang: language,
      include: INCLUDE,
    });

    if (response?.data) {
      return mapNewsNode(response.data, response.included || [], language);
    }
  } catch {
    // fall through to list lookup
  }

  const items = await fetchNewsNodes(language);
  return items.find((item) => item.id === id || String(item.nid) === String(id)) ?? null;
}
