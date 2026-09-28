import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDrupalFetch } from '@/hooks/useDrupalFetch.js';
import { fetchPartnersSection } from '@/services/api/partnersSection.js';
import { PARTNER_TABS, PARTNERS_BY_TAB_FALLBACK } from './partnersSectionData.js';
import './PartnersSection.css';

const CARDS_PER_SLIDE = 4;

async function fetchPartnersData(language) {
  try {
    return await fetchPartnersSection(language, PARTNER_TABS);
  } catch {
    return { tabs: PARTNER_TABS, partnersByTab: PARTNERS_BY_TAB_FALLBACK };
  }
}

export default function PartnersSection() {
  const { data, loading } = useDrupalFetch(fetchPartnersData);
  const tabs = data?.tabs ?? PARTNER_TABS;
  const partnersByTab = data?.partnersByTab ?? PARTNERS_BY_TAB_FALLBACK;
  const [activeTab, setActiveTab] = useState(PARTNER_TABS[0]?.id || 'institutions');
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (!tabs.some((tab) => tab.id === activeTab)) {
      setActiveTab(tabs[0]?.id || 'institutions');
    }
  }, [tabs, activeTab]);

  const items = useMemo(
    () => partnersByTab[activeTab] || [],
    [partnersByTab, activeTab],
  );

  const slidesCount = Math.max(1, Math.ceil(items.length / CARDS_PER_SLIDE));
  const visibleItems = items.slice(
    slideIndex * CARDS_PER_SLIDE,
    slideIndex * CARDS_PER_SLIDE + CARDS_PER_SLIDE,
  );

  useEffect(() => {
    setSlideIndex(0);
  }, [activeTab]);

  useEffect(() => {
    if (slideIndex > slidesCount - 1) {
      setSlideIndex(Math.max(slidesCount - 1, 0));
    }
  }, [slideIndex, slidesCount]);

  const goToPrev = () => {
    setSlideIndex((current) => (current - 1 + slidesCount) % slidesCount);
  };

  const goToNext = () => {
    setSlideIndex((current) => (current + 1) % slidesCount);
  };

  const hasAnyPartners = Object.values(partnersByTab).some((list) => list.length);
  if (loading || !hasAnyPartners) return null;

  return (
    <section className="partners-section" aria-label="الشركاء والمؤسسات ذات الصلة">
      <div className="partners-section__inner">
        <div className="partners-section__tabs" role="tablist" aria-label="تصنيف الشركاء">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={[
                'partners-section__tab',
                activeTab === tab.id ? 'is-active' : '',
              ].join(' ')}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="partners-section__carousel">
          <button
            type="button"
            className="partners-section__arrow"
            aria-label="الشريحة السابقة"
            onClick={goToPrev}
            disabled={slidesCount <= 1}
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>

          <div className="partners-section__viewport">
            <div className="partners-section__cards">
              {visibleItems.map((item) =>
                item.link ? (
                  <a
                    key={item.id}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="partners-section__card"
                    aria-label={item.name}
                  >
                    <img src={item.logo} alt={item.name} className="partners-section__logo" />
                  </a>
                ) : (
                  <article key={item.id} className="partners-section__card" aria-label={item.name}>
                    <img src={item.logo} alt={item.name} className="partners-section__logo" />
                  </article>
                ),
              )}
            </div>
          </div>

          <button
            type="button"
            className="partners-section__arrow"
            aria-label="الشريحة التالية"
            onClick={goToNext}
            disabled={slidesCount <= 1}
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>

        {slidesCount > 1 ? (
          <div className="partners-section__dots" role="tablist" aria-label="شرائح الشركاء">
            {Array.from({ length: slidesCount }, (_, index) => (
              <button
                key={`${activeTab}-${index}`}
                type="button"
                role="tab"
                aria-selected={index === slideIndex}
                aria-label={`الشريحة ${index + 1}`}
                className={['partners-section__dot', index === slideIndex ? 'is-active' : ''].join(' ')}
                onClick={() => setSlideIndex(index)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
