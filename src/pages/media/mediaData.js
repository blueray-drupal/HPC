export const MEDIA_PAGE = {
  title: 'المركز الإعلامي',
  heroImage: '/inner-hero-image.png',
  breadcrumbs: [
    { label: 'الرئيسية', to: '/' },
    { label: 'المركز الإعلامي' },
  ],
};

export const DEFAULT_MEDIA_SECTION = 'news';

export const MEDIA_TABS = [
  {
    id: 'news',
    to: '/media/news',
    label: 'الأخبار',
    icon: 'news',
  },
  {
    id: 'international-days',
    to: '/media/international-days',
    label: 'قائمة الأيام العالمية',
    icon: 'internationalDays',
  },
  {
    id: 'photos',
    to: '/media/photos',
    label: 'معرض الصور',
    icon: 'photos',
  },
  {
    id: 'videos',
    to: '/media/videos',
    label: 'معرض الفيديو',
    icon: 'videos',
  },
];

export const MEDIA_SECTIONS = {
  'international-days': {
    title: 'قائمة الأيام العالمية',
    icon: 'internationalDays',
    paragraphs: [
      'تُعد الأيام العالمية فرصة لتسليط الضوء على القضايا السكانية والصحية والتنموية، وتعزيز الوعي المجتمعي حول الأولويات الوطنية والدولية.',
      'يعمل المجلس على إحياء هذه المناسبات من خلال فعاليات توعوية وشراكات مع المؤسسات الحكومية وغير الحكومية، بما يسهم في نشر المعرفة وتعزيز التفاعل المجتمعي.',
    ],
  },
};
