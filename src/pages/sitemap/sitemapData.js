import {
  BookOpen,
  Briefcase,
  FileText,
  Home,
  Info,
  Phone,
  Settings,
  TrendingUp,
} from 'lucide-react';

export const SITEMAP_HERO_IMAGE =
  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';

export const SITEMAP_SECTIONS = [
  {
    id: 'home',
    to: '/',
    label: 'الرئيسية',
    Icon: Home,
    children: [],
  },
  {
    id: 'about',
    to: '/about',
    label: 'عن الصندوق',
    Icon: Info,
    children: [
      { to: '/about#overview', label: 'من نحن' },
      { to: '/about#vision', label: 'الرؤية والرسالة' },
      { to: '/about#structure', label: 'الهيكل التنظيمي' },
      { to: '/about#board', label: 'مجلس الإدارة' },
      { to: '/about#director', label: 'الإدارة التنفيذية' },
    ],
  },
  {
    id: 'financing',
    to: '/financing',
    label: 'تمويل واستثمار',
    Icon: TrendingUp,
    children: [
      { to: '/financing#products', label: 'تمويل المركبات' },
      { to: '/financing#products', label: 'تمويل العقارات السكنية' },
      { to: '/financing#products', label: 'مواد البناء والتشطيبات' },
      { to: '/financing#calculator', label: 'حاسبة التمويل' },
    ],
  },
  {
    id: 'hajj-savings',
    to: '/hajj-savings',
    label: 'الحج والإدخار',
    Icon: BookOpen,
    children: [
      { to: '/hajj-savings#overview', label: 'برامج الادخار' },
      { to: '/e-services#register', label: 'التسجيل للحج' },
      { to: '/e-services#inquiry', label: 'الاستعلام عن الرصيد' },
      { to: '/hajj-savings#subscribe', label: 'آلية الادخار' },
    ],
  },
  {
    id: 'e-services',
    to: '/e-services',
    label: 'الخدمات الإلكترونية',
    Icon: Settings,
    children: [
      { to: '/e-services#register', label: 'تسجيل حساب جديد' },
      { to: '/e-services#register', label: 'تسجيل الدخول' },
      { to: '/e-services#inquiry', label: 'الاستعلام عن طلب' },
      { to: '/hajj-savings#faq', label: 'الأسئلة الشائعة' },
    ],
  },
  {
    id: 'media-center',
    to: '/media-center',
    label: 'المركز الإعلامي',
    Icon: FileText,
    children: [
      { to: '/media-center#news', label: 'الأخبار' },
      { to: '/media-center#news', label: 'البيانات الصحفية' },
      { to: '/annual-report', label: 'التقارير السنوية' },
      { to: '/media-center#photos', label: 'المعرض الإعلامي' },
    ],
  },
  {
    id: 'tenders',
    to: '/tenders',
    label: 'العطاءات',
    Icon: Briefcase,
    children: [],
  },
  {
    id: 'jobs',
    to: '/jobs',
    label: 'الوظائف',
    Icon: Briefcase,
    children: [],
  },
  {
    id: 'contact',
    to: '/contact',
    label: 'اتصل بنا',
    Icon: Phone,
    children: [
      { to: '/contact', label: 'معلومات الاتصال' },
      { to: '/contact', label: 'نموذج التواصل' },
      { to: '/contact', label: 'موقعنا على الخريطة' },
    ],
  },
];
