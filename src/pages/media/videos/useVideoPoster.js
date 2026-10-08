import { useEffect, useRef, useState } from 'react';
import {
  extractVideoFrame,
  getCachedVideoFrame,
  getYouTubeThumbnailUrl,
  getYouTubeVideoId,
  isLocalMp4Video,
  isYouTubeUrl,
} from './videoPosterUtils.js';

function resolveStaticPoster(item) {
  if (item?.coverImage) {
    return item.coverImage;
  }

  if (item?.image) {
    return item.image;
  }

  const url = item?.videoUrl;
  if (isYouTubeUrl(url)) {
    const id = getYouTubeVideoId(url);
    return id ? getYouTubeThumbnailUrl(id) : '';
  }

  if (isLocalMp4Video(url, item?.videoSourceType)) {
    return getCachedVideoFrame(url) || '';
  }

  return '';
}

export function useVideoPoster(item) {
  const wrapRef = useRef(null);
  const [posterUrl, setPosterUrl] = useState(() => resolveStaticPoster(item));
  const [imageBroken, setImageBroken] = useState(false);

  useEffect(() => {
    setImageBroken(false);
    setPosterUrl(resolveStaticPoster(item));
  }, [item?.id, item?.coverImage, item?.image, item?.videoUrl, item?.videoSourceType]);

  useEffect(() => {
    if (item?.coverImage) return undefined;
    if (isYouTubeUrl(item?.videoUrl)) return undefined;

    if (!isLocalMp4Video(item?.videoUrl, item?.videoSourceType)) {
      return undefined;
    }

    const cached = getCachedVideoFrame(item.videoUrl);
    if (cached) {
      setPosterUrl(cached);
      return undefined;
    }

    const element = wrapRef.current;
    if (!element) return undefined;

    let cancelled = false;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || cancelled) return;

        observer.disconnect();

        extractVideoFrame(item.videoUrl).then((dataUrl) => {
          if (!cancelled && dataUrl) {
            setPosterUrl(dataUrl);
          }
        });
      },
      { rootMargin: '120px', threshold: 0.01 },
    );

    observer.observe(element);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [item?.id, item?.coverImage, item?.videoUrl, item?.videoSourceType]);

  const showPlaceholder = !posterUrl || imageBroken;

  return {
    wrapRef,
    posterUrl: showPlaceholder ? '' : posterUrl,
    showPlaceholder,
    onPosterError: () => setImageBroken(true),
  };
}
