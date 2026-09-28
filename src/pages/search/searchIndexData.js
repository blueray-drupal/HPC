import { ABOUT_SECTIONS } from '../about-us/aboutUsData.js';
import { JOBS_ITEMS } from '../jobs/jobsData.js';
import { NEWS_ITEMS_FALLBACK } from '../media/news/newsListData.js';
import { PUBLICATIONS_LIST } from '../publications/publicationsListData.js';
import { PUBLICATION_CATEGORIES } from '../publications/publicationsData.js';
import { TENDERS_ITEMS } from '../tenders/tendersData.js';

function paragraphsToText(paragraphs) {
  return Array.isArray(paragraphs) ? paragraphs.join(' ') : String(paragraphs || '');
}

function truncateText(text, maxLength = 220) {
  const value = String(text || '').trim();
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength).trim()}...`;
}

const publicationCategoryMap = Object.fromEntries(
  PUBLICATION_CATEGORIES.map((category) => [category.id, category.title]),
);

export function buildSearchIndex() {
  const items = [
    {
      id: 'home-page',
      title: 'الرئيسية',
      excerpt: 'الصفحة الرئيسية للمجلس الأعلى للسكان، وتضم أحدث الأخبار والإحاطات الإعلامية والمؤشرات الديموغرافية.',
      body: 'الرئيسية المجلس الأعلى للسكان من نحن',
      categoryLabel: 'الرئيسية',
      contentType: 'home',
      publishDate: '2024',
      year: 2024,
      path: '/',
      keywords: ['الرئيسية', 'من نحن', 'المجلس'],
    },
  ];

  Object.entries(ABOUT_SECTIONS).forEach(([sectionId, section]) => {
    const body = paragraphsToText(section.paragraphs);
    const extendedBody = paragraphsToText(section.extended?.paragraphsBeforeLink)
      + ' '
      + paragraphsToText(section.extended?.paragraphsAfterLink);

    items.push({
      id: `about-${sectionId}`,
      title: section.title,
      excerpt: truncateText(body),
      body: `${body} ${extendedBody}`.trim(),
      categoryLabel: 'عن المجلس',
      contentType: 'about',
      publishDate: sectionId === 'establishment' ? '15 مارس 2024' : '2024',
      year: 2024,
      path: `/about/${sectionId}`,
      keywords: ['من نحن', 'عن المجلس', 'المجلس', section.title],
    });
  });

  NEWS_ITEMS_FALLBACK.forEach((item) => {
    items.push({
      id: `news-${item.id}`,
      title: item.title,
      excerpt: item.excerpt || truncateText(item.body?.join(' ')),
      body: item.body?.join(' ') || item.excerpt || '',
      categoryLabel: item.categoryLabel || item.category || 'أخبار المجلس',
      contentType: 'home',
      publishDate: item.date,
      year: item.year || Number(String(item.dateTime || '').slice(0, 4)) || 2024,
      path: item.link || `/media/news/${item.id}`,
      keywords: [item.title, item.category, item.categoryLabel],
    });
  });

  PUBLICATIONS_LIST.forEach((item) => {
    items.push({
      id: `publication-${item.id}`,
      title: item.title,
      excerpt: `إصدار ${item.year} - ${publicationCategoryMap[item.categoryId] || 'الاصدارات'}`,
      body: item.title,
      categoryLabel: 'الاصدارات',
      contentType: 'publications',
      publishDate: String(item.year),
      year: item.year,
      path: `/publications/${item.categoryId}`,
      keywords: [item.title, publicationCategoryMap[item.categoryId], 'اصدارات', 'إصدارات'],
    });
  });

  TENDERS_ITEMS.forEach((item) => {
    items.push({
      id: `tender-${item.id}`,
      title: item.title,
      excerpt: item.excerpt,
      body: `${item.title} ${item.excerpt} ${item.number}`,
      categoryLabel: 'عطاءات',
      contentType: 'tenders',
      publishDate: item.publishDate,
      year: Number(String(item.publishDate || '').match(/\d{4}/)?.[0]) || 2024,
      path: '/tenders',
      keywords: [item.title, item.number, 'عطاء', 'عطاءات'],
    });
  });

  JOBS_ITEMS.forEach((item) => {
    items.push({
      id: `job-${item.id}`,
      title: item.title,
      excerpt: item.description,
      body: `${item.title} ${item.description}`,
      categoryLabel: 'الوظائف',
      contentType: 'home',
      publishDate: item.publishDate,
      year: Number(String(item.publishDate || '').match(/\d{4}/)?.[0]) || 2024,
      path: `/jobs/${item.id}`,
      keywords: [item.title, 'وظائف', 'وظيفة'],
    });
  });

  return items;
}
