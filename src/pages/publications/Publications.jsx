import { useMemo } from 'react';
import { useLanguage } from '@/hooks/useLanguage.js';
import { useTranslation } from '@/i18n/useTranslation.js';
import AboutShareBar from '../about-us/AboutShareBar/AboutShareBar.jsx';
import InnerHero from '../about-us/InnerHero/InnerHero.jsx';
import PublicationsCategories from './PublicationsCategories/PublicationsCategories.jsx';
import { getPublicationCategories, getPublicationsPageMeta } from './publicationsData.js';
import './Publications.css';

export default function Publications() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const pageMeta = useMemo(() => getPublicationsPageMeta(language), [language]);
  const categories = useMemo(() => getPublicationCategories(language), [language]);

  return (
    <div className="publications-page">
      <InnerHero
        title={pageMeta.title}
        breadcrumbs={pageMeta.breadcrumbs}
        backgroundImage={pageMeta.heroImage}
      />

      <PublicationsCategories categories={categories} />

      <div className="publications-page__share-wrap">
        <AboutShareBar shareUrl="/publications" ariaLabel={t('share.pageAria')} />
      </div>
    </div>
  );
}
