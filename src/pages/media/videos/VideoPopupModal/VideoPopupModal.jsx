import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MODAL_ANIMATION_MS, useModalAnimation, useModalBodyLock } from '../../../../hooks/useModalAnimation.js';
import './VideoPopupModal.css';

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function isEmbedVideo(url) {
  return /youtube\.com|youtu\.be|vimeo\.com/.test(url);
}

function getEmbedSrc(url) {
  if (url.includes('embed')) return url;

  const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1`;
  }

  return url;
}

export default function VideoPopupModal({ video, onClose }) {
  const closeButtonRef = useRef(null);
  const { mounted, visible } = useModalAnimation(Boolean(video));
  useModalBodyLock(mounted, onClose);

  useEffect(() => {
    if (!mounted) return undefined;

    const timer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, MODAL_ANIMATION_MS);

    return () => window.clearTimeout(timer);
  }, [mounted]);

  if (!mounted || !video) return null;

  const embedVideo = isEmbedVideo(video.videoUrl);

  return createPortal(
    <div
      className={[
        'video-popup__backdrop',
        'modal-backdrop',
        visible ? 'modal-backdrop-visible' : 'modal-backdrop-hidden',
      ].join(' ')}
      onClick={onClose}
    >
      <div
        className={[
          'video-popup',
          'modal-panel',
          visible ? 'modal-panel-visible' : 'modal-panel-hidden',
        ].join(' ')}
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-popup-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="video-popup__header">
          <h2 id="video-popup-title" className="video-popup__title">
            {video.title}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            className="video-popup__close"
            aria-label="إغلاق"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="video-popup__player">
          {embedVideo ? (
            <iframe
              src={getEmbedSrc(video.videoUrl)}
              title={video.title}
              className="video-popup__iframe"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video src={video.videoUrl} className="video-popup__video" controls autoPlay playsInline />
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
