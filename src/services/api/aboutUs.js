import { stripHtml } from '@/lib/drupal.js';
import { getNodes } from './drupalApi.js';
import {
  resolveNodeFileField,
  resolveNodeImageUrl,
  resolveParagraphImage,
  resolveParagraphs,
} from './jsonApiHelpers.js';

const CONTENT_TYPE = 'about_us';

const INCLUDE = [
  'field_image',
  'field_image.field_media_image',
  'field_pdf',
  'field_functions_of_the_council',
  'field_functions_of_the_council.field_image',
  'field_functions_of_the_council.field_image.field_media_image',
  'field_organizational_structure',
  'field_organizational_structure.field_image',
  'field_organizational_structure.field_image.field_media_image',
  'field_plan_and_objectives_paragr',
  'field_plan_and_objectives_paragr.field_image',
  'field_plan_and_objectives_paragr.field_image.field_media_image',
  'field_plan_and_objectives_paragr.field_sub_objectives',
  'field_plan_and_objectives_paragr.field_sub_objectives.field_image',
  'field_plan_and_objectives_paragr.field_sub_objectives.field_image.field_media_image',
];

const SECTION_CLASSIFICATION_MAP = {
  lnsh_wlt_sys: 'establishment',
  lrw_y: 'vision',
  lrsl: 'vision',
  lqym: 'vision',
  lkht_wl_hdf_lstrtyjy_llmjls: 'strategy',
  lhykl_ltnzymy_ll_mn_laam_llmjls_l_aal_llskn: 'structure',
  mhm_lmjls: 'council-duties',
  whd_dr_lmshryaa: 'unit-duties',
  whd_ldrst_wlsyst: 'unit-duties',
  whd_lshw_wn_ldry_wlmly: 'unit-duties',
};

const UNIT_TAB_BY_CLASSIFICATION = {
  whd_dr_lmshryaa: { id: 'programs', icon: 'programs' },
  whd_ldrst_wlsyst: { id: 'studies', icon: 'studies' },
  whd_lshw_wn_ldry_wlmly: { id: 'admin', icon: 'admin' },
};

const DUTY_ICONS = [
  'people',
  'committee',
  'database',
  'megaphone',
  'book',
  'handshake',
  'graduation',
  'conference',
  'globe',
  'lightbulb',
];

