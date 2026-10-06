import { Search } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation.js';
import '../../../../components/PageFilters/PageFilters.css';

export default function NewsFilters({
  categories = [],
  years = [],
  category,
  year,
  query,
  onCategoryChange,
  onYearChange,
  onQueryChange,
  onSubmit,
}) {
  const { t } = useTranslation();

  return (
    <form className="page-filters" onSubmit={onSubmit} aria-label={t('news.filtersAria')}>
      <div className="page-filters__field">
        <label className="page-filters__label" htmlFor="news-category">
          {t('news.filterCategory')}
        </label>
        <select
          id="news-category"
          className="page-filters__select"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <option value="">{t('common.filterAll')}</option>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="page-filters__field">
        <label className="page-filters__label" htmlFor="news-year">
          {t('news.filterYear')}
        </label>
        <select
          id="news-year"
          className="page-filters__select"
          value={year}
          onChange={(event) => onYearChange(event.target.value)}
        >
          <option value="">{t('common.filterAll')}</option>
          {years.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="page-filters__field page-filters__field--grow">
        <label className="page-filters__label" htmlFor="news-search">
          {t('news.filterSearchTitle')}
        </label>
        <input
          id="news-search"
          type="search"
          className="page-filters__input"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={t('common.searchPlaceholder')}
        />
      </div>

      <button type="submit" className="page-filters__submit">
        <Search size={16} aria-hidden="true" />
        <span>{t('common.search')}</span>
      </button>
    </form>
  );
}
