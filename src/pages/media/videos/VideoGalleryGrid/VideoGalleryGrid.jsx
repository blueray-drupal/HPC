import { useState } from 'react';
import { useTranslation } from '@/i18n/useTranslation.js';
import VideoPopupModal from '../VideoPopupModal/VideoPopupModal.jsx';
import VideoGalleryCard from './VideoGalleryCard.jsx';
import './VideoGalleryGrid.css';

export default function VideoGalleryGrid({ items }) {
  const { t } = useTranslation();
  const [activeVideo, setActiveVideo] = useState(null);

  if (!items.length) {
    return <p className="video-gallery-grid__empty">{t('media.videos.empty')}</p>;
  }

  return (
    <>
      <div className="video-gallery-grid">
        {items.map((item) => (
          <VideoGalleryCard key={item.id} item={item} onPlay={setActiveVideo} />
        ))}
      </div>

      <VideoPopupModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </>
  );
}
