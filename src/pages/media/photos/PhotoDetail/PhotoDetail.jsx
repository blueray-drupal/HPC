import { useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useDrupalFetch } from '@/hooks/useDrupalFetch.js';
import { useLanguage } from '@/hooks/useLanguage.js';
import { buildHeroBreadcrumbs, INNER_HERO_BACKGROUND } from '@/i18n/innerHero.js';
import { translate } from '@/i18n/useTranslation.js';
import { fetchPhotoGalleryItem } from '@/services/api/photoVideoGallery.js';
import { localizedStaticFallback } from '@/services/api/languageContent.js';
import AboutShareBar from '../../../about-us/AboutShareBar/AboutShareBar.jsx';
import InnerHero from '../../../about-us/InnerHero/InnerHero.jsx';
import PhotoGalleryViewer from '../PhotoGalleryViewer/PhotoGalleryViewer.jsx';
import { getPhotoById } from '../photosListData.js';
import './PhotoDetail.css';

function BackArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
      <path
        d="M2.62969 6.1875L6.47969 10.0375L5.5 11L0 5.5L5.5 0L6.47969 0.9625L2.62969 4.8125H11V6.1875H2.62969Z"
        fill="#F3F9FF"
      />
    </svg>
  );
}

export default function PhotoDetail() {
  const { id } = useParams();
  const { language } = useLanguage();
  const fallbackAlbum = useMemo(
    () => localizedStaticFallback(language, getPhotoById(id)),
    [id, language],
  );
  const { data: album, loading } = useDrupalFetch(
    (lang) => fetchPhotoGalleryItem(lang, id, fallbackAlbum),
    [id, fallbackAlbum],
  );

  const resolvedAlbum = album ?? fallbackAlbum;
  const heroTitle = translate(language, 'nav.media');
  const heroBreadcrumbs = useMemo(
    () =>
      resolvedAlbum
        ? buildHeroBreadcrumbs(language, [
            { key: 'common.home', to: '/' },
            { key: 'nav.media', to: '/media/photos' },
            { key: 'nav.mediaPhotos', to: '/media/photos' },
            { label: resolvedAlbum.title },
          ])
        : [],
    [language, resolvedAlbum],
  );

  if (loading) {
    return null;
  }

  if (!resolvedAlbum) {
    return <Navigate to="/media/photos" replace />;
  }

  return (
    <div className="photo-detail-page">
      <InnerHero
        title={heroTitle}
        breadcrumbs={heroBreadcrumbs}
        backgroundImage={INNER_HERO_BACKGROUND}
      />

      <div className="photo-detail-page__content">
        <article className="photo-detail__box">
          <header className="photo-detail__header">
            <span className="photo-detail__tag">معرض الصور</span>
            <h1 className="photo-detail__title">{resolvedAlbum.detailTitle}</h1>
          </header>

          <PhotoGalleryViewer images={resolvedAlbum.images} />
        </article>

        <Link to="/media/photos" className="photo-detail__back">
          <span>الرجوع إلى معرض الصور</span>
          <BackArrowIcon />
        </Link>
      </div>

      <div className="photo-detail-page__share-wrap">
        <AboutShareBar shareUrl={`/media/photos/${resolvedAlbum.id}`} />
      </div>
    </div>
  );
}
