import { getContactFieldLabels } from '@/i18n/navigation.js';
import { getNodes } from './drupalApi.js';

const CONTENT_TYPE = 'contact_us';

function getProcessedHtml(field) {
  return field?.processed || field?.value || '';
}

function buildPhoneHref(phone) {
  if (!phone) return null;

  const normalized = String(phone).replace(/[^\d+]/g, '');
  return normalized ? `tel:${normalized}` : null;
}

function buildEmailHref(email) {
  if (!email) return null;
  return `mailto:${String(email).trim()}`;
}

export function mapContactUsNode(node, language = 'ar') {
  const address = node.attributes?.field_address || '';
  const phone = node.attributes?.field_phone_number || '';
  const fax = node.attributes?.field_fax || '';
  const email = node.attributes?.field_email || '';
  const mapHtml = getProcessedHtml(node.attributes?.field_body);
  const labels = getContactFieldLabels(language);

  const infoItems = [
    {
      id: 'address',
      title: labels.address,
      value: address,
      icon: 'location',
    },
    {
      id: 'phone',
      title: labels.phone,
      value: phone,
      href: buildPhoneHref(phone),
      icon: 'phone',
    },
    {
      id: 'fax',
      title: labels.fax,
      value: fax,
      icon: 'fax',
    },
    {
      id: 'email',
      title: labels.email,
      value: email,
      href: buildEmailHref(email),
      icon: 'email',
    },
  ].filter((item) => item.value);

  return {
    infoItems,
    mapHtml,
  };
}

async function fetchContactNodes(language) {
  const baseOptions = {
    sort: '-changed',
    limit: 1,
  };

  const extractNodes = (response) => {
    const nodes = Array.isArray(response?.data) ? response.data : response?.data ? [response.data] : [];
    return nodes;
  };

  if (language) {
    try {
      const localized = await getNodes(CONTENT_TYPE, {
        ...baseOptions,
        lang: language,
        filters: { 'filter[langcode]': language },
      });
      const localizedNodes = extractNodes(localized);
      if (localizedNodes.length) return localizedNodes;
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

export async function fetchContactUs(language, fallback = null) {
  try {
    const nodes = await fetchContactNodes(language);
    if (!nodes.length) return fallback;

    const mapped = mapContactUsNode(nodes[0], language);
    if (!mapped.infoItems.length && !mapped.mapHtml) return fallback;

    return {
      infoItems: mapped.infoItems.length ? mapped.infoItems : fallback?.infoItems || [],
      mapHtml: mapped.mapHtml || fallback?.mapHtml || '',
    };
  } catch {
    return fallback;
  }
}
