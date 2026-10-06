import { useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage.js';
import { useTranslation } from '@/i18n/useTranslation.js';
import AboutShareBar from '../about-us/AboutShareBar/AboutShareBar.jsx';
import InnerHero from '../about-us/InnerHero/InnerHero.jsx';
import PublicationCategoryContent from './PublicationCategoryContent/PublicationCategoryContent.jsx';
import PublicationTabs from './PublicationTabs/PublicationTabs.jsx';
import { getPublicationCategoryBySlug, getPublicationsPageMeta } from './publicationsData.js';
import './Publications.css';

export default function PublicationCategory() {
  const { categorySlug } = useParams();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const pageMeta = useMemo(() => getPublicationsPageMeta(language), [language]);
  const category = useMemo(
    () => getPublicationCategoryBySlug(categorySlug, language),
    [categorySlug, language],
  );

  if (!category) {
    return <Navigate to="/publications" replace />;
  }

  return (
    <div className="publications-page">
      <InnerHero
        title={pageMeta.title}
        breadcrumbs={pageMeta.breadcrumbs}
        backgroundImage={pageMeta.heroImage}
      />

      <PublicationTabs />

      <PublicationCategoryContent category={category} />

      <div className="publications-page__share-wrap">
        <AboutShareBar shareUrl={category.to} ariaLabel={t('share.pageAria')} />
      </div>
    </div>
  );
}
