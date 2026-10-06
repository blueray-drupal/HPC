import NewsContent from '../news/NewsContent/NewsContent.jsx';
import InternationalDaysContent from '../international-days/InternationalDaysContent/InternationalDaysContent.jsx';
import PhotosContent from '../photos/PhotosContent/PhotosContent.jsx';
import VideosContent from '../videos/VideosContent/VideosContent.jsx';
import MediaSection from '../MediaSection/MediaSection.jsx';
import { MEDIA_SECTIONS } from '../mediaData.js';

export default function MediaContent({ sectionId }) {
  if (sectionId === 'news') {
    return <NewsContent />;
  }

  if (sectionId === 'international-days') {
    return <InternationalDaysContent />;
  }

  if (sectionId === 'photos') {
    return <PhotosContent />;
  }

  if (sectionId === 'videos') {
    return <VideosContent />;
  }

  const section = MEDIA_SECTIONS[sectionId];

  if (!section) return null;

  return <MediaSection section={section} sectionId={sectionId} />;
}
