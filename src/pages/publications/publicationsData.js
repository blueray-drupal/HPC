export const PUBLICATION_TABS = [
  'training-manuals',
  'reports',
  'plans-strategies',
  'studies-research',
  'policy-briefs',
];

export const PUBLICATIONS_PAGE = {
  title: 'الإصدارات',
  heroImage: '/inner-hero-image.png',
  breadcrumbs: [
    { label: 'الرئيسية', to: '/' },
    { label: 'الإصدارات' },
  ],
};

export const PUBLICATION_CATEGORIES = [
  {
    id: 'plans-strategies',
    title: 'خطط واستراتيجيات',
    description: 'الخطط الوطنية المعتمدة والاستراتيجيات القطاعية طويلة المدى.',
    icon: 'plans',
    theme: 'blue',
    size: 'wide',
    to: '/publications/plans-strategies',
  },
  {
    id: 'reports',
    title: 'تقارير ونشرات دورية',
    description: 'تحليلات دورية لمؤشرات الأداء.',
    icon: 'reports',
    theme: 'brown',
    size: 'narrow',
    to: '/publications/reports',
  },
  {
    id: 'training-manuals',
    title: 'أدلة تدريبية',
    description: 'موارد تعليمية وإرشادية لبناء القدرات.',
    icon: 'training',
    theme: 'orange',
    size: 'narrow',
    to: '/publications/training-manuals',
  },
  {
    id: 'policy-briefs',
    title: 'ملخصات سياسات وأوراق حقائق',
    description: 'موجزات مركزة لصناع القرار والباحثين.',
    icon: 'policyBriefs',
    theme: 'teal',
    size: 'wide',
    to: '/publications/policy-briefs',
  },
  {
    id: 'studies-research',
    title: 'دراسات وأبحاث',
    description: 'أبحاث معمقة ودراسات حالة تدعم التوجهات الاستراتيجية مبنية على الأدلة.',
    icon: 'studies',
    theme: 'green',
    size: 'full',
    to: '/publications/studies-research',
  },
];

export function getPublicationCategoryBySlug(slug) {
  return PUBLICATION_CATEGORIES.find((category) => category.id === slug) ?? null;
}
