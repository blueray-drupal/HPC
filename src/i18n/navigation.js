import { FOOTER_PARTNER_LOGOS } from '@/components/layout/footerData.js';
import { getMessages, translate } from './useTranslation.js';

/** Header navigation with localized labels (routes stay the same). */
export function getHeaderNav(lang) {
  return [
    { to: '/', label: translate(lang, 'nav.home'), end: true },
    {
      to: '/about',
      label: translate(lang, 'nav.about'),
      children: [
        { to: '/about/establishment', label: translate(lang, 'nav.aboutEstablishment') },
        { to: '/about/vision', label: translate(lang, 'nav.aboutVision') },
        { to: '/about/strategy', label: translate(lang, 'nav.aboutStrategy') },
        { to: '/about/structure', label: translate(lang, 'nav.aboutStructure') },
        { to: '/about/council-duties', label: translate(lang, 'nav.aboutCouncilDuties') },
        { to: '/about/unit-duties', label: translate(lang, 'nav.aboutUnitDuties') },
      ],
    },
    { to: '/publications', label: translate(lang, 'nav.publications') },
    {
      to: '/programs',
      label: translate(lang, 'nav.programs'),
      children: [
        { to: '/programs/population-development', label: translate(lang, 'nav.programPopulation') },
        { to: '/programs/reproductive-health', label: translate(lang, 'nav.programReproductiveHealth') },
        { to: '/programs/advocacy', label: translate(lang, 'nav.programAdvocacy') },
      ],
    },
    {
      to: '/media',
      label: translate(lang, 'nav.media'),
      children: [
        { to: '/media/news', label: translate(lang, 'nav.mediaNews') },
        { to: '/media/international-days', label: translate(lang, 'nav.mediaInternationalDays') },
        { to: '/media/photos', label: translate(lang, 'nav.mediaPhotos') },
        { to: '/media/videos', label: translate(lang, 'nav.mediaVideos') },
      ],
    },
    { to: '/tenders', label: translate(lang, 'nav.tenders') },
    { to: '/contact', label: translate(lang, 'nav.contact') },
  ];
}

export function getPartnerTabs(lang) {
  return [
    {
      id: 'institutions',
      label: translate(lang, 'home.partners.tabInstitutions'),
      classification: 'mw_sst_wwzrt_dht_sl',
    },
    {
      id: 'partners',
      label: translate(lang, 'home.partners.tabPartners'),
      classification: 'shrkw_n',
    },
  ];
}

export function getProgramTabs(lang) {
  return [
    {
      id: 'population-development',
      to: '/programs/population-development',
      label: translate(lang, 'nav.programPopulation'),
      icon: 'population',
    },
    {
      id: 'reproductive-health',
      to: '/programs/reproductive-health',
      label: translate(lang, 'nav.programReproductiveHealth'),
      icon: 'health',
    },
    {
      id: 'advocacy',
      to: '/programs/advocacy',
      label: translate(lang, 'nav.programAdvocacy'),
      icon: 'advocacy',
    },
  ];
}

const MEDIA_SECTION_TITLE_KEYS = {
  news: 'nav.mediaNews',
  'international-days': 'nav.mediaInternationalDays',
  photos: 'nav.mediaPhotos',
  videos: 'nav.mediaVideos',
};

export function getMediaSectionTitle(lang, sectionId) {
  const key = MEDIA_SECTION_TITLE_KEYS[sectionId];
  return key ? translate(lang, key) : '';
}

export function getMediaTabs(lang) {
  return [
    { id: 'news', to: '/media/news', label: translate(lang, 'nav.mediaNews'), icon: 'news' },
    {
      id: 'international-days',
      to: '/media/international-days',
      label: translate(lang, 'nav.mediaInternationalDays'),
      icon: 'internationalDays',
    },
    { id: 'photos', to: '/media/photos', label: translate(lang, 'nav.mediaPhotos'), icon: 'photos' },
    { id: 'videos', to: '/media/videos', label: translate(lang, 'nav.mediaVideos'), icon: 'videos' },
  ];
}

export function getAboutTabs(lang) {
  return [
    { id: 'establishment', to: '/about/establishment', label: translate(lang, 'about.tabEstablishment'), icon: 'history' },
    { id: 'vision', to: '/about/vision', label: translate(lang, 'about.tabVision'), icon: 'eye' },
    { id: 'strategy', to: '/about/strategy', label: translate(lang, 'about.tabStrategy'), icon: 'strategy' },
    { id: 'structure', to: '/about/structure', label: translate(lang, 'about.tabStructure'), icon: 'structure' },
    { id: 'council-duties', to: '/about/council-duties', label: translate(lang, 'about.tabCouncilDuties'), icon: 'council' },
    { id: 'unit-duties', to: '/about/unit-duties', label: translate(lang, 'about.tabUnitDuties'), icon: 'units' },
  ];
}

export function getFooterTopLinks(lang) {
  return [
    { label: translate(lang, 'footer.employeeMail'), href: 'https://mail.hpc.org.jo' },
    { label: translate(lang, 'footer.usefulLinks'), to: '/useful-links' },
    { label: translate(lang, 'footer.faq'), to: '/faq' },
    { label: translate(lang, 'footer.codeOfConduct'), to: '/code-of-conduct' },
  ];
}

export function getFooterLegalLinks(lang) {
  return [
    { label: translate(lang, 'footer.disclaimer'), to: '/disclaimer' },
    { label: translate(lang, 'footer.terms'), to: '/terms' },
    { label: translate(lang, 'footer.privacy'), to: '/privacy' },
    { label: translate(lang, 'footer.copyrightPage'), to: '/copyright' },
  ];
}

export function getContactFieldLabels(lang) {
  return {
    address: translate(lang, 'contact.address'),
    phone: translate(lang, 'contact.phone'),
    fax: translate(lang, 'contact.fax'),
    email: translate(lang, 'contact.email'),
  };
}

export function getFooterAddressLines(lang) {
  return getMessages(lang).footer.addressLines || [];
}

export function getFooterSiteInfo(lang) {
  return getMessages(lang).footer.siteInfo || [];
}

export function getFooterPartnerLogos(lang) {
  const partnerNames = getMessages(lang).footer.partners || {};

  return FOOTER_PARTNER_LOGOS.map((logo) => ({
    ...logo,
    name: partnerNames[logo.id] || logo.name,
  }));
}
