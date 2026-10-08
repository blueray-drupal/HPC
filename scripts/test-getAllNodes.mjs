import { getAllNodes } from '../src/services/api/drupalApi.js';
import { mapPublicationNode, mapCategoryToSlug } from '../src/services/api/publications.js';

// vite-node loads env from .env
const SLUG = 'policy-briefs';
const lang = 'ar';
const machine = 'mlkhst_syst_w_wrq_hqy_q';

const response = await getAllNodes('publication', {
  include: ['field_document', 'field_image', 'field_image.field_media_image'],
  sort: '-field_publication_year,-created',
  limit: 50,
  lang,
  filters: {
    'filter[langcode]': lang,
    'filter[field_category]': machine,
  },
});

const items = response.data
  .map((n) => mapPublicationNode(n, response.included, SLUG))
  .filter((i) => i.title);

console.log('getAllNodes count', response.data.length);
console.log('mapped count', items.length);
console.log(
  'min year',
  Math.min(...items.map((i) => i.year)),
  'oldest',
  items.reduce((a, b) => (a.year <= b.year ? a : b)).title.slice(0, 50),
);
