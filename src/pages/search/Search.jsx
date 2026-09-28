import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AboutShareBar from '../about-us/AboutShareBar/AboutShareBar.jsx';
import { searchSite } from '@/services/api/siteSearch.js';
import SearchFilters from './SearchFilters/SearchFilters.jsx';
import SearchResults from './SearchResults/SearchResults.jsx';
import './Search.css';

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M7.875 13.5C11.0533 13.5 13.625 10.9283 13.625 7.75C13.625 4.57167 11.0533 2 7.875 2C4.69667 2 2.125 4.57167 2.125 7.75C2.125 10.9283 4.69667 13.5 7.875 13.5Z"
        stroke="#94A3B8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.125 12.125L16 16"
        stroke="#94A3B8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const inputRef = useRef(null);

  const [inputValue, setInputValue] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);
  const [draftTypes, setDraftTypes] = useState([]);
  const [draftYear, setDraftYear] = useState('');
  const [appliedTypes, setAppliedTypes] = useState([]);
  const [appliedYear, setAppliedYear] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const nextQuery = searchParams.get('q') || '';
    setInputValue(nextQuery);
    setQuery(nextQuery);
  }, [searchParams]);

  useEffect(() => {
    if (!query.trim()) {
      setLoading(false);
      return undefined;
    }

    setLoading(true);
    const timer = window.setTimeout(() => setLoading(false), 150);
    return () => window.clearTimeout(timer);
  }, [query, appliedTypes, appliedYear]);

  const results = useMemo(
    () =>
      searchSite(query, {
        contentTypes: appliedTypes,
        year: appliedYear,
      }),
    [query, appliedTypes, appliedYear],
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const term = inputValue.trim();

    if (term) {
      setSearchParams({ q: term });
    } else {
      setSearchParams({});
    }
  };

  const toggleDraftType = (typeId) => {
    setDraftTypes((current) =>
      current.includes(typeId)
        ? current.filter((item) => item !== typeId)
        : [...current, typeId],
    );
  };

  const handleApplyFilters = () => {
    setAppliedTypes(draftTypes);
    setAppliedYear(draftYear);
  };

  const handleClearFilters = () => {
    setDraftTypes([]);
    setDraftYear('');
    setAppliedTypes([]);
    setAppliedYear('');
  };

  return (
    <div className="search-page">
      <div className="search-page__inner">
        <form className="search-page__form" onSubmit={handleSubmit} aria-label="البحث في الموقع">
          <div className="search-page__input-wrap">
            <SearchIcon />
            <input
              ref={inputRef}
              type="search"
              className="search-page__input"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="من نحن"
              aria-label="كلمة البحث"
            />
            <button type="submit" className="search-page__submit">
              بحث
            </button>
          </div>
        </form>

        <div className="search-page__layout">
          <SearchFilters
            selectedTypes={draftTypes}
            selectedYear={draftYear}
            onTypeChange={toggleDraftType}
            onYearChange={setDraftYear}
            onApply={handleApplyFilters}
            onClear={handleClearFilters}
          />

          <SearchResults items={results} query={query} loading={loading} />
        </div>
      </div>

      <div className="search-page__share-wrap">
        <AboutShareBar />
      </div>
    </div>
  );
}
