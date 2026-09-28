import { useDrupalFetch } from '@/hooks/useDrupalFetch.js';

import { fetchFaqItems } from '@/services/api/faq.js';

import InfoPageLayout from '../InfoPageLayout.jsx';

import FaqAccordion from './FaqAccordion.jsx';

import { FAQ_PAGE } from './faqData.js';



export default function FaqPage() {

  const { data, loading } = useDrupalFetch((lang) => fetchFaqItems(lang, FAQ_PAGE.items));

  const items = data ?? FAQ_PAGE.items;



  return (

    <InfoPageLayout

      title={FAQ_PAGE.title}

      breadcrumbs={FAQ_PAGE.breadcrumbs}

      shareUrl={FAQ_PAGE.shareUrl}

    >

      {!loading ? <FaqAccordion items={items} /> : null}

    </InfoPageLayout>

  );

}

