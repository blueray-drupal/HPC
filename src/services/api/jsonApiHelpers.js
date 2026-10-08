import { resolveDrupalFileUrl } from '@/lib/drupal.js';

export function findIncludedItem(included = [], type, id) {
  if (!type || !id) return null;
  return included.find((item) => item.type === type && item.id === id) || null;
}

export function resolveMediaImageUrl(mediaRef, included = []) {
  if (!mediaRef) return null;

  const media = findIncludedItem(included, mediaRef.type, mediaRef.id);
  if (!media) return null;

  const fileRef = media.relationships?.field_media_image?.data;
  const file = findIncludedItem(included, fileRef?.type, fileRef?.id);
  const fileUrl = file?.attributes?.uri?.url;

  return resolveDrupalFileUrl(fileUrl);
}

export function resolveNodeImageUrl(node, fieldName, included = []) {
  const mediaRef = node?.relationships?.[fieldName]?.data;
  if (!mediaRef) return null;
  return resolveMediaImageUrl(mediaRef, included);
}

export function resolveNodeMediaImageUrls(node, fieldName, included = []) {
  const refs = getRelationshipData(node?.relationships?.[fieldName]);
  return refs.map((ref) => resolveMediaImageUrl(ref, included)).filter(Boolean);
}

export function resolveMediaAsset(mediaRef, included = []) {
  if (!mediaRef) return null;

  const media = findIncludedItem(included, mediaRef.type, mediaRef.id);
  if (!media) return null;

  const thumbnail = resolveMediaImageUrl(mediaRef, included);
  const videoFileRef = media.relationships?.field_media_video_file?.data;
  const videoFile = findIncludedItem(included, videoFileRef?.type, videoFileRef?.id);
  const videoFileUrl = videoFile?.attributes?.uri?.url
    ? resolveDrupalFileUrl(videoFile.attributes.uri.url)
    : null;
  const oembedUrl = media.attributes?.field_media_oembed_video || null;

  if (videoFileUrl) {
    return {
      type: 'video',
      url: videoFileUrl,
      thumbnail,
    };
  }

  if (oembedUrl) {
    return {
      type: 'remote_video',
      url: oembedUrl,
      thumbnail,
    };
  }

  if (thumbnail) {
    return {
      type: 'image',
      url: thumbnail,
      thumbnail,
    };
  }

  return null;
}

export function resolveNodeMediaAsset(node, fieldName, included = []) {
  const mediaRef = node?.relationships?.[fieldName]?.data;
  if (!mediaRef || Array.isArray(mediaRef)) return null;
  return resolveMediaAsset(mediaRef, included);
}

export function resolveTaxonomyTerm(node, fieldName, included = []) {
  const termRef = node?.relationships?.[fieldName]?.data;
  if (!termRef) return null;

  const term = findIncludedItem(included, termRef.type, termRef.id);
  if (!term) return null;

  return {
    id: term.id,
    tid: term.attributes?.drupal_internal__tid,
    name: term.attributes?.name || '',
  };
}

export function resolveTaxonomyTerms(node, fieldName, included = []) {
  const refs = getRelationshipData(node?.relationships?.[fieldName]);

  return refs
    .map((ref) => findIncludedItem(included, ref.type, ref.id))
    .filter(Boolean)
    .map((term) => ({
      id: term.id,
      tid: term.attributes?.drupal_internal__tid,
      name: term.attributes?.name || '',
    }));
}

export function resolveTaxonomyTermsWithIcons(node, fieldName, included = []) {
  const refs = getRelationshipData(node?.relationships?.[fieldName]);

  return refs
    .map((ref) => findIncludedItem(included, ref.type, ref.id))
    .filter(Boolean)
    .map((term) => {
      const iconRef = term.relationships?.field_icon?.data;
      const iconUrl = iconRef ? resolveMediaImageUrl(iconRef, included) : null;

      return {
        id: term.id,
        tid: term.attributes?.drupal_internal__tid,
        name: term.attributes?.name || '',
        iconUrl,
      };
    });
}

export function resolveTaxonomyTermWithIcon(node, fieldName, included = []) {
  const termRef = node?.relationships?.[fieldName]?.data;
  if (!termRef) return null;

  const term = findIncludedItem(included, termRef.type, termRef.id);
  if (!term) return null;

  const iconRef = term.relationships?.field_icon?.data;
  const iconUrl = iconRef ? resolveMediaImageUrl(iconRef, included) : null;

  return {
    id: term.id,
    tid: term.attributes?.drupal_internal__tid,
    name: term.attributes?.name || '',
    iconUrl,
  };
}

export function resolveNodeFileField(node, fieldName, included = []) {
  const fileRef = node?.relationships?.[fieldName]?.data;
  if (!fileRef) return null;

  const file = findIncludedItem(included, fileRef.type, fileRef.id);
  if (!file) return null;

  return {
    url: resolveDrupalFileUrl(file.attributes?.uri?.url),
    filesize: file.attributes?.filesize ?? 0,
    filename: file.attributes?.filename ?? '',
    mime: file.attributes?.filemime ?? '',
  };
}

function resolveFileFromRef(fileRef, included = []) {
  if (!fileRef) return null;
  const file = findIncludedItem(included, fileRef.type, fileRef.id);
  if (!file?.attributes?.uri?.url) return null;

  return {
    url: resolveDrupalFileUrl(file.attributes.uri.url),
    filesize: file.attributes?.filesize ?? 0,
    filename: file.attributes?.filename ?? '',
    mime: file.attributes?.filemime ?? '',
  };
}

/** Direct file reference or media entity (document/file/pdf). */
export function resolveNodeDocumentOrFile(node, fieldName, included = []) {
  const ref = node?.relationships?.[fieldName]?.data;
  if (!ref || Array.isArray(ref)) return null;

  if (ref.type?.startsWith('file--')) {
    return resolveNodeFileField(node, fieldName, included);
  }

  const media = findIncludedItem(included, ref.type, ref.id);
  if (!media) return null;

  const nestedRef =
    media.relationships?.field_media_document?.data ||
    media.relationships?.field_media_file?.data ||
    media.relationships?.field_media_pdf?.data;

  return resolveFileFromRef(nestedRef, included);
}

export function getRelationshipData(relationship) {
  const data = relationship?.data;
  if (!data) return [];
  return Array.isArray(data) ? data : [data];
}

export function resolveParagraphs(entity, fieldName, included = []) {
  const refs = getRelationshipData(entity?.relationships?.[fieldName]);
  return refs
    .map((ref) => findIncludedItem(included, ref.type, ref.id))
    .filter(Boolean);
}

export function resolveParagraphImage(paragraph, included = []) {
  return resolveNodeImageUrl(paragraph, 'field_image', included);
}

export function normalizeDrupalLink(linkField) {
  if (!linkField?.uri) {
    return { href: '#', label: linkField?.title || 'اقرأ المزيد', isExternal: false };
  }

  const label = linkField.title || 'اقرأ المزيد';
  const uri = String(linkField.uri);

  if (uri.startsWith('internal:')) {
    const href = uri.replace(/^internal:/, '') || '/';
    return { href, label, isExternal: false };
  }

  if (uri.startsWith('entity:')) {
    return { href: '#', label, isExternal: false };
  }

  return { href: uri, label, isExternal: /^https?:\/\//i.test(uri) };
}
