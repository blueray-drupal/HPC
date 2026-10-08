import { useTranslation } from '@/i18n/useTranslation.js';
import { useVideoPoster } from '../useVideoPoster.js';
import './VideoGalleryGrid.css';

function PlayIcon() {
  return (
    <span className="video-gallery-grid__play" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="38" height="27" viewBox="0 0 38 27" fill="none">
        <path
          d="M15.2 19L25.061 13.3L15.2 7.6V19ZM37.164 4.123C37.411 5.016 37.582 6.213 37.696 7.733C37.829 9.253 37.886 10.564 37.886 11.704L38 13.3C38 17.461 37.696 20.52 37.164 22.477C36.689 24.187 35.587 25.289 33.877 25.764C32.984 26.011 31.35 26.182 28.842 26.296C26.372 26.429 24.111 26.486 22.021 26.486L19 26.6C11.039 26.6 6.08 26.296 4.123 25.764C2.413 25.289 1.311 24.187 0.836 22.477C0.589 21.584 0.418 20.387 0.304 18.867C0.171 17.347 0.114 16.036 0.114 14.896L0 13.3C0 9.139 0.304 6.08 0.836 4.123C1.311 2.413 2.413 1.311 4.123 0.836C5.016 0.589 6.65 0.418 9.158 0.304C11.628 0.171 13.889 0.114 15.979 0.114L19 0C26.961 0 31.92 0.304 33.877 0.836C35.587 1.311 36.689 2.413 37.164 4.123Z"
          fill="white"
        />
      </svg>
    </span>
  );
}

export default function VideoGalleryCard({ item, onPlay }) {
  const { t } = useTranslation();
  const { wrapRef, posterUrl, showPlaceholder, onPosterError } = useVideoPoster(item);

  return (
    <article className="video-gallery-grid__card">
      <button
        type="button"
        className="video-gallery-grid__link"
        onClick={() => onPlay(item)}
        aria-label={t('media.videos.playAria').replace('{title}', item.title)}
      >
        <div className="video-gallery-grid__image-wrap" ref={wrapRef}>
          {showPlaceholder ? (
            <div className="video-gallery-grid__placeholder">
              <p className="video-gallery-grid__placeholder-title">{item.title}</p>
            </div>
          ) : (
            <img
              src={posterUrl}
              alt=""
              className="video-gallery-grid__image"
              loading="lazy"
              decoding="async"
              onError={onPosterError}
            />
          )}
          <PlayIcon />
        </div>

        <div className="video-gallery-grid__body">
          <h3 className="video-gallery-grid__title">{item.title}</h3>
        </div>
      </button>
    </article>
  );
}
