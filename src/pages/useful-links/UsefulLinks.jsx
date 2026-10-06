import { useEffect, useMemo, useState } from 'react';

import { useDrupalFetch } from '@/hooks/useDrupalFetch.js';
import { useLanguage } from '@/hooks/useLanguage.js';
import { getInfoPageHeroMeta } from '@/i18n/innerHero.js';

import { fetchUsefulLinks } from '@/services/api/usefulLinks.js';

import PublicationsPagination from '../publications/PublicationsPagination/PublicationsPagination.jsx';

import InfoPageLayout from '../info/InfoPageLayout.jsx';

import UsefulLinksGrid from './UsefulLinksGrid/UsefulLinksGrid.jsx';

import {

  paginateUsefulLinks,

  USEFUL_LINKS_ITEMS,

  USEFUL_LINKS_PAGE,

} from './usefulLinksData.js';

import './UsefulLinks.css';



export default function UsefulLinks() {
  const { language } = useLanguage();
  const hero = useMemo(() => getInfoPageHeroMeta(language, USEFUL_LINKS_PAGE), [language]);

  const { data, loading } = useDrupalFetch((lang) => fetchUsefulLinks(lang, USEFUL_LINKS_ITEMS));

  const items = data ?? USEFUL_LINKS_ITEMS;

  const [currentPage, setCurrentPage] = useState(1);



  const pagination = useMemo(

    () => paginateUsefulLinks(items, currentPage),

    [items, currentPage],

  );



  useEffect(() => {

    if (currentPage > pagination.totalPages) {

      setCurrentPage(pagination.totalPages);

    }

  }, [currentPage, pagination.totalPages]);



  return (

    <InfoPageLayout

      title={hero.title}

      breadcrumbs={hero.breadcrumbs}

      shareUrl={hero.shareUrl}

    >

      {!loading ? (

        <div className="useful-links-page">

          <UsefulLinksGrid items={pagination.items} />



          <PublicationsPagination

            currentPage={pagination.currentPage}

            totalPages={pagination.totalPages}

            onPageChange={setCurrentPage}

          />

        </div>

      ) : null}

    </InfoPageLayout>

  );

}

