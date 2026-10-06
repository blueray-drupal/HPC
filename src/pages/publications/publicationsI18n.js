import { translate } from '@/i18n/useTranslation.js';

const PUBLICATION_CATEGORY_LAYOUT = [
  {
    id: 'plans-strategies',
    icon: 'plans',
    theme: 'blue',
    size: 'wide',
    to: '/publications/plans-strategies',
  },
  {
    id: 'reports',
    icon: 'reports',
    theme: 'brown',
    size: 'narrow',
    to: '/publications/reports',
  },
  {
    id: 'training-manuals',
    icon: 'training',
    theme: 'orange',
    size: 'narrow',
    to: '/publications/training-manuals',
  },
  {
    id: 'policy-briefs',
    icon: 'policyBriefs',
    theme: 'teal',
    size: 'wide',
    to: '/publications/policy-briefs',
  },
  {
    id: 'studies-research',
    icon: 'studies',
    theme: 'green',
    size: 'full',
    to: '/publications/studies-research',
  },
];

export const PUBLICATION_TABS = [
  'training-manuals',
  'reports',
  'plans-strategies',
  'studies-research',
  'policy-briefs',
];

function categoryCopy(lang, id) {
  return {
    title: translate(lang, `publications.categories.${id}.title`),
    description: translate(lang, `publications.categories.${id}.description`),
  };
}

export function getPublicationsPageMeta(lang) {
  const pageTitle = translate(lang, 'publications.pageTitle');

  return {
    title: pageTitle,
    heroImage: '/inner-hero-image.png',
    breadcrumbs: [
      { label: translate(lang, 'common.home'), to: '/' },
      { label: pageTitle },
    ],
  };
}

export function getPublicationCategories(lang) {
  return PUBLICATION_CATEGORY_LAYOUT.map((category) => ({
    ...category,
    ...categoryCopy(lang, category.id),
  }));
}

export function getPublicationCategoryBySlug(slug, lang) {
  const categories = getPublicationCategories(lang);
  return categories.find((category) => category.id === slug) ?? null;
}
