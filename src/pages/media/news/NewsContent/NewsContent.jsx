import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage.js';
import { useDrupalFetch } from '@/hooks/useDrupalFetch.js';
import { getMediaSectionTitle } from '@/i18n/navigation.js';
import { fetchNews, fetchNewsCategories } from '@/services/api/news.js';
import PublicationsPagination from '../../../publications/PublicationsPagination/PublicationsPagination.jsx';
import { MediaSectionHeaderIcon } from '../../MediaTabs/MediaTabIcons.jsx';
import NewsFilters from '../NewsFilters/NewsFilters.jsx';
import NewsGrid from '../NewsGrid/NewsGrid.jsx';
import {
  filterNews,
  NEWS_CATEGORIES,
  NEWS_ITEMS_FALLBACK,
  NEWS_PER_PAGE,
  NEWS_YEARS,
  paginateNews,
} from '../newsListData.js';
import './NewsContent.css';

function buildFallbackCategories() {
  return [...new Set(NEWS_ITEMS_FALLBACK.map((item) => item.category).filter(Boolean))].map(
    (name) => ({ id: name, name }),
  );
}

function extractYears(items) {
  return [...new Set(items.map((item) => String(item.year)).filter(Boolean))].sort(
    (a, b) => Number(b) - Number(a),
  );
}

async function fetchNewsPageData(language) {
  try {
    const [items, terms] = await Promise.all([fetchNews(language), fetchNewsCategories(language)]);
    return {
      items: items.length ? items : NEWS_ITEMS_FALLBACK,
      categories: terms.length ? terms : buildFallbackCategories(),
    };
  } catch {
    return {
      items: NEWS_ITEMS_FALLBACK,
      categories: buildFallbackCategories(),
    };
  }
}

export default function NewsContent() {
  const { language } = useLanguage();
  const sectionTitle = getMediaSectionTitle(language, 'news');
  const { data, loading } = useDrupalFetch(fetchNewsPageData);
  const newsItems = data?.items ?? NEWS_ITEMS_FALLBACK;
  const categories = data?.categories ?? buildFallbackCategories();
  const [category, setCategory] = useState('');
  const [year, setYear] = useState('');
  const [query, setQuery] = useState('');
  const [appliedCategory, setAppliedCategory] = useState('');
  const [appliedYear, setAppliedYear] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const years = useMemo(() => {
    const dynamicYears = extractYears(newsItems);
    return dynamicYears.length ? dynamicYears : NEWS_YEARS;
  }, [newsItems]);

  const filteredNews = useMemo(
    () => filterNews(newsItems, { category: appliedCategory, year: appliedYear, query: appliedQuery }),
    [newsItems, appliedCategory, appliedYear, appliedQuery],
  );

  const pagination = useMemo(
    () => paginateNews(filteredNews, currentPage, NEWS_PER_PAGE),
    [filteredNews, currentPage],
  );

  useEffect(() => {
    if (currentPage > pagination.totalPages) {
      setCurrentPage(pagination.totalPages);
    }
  }, [currentPage, pagination.totalPages]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setAppliedCategory(category);
    setAppliedYear(year);
    setAppliedQuery(query);
    setCurrentPage(1);
  };

  const categoryOptions = categories.length ? categories : NEWS_CATEGORIES.map((name) => ({ id: name, name }));

  return (
    <section className="news-content" aria-labelledby="news-section-title">
      <div className="news-content__inner">
        <header className="news-content__header">
          <div className="news-content__header-row">
            <MediaSectionHeaderIcon name="news" />
            <h2 id="news-section-title" className="news-content__title">
              {sectionTitle}
            </h2>
          </div>
          <span className="news-content__header-line" aria-hidden="true" />
        </header>

        {!loading ? (
          <>
            <NewsFilters
              categories={categoryOptions}
              years={years}
              category={category}
              year={year}
              query={query}
              onCategoryChange={setCategory}
              onYearChange={setYear}
              onQueryChange={setQuery}
              onSubmit={handleSubmit}
            />

            <NewsGrid items={pagination.items} />

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
