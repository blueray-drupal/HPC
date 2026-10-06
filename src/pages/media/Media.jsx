import { useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage.js';
import { getSimpleInnerHeroMeta } from '@/i18n/innerHero.js';
import { getMediaTabs } from '@/i18n/navigation.js';
import AboutShareBar from '../about-us/AboutShareBar/AboutShareBar.jsx';
import InnerHero from '../about-us/InnerHero/InnerHero.jsx';
import MediaContent from './MediaContent/MediaContent.jsx';
import MediaTabs from './MediaTabs/MediaTabs.jsx';
import { DEFAULT_MEDIA_SECTION } from './mediaData.js';
import './Media.css';

export default function Media() {
  const { language } = useLanguage();
  const hero = useMemo(() => getSimpleInnerHeroMeta(language, 'nav.media'), [language]);
  const mediaTabs = useMemo(() => getMediaTabs(language), [language]);
  const { section = DEFAULT_MEDIA_SECTION } = useParams();
  const isValidSection = mediaTabs.some((tab) => tab.id === section);

  if (!isValidSection) {
    return <Navigate to={`/media/${DEFAULT_MEDIA_SECTION}`} replace />;
  }

  return (
    <div className="media-page">
      <InnerHero
        title={hero.title}
        breadcrumbs={hero.breadcrumbs}
        backgroundImage={hero.heroImage}
      />

      <div className="media-page__body">
        <MediaTabs />
        <div className="media-page__panel">
          <MediaContent sectionId={section} />
        </div>
      </div>

      <div className="media-page__share-wrap">
        <AboutShareBar />
      </div>
    </div>
  );
}
