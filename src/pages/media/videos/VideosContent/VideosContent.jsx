import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage.js';
import { useDrupalFetch } from '@/hooks/useDrupalFetch.js';
import { getMediaSectionTitle } from '@/i18n/navigation.js';
import { fetchVideoGallery } from '@/services/api/photoVideoGallery.js';
import PublicationsPagination from '../../../publications/PublicationsPagination/PublicationsPagination.jsx';
import { MediaSectionHeaderIcon } from '../../MediaTabs/MediaTabIcons.jsx';
import VideoGalleryGrid from '../VideoGalleryGrid/VideoGalleryGrid.jsx';
import { paginateVideos, VIDEO_GALLERY_ITEMS } from '../videosListData.js';
import './VideosContent.css';

export default function VideosContent() {
  const { language } = useLanguage();
  const sectionTitle = getMediaSectionTitle(language, 'videos');
  const { data, loading } = useDrupalFetch((lang) => fetchVideoGallery(lang, VIDEO_GALLERY_ITEMS));
  const items = data ?? VIDEO_GALLERY_ITEMS;
  const [currentPage, setCurrentPage] = useState(1);

  const pagination = useMemo(
    () => paginateVideos(items, currentPage),
    [items, currentPage],
  );

  useEffect(() => {
    if (currentPage > pagination.totalPages) {
      setCurrentPage(pagination.totalPages);
    }
  }, [currentPage, pagination.totalPages]);

  return (
    <section className="videos-content" aria-labelledby="videos-section-title">
      <div className="videos-content__inner">
        <header className="videos-content__header">
          <div className="videos-content__header-row">
            <MediaSectionHeaderIcon name="videos" />
            <h2 id="videos-section-title" className="videos-content__title">
              {sectionTitle}
            </h2>
          </div>
          <span className="videos-content__header-line" aria-hidden="true" />
        </header>

        {!loading ? (
          <>
            <VideoGalleryGrid items={pagination.items} />

            <PublicationsPagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : null}
      </div>
    </section>
  );
}
