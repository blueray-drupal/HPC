import { buildJsonApiPath } from '@/lib/drupal.js';
import { getDrupalDefaultLanguage } from '@/lib/env.js';
import { drupalApi } from './axios.config.js';

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

  return data;
}

export async function getNode(contentType, uuid, options = {}) {
  const path = buildJsonApiResourcePath(contentType, uuid, options.lang);
  const params = {};

  if (options.include?.length) {
    params.include = options.include.join(',');
  }

  const { data } = await drupalApi.get(path, { params });
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
  return data;
}
