import { useDrupalFetch } from '@/hooks/useDrupalFetch.js';

import { fetchLegalPageContent } from '@/services/api/legalPages.js';

import InfoPageLayout from './InfoPageLayout.jsx';

import LegalContent from './LegalContent.jsx';



export default function LegalPageView({ pageKey, pageMeta, fallback }) {

  const { data, loading } = useDrupalFetch(

    (lang) => fetchLegalPageContent(lang, pageKey, fallback),

    [pageKey],

  );

  const content = data ?? fallback;



  return (

    <InfoPageLayout

      title={pageMeta.title}

      breadcrumbs={pageMeta.breadcrumbs}

      shareUrl={pageMeta.shareUrl}

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

