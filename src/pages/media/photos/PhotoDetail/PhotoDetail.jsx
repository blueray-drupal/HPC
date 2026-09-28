import { useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useDrupalFetch } from '@/hooks/useDrupalFetch.js';
import { fetchPhotoGalleryItem } from '@/services/api/photoVideoGallery.js';
import AboutShareBar from '../../../about-us/AboutShareBar/AboutShareBar.jsx';
import InnerHero from '../../../about-us/InnerHero/InnerHero.jsx';
import { MEDIA_PAGE } from '../../mediaData.js';
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
  const fallbackAlbum = useMemo(() => getPhotoById(id), [id]);
  const { data: album, loading } = useDrupalFetch(
    (lang) => fetchPhotoGalleryItem(lang, id, fallbackAlbum),
    [id],
  );

  if (loading) {
    return null;
  }

  const resolvedAlbum = album ?? fallbackAlbum;

  if (!resolvedAlbum) {
    return <Navigate to="/media/photos" replace />;
  }

  return (
    <div className="photo-detail-page">
      <InnerHero
        title={MEDIA_PAGE.title}
        breadcrumbs={[
          { label: 'الرئيسية', to: '/' },
          { label: MEDIA_PAGE.title, to: '/media/photos' },
          { label: 'معرض الصور', to: '/media/photos' },
          { label: resolvedAlbum.title },
        ]}
        backgroundImage={MEDIA_PAGE.heroImage}
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
