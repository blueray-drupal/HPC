import { getNodes } from './drupalApi.js';
import { resolveNodeImageUrl } from './jsonApiHelpers.js';

const CONTENT_TYPE = 'partners_section';
const INCLUDE = ['field_image', 'field_image.field_media_image'];

const CLASSIFICATION_TO_TAB = {
  shrkw_n: 'partners',
  mw_sst_wwzrt_dht_sl: 'institutions',
  partners: 'partners',
  institutions: 'institutions',
};

function mapClassificationToTabId(value) {
  const key = String(value || '').trim().toLowerCase();
  if (!key) return 'institutions';

  if (CLASSIFICATION_TO_TAB[key]) {
    return CLASSIFICATION_TO_TAB[key];
  }

  if (key.includes('partner') || key.includes('shrk')) {
    return 'partners';
  }

  if (key.includes('institution') || key.includes('mw_sst') || key.includes('wwzrt')) {
    return 'institutions';
  }

  return 'institutions';
}

export function mapPartnerNode(node, included = []) {
  const classification = node.attributes?.field_classification || '';

  return {
    id: node.id,
    nid: node.attributes?.drupal_internal__nid,
    name: node.attributes?.title || '',
    logo: resolveNodeImageUrl(node, 'field_image', included) || '/logo.png',
    link: '',
    tabId: mapClassificationToTabId(classification),
    classification,
  };
}

function groupPartnersByTab(partners, tabs) {
  const grouped = Object.fromEntries(tabs.map((tab) => [tab.id, []]));

  partners.forEach((partner) => {
    const tabId = grouped[partner.tabId] ? partner.tabId : tabs[0]?.id;
    if (tabId && grouped[tabId]) {
      grouped[tabId].push(partner);
    }
  });

  return grouped;
}

async function fetchPartnerNodes(language) {
  const baseOptions = {
    include: INCLUDE,
    sort: 'created',
    limit: 100,
  };

  const extractNodes = (response) => {
    const nodes = Array.isArray(response?.data) ? response.data : response?.data ? [response.data] : [];
    const included = response?.included || [];
    return nodes.map((node) => mapPartnerNode(node, included)).filter((item) => item.name);
  };

  if (language) {
    try {
      const localized = await getNodes(CONTENT_TYPE, {
        ...baseOptions,
        lang: language,
        filters: { 'filter[langcode]': language },
      });
      const localizedItems = extractNodes(localized);
      if (localizedItems.length) return localizedItems;
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

export async function fetchPartnersSection(language, fallbackTabs = []) {
  const partners = await fetchPartnerNodes(language);
  const tabs = fallbackTabs;

  if (!partners.length) {
    return { tabs, partnersByTab: null };
  }

  return {
    tabs,
    partnersByTab: groupPartnersByTab(partners, tabs),
  };
}
