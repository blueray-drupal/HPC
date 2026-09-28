export const SOCIAL_LINKS = [
  { name: 'Facebook', href: 'https://www.facebook.com/' },
  { name: 'X', href: 'https://x.com/' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { name: 'YouTube', href: 'https://www.youtube.com/' },
];

export const HEADER_NAV = [
  { to: '/', label: 'الرئيسية', end: true },
  {
    to: '/about',
    label: 'عن المجلس',
    children: [
      { to: '/about/establishment', label: 'النشأة والتأسيس' },
      { to: '/about/vision', label: 'الرؤيا والرسالة والقيم' },
      { to: '/about/strategy', label: 'الخطة والأهداف الإستراتيجية' },
      { to: '/about/structure', label: 'الهيكل التنظيمي للأمانة العامة' },
      { to: '/about/council-duties', label: 'مهام المجلس' },
      { to: '/about/unit-duties', label: 'مهام الوحدات' },
    ],
  },
  { to: '/publications', label: 'الإصدارات' },
  {
    to: '/programs',
    label: 'البرامج',
    children: [
      { to: '/programs/population-development', label: 'برنامج السكان والتنمية' },
      { to: '/programs/reproductive-health', label: 'برنامج الصحة الإنجابية' },
      { to: '/programs/advocacy', label: 'حشد التأييد' },
    ],
  },
  {
    to: '/media',
    label: 'المركز الإعلامي',
    children: [
      { to: '/media/news', label: 'الأخبار' },
      { to: '/media/international-days', label: 'قائمة الأيام العالمية' },
      { to: '/media/photos', label: 'معرض الصور' },
      { to: '/media/videos', label: 'معرض الفيديو' },
    ],
  },
  { to: '/tenders', label: 'العطاءات' },
  { to: '/contact', label: 'اتصل بنا' },
];
