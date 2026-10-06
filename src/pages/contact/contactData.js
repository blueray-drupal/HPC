import { translate } from '@/i18n/useTranslation.js';
import { getContactFieldLabels } from '@/i18n/navigation.js';

export const CONTACT_PAGE = {
  title: 'اتصل بنا',
  heroImage: '/inner-hero-image.png',
  breadcrumbs: [
    { label: 'الرئيسية', to: '/' },
    { label: 'اتصل بنا' },
  ],
};

export function getContactPageMeta(lang) {
  return {
    title: translate(lang, 'contact.pageTitle'),
    heroImage: '/inner-hero-image.png',
    breadcrumbs: [
      { label: translate(lang, 'common.home'), to: '/' },
      { label: translate(lang, 'contact.pageTitle') },
    ],
  };
}

export const CONTACT_INFO_ITEMS = [
  {
    id: 'address',
    title: 'العنوان',
    value: 'عمان، شارع مكة، مقابل البوابة الخلفية للصندوق الأردني الهاشمي للتنمية البشرية.',
    icon: 'location',
  },
  {
    id: 'phone',
    title: 'الهاتف',
    value: '(+962 6) 5560748',
    href: 'tel:+96265560748',
    icon: 'phone',
  },
  {
    id: 'fax',
    title: 'الفاكس',
    value: '(+962 6) 5519210',
    icon: 'fax',
  },
  {
    id: 'email',
    title: 'البريد الإلكتروني',
    value: 'HPC@hpc.org.jo',
    href: 'mailto:HPC@hpc.org.jo',
    icon: 'email',
  },
];

export const CONTACT_MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3384.0!2d35.876!3d31.953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDU3JzEwLjgiTiAzNcKwNTInMzMuNiJF!5e0!3m2!1sen!2sjo!4v1700000000000!5m2!1sen!2sjo';

export const CONTACT_FALLBACK = {
  infoItems: CONTACT_INFO_ITEMS,
  mapHtml: `<iframe title="موقع المجلس الأعلى للسكان على الخريطة" src="${CONTACT_MAP_EMBED_URL}" class="contact-page__map-frame" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>`,
};

export function getContactFallback(lang) {
  const labels = getContactFieldLabels(lang);
  const mapTitle = translate(lang, 'contact.mapTitle');

  return {
    infoItems: CONTACT_INFO_ITEMS.map((item) => ({
      ...item,
      title: labels[item.id] || item.title,
      value: item.id === 'address' ? translate(lang, 'contact.addressValue') : item.value,
    })),
    mapHtml: `<iframe title="${mapTitle}" src="${CONTACT_MAP_EMBED_URL}" class="contact-page__map-frame" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>`,
  };
}
