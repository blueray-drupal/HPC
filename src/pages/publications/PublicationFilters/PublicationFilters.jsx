import { Search } from 'lucide-react';
import '../../../components/PageFilters/PageFilters.css';
import { PUBLICATION_YEARS } from '../publicationsListData.js';

export default function PublicationFilters({
  classification,
  year,
  query,
  onClassificationChange,
  onYearChange,
  onQueryChange,
  onSubmit,
}) {
  return (
    <form className="page-filters" onSubmit={onSubmit} aria-label="تصفية الإصدارات">
      <div className="page-filters__field">
        <label className="page-filters__label" htmlFor="publication-classification">
          التصنيف
        </label>
        <select
          id="publication-classification"
          className="page-filters__select"
          value={classification}
          onChange={(event) => onClassificationChange(event.target.value)}
        >
          <option value="">- الكل -</option>
        </select>
      </div>

      <div className="page-filters__field">
        <label className="page-filters__label" htmlFor="publication-year">
          سنة الإصدار
        </label>
        <select
          id="publication-year"
          className="page-filters__select"
          value={year}
          onChange={(event) => onYearChange(event.target.value)}
        >
          <option value="">- الكل -</option>
          {PUBLICATION_YEARS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="page-filters__field page-filters__field--grow">
        <label className="page-filters__label" htmlFor="publication-search">
          البحث عن عنوان
        </label>
        <input
          id="publication-search"
          type="search"
          className="page-filters__input"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="...اكتب للبحث"
        />
      </div>

      <button type="submit" className="page-filters__submit">
        <Search size={16} aria-hidden="true" />
        <span>بحث</span>
      </button>
    </form>
  );
}
