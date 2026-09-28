import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDrupalFetch } from '@/hooks/useDrupalFetch.js';
import { fetchPublicationsByCategory } from '@/services/api/publications.js';
import PublicationFilters from '../PublicationFilters/PublicationFilters.jsx';
import { PublicationSectionHeaderIcon } from '../PublicationTabs/PublicationTabIcons.jsx';
import PublicationsGrid from '../PublicationsGrid/PublicationsGrid.jsx';
import PublicationsPagination from '../PublicationsPagination/PublicationsPagination.jsx';
import {
  filterPublications,
  getPublicationsByCategory,
  paginatePublications,
  PUBLICATIONS_PER_PAGE,
} from '../publicationsListData.js';
import './PublicationCategoryContent.css';

export default function PublicationCategoryContent({ category }) {
  const { categorySlug } = useParams();
  const fallbackPublications = useMemo(
    () => getPublicationsByCategory(category.id),
    [category.id],
  );
  const { data, loading } = useDrupalFetch(
    (lang) => fetchPublicationsByCategory(lang, category.id, fallbackPublications),
    [category.id],
  );
  const categoryPublications = data ?? fallbackPublications;
  const [classification, setClassification] = useState('');
  const [year, setYear] = useState('');
  const [query, setQuery] = useState('');
  const [appliedYear, setAppliedYear] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setClassification('');
    setYear('');
    setQuery('');
    setAppliedYear('');
    setAppliedQuery('');
    setCurrentPage(1);
  }, [categorySlug]);

  const filteredPublications = useMemo(
    () => filterPublications(categoryPublications, { year: appliedYear, query: appliedQuery }),
    [categoryPublications, appliedYear, appliedQuery],
  );

  const pagination = useMemo(
    () => paginatePublications(filteredPublications, currentPage, PUBLICATIONS_PER_PAGE),
    [filteredPublications, currentPage],
  );

  useEffect(() => {
    if (currentPage > pagination.totalPages) {
      setCurrentPage(pagination.totalPages);
    }
  }, [currentPage, pagination.totalPages]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setAppliedYear(year);
    setAppliedQuery(query);
    setCurrentPage(1);
  };

  return (
    <section className="publication-category-content" aria-labelledby="publication-category-title">
      <div className="publication-category-content__inner">
        <header className="publication-category-content__header">
          <div className="publication-category-content__header-row">
            <PublicationSectionHeaderIcon name={category.icon} />
            <h2 id="publication-category-title" className="publication-category-content__title">
              {category.title}
            </h2>
          </div>
          <span className="publication-category-content__header-line" aria-hidden="true" />
        </header>

        <PublicationFilters
          classification={classification}
          year={year}
          query={query}
          onClassificationChange={setClassification}
          onYearChange={setYear}
          onQueryChange={setQuery}
          onSubmit={handleSubmit}
        />

        {!loading ? (
          <>
            <PublicationsGrid items={pagination.items} />

            <PublicationsPagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : null}
      </div>
    </section>
  );
}
