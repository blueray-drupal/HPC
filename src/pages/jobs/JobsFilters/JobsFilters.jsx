import { Search } from 'lucide-react';
import '../../../components/PageFilters/PageFilters.css';

export default function JobsFilters({ title, onTitleChange, onSubmit }) {
  return (
    <form className="page-filters" onSubmit={onSubmit} aria-label="بحث الوظائف">
      <div className="page-filters__field page-filters__field--grow">
        <label className="page-filters__label" htmlFor="job-title">
          المسمى الوظيفي
        </label>
        <input
          id="job-title"
          type="search"
          className="page-filters__input"
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="اسم المهنة..."
        />
      </div>

      <button type="submit" className="page-filters__submit">
        <Search size={16} aria-hidden="true" />
        <span>بحث</span>
      </button>
    </form>
  );
}
