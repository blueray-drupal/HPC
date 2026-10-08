const frameCache = new Map();

export function getYouTubeVideoId(url) {
  if (!url) return null;
  const str = String(url);

  const embedMatch = str.match(/youtube\.com\/embed\/([^/?&]+)/);
  if (embedMatch) return embedMatch[1];

  const watchMatch = str.match(/[?&]v=([^&]+)/);
  if (watchMatch) return watchMatch[1];

  const shortMatch = str.match(/youtu\.be\/([^/?&]+)/);
  if (shortMatch) return shortMatch[1];

  return null;
}

export function getYouTubeThumbnailUrl(videoId, quality = 'hqdefault') {
  if (!videoId) return '';
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

export function isYouTubeUrl(url) {
  return /youtube\.com|youtu\.be/i.test(String(url || ''));
}

export function isLocalMp4Video(url, sourceType) {
  if (sourceType === 'file') return true;
  return /\.mp4(\?|$)/i.test(String(url || ''));
}

function isMostlyBlack(imageData, threshold = 12) {
  const { data } = imageData;
  let dark = 0;
  const samples = data.length / 4;

  for (let i = 0; i < data.length; i += 16) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r <= threshold && g <= threshold && b <= threshold) {
      dark += 1;
    }
  }

  return dark / (samples / 4) > 0.92;
}

function captureFrameAtTime(video, time) {
  return new Promise((resolve) => {
    const onSeeked = () => {
      video.removeEventListener('seeked', onSeeked);
      try {
        const width = video.videoWidth || 640;
        const height = video.videoHeight || 360;
        if (!width || !height) {
          resolve(null);
          return;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(null);
          return;
        }

        ctx.drawImage(video, 0, 0, width, height);
        const imageData = ctx.getImageData(0, 0, width, height);
        if (isMostlyBlack(imageData)) {
          resolve(null);
          return;
        }

        resolve(canvas.toDataURL('image/jpeg', 0.85));
      } catch {
        resolve(null);
      }
    };

    video.addEventListener('seeked', onSeeked);
    try {
      video.currentTime = time;
    } catch {
      video.removeEventListener('seeked', onSeeked);
      resolve(null);
    }
  });
}

export function getCachedVideoFrame(videoUrl) {
  const cached = frameCache.get(videoUrl);
  return typeof cached === 'string' ? cached : null;
}

export function extractVideoFrame(videoUrl) {
  if (!videoUrl) return Promise.resolve(null);

  const cached = frameCache.get(videoUrl);
  if (typeof cached === 'string') {
    return Promise.resolve(cached);
  }
  if (cached instanceof Promise) {
    return cached;
  }

  const task = new Promise((resolve) => {
    const video = document.createElement('video');
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.setAttribute('playsinline', '');
    video.crossOrigin = 'anonymous';

    const finish = (result) => {
      frameCache.set(videoUrl, result);
      video.removeAttribute('src');
      video.load();
      resolve(result);
    };

    video.addEventListener(
      'error',
      () => {
        finish(null);
      },
      { once: true },
    );

    video.addEventListener(
      'loadeddata',
      async () => {
        let frame = await captureFrameAtTime(video, 0);
        if (!frame) {
          frame = await captureFrameAtTime(video, 0.5);
        }
        finish(frame);
      },
      { once: true },
    );

    video.src = videoUrl;
  });

  frameCache.set(videoUrl, task);
  return task;
}

export function resolveVideoSourceType(videoUrl, mediaAssetType) {
  if (!videoUrl) return 'unknown';
  if (isYouTubeUrl(videoUrl)) return 'youtube';
  if (mediaAssetType === 'video' || isLocalMp4Video(videoUrl, 'file')) return 'file';
  if (mediaAssetType === 'remote_video') return 'remote';
  return 'remote';
}
