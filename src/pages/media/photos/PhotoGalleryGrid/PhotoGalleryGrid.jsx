import { Link } from 'react-router-dom';
import { useTranslation } from '@/i18n/useTranslation.js';
import './PhotoGalleryGrid.css';

export default function PhotoGalleryGrid({ items }) {
  const { t } = useTranslation();

  if (!items.length) {
    return <p className="photo-gallery-grid__empty">{t('common.noPhotos')}</p>;
  }

  return (
    <div className="photo-gallery-grid">
      {items.map((item) => (
        <article key={item.id} className="photo-gallery-grid__card">
          <div className="photo-gallery-grid__image-wrap">
            <img src={item.image} alt="" className="photo-gallery-grid__image" loading="lazy" />
          </div>

          <div className="photo-gallery-grid__body">
            <h3 className="photo-gallery-grid__title">{item.title}</h3>
            <Link to={`/media/photos/${item.id}`} className="photo-gallery-grid__read-more">
              {t('common.readMore')}
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}