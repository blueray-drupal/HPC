import { buildJsonApiPath, normalizeDrupalUrl } from '@/lib/drupal.js';
import { getDrupalBaseUrl, getDrupalDefaultLanguage, useDrupalApiProxy } from '@/lib/env.js';
import { filterNodesByLanguage, nodeMatchesLanguage } from './languageContent.js';
import { drupalApi } from './axios.config.js';

/** Next-page href → path for axios (baseURL /api); pathname + search only, no duplicated /api. */
function resolveJsonApiPageUrl(href) {
  if (!href) return null;

  try {
    const raw = normalizeDrupalUrl(String(href).trim());
    const base = getDrupalBaseUrl()?.replace(/\/$/, '') || 'http://drupal.local';
    const parsed = /^https?:\/\//i.test(raw) ? new URL(raw) : new URL(raw, base);

    let pathname = parsed.pathname || '';
    const search = parsed.search || '';

    if (!pathname.startsWith('/')) {
      pathname = `/${pathname}`;
    }

    if (useDrupalApiProxy() && pathname.startsWith('/api/')) {
      pathname = pathname.slice(4);
    }

    return `${pathname}${search}`;
  } catch {
    return null;
  }
}

function usesLanguageJsonApiPrefix() {
  return import.meta.env.VITE_DRUPAL_JSONAPI_LANG_PREFIX === 'true';
}

export function buildJsonApiResourcePath(contentType, uuid, lang) {
  const language = lang || getDrupalDefaultLanguage();
  const resourcePath = uuid
    ? `/jsonapi/node/${contentType}/${uuid}`
    : `/jsonapi/node/${contentType}`;

  return usesLanguageJsonApiPrefix()
    ? buildJsonApiPath(resourcePath, language)
    : resourcePath;
}

function buildJsonApiParams({ limit, filters = {}, include = [], sort } = {}) {
  const params = {
    'filter[status]': 1,
  };

  if (limit != null) params['page[limit]'] = limit;
  if (include.length) params.include = include.join(',');
  if (sort) params.sort = sort;

  Object.assign(params, filters);
  return params;
}

export async function getNodes(contentType, options = {}) {
  const path = buildJsonApiResourcePath(contentType, null, options.lang);
  const filters = { ...(options.filters || {}) };

  if (options.lang && !options.skipLangcodeFilter && filters['filter[langcode]'] == null) {
    filters['filter[langcode]'] = options.lang;
  }

  const { data } = await drupalApi.get(path, {
    params: buildJsonApiParams({ ...options, filters }),
  });

  if (options.lang && data?.data) {
    const nodes = Array.isArray(data.data) ? data.data : [data.data];
    const filtered = filterNodesByLanguage(nodes, options.lang);
    return { ...data, data: filtered };
  }

  return data;
}

/**
 * Fetches every JSON:API results page via links.next (published nodes only via getNodes filters).
 */
export async function getAllNodes(contentType, options = {}) {
  const pageLimit = options.limit ?? 50;
  let nextHref = null;
  let pageIndex = 0;
  const nodesById = new Map();
  const includedByKey = new Map();
  const seenNextHrefs = new Set();
  const maxPages = 500;

  const mergeIncluded = (items = []) => {
    for (const item of items) {
      if (!item?.type || !item?.id) continue;
      includedByKey.set(`${item.type}:${item.id}`, item);
    }
  };

  const mergeNodes = (batch = []) => {
    for (const node of batch) {
      if (!node?.id) continue;
      nodesById.set(node.id, node);
    }
  };

  while (pageIndex === 0 || nextHref) {
    if (pageIndex >= maxPages) {
      throw new Error('JSON:API pagination exceeded safe page limit');
    }

    if (nextHref) {
      if (seenNextHrefs.has(nextHref)) {
        break;
      }
      seenNextHrefs.add(nextHref);
    }

    let response;
    try {
      if (pageIndex === 0) {
        response = await getNodes(contentType, { ...options, limit: pageLimit });
      } else {
        let requestUrl = resolveJsonApiPageUrl(nextHref);
        if (!requestUrl) {
          throw new Error('JSON:API next page URL could not be resolved');
        }

        const includeList = options.include?.filter(Boolean);
        if (includeList?.length && !requestUrl.includes('include=')) {
          const separator = requestUrl.includes('?') ? '&' : '?';
          requestUrl = `${requestUrl}${separator}include=${encodeURIComponent(includeList.join(','))}`;
        }

        const { data } = await drupalApi.get(requestUrl);
        response = data;
      }
    } catch (error) {
      throw new Error(
        pageIndex === 0 ? 'JSON:API initial page request failed' : 'JSON:API pagination request failed',
        { cause: error },
      );
    }

    const batch = Array.isArray(response?.data)
      ? response.data
      : response?.data
        ? [response.data]
        : [];

    mergeNodes(batch);
    mergeIncluded(response?.included || []);

    const following = response?.links?.next?.href || null;
    if (!following || following === nextHref) {
      break;
    }

    nextHref = following;
    pageIndex += 1;

    if (!batch.length) {
      break;
    }
  }

  const nodes = filterNodesByLanguage([...nodesById.values()], options.lang);

  return {
    data: nodes,
    included: [...includedByKey.values()],
  };
}

export async function getNode(contentType, uuid, options = {}) {
  const path = buildJsonApiResourcePath(contentType, uuid, options.lang);
  const params = {};

  if (options.include?.length) {
    params.include = options.include.join(',');
  }

  const { data } = await drupalApi.get(path, { params });

  if (options.lang && data?.data && !nodeMatchesLanguage(data.data, options.lang)) {
    return { ...data, data: null };
  }

  return data;
}

function buildTaxonomyPath(vocabulary, lang) {
  const resourcePath = `/jsonapi/taxonomy_term/${vocabulary}`;
  const language = lang || getDrupalDefaultLanguage();

  return usesLanguageJsonApiPrefix()
    ? buildJsonApiPath(resourcePath, language)
    : resourcePath;
}

export async function getTaxonomyTerms(vocabulary, options = {}) {
  const path = buildTaxonomyPath(vocabulary, options.lang);
  const params = {
    'filter[status]': 1,
    sort: 'weight',
  };

  if (options.limit != null) params['page[limit]'] = options.limit;

  const filters = { ...(options.filters || {}) };
  if (options.lang && filters['filter[langcode]'] == null) {
    filters['filter[langcode]'] = options.lang;
  }

  Object.assign(params, filters);

  const { data } = await drupalApi.get(path, { params });

  if (options.lang && data?.data) {
    const terms = Array.isArray(data.data) ? data.data : [data.data];
    const filtered = filterNodesByLanguage(terms, options.lang);
    return { ...data, data: filtered };
  }

  return data;
}
