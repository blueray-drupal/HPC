import { getNode, getNodes } from '@/services/api/drupalApi.js';

export async function fetchDrupalContent({
  contentType,
  uuid = null,
  limit = 10,
  filters = {},
  include = [],
  lang,
  sort,
}) {
  if (uuid) {
    return getNode(contentType, uuid, { include, lang });
  }

  return getNodes(contentType, { limit, filters, include, lang, sort });
}
