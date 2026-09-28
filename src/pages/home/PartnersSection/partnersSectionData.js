export const PARTNER_TABS = [
  {
    id: 'institutions',
    label: 'مؤسسات ووزارات ذات صلة',
    classification: 'mw_sst_wwzrt_dht_sl',
  },
  {
    id: 'partners',
    label: 'شركاؤنا',
    classification: 'shrkw_n',
  },
];

export const INSTITUTIONS = [
  {
    id: 1,
    name: 'وزارة الصحة',
    logo: '/home/partners/moh.svg',
    link: 'https://moh.gov.jo',
  },
  {
    id: 2,
    name: 'وزارة الخارجية وشؤون المغتربين',
    logo: '/home/partners/mfa.svg',
    link: 'https://mfa.gov.jo',
  },
  {
    id: 3,
    name: 'وزارة التربية والتعليم',
    logo: '/home/partners/moe.svg',
    link: 'https://moe.gov.jo',
  },
  {
    id: 4,
    name: 'وزارة التنمية الاجتماعية',
    logo: '/home/partners/mosd.svg',
    link: 'https://mosd.gov.jo',
  },
  {
    id: 5,
    name: 'دائرة الإحصاءات العامة',
    logo: '/home/partners/dos.svg',
    link: 'https://dos.gov.jo',
  },
  {
    id: 6,
    name: 'المجلس الأعلى للشباب',
    logo: '/home/partners/youth.svg',
    link: 'https://youth.gov.jo',
  },
  {
    id: 7,
    name: 'صندوق الأمم المتحدة للسكان UNFPA',
    logo: '/home/partners/unfpa.svg',
    link: 'https://www.unfpa.org',
  },
  {
    id: 8,
    name: 'منظمة الأمم المتحدة للطفولة UNICEF',
    logo: '/home/partners/unicef.svg',
    link: 'https://www.unicef.org',
  },
];

export const PARTNERS = [
  {
    id: 1,
    name: 'Pathfinder International',
    logo: '/home/partners/pathfinder.svg',
    link: 'https://www.pathfinder.org',
  },
  {
    id: 2,
    name: 'Share-Net International',
    logo: '/home/partners/sharenet-intl.svg',
    link: 'https://share-netinternational.org',
  },
  {
    id: 3,
    name: 'GAGE ODI',
    logo: '/home/partners/gage.svg',
    link: 'https://gage.odi.org',
  },
  {
    id: 4,
    name: 'UN Women',
    logo: '/home/partners/unwomen.svg',
    link: 'https://www.unwomen.org',
  },
  {
    id: 5,
    name: 'WHO',
    logo: '/home/partners/who.svg',
    link: 'https://www.who.int',
  },
  {
    id: 6,
    name: 'USAID',
    logo: '/home/partners/usaid.svg',
    link: 'https://www.usaid.gov',
  },
];

export const PARTNERS_BY_TAB_FALLBACK = {
  institutions: INSTITUTIONS,
  partners: PARTNERS,
};
