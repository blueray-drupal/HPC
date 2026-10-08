/**
 * App-equivalent publication counts (full lang fetch + client category filter + UI pagination).
 */
const BASE = 'http://backend.hpc.com.dedi8785.your-server.de';
const PAGE_SIZE = 50;
const UI_PER_PAGE = 12;
const INCLUDE = 'field_document,field_image,field_image.field_media_image';

const CATEGORY_TO_SLUG = {
  khtt_wstrtyjyt: 'plans-strategies',
  tqryr_wnshrt_dwry: 'reports',
  dl_tdryby: 'training-manuals',
  mlkhst_syst_w_wrq_hqy_q: 'policy-briefs',
  drst_w_bhth: 'studies-research',
};

const SLUG_TO_CATEGORY = Object.fromEntries(
  Object.entries(CATEGORY_TO_SLUG).map(([k, v]) => [v, k]),
);

const EXPECTED = {
  'training-manuals': { ar: 15, en: 27 },
  reports: { ar: 38, en: 9 },
  'plans-strategies': { ar: 16, en: 7 },
  'studies-research': { ar: 93, en: 46 },
  'policy-briefs': { ar: 66, en: 35 },
};

function extractPublicationYear(value) {
  if (value == null || value === '') return null;
  if (typeof value === 'number' && value >= 1000 && value <= 9999) return value;
  const str = String(value).trim();
  if (/^\d{4}$/.test(str)) return Number(str);
  const isoYear = str.match(/^(\d{4})-\d{2}-\d{2}/);
  if (isoYear) return Number(isoYear[1]);
  const date = new Date(str);
  if (!Number.isNaN(date.getTime())) return date.getUTCFullYear();
  const match = str.match(/\d{4}/);
  return match ? Number(match[0]) : null;
}

function mapCategoryToSlug(value) {
  const key = String(value || '').trim().toLowerCase();
  return CATEGORY_TO_SLUG[key] || null;
}

function matchesCategorySlug(item, slug) {
  if (!slug) return Boolean(item.categoryId);
  if (item.categoryId === slug) return true;
  const machine = SLUG_TO_CATEGORY[slug];
  return machine && String(item.category || '').trim().toLowerCase() === machine;
}

function mapNode(node, slug) {
  const categoryRaw = String(node.attributes?.field_category ?? '').trim();
  const categoryId = mapCategoryToSlug(categoryRaw) || slug || null;
  const yearFromField = extractPublicationYear(node.attributes?.field_publication_year);
  const yearFromCreated = extractPublicationYear(node.attributes?.created);
  return {
    id: node.id,
    categoryId,
    category: categoryRaw,
    title: node.attributes?.title || '',
    year: yearFromField ?? yearFromCreated ?? null,
  };
}

async function fetchAllLang(lang) {
  let url = `${BASE}/${lang}/jsonapi/node/publication?filter[status]=1&filter[langcode]=${lang}&page[limit]=${PAGE_SIZE}&include=${encodeURIComponent(INCLUDE)}&sort=-field_publication_year,-created`;
  const nodesById = new Map();
  const seen = new Set();
  let pages = 0;

  while (url && pages < 500) {
    pages += 1;
    if (seen.has(url)) break;
    seen.add(url);
    const res = await fetch(url, { headers: { Accept: 'application/vnd.api+json' } });
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    const json = await res.json();
    for (const node of json.data || []) nodesById.set(node.id, node);
    const next = json.links?.next?.href;
    if (!next) break;
    url = next.startsWith('http') ? next : `${BASE}${next.startsWith('/') ? '' : '/'}${next}`;
    if (!url.includes('include=')) {
      url += (url.includes('?') ? '&' : '?') + `include=${encodeURIComponent(INCLUDE)}`;
    }
  }

  return { nodes: [...nodesById.values()], pages };
}

function uiAccessibleCount(items) {
  const totalPages = Math.max(1, Math.ceil(items.length / UI_PER_PAGE));
  let accessible = 0;
  for (let page = 1; page <= totalPages; page += 1) {
    const start = (page - 1) * UI_PER_PAGE;
    accessible += items.slice(start, start + UI_PER_PAGE).length;
  }
  return { uiPages: totalPages, uiAccessible: accessible };
}

async function main() {
  const rows = [];
  for (const lang of ['ar', 'en']) {
    const { nodes, pages } = await fetchAllLang(lang);
    const mapped = nodes
      .map((n) => mapNode(n))
      .filter((i) => i.title)
      .filter((i) => Boolean(i.categoryId));

    for (const slug of Object.keys(EXPECTED)) {
      const items = mapped.filter((i) => matchesCategorySlug(i, slug));
      const oldest = items.reduce((acc, item) => {
        if (item.year == null) return acc;
        if (!acc || item.year < acc.year) return item;
        return acc;
      }, null);
      const { uiPages, uiAccessible } = uiAccessibleCount(items);
      rows.push({
        lang,
        category: slug,
        expected: EXPECTED[slug][lang],
        apiLangPages: pages,
        apiLangNodes: nodes.length,
        mappedCategory: items.length,
        uiPages,
        uiAccessible,
        oldestYear: oldest?.year ?? null,
        oldestTitle: oldest?.title?.slice(0, 70) ?? null,
      });
    }
  }
  console.table(rows);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
