export const USEFUL_LINKS_PAGE = {
  title: 'روابط مفيدة',
  shareUrl: '/useful-links',
  breadcrumbs: [
    { label: 'الرئيسية', to: '/' },
    { label: 'روابط مفيدة' },
  ],
};

export const LINKS_PER_PAGE = 16;

const LINK_SOURCES = [
  {
    title: 'وزارة التربية والتعليم',
    href: 'https://www.moe.gov.jo/',
    image: '/home/partners/moe.svg',
  },
  {
    title: 'وزارة الصحة',
    href: 'https://www.moh.gov.jo/',
    image: '/home/partners/moh.svg',
  },
  {
    title: 'وزارة التنمية الاجتماعية',
    href: 'https://www.mosd.gov.jo/',
    image: '/home/partners/mosd.svg',
  },
  {
    title: 'وزارة الخارجية وشؤون المغتربين',
    href: 'https://www.mfa.gov.jo/',
    image: '/home/partners/mfa.svg',
  },
  {
    title: 'دائرة الإحصاءات العامة',
    href: 'https://dosweb.dos.gov.jo/',
    image: '/home/partners/dos.svg',
  },
  {
    title: 'صندوق الأمم المتحدة للسكان',
    href: 'https://www.unfpa.org/',
    image: '/home/partners/unfpa.svg',
  },
  {
    title: 'منظمة الأمم المتحدة للطفولة',
    href: 'https://www.unicef.org/',
    image: '/home/partners/unicef.svg',
  },
  {
    title: 'منظمة الصحة العالمية',
    href: 'https://www.who.int/',
    image: '/home/partners/who.svg',
  },
];

export const USEFUL_LINKS_ITEMS = Array.from({ length: 80 }, (_, index) => {
  const source = LINK_SOURCES[index % LINK_SOURCES.length];

  return {
    id: index + 1,
    title: source.title,
    href: source.href,
    image: source.image,
  };
});

export function paginateUsefulLinks(items, currentPage, perPage = LINKS_PER_PAGE) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const start = (safePage - 1) * perPage;

  return {
    items: items.slice(start, start + perPage),
    currentPage: safePage,
    totalPages,
  };
}
