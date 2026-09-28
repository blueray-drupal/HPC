import { useEffect, useMemo, useState } from 'react';

import { useDrupalFetch } from '@/hooks/useDrupalFetch.js';

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

      title={USEFUL_LINKS_PAGE.title}

      breadcrumbs={USEFUL_LINKS_PAGE.breadcrumbs}

      shareUrl={USEFUL_LINKS_PAGE.shareUrl}

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

