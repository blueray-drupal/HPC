import { SEARCH_CONTENT_TYPES, SEARCH_YEARS } from '../searchData.js';
import './SearchFilters.css';

export default function SearchFilters({
  selectedTypes,
  selectedYear,
  onTypeChange,
  onYearChange,
  onApply,
  onClear,
}) {
  return (
    <aside className="search-filters" aria-label="تصفية نتائج البحث">
      <div className="search-filters__header">
        <h2 className="search-filters__title">تصفية النتائج</h2>
        <button type="button" className="search-filters__clear" onClick={onClear}>
          مسح الكل
        </button>
      </div>

      <div className="search-filters__section">
        <h3 className="search-filters__label">نوع المحتوى</h3>
        <ul className="search-filters__checkboxes">
          {SEARCH_CONTENT_TYPES.map((type) => (
            <li key={type.id}>
              <label className="search-filters__checkbox">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type.id)}
                  onChange={() => onTypeChange(type.id)}
                />
                <span className="search-filters__checkbox-box" aria-hidden="true" />
                <span>{type.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="search-filters__section">
        <label className="search-filters__label" htmlFor="search-year">
          سنة النشر
        </label>
        <select
          id="search-year"
          className="search-filters__select"
          value={selectedYear}
          onChange={(event) => onYearChange(event.target.value)}
        >
          <option value="">الكل</option>
          {SEARCH_YEARS.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <button type="button" className="search-filters__apply" onClick={onApply}>
        تطبيق الفلاتر
      </button>
    </aside>
  );
}
