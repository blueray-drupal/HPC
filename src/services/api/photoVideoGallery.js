import { getNode, getNodes } from './drupalApi.js';
import {
  resolveNodeImageUrl,
  resolveNodeMediaAsset,
  resolveNodeMediaImageUrls,
} from './jsonApiHelpers.js';

const CONTENT_TYPE = 'photo_and_video_gallery';
const INCLUDE = [
  'field_images',
  'field_images.field_media_image',
  'field_media_file',
  'field_media_file.field_media_image',
  'field_media_file.field_media_video_file',
  'field_cover_image_for_video',
  'field_cover_image_for_video.field_media_image',
];

const CATEGORY_TO_TYPE = {
  photo: 'photos',
  photos: 'photos',
  swr: 'photos',
  alswr: 'photos',
  images: 'photos',
  mgallery_swr: 'photos',
  video: 'videos',
  videos: 'videos',
  video_section: 'videos',
  fldyw: 'videos',
  alfldyw: 'videos',
  fdyw: 'videos',
};

function mapCategoryToMediaType(category) {
  const key = String(category || '').trim().toLowerCase();
  if (!key) return null;

  if (CATEGORY_TO_TYPE[key]) {
    return CATEGORY_TO_TYPE[key];
  }

  if (key.includes('swr') || key.includes('photo') || key.includes('image') || key.includes('صور')) {
    return 'photos';
  }

  if (key.includes('fldyw') || key.includes('fdyw') || key.includes('video') || key.includes('فيد')) {
    return 'videos';
  }

  return null;
}

export function mapPhotoGalleryNode(node, included = []) {
  const galleryImages = resolveNodeMediaImageUrls(node, 'field_images', included);
  const mediaAsset = resolveNodeMediaAsset(node, 'field_media_file', included);
  const coverImage = mediaAsset?.type === 'image' ? mediaAsset.url : '';
  const title = node.attributes?.title || '';

  if (!coverImage && !galleryImages.length && !title) return null;

  const images = [];
  if (coverImage) {
    images.push(coverImage);
  }
  galleryImages.forEach((url) => {
    if (!images.includes(url)) {
      images.push(url);
    }
  });

  return {
    id: node.id,
    nid: node.attributes?.drupal_internal__nid,
    title,
    detailTitle: title,
    image: coverImage || galleryImages[0] || '',
    images,
  };
}

export function mapVideoGalleryNode(node, included = []) {
  const coverImage = resolveNodeImageUrl(node, 'field_cover_image_for_video', included);
  const mediaAsset = resolveNodeMediaAsset(node, 'field_media_file', included);
  const title = node.attributes?.title || '';

  const videoUrl =
    mediaAsset?.type === 'video' || mediaAsset?.type === 'remote_video' ? mediaAsset.url : null;

  if (!videoUrl && !title) return null;

  return {
    id: node.id,
    nid: node.attributes?.drupal_internal__nid,
    title,
    image: coverImage || mediaAsset?.thumbnail || '',
    videoUrl: videoUrl || '#',
  };
}

async function fetchGalleryNodes(language) {
  const baseOptions = {
    include: INCLUDE,
    sort: '-created',
    limit: 100,
  };

  const extractNodes = (response) => {
    const nodes = Array.isArray(response?.data) ? response.data : response?.data ? [response.data] : [];
    const included = response?.included || [];
    return { nodes, included };
  };

  if (language) {
    try {
      const localized = await getNodes(CONTENT_TYPE, {
        ...baseOptions,
        lang: language,
        filters: { 'filter[langcode]': language },
      });
      const localizedResult = extractNodes(localized);
      if (localizedResult.nodes.length) return localizedResult;
    } catch {
      // fall through to default language fetch
    }
  }

  const response = await getNodes(CONTENT_TYPE, {
    ...baseOptions,
    lang: language,
  });

  return extractNodes(response);
}

function splitGalleryItems(nodes, included) {
  const photos = [];
  const videos = [];

  nodes.forEach((node) => {
    const category = node.attributes?.field_media_category ?? node.attributes?.field_category ?? '';
    const mediaType = mapCategoryToMediaType(category);

    if (mediaType === 'videos') {
      const video = mapVideoGalleryNode(node, included);
      if (video?.videoUrl && video.videoUrl !== '#') {
        videos.push(video);
      }
      return;
    }

    if (mediaType === 'photos') {
      const photo = mapPhotoGalleryNode(node, included);
      if (photo?.image || photo?.images?.length) {
        photos.push(photo);
      }
      return;
    }

    const video = mapVideoGalleryNode(node, included);
    if (video?.videoUrl && video.videoUrl !== '#') {
      videos.push(video);
      return;
    }

    const photo = mapPhotoGalleryNode(node, included);
    if (photo?.image || photo?.images?.length) {
      photos.push(photo);
    }
  });

  return { photos, videos };
}

export async function fetchPhotoGallery(language, fallbackItems = []) {
  try {
    const { nodes, included } = await fetchGalleryNodes(language);
    const { photos } = splitGalleryItems(nodes, included);
    return photos.length ? photos : fallbackItems;
  } catch {
    return fallbackItems;
  }
}

export async function fetchVideoGallery(language, fallbackItems = []) {
  try {
    const { nodes, included } = await fetchGalleryNodes(language);
    const { videos } = splitGalleryItems(nodes, included);
    return videos.length ? videos : fallbackItems;
  } catch {
    return fallbackItems;
  }
}

export async function fetchPhotoGalleryItem(language, id, fallbackItem = null) {
  if (!id) return fallbackItem;

  try {
    const response = await getNode(CONTENT_TYPE, id, {
      lang: language,
      include: INCLUDE,
    });
    const node = response?.data;
    if (!node) return fallbackItem;

    const item = mapPhotoGalleryNode(node, response?.included || []);
    return item?.images?.length || item?.image ? item : fallbackItem;
  } catch {
    return fallbackItem;
  }
}
