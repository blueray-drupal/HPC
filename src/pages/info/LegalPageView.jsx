import { useMemo } from 'react';
import { useDrupalFetch } from '@/hooks/useDrupalFetch.js';
import { useLanguage } from '@/hooks/useLanguage.js';
import { getInfoPageHeroMeta } from '@/i18n/innerHero.js';

import { fetchLegalPageContent } from '@/services/api/legalPages.js';
import { localizedStaticFallback } from '@/services/api/languageContent.js';

import InfoPageLayout from './InfoPageLayout.jsx';

import LegalContent from './LegalContent.jsx';



export default function LegalPageView({ pageKey, pageMeta, fallback }) {
  const { language } = useLanguage();
  const hero = useMemo(
    () => getInfoPageHeroMeta(language, pageMeta),
    [language, pageMeta],
  );

  const { data, loading } = useDrupalFetch(
    (lang) => fetchLegalPageContent(lang, pageKey, localizedStaticFallback(lang, fallback) ?? {}),
    [pageKey, fallback],
  );

  const content = data ?? localizedStaticFallback(language, fallback) ?? {};



  return (

    <InfoPageLayout

      title={hero.title}

      breadcrumbs={hero.breadcrumbs}

      shareUrl={hero.shareUrl}

    >

      {!loading ? (

        <LegalContent

          bodyHtml={content.bodyHtml}

          paragraphs={content.paragraphs}

          intro={content.intro}

          items={content.items}

        />

      ) : null}

    </InfoPageLayout>

  );

}

