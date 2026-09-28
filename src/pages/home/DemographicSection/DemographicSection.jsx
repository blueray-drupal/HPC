import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { DEMOGRAPHIC_BANNER, POPULATION_CLOCK } from './demographicData.js';
import './DemographicSection.css';

function formatPopulation(value) {
  return new Intl.NumberFormat('en-US').format(value);
}

export default function DemographicSection() {
  const [population, setPopulation] = useState(POPULATION_CLOCK.population);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPopulation((current) => current + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="demographic-section" aria-label="الساعة السكانية ومؤشرات ديموغرافية">
      <div className="demographic-section__grid">
        <article className="demographic-section__clock">
          <span className="demographic-section__circle demographic-section__circle--top-left" aria-hidden="true" />
          <span className="demographic-section__circle demographic-section__circle--bottom-right" aria-hidden="true" />

          <h2 className="demographic-section__clock-title">{POPULATION_CLOCK.title}</h2>
          <img
            src={POPULATION_CLOCK.clockImage}
            alt=""
            className="demographic-section__clock-image"
          />

          <p className="demographic-section__population-label">{POPULATION_CLOCK.populationLabel}</p>
          <p className="demographic-section__population-value">{formatPopulation(population)}</p>
          <p className="demographic-section__population-note">{POPULATION_CLOCK.populationSuffix}</p>

          <div className="demographic-section__daily-box">
            <p className="demographic-section__daily-value">{POPULATION_CLOCK.dailyIncrease}</p>
            <p className="demographic-section__daily-label">{POPULATION_CLOCK.dailyIncreaseLabel}</p>
          </div>
        </article>

        <article
          className="demographic-section__banner"
          style={{ backgroundImage: `url(${DEMOGRAPHIC_BANNER.image})` }}
        >
          <div className="demographic-section__banner-overlay" aria-hidden="true" />

          <div className="demographic-section__banner-content">
            <h2 className="demographic-section__banner-title">{DEMOGRAPHIC_BANNER.title}</h2>
            <Link to={DEMOGRAPHIC_BANNER.ctaLink} className="demographic-section__banner-cta hpc-icon-trailing">
              <ChevronLeft size={18} aria-hidden="true" />
              <span>{DEMOGRAPHIC_BANNER.ctaLabel}</span>
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