const DUTY_THEMES = ['blue', 'brown', 'ochre'];
const STRATEGY_THEMES = ['blue', 'orange', 'orange', 'blue'];
const STRATEGY_MAIN_ICONS = ['document', 'chart', 'partnership', 'settings'];
const STRATEGY_NUMBERS = ['الأول', 'الثاني', 'الثالث', 'الرابع'];
function formatFileSize(bytes) {
  if (!bytes) return '';
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(1)} ميغابايت`;
  const kb = bytes / 1024;
  return `${Math.max(1, Math.round(kb))} كيلوبايت`;
}

function splitHtmlParagraphs(html) {
  if (!html) return [];

  const matches = String(html).match(/<p[^>]*>[\s\S]*?<\/p>/gi);
  if (matches?.length) {
    return matches.map((paragraph) => stripHtml(paragraph)).filter(Boolean);
  }

  const text = stripHtml(html);
  return text ? [text] : [];
}

function getProcessedHtml(field) {
  if (!field) return '';
  return field.processed || field.value || '';
}

function mapClassificationToSectionId(classification) {
  const key = String(classification || '').trim().toLowerCase();
  return SECTION_CLASSIFICATION_MAP[key] || null;
}

function resolveHeaderStyle(colorCode) {
  if (!colorCode) return {};

  const normalized = String(colorCode).trim().toLowerCase();
  if (DUTY_THEMES.includes(normalized)) {
    return { theme: normalized };
  }

  return { headerColor: colorCode.trim() };
}

function mapEstablishmentSection(node, included) {
  const bodyHtml = getProcessedHtml(node.attributes?.field_body);
  const subBodyHtml = getProcessedHtml(node.attributes?.field_sub_body);
  const members = (node.attributes?.field_members_of_the_higher_popu || []).filter(Boolean);
  const image = resolveNodeImageUrl(node, 'field_image', included);
  const paragraphs = splitHtmlParagraphs(bodyHtml);

  const section = {};

  if (bodyHtml) {
    section.bodyHtml = bodyHtml;
  }

  if (paragraphs.length) {
    section.paragraphs = paragraphs;
  }

  if (image) {
    section.image = image;
  }

  if (subBodyHtml || members.length) {
    section.extended = {
      ...(subBodyHtml ? { htmlContent: subBodyHtml } : {}),
      ...(members.length
        ? {
            councilTitle: 'المجلس الأعلى للسكان',
            councilIntro: 'يرأس المجلس وزير التخطيط والتعاون الدولي، وعضوية كل من:',
            members,
          }
        : {}),
    };
  }

  return section;
}

function mapVisionSection(node, included, classification) {
  const title = node.attributes?.title || '';
  const bodyHtml = getProcessedHtml(node.attributes?.field_body);
  const bodyText = stripHtml(bodyHtml);
  const image = resolveNodeImageUrl(node, 'field_image', included);

  if (!bodyText && !title && !image) return {};

  if (classification === 'lrw_y') {
    return {
      cards: [
        {
          id: 'vision',
          heading: title || 'الرؤية',
          icon: 'vision',
          text: bodyText,
          bodyHtml: bodyHtml || undefined,
          image: image || undefined,
        },
      ],
    };
  }

  if (classification === 'lrsl') {
    return {
      cards: [
        {
          id: 'mission',
          heading: title || 'الرسالة',
          icon: 'mission',
          text: bodyText,
          bodyHtml: bodyHtml || undefined,
          image: image || undefined,
        },
      ],
    };
  }

  if (classification === 'lqym') {
    const label = title || bodyText;
    if (!label && !image) return {};

    return {
      coreValues: {
        items: [
          {
            id: node.id,
            label,
            image: image || undefined,
          },
        ],
      },
    };
  }

  return {};
}

function mapStrategySection(node, included) {
  const goals = resolveParagraphs(node, 'field_plan_and_objectives_paragr', included)
    .map((paragraph, index) => {
      const subGoals = resolveParagraphs(paragraph, 'field_sub_objectives', included)
        .map((subGoal) => subGoal.attributes?.field_title || stripHtml(getProcessedHtml(subGoal.attributes?.field_body)))
        .filter(Boolean);

      return {
        id: paragraph.id,
        number: STRATEGY_NUMBERS[index] || String(index + 1),
        description: paragraph.attributes?.field_title || paragraph.attributes?.field_brief || '',
        theme: STRATEGY_THEMES[index % STRATEGY_THEMES.length],
        mainIcon: STRATEGY_MAIN_ICONS[index % STRATEGY_MAIN_ICONS.length],
        subIcon: index === 1 ? 'shieldPlus' : 'shield',
        subGoals,
        image: resolveParagraphImage(paragraph, included),
      };
    })
    .filter((goal) => goal.description || goal.subGoals.length);

  const section = {};

  if (goals.length) {
    section.goals = goals;
  }

  const pdf = resolveNodeFileField(node, 'field_pdf', included);
  if (pdf?.url) {
    section.strategyDownload = {
      title:
        stripHtml(getProcessedHtml(node.attributes?.field_sub_body)) ||
        'للإطلاع على الخطة الإستراتيجية للمجلس الأعلى للسكان',
      file: {
        label: pdf.filename || 'الخطة الإستراتيجية',
        size: formatFileSize(pdf.filesize),
        href: pdf.url,
      },
    };
  }

  return section;
}

function toStructureMember(paragraph, included, node, index) {
  return {
    id: paragraph.id,
    name: paragraph.attributes?.field_title || '',
    position: paragraph.attributes?.field_position || '',
    email: paragraph.attributes?.field_email || '',
    image: resolveParagraphImage(paragraph, included),
    weight: paragraph.attributes?.field_weight,
    sortIndex: index,
    nodeCreated: node.attributes?.created || '',
  };
}

function buildOrgChartFromMembers(members) {
  const hasLevelWeights = members.some((member) => Number.isFinite(Number(member.weight)));

  if (!hasLevelWeights) {
    const cleaned = members.map(({ sortIndex, weight, nodeCreated, ...member }) => member);

    return {
      levels: cleaned.length === 1 ? [[cleaned[0]]] : [[cleaned[0]], cleaned.slice(1)],
      drupalSourced: true,
    };
  }

  const levelsMap = new Map();

  members.forEach((member) => {
    const level = Number.isFinite(Number(member.weight)) ? Number(member.weight) : 999;

    if (!levelsMap.has(level)) {
      levelsMap.set(level, []);
    }

    levelsMap.get(level).push(member);
  });

  const levels = Array.from(levelsMap.entries())
    .sort(([levelA], [levelB]) => levelA - levelB)
    .map(([, levelMembers]) =>
      levelMembers
        .sort((a, b) => {
          if (a.sortIndex !== b.sortIndex) return a.sortIndex - b.sortIndex;
          return String(a.nodeCreated).localeCompare(String(b.nodeCreated));
        })
        .map(({ sortIndex, weight, nodeCreated, ...member }) => member),
    );

  return { levels, drupalSourced: true };
}

function mapStructureSection(node, included) {
  const members = resolveParagraphs(node, 'field_organizational_structure', included)
    .map((paragraph, index) => toStructureMember(paragraph, included, node, index))
    .filter((member) => member.name);

  if (!members.length) return {};

  return { structureMembers: members };
}

function mergeStructureSection(baseSection = {}, partial = {}) {
  const fromDrupal = baseSection.orgChart?.drupalSourced;
  const existingMembers = fromDrupal ? baseSection.structureMembers || [] : [];
  const membersById = new Map(existingMembers.map((member) => [member.id, member]));

  (partial.structureMembers || []).forEach((member) => {
    membersById.set(member.id, member);
  });

  const members = Array.from(membersById.values());
  if (!members.length) return baseSection;

  return {
    ...baseSection,
    structureMembers: members,
    orgChart: buildOrgChartFromMembers(members),
  };
}

function toCouncilDutyItem(paragraph, included, node, index) {
  const style = resolveHeaderStyle(paragraph.attributes?.field_color_code);

  return {
    id: paragraph.id,
    text: paragraph.attributes?.field_title || '',
    image: resolveParagraphImage(paragraph, included),
    icon: DUTY_ICONS[index % DUTY_ICONS.length],
    theme: style.theme || DUTY_THEMES[index % DUTY_THEMES.length],
    headerColor: style.headerColor,
    nodeCreated: node.attributes?.created || '',
    sortIndex: index,
  };
}

function buildCouncilDutiesFromItems(items, intro) {
  const sortedItems = [...items]
    .sort((a, b) => {
      if (a.sortIndex !== b.sortIndex) return a.sortIndex - b.sortIndex;
      return String(a.nodeCreated).localeCompare(String(b.nodeCreated));
    })
    .map((item, index) => {
      const { nodeCreated, sortIndex, ...cleanItem } = item;

      return {
        ...cleanItem,
        number: index + 1,
        icon: DUTY_ICONS[index % DUTY_ICONS.length],
        theme: cleanItem.theme || DUTY_THEMES[index % DUTY_THEMES.length],
      };
    });

  return {
    ...(intro ? { intro } : {}),
    items: sortedItems,
    drupalSourced: true,
  };
}

function mapCouncilDutiesSection(node, included) {
  const items = resolveParagraphs(node, 'field_functions_of_the_council', included)
    .map((paragraph, index) => toCouncilDutyItem(paragraph, included, node, index))
    .filter((item) => item.text);

  if (!items.length) return {};

  const intro = stripHtml(getProcessedHtml(node.attributes?.field_body));

  return {
    councilDutyItems: items,
    ...(intro ? { councilDutyIntro: intro } : {}),
  };
}

function mergeCouncilDutiesSection(baseSection = {}, partial = {}) {
  const fromDrupal = baseSection.councilDuties?.drupalSourced;
  const existingItems = fromDrupal ? baseSection.councilDutyItems || [] : [];
  const itemsById = new Map(existingItems.map((item) => [item.id, item]));

  (partial.councilDutyItems || []).forEach((item) => {
    itemsById.set(item.id, item);
  });

  const items = Array.from(itemsById.values());
  if (!items.length) return baseSection;

  const intro =
    (fromDrupal && baseSection.councilDuties?.intro) ||
    partial.councilDutyIntro ||
    baseSection.councilDuties?.intro;

  return {
    ...baseSection,
    councilDutyItems: items,
    councilDutyIntro: intro,
    councilDuties: buildCouncilDutiesFromItems(items, intro),
  };
}

function mapUnitDutiesTab(node, classification) {
  const tabMeta = UNIT_TAB_BY_CLASSIFICATION[classification];
  if (!tabMeta) return null;

  const bodyHtml = getProcessedHtml(node.attributes?.field_body);
  const paragraphs = splitHtmlParagraphs(bodyHtml);
  if (!bodyHtml && !paragraphs.length && !node.attributes?.title) return null;

  return {
    id: tabMeta.id,
    icon: tabMeta.icon,
    label: node.attributes?.title || tabMeta.id,
    ...(bodyHtml ? { bodyHtml } : {}),
    ...(paragraphs.length ? { paragraphs } : {}),
  };
}

function mapNodeToPartialSection(node, included) {
  const classification = String(node.attributes?.field_sections || '').trim().toLowerCase();
  const sectionId = mapClassificationToSectionId(classification);
  if (!sectionId) return null;

  let partial = {};

  switch (sectionId) {
    case 'establishment':
      partial = mapEstablishmentSection(node, included);
      break;
    case 'vision':
      partial = mapVisionSection(node, included, classification);
      break;
    case 'strategy':
      partial = mapStrategySection(node, included);
      break;
    case 'structure':
      partial = mapStructureSection(node, included);
      break;
    case 'council-duties':
      partial = mapCouncilDutiesSection(node, included);
      break;
    case 'unit-duties': {
      const tab = mapUnitDutiesTab(node, classification);
      if (tab) {
        partial = { unitTab: tab };
      }
      break;
    }
    default:
      break;
  }

  if (!Object.keys(partial).length) return null;

  return { sectionId, partial };
}

function mergeVisionSection(baseSection = {}, partial = {}) {
  const merged = { ...baseSection };

  if (partial.cards?.length) {
    const cardsById = Object.fromEntries((baseSection.cards || []).map((card) => [card.id, card]));

    partial.cards.forEach((card) => {
      cardsById[card.id] = { ...cardsById[card.id], ...card };
    });

    const order = ['vision', 'mission'];
    merged.cards = order
      .map((id) => cardsById[id])
      .filter(Boolean)
      .concat(Object.values(cardsById).filter((card) => !order.includes(card.id)));
  }

  if (partial.coreValues?.items?.length) {
    const fromDrupal = baseSection.coreValues?.drupalSourced;
    const existingItems = fromDrupal ? baseSection.coreValues?.items || [] : [];
    const itemsById = new Map(existingItems.map((item) => [item.id, item]));

    partial.coreValues.items.forEach((item) => {
      itemsById.set(item.id, item);
    });

    merged.coreValues = {
      title: baseSection.coreValues?.title || 'القيم الجوهرية',
      items: Array.from(itemsById.values()),
      drupalSourced: true,
    };
  }

  return merged;
}

function mergeUnitDutiesSection(baseSection = {}, partial = {}, fallbackTabs = []) {
  const existingTabs = baseSection.unitDuties?.tabs?.length
    ? baseSection.unitDuties.tabs
    : fallbackTabs;

  const tabsById = Object.fromEntries(existingTabs.map((tab) => [tab.id, { ...tab }]));

  if (partial.unitTab) {
    tabsById[partial.unitTab.id] = {
      ...(tabsById[partial.unitTab.id] || {}),
      ...partial.unitTab,
      bodyHtml: partial.unitTab.bodyHtml || tabsById[partial.unitTab.id]?.bodyHtml,
      paragraphs: partial.unitTab.paragraphs?.length
        ? partial.unitTab.paragraphs
        : tabsById[partial.unitTab.id]?.paragraphs,
    };
  }

  const orderedIds = fallbackTabs.map((tab) => tab.id);
  const tabs = orderedIds
    .map((id) => tabsById[id])
    .filter((tab) => tab?.bodyHtml || tab?.paragraphs?.length || tab?.label);

  return {
    ...baseSection,
    unitDuties: {
      ...(baseSection.unitDuties || {}),
      tabs: tabs.length ? tabs : existingTabs,
    },
  };
}

function mergeAboutSection(sectionId, fallbackSection = {}, partial = {}, fallbackSections = {}) {
  if (!partial || !Object.keys(partial).length) return fallbackSection;

  if (sectionId === 'vision') {
    return mergeVisionSection(fallbackSection, partial);
  }

  if (sectionId === 'unit-duties') {
    return mergeUnitDutiesSection(
      fallbackSection,
      partial,
      fallbackSections['unit-duties']?.unitDuties?.tabs || [],
    );
  }

  if (sectionId === 'structure') {
    return mergeStructureSection(fallbackSection, partial);
  }

  if (sectionId === 'council-duties') {
    return mergeCouncilDutiesSection(fallbackSection, partial);
  }

  const merged = { ...fallbackSection, ...partial };

  if (partial.extended) {
    merged.extended = {
      ...(fallbackSection.extended || {}),
      ...partial.extended,
      members: partial.extended.members?.length
        ? partial.extended.members
        : fallbackSection.extended?.members,
    };
  }

  if (partial.goals?.length) {
    merged.goals = partial.goals;
  }

  if (partial.strategyDownload) {
    merged.strategyDownload = partial.strategyDownload;
  }

  if (partial.paragraphs?.length) {
    merged.paragraphs = partial.paragraphs;
  }

  if (partial.bodyHtml) {
    merged.bodyHtml = partial.bodyHtml;
  }

  if (partial.image) {
    merged.image = partial.image;
  }

  return merged;
}

async function fetchAboutUsNodes(language) {
  const baseOptions = {
    include: INCLUDE,
    sort: 'created',
    limit: 100,
  };

  const extractNodes = (response) => ({
    nodes: Array.isArray(response?.data) ? response.data : response?.data ? [response.data] : [],
    included: response?.included || [],
  });

  if (language) {
    try {
      const localized = await getNodes(CONTENT_TYPE, {
        ...baseOptions,
        lang: language,
        filters: { 'filter[langcode]': language },
      });
      const localizedResult = extractNodes(localized);
      if (localizedResult.nodes.length) return localizedResult;
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

export async function fetchAboutUsSections(language, fallbackSections = {}) {
  try {
    const { nodes, included } = await fetchAboutUsNodes(language);
    if (!nodes.length) return fallbackSections;

    const nextSections = { ...fallbackSections };

    nodes.forEach((node) => {
      const mapped = mapNodeToPartialSection(node, included);
      if (!mapped) return;

      const { sectionId, partial } = mapped;
      nextSections[sectionId] = mergeAboutSection(
        sectionId,
        nextSections[sectionId] || fallbackSections[sectionId] || {},
        partial,
        fallbackSections,
      );
    });

    return nextSections;
  } catch {
    return fallbackSections;
  }
}
