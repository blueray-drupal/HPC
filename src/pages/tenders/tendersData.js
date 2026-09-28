export const TENDERS_PAGE = {
  title: 'العطاءات',
  heroImage: '/inner-hero-image.png',
  breadcrumbs: [
    { label: 'الرئيسية', to: '/' },
    { label: 'العطاءات' },
  ],
};

export const TENDER_STATUSES = {
  open: { id: 'open', label: 'مفتوح' },
  evaluation: { id: 'evaluation', label: 'قيد التقييم' },
  closed: { id: 'closed', label: 'مغلق' },
};

export const TENDER_CATEGORIES = {
  supply: { id: 'supply', label: 'توريد لوازم' },
  consulting: { id: 'consulting', label: 'خدمات استشارية' },
  maintenance: { id: 'maintenance', label: 'صيانة' },
};

export const TENDERS_ITEMS = [
  {
    id: 1,
    number: 'HPC/2024/05',
    title: 'توريد أجهزة حاسوب محمولة للمقر الرئيسي',
    excerpt:
      'دعوة للمشاركة في عطاء توريد أجهزة حاسوب محمولة ومعدات شبكات لدعم البنية التحتية التكنولوجية للمجلس.',
    publishDate: '20 مايو 2024',
    status: 'open',
    category: 'supply',
  },
  {
    id: 2,
    number: 'HPC/2024/05',
    title: 'توريد أجهزة حاسوب محمولة للمقر الرئيسي',
    excerpt:
      'دعوة للمشاركة في عطاء توريد أجهزة حاسوب محمولة ومعدات شبكات لدعم البنية التحتية التكنولوجية للمجلس.',
    publishDate: '20 مايو 2024',
    status: 'evaluation',
    category: 'consulting',
  },
  {
    id: 3,
    number: 'HPC/2024/05',
    title: 'توريد أجهزة حاسوب محمولة للمقر الرئيسي',
    excerpt:
      'دعوة للمشاركة في عطاء توريد أجهزة حاسوب محمولة ومعدات شبكات لدعم البنية التحتية التكنولوجية للمجلس.',
    publishDate: '20 مايو 2024',
    status: 'closed',
    category: 'maintenance',
  },
  {
    id: 4,
    number: 'HPC/2024/05',
    title: 'توريد أجهزة حاسوب محمولة للمقر الرئيسي',
    excerpt:
      'دعوة للمشاركة في عطاء توريد أجهزة حاسوب محمولة ومعدات شبكات لدعم البنية التحتية التكنولوجية للمجلس.',
    publishDate: '20 مايو 2024',
    status: 'open',
    category: 'supply',
  },
  {
    id: 5,
    number: 'HPC/2024/05',
    title: 'توريد أجهزة حاسوب محمولة للمقر الرئيسي',
    excerpt:
      'دعوة للمشاركة في عطاء توريد أجهزة حاسوب محمولة ومعدات شبكات لدعم البنية التحتية التكنولوجية للمجلس.',
    publishDate: '20 مايو 2024',
    status: 'evaluation',
    category: 'consulting',
  },
  {
    id: 6,
    number: 'HPC/2024/05',
    title: 'توريد أجهزة حاسوب محمولة للمقر الرئيسي',
    excerpt:
      'دعوة للمشاركة في عطاء توريد أجهزة حاسوب محمولة ومعدات شبكات لدعم البنية التحتية التكنولوجية للمجلس.',
    publishDate: '20 مايو 2024',
    status: 'closed',
    category: 'maintenance',
  },
  {
    id: 7,
    number: 'HPC/2024/05',
    title: 'توريد أجهزة حاسوب محمولة للمقر الرئيسي',
    excerpt:
      'دعوة للمشاركة في عطاء توريد أجهزة حاسوب محمولة ومعدات شبكات لدعم البنية التحتية التكنولوجية للمجلس.',
    publishDate: '20 مايو 2024',
    status: 'open',
    category: 'supply',
  },
  {
    id: 8,
    number: 'HPC/2024/05',
    title: 'توريد أجهزة حاسوب محمولة للمقر الرئيسي',
    excerpt:
      'دعوة للمشاركة في عطاء توريد أجهزة حاسوب محمولة ومعدات شبكات لدعم البنية التحتية التكنولوجية للمجلس.',
    publishDate: '20 مايو 2024',
    status: 'evaluation',
    category: 'consulting',
  },
];

export function filterTenders(items, { name = '', number = '' } = {}) {
  const normalizedName = name.trim().toLowerCase();
  const normalizedNumber = number.trim().toLowerCase();

  return items.filter((item) => {
    const matchesName =
      !normalizedName ||
      item.title.toLowerCase().includes(normalizedName) ||
      item.excerpt.toLowerCase().includes(normalizedName);

    const matchesNumber =
      !normalizedNumber || item.number.toLowerCase().includes(normalizedNumber);

    return matchesName && matchesNumber;
  });
}
