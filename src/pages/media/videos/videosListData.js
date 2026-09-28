export const VIDEOS_PER_PAGE = 12;

const VIDEO_TITLES = [
  'ورشة عمل الشباب',
  'توقيع اتفاقيات الشراكة',
  'المؤتمر السكاني الأول',
];

const VIDEO_SAMPLES = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
];

export const VIDEO_GALLERY_ITEMS = Array.from({ length: 60 }, (_, index) => {
  const titleIndex = index % VIDEO_TITLES.length;
  const pageGroup = Math.floor(index / VIDEOS_PER_PAGE) + 1;

  return {
    id: index + 1,
    title: VIDEO_TITLES[titleIndex],
    image: `https://picsum.photos/seed/hpc-video-${pageGroup}-${titleIndex + 1}/588/330`,
    videoUrl: VIDEO_SAMPLES[titleIndex],
  };
});

export function paginateVideos(items, currentPage, perPage = VIDEOS_PER_PAGE) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const start = (safePage - 1) * perPage;

  return {
    items: items.slice(start, start + perPage),
    currentPage: safePage,
    totalPages,
  };
}
