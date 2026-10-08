import { useMemo, useState } from 'react';
import { useDrupalFetch } from '@/hooks/useDrupalFetch.js';
import { useLanguage } from '@/hooks/useLanguage.js';
import { getSimpleInnerHeroMeta } from '@/i18n/innerHero.js';
import { useTranslation } from '@/i18n/useTranslation.js';
import { fetchTenders } from '@/services/api/tenders.js';
import AboutShareBar from '../about-us/AboutShareBar/AboutShareBar.jsx';
import InnerHero from '../about-us/InnerHero/InnerHero.jsx';
import TendersFilters from './TendersFilters/TendersFilters.jsx';
import TendersGrid from './TendersGrid/TendersGrid.jsx';
import { filterTenders } from './tendersData.js';
import './Tenders.css';

export default function Tenders() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const hero = useMemo(() => getSimpleInnerHeroMeta(language, 'nav.tenders'), [language]);

  const { data, loading } = useDrupalFetch((lang) => fetchTenders(lang));

  const items = Array.isArray(data) ? data : [];

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [appliedName, setAppliedName] = useState('');
  const [appliedNumber, setAppliedNumber] = useState('');

  const filteredItems = useMemo(
    () => filterTenders(items, { name: appliedName, number: appliedNumber }),
    [items, appliedName, appliedNumber],
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setAppliedName(name);
    setAppliedNumber(number);
  };

  return (
    <div className="tenders-page">
      <InnerHero
        title={hero.title}
        breadcrumbs={hero.breadcrumbs}
        backgroundImage={hero.heroImage}
      />

      <div className="tenders-page__body">
        <div className="tenders-page__inner">
          <TendersFilters
            name={name}
            number={number}
            onNameChange={setName}
            onNumberChange={setNumber}
            onSubmit={handleSubmit}
          />

          {loading ? (
            <p className="tenders-page__loading" role="status">
              {t('tenders.loading')}
            </p>
          ) : (
            <TendersGrid items={filteredItems} emptyLabel={t('tenders.emptyResults')} />
          )}
        </div>
      </div>

      <div className="tenders-page__share-wrap">
        <AboutShareBar shareUrl="/tenders" />
      </div>
    </div>
  );
}
