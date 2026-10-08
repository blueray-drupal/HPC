import { useLanguage } from '@/hooks/useLanguage.js';
import { useDrupalFetch } from '@/hooks/useDrupalFetch.js';
import { getMediaSectionTitle } from '@/i18n/navigation.js';
import { fetchPhotoGallery } from '@/services/api/photoVideoGallery.js';
import { localizedStaticFallback } from '@/services/api/languageContent.js';
import { MediaSectionHeaderIcon } from '../../MediaTabs/MediaTabIcons.jsx';
import PhotoGalleryGrid from '../PhotoGalleryGrid/PhotoGalleryGrid.jsx';
import { PHOTO_GALLERY_ITEMS } from '../photosListData.js';
import './PhotosContent.css';

export default function PhotosContent() {
  const { language } = useLanguage();
  const sectionTitle = getMediaSectionTitle(language, 'photos');
  const { data, loading } = useDrupalFetch((lang) =>
    fetchPhotoGallery(lang, localizedStaticFallback(lang, PHOTO_GALLERY_ITEMS) ?? []),
  );
  const items = data ?? localizedStaticFallback(language, PHOTO_GALLERY_ITEMS) ?? [];

  return (
    <section className="photos-content" aria-labelledby="photos-section-title">
      <div className="photos-content__inner">
        <header className="photos-content__header">
          <div className="photos-content__header-row">
            <MediaSectionHeaderIcon name="photos" />
            <h2 id="photos-section-title" className="photos-content__title">
              {sectionTitle}
            </h2>
          </div>
          <span className="photos-content__header-line" aria-hidden="true" />
        </header>

        {!loading ? <PhotoGalleryGrid items={items} /> : null}
      </div>
    </section>
  );
}
