import { useMemo } from 'react';
import AboutShareBar from '../about-us/AboutShareBar/AboutShareBar.jsx';
import InnerHero from '../about-us/InnerHero/InnerHero.jsx';
import { useDrupalFetch } from '@/hooks/useDrupalFetch.js';
import { useLanguage } from '@/hooks/useLanguage.js';
import { getSimpleInnerHeroMeta } from '@/i18n/innerHero.js';
import { fetchDemographicIndicators } from '@/services/api/demographicIndicators.js';
import DemographicPdfList from './DemographicPdfList/DemographicPdfList.jsx';
import { DEMOGRAPHIC_PDF_ITEMS_FALLBACK } from './demographicIndicatorsData.js';
import './DemographicIndicators.css';

export default function DemographicIndicators() {
  const { language } = useLanguage();
  const hero = useMemo(
    () => getSimpleInnerHeroMeta(language, 'pages.demographicIndicators'),
    [language],
  );

  const { data, loading } = useDrupalFetch(async (lang) => {
    const results = await fetchDemographicIndicators(lang);
    return results.length ? results : DEMOGRAPHIC_PDF_ITEMS_FALLBACK;
  });
  const items = data ?? DEMOGRAPHIC_PDF_ITEMS_FALLBACK;

  return (
    <div className="demographic-indicators-page">
      <InnerHero
        title={hero.title}
        breadcrumbs={hero.breadcrumbs}
        backgroundImage={hero.heroImage}
      />

      <section className="demographic-indicators-page__content" aria-label="ملفات مؤشرات ديموغرافية">
        {!loading ? <DemographicPdfList items={items} /> : null}
      </section>

      <div className="demographic-indicators-page__share-wrap">
        <AboutShareBar />
      </div>
    </div>
  );
}
