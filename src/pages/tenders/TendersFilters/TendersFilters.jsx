import { Search } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation.js';
import '../../../components/PageFilters/PageFilters.css';

export default function TendersFilters({
  name,
  number,
  onNameChange,
  onNumberChange,
  onSubmit,
}) {
  const { t } = useTranslation();

  return (
    <form className="page-filters" onSubmit={onSubmit} aria-label={t('tenders.filtersAria')}>
      <div className="page-filters__field page-filters__field--grow">
        <label className="page-filters__label" htmlFor="tender-name">
          {t('tenders.filterName')}
        </label>
        <input
          id="tender-name"
          type="search"
          className="page-filters__input"
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          placeholder={t('common.searchPlaceholder')}
        />
      </div>

      <div className="page-filters__field page-filters__field--grow">
        <label className="page-filters__label" htmlFor="tender-number">
          {t('tenders.filterNumber')}
        </label>
        <input
          id="tender-number"
          type="search"
          className="page-filters__input"
          value={number}
          onChange={(event) => onNumberChange(event.target.value)}
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
