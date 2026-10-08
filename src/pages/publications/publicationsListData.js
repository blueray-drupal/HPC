export const PUBLICATION_YEARS = [
  '2026',
  '2025',
  '2024',
  '2023',
  '2022',
  '2021',
  '2020',
  '2019',
  '2018',
  '2017',
  '2016',
  '2015',
  '2014',
  '2013',
  '2012',
  '2011',
  '2010',
];

export function getPublicationYearOptions(publications = []) {
  const years = new Set();

  for (const item of publications) {
    if (item?.year != null) {
      years.add(String(item.year));
    }
  }

  return [...years].sort((a, b) => Number(b) - Number(a));
}

export const PUBLICATIONS_PER_PAGE = 12;

const DEFAULT_COVER = '/publications/cover-placeholder.svg';

export const PUBLICATIONS_LIST = [
  {
    id: 'training-guide-2024',
    categoryId: 'training-manuals',
    title: 'الدليل الإرشادي لإدماج مفاهيم التربية الجنسية والصحة الإنجابية في المناهج الدراسية',
    year: 2024,
    coverImage: DEFAULT_COVER,
    downloadUrl: '#',
  },
  {
    id: 'annual-report-2025',
    categoryId: 'reports',
    title: 'التقرير السنوي 2025',
    year: 2025,
    coverImage: DEFAULT_COVER,
    downloadUrl: '#',
  },
  {
    id: 'demographic-social-2026',
    categoryId: 'reports',
    title: 'المتغيرات الديموغرافية والحماية الاجتماعية',
    year: 2026,
    coverImage: DEFAULT_COVER,
    downloadUrl: '#',
  },
  {
    id: 'strategic-plan-2026-2030',
    categoryId: 'plans-strategies',
    title: 'الخطة الاستراتيجية للمجلس الأعلى للسكان 2026-2030',
    year: 2026,
    coverImage: DEFAULT_COVER,
    downloadUrl: '#',
  },
  {
    id: 'marital-status-2026',
    categoryId: 'reports',
    title: 'الحالة الزواجية الراهنة للأردنيين والأردنيات',
    year: 2026,
    coverImage: DEFAULT_COVER,
    downloadUrl: '#',
  },
  {
    id: 'obesity-factsheet-2025',
    categoryId: 'policy-briefs',
    title: 'السُمنة في الأردن - ورقة حقائق',
    year: 2025,
    coverImage: DEFAULT_COVER,
    downloadUrl: '#',
  },
  {
    id: 'srh-priorities-2026',
    categoryId: 'studies-research',
    title: 'أولويات قضايا ودراسات الصحة الجنسية والإنجابية في الأردن',
    year: 2026,
    coverImage: DEFAULT_COVER,
    downloadUrl: '#',
  },
  {
    id: 'fp-needs-2026',
    categoryId: 'studies-research',
    title: 'التباينات بين مستخدمي الوسائل الحديثة والتقليدية لتنظيم الأسرة ومن لديهم حاجة غير ملباة لها في الأردن',
    year: 2026,
    coverImage: DEFAULT_COVER,
    downloadUrl: '#',
  },
  {
    id: 'widowhood-2026',
    categoryId: 'reports',
    title: 'الترمّل – مستوياته وتبايناته بين الأردنيين حسب العمر والجنس',
    year: 2026,
    coverImage: DEFAULT_COVER,
    downloadUrl: '#',
  },
  {
    id: 'twin-births-2025',
    categoryId: 'studies-research',
    title: 'ورقة ولادات التوأم في الأردن',
    year: 2025,
    coverImage: DEFAULT_COVER,
    downloadUrl: '#',
  },
  {
    id: 'strategy-insights-2025',
    categoryId: 'plans-strategies',
    title: 'تقرير الرؤى لنتائج تقرير المتابعة والتقييم الأول لمحاور الاستراتيجية الوطنية للسكان 2021-2030',
    year: 2025,
    coverImage: DEFAULT_COVER,
    downloadUrl: '#',
  },
  {
    id: 'celibacy-2026',
    categoryId: 'reports',
    title: 'العزوبية بين الأردنيات والأردنيين 1994-2024',
    year: 2026,
    coverImage: DEFAULT_COVER,
    downloadUrl: '#',
  },
  {
    id: 'training-guide-2025-copy',
    categoryId: 'training-manuals',
    title: 'الدليل الإرشادي لإدماج مفاهيم التربية الجنسية والصحة الإنجابية في المناهج الدراسية',
    year: 2025,
    coverImage: DEFAULT_COVER,
    downloadUrl: '#',
  },
  {
    id: 'training-guide-2023-copy',
    categoryId: 'training-manuals',
    title: 'الدليل الإرشادي لإدماج مفاهيم التربية الجنسية والصحة الإنجابية في المناهج الدراسية',
    year: 2023,
    coverImage: DEFAULT_COVER,
    downloadUrl: '#',
  },
  {
    id: 'training-guide-2022-copy',
    categoryId: 'training-manuals',
    title: 'الدليل الإرشادي لإدماج مفاهيم التربية الجنسية والصحة الإنجابية في المناهج الدراسية',
    year: 2022,
    coverImage: DEFAULT_COVER,
    downloadUrl: '#',
  },
  {
    id: 'training-guide-2021-copy',
    categoryId: 'training-manuals',
    title: 'الدليل الإرشادي لإدماج مفاهيم التربية الجنسية والصحة الإنجابية في المناهج الدراسية',
    year: 2021,
    coverImage: DEFAULT_COVER,
    downloadUrl: '#',
  },
  {
    id: 'training-guide-2020-copy',
    categoryId: 'training-manuals',
    title: 'الدليل الإرشادي لإدماج مفاهيم التربية الجنسية والصحة الإنجابية في المناهج الدراسية',
    year: 2020,
    coverImage: DEFAULT_COVER,
    downloadUrl: '#',
  },
  {
    id: 'training-guide-2019-copy',
    categoryId: 'training-manuals',
    title: 'الدليل الإرشادي لإدماج مفاهيم التربية الجنسية والصحة الإنجابية في المناهج الدراسية',
    year: 2019,
    coverImage: DEFAULT_COVER,
    downloadUrl: '#',
  },
  {
    id: 'training-guide-2018-copy',
    categoryId: 'training-manuals',
    title: 'الدليل الإرشادي لإدماج مفاهيم التربية الجنسية والصحة الإنجابية في المناهج الدراسية',
    year: 2018,
    coverImage: DEFAULT_COVER,
    downloadUrl: '#',
  },
  {
    id: 'training-guide-2017-copy',
    categoryId: 'training-manuals',
    title: 'الدليل الإرشادي لإدماج مفاهيم التربية الجنسية والصحة الإنجابية في المناهج الدراسية',
    year: 2017,
    coverImage: DEFAULT_COVER,
    downloadUrl: '#',
  },
  {
    id: 'training-guide-2016-copy',
    categoryId: 'training-manuals',
    title: 'الدليل الإرشادي لإدماج مفاهيم التربية الجنسية والصحة الإنجابية في المناهج الدراسية',
    year: 2016,
    coverImage: DEFAULT_COVER,
    downloadUrl: '#',
  },
  {
    id: 'training-guide-2015-copy',
    categoryId: 'training-manuals',
    title: 'الدليل الإرشادي لإدماج مفاهيم التربية الجنسية والصحة الإنجابية في المناهج الدراسية',
    year: 2015,
    coverImage: DEFAULT_COVER,
    downloadUrl: '#',
  },
  {
    id: 'policy-brief-2024',
    categoryId: 'policy-briefs',
    title: 'موجز سياسات حول مؤشرات الصحة الإنجابية في الأردن',
    year: 2024,
    coverImage: DEFAULT_COVER,
    downloadUrl: '#',
  },
  {
    id: 'policy-brief-2023',
    categoryId: 'policy-briefs',
    title: 'ورقة حقائق حول الشباب والسكان في الأردن',
    year: 2023,
    coverImage: DEFAULT_COVER,
    downloadUrl: '#',
  },
];

export function getPublicationsByCategory(categoryId) {
  return PUBLICATIONS_LIST.filter((item) => item.categoryId === categoryId);
}

export function filterPublications(publications, { year, query }) {
  return publications.filter((item) => {
    const matchesYear = !year || String(item.year) === year;
    const matchesQuery =
      !query || item.title.toLowerCase().includes(query.trim().toLowerCase());
    return matchesYear && matchesQuery;
  });
}

export function paginatePublications(publications, page, perPage) {
  const totalPages = Math.max(1, Math.ceil(publications.length / perPage));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * perPage;

  return {
    items: publications.slice(start, start + perPage),
    currentPage: safePage,
    totalPages,
    totalItems: publications.length,
  };
}
