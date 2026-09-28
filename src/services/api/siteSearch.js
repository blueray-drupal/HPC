import { buildSearchIndex } from '@/pages/search/searchIndexData.js';

let cachedIndex = null;

function getSearchIndex() {
  if (!cachedIndex) {
    cachedIndex = buildSearchIndex();
  }
  return cachedIndex;
}

function normalizeTerm(value) {
  return String(value || '').trim().toLowerCase();
}

function matchesQuery(item, term) {
  if (!term) return false;

  const haystack = [
    item.title,
    item.excerpt,
    item.body,
    item.categoryLabel,
    ...(item.keywords || []),
  ]
    .join(' ')
    .toLowerCase();

  if (haystack.includes(term)) return true;

  const words = term.split(/\s+/).filter((word) => word.length >= 2);
  return words.length > 0 && words.every((word) => haystack.includes(word));
}

export function searchSite(query, { contentTypes = [], year = '' } = {}) {
  const term = normalizeTerm(query);
  if (!term) return [];

  let results = getSearchIndex().filter((item) => matchesQuery(item, term));

  if (contentTypes.length) {
    results = results.filter((item) => contentTypes.includes(item.contentType));
  }

  if (year) {
    results = results.filter((item) => String(item.year) === String(year));
  }

  return results;
}
