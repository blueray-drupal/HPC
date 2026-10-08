import { useMemo } from 'react';
import { useDrupalFetch } from '@/hooks/useDrupalFetch.js';
import { useLanguage } from '@/hooks/useLanguage.js';
import { getInfoPageHeroMeta } from '@/i18n/innerHero.js';

import { fetchFaqItems } from '@/services/api/faq.js';
import { localizedStaticFallback } from '@/services/api/languageContent.js';

import InfoPageLayout from '../InfoPageLayout.jsx';

import FaqAccordion from './FaqAccordion.jsx';

import { FAQ_PAGE } from './faqData.js';



export default function FaqPage() {
  const { language } = useLanguage();
  const hero = useMemo(() => getInfoPageHeroMeta(language, FAQ_PAGE), [language]);

  const { data, loading } = useDrupalFetch((lang) =>
    fetchFaqItems(lang, localizedStaticFallback(lang, FAQ_PAGE.items) ?? []),
  );

  const items = data ?? localizedStaticFallback(language, FAQ_PAGE.items) ?? [];



  return (

    <InfoPageLayout

      title={hero.title}

      breadcrumbs={hero.breadcrumbs}

      shareUrl={hero.shareUrl}

    >

      {!loading ? <FaqAccordion items={items} /> : null}

    </InfoPageLayout>

  );

}

