import { Navigate, useParams } from 'react-router-dom';
import AboutShareBar from '../about-us/AboutShareBar/AboutShareBar.jsx';
import InnerHero from '../about-us/InnerHero/InnerHero.jsx';
import MediaContent from './MediaContent/MediaContent.jsx';
import MediaTabs from './MediaTabs/MediaTabs.jsx';
import { DEFAULT_MEDIA_SECTION, MEDIA_PAGE, MEDIA_TABS } from './mediaData.js';
import './Media.css';

export default function Media() {
  const { section = DEFAULT_MEDIA_SECTION } = useParams();
  const isValidSection = MEDIA_TABS.some((tab) => tab.id === section);

  if (!isValidSection) {
    return <Navigate to={`/media/${DEFAULT_MEDIA_SECTION}`} replace />;
  }

  return (
    <div className="media-page">
      <InnerHero
        title={MEDIA_PAGE.title}
        breadcrumbs={MEDIA_PAGE.breadcrumbs}
        backgroundImage={MEDIA_PAGE.heroImage}
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
