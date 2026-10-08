import { Search } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation.js';
import '../../../components/PageFilters/PageFilters.css';
export default function PublicationFilters({
  classification,
  year,
  query,
  yearOptions = [],
  onClassificationChange,
  onYearChange,
  onQueryChange,
  onSubmit,
}) {
  const { t } = useTranslation();

  return (
    <form className="page-filters" onSubmit={onSubmit} aria-label={t('publications.filtersAria')}>
      <div className="page-filters__field">
        <label className="page-filters__label" htmlFor="publication-classification">
          {t('publications.filterClassification')}
        </label>
        <select
          id="publication-classification"
          className="page-filters__select"
          value={classification}
          onChange={(event) => onClassificationChange(event.target.value)}
        >
          <option value="">{t('common.filterAll')}</option>
        </select>
      </div>

      <div className="page-filters__field">
        <label className="page-filters__label" htmlFor="publication-year">
          {t('publications.filterYear')}
        </label>
        <select
          id="publication-year"
          className="page-filters__select"
          value={year}
          onChange={(event) => onYearChange(event.target.value)}
        >
          <option value="">{t('common.filterAll')}</option>
          {yearOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="page-filters__field page-filters__field--grow">
        <label className="page-filters__label" htmlFor="publication-search">
          {t('publications.filterSearchTitle')}
        </label>
        <input
          id="publication-search"
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
