import { SECRETARY_MESSAGE } from '@/pages/home/SecretaryMessage/secretaryMessageData.js';
import { isDefaultSiteLanguage } from './languageContent.js';

export const SECRETARY_MESSAGE_ABOUT_PATH = '/about/secretary-message';

export function mergeSecretaryMessage(message, language) {
  const useStatic = isDefaultSiteLanguage(language);

  if (!message) {
    return useStatic ? { ...SECRETARY_MESSAGE, ctaLink: SECRETARY_MESSAGE_ABOUT_PATH } : null;
  }

  const base = useStatic ? SECRETARY_MESSAGE : {};

  return {
    eyebrow: message.eyebrow || base.eyebrow || '',
    titleLine1: message.titleLine1 || base.titleLine1 || '',
    titleLine2: message.titleLine2 || base.titleLine2 || '',
    body: message.body || base.body || '',
    name: message.name || base.name || '',
    ctaLabel: base.ctaLabel || SECRETARY_MESSAGE.ctaLabel,
    ctaLink: SECRETARY_MESSAGE_ABOUT_PATH,
    image: message.image || base.image || '',
    imageAlt: message.imageAlt || base.imageAlt || '',
  };
}

export function mergeSecretaryAboutSection(sections, message, language) {
  const staticSection = sections?.['secretary-message'];
  const content = mergeSecretaryMessage(message, language);
  const bodyHtml = message?.bodyHtml?.trim() || '';

  if (!staticSection && !content && !bodyHtml) {
    return sections;
  }

  const base = staticSection || {
    title: 'كلمة الأمين العام',
    icon: 'message',
    image: '',
    imageAlt: '',
    paragraphs: [],
    secretaryName: '',
    showShareBar: true,
  };

  const paragraphs =
    bodyHtml || !content?.body
      ? base.paragraphs?.length
        ? base.paragraphs
        : content?.body
          ? [content.body]
          : []
      : [content.body];

  return {
    ...sections,
    'secretary-message': {
      ...base,
      icon: 'message',
      image: content?.image ?? base.image,
      imageAlt: content?.imageAlt ?? base.imageAlt,
      bodyHtml,
      paragraphs,
      secretaryName: content?.name || base.secretaryName || '',
      showShareBar: base.showShareBar ?? true,
    },
  };
}
