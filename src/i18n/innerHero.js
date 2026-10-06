import { translate } from './useTranslation.js';

export const INNER_HERO_BACKGROUND = '/inner-hero-image.png';

function homeBreadcrumb(lang) {
  return { label: translate(lang, 'common.home'), to: '/' };
}

/** Home + single current page (title from messages key). */
export function getSimpleInnerHeroMeta(lang, titleKey) {
  const title = translate(lang, titleKey);

  return {
    title,
    heroImage: INNER_HERO_BACKGROUND,
    breadcrumbs: [homeBreadcrumb(lang), { label: title }],
  };
}

/**
 * @param {string} lang
 * @param {Array<{ key?: string, label?: string, to?: string }>} segments
 */
export function buildHeroBreadcrumbs(lang, segments) {
  return segments.map((segment) => ({
    label: segment.label ?? translate(lang, segment.key),
    ...(segment.to != null ? { to: segment.to } : {}),
  }));
}

export function getInfoPageHeroMeta(lang, { titleKey, shareUrl }) {
  return {
    ...getSimpleInnerHeroMeta(lang, titleKey),
    shareUrl,
  };
}
