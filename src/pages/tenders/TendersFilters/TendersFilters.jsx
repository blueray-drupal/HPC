import { Search } from 'lucide-react';
import '../../../components/PageFilters/PageFilters.css';

export default function TendersFilters({
  name,
  number,
  onNameChange,
  onNumberChange,
  onSubmit,
}) {
  return (
    <form className="page-filters" onSubmit={onSubmit} aria-label="تصفية العطاءات">
      <div className="page-filters__field page-filters__field--grow">
        <label className="page-filters__label" htmlFor="tender-name">
          اسم العطاء
        </label>
        <input
          id="tender-name"
          type="search"
          className="page-filters__input"
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          placeholder="...اكتب للبحث"
        />
      </div>

      <div className="page-filters__field page-filters__field--grow">
        <label className="page-filters__label" htmlFor="tender-number">
          رقم العطاء
        </label>
        <input
          id="tender-number"
          type="search"
          className="page-filters__input"
          value={number}
          onChange={(event) => onNumberChange(event.target.value)}
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
