import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage.js';
import { getMediaSectionTitle } from '@/i18n/navigation.js';
import { MediaSectionHeaderIcon } from '../../MediaTabs/MediaTabIcons.jsx';
import NewsFilters from '../../news/NewsFilters/NewsFilters.jsx';
import { INTERNATIONAL_DAYS_INTRO } from '../internationalDaysData.js';
import './InternationalDaysContent.css';

function ReadMoreArrow() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3.825 7H16V9H3.825L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7Z" fill="currentColor" />
    </svg>
  );
}

export default function InternationalDaysContent() {
  const { language } = useLanguage();
  const sectionTitle = getMediaSectionTitle(language, 'international-days');
  const [category, setCategory] = useState('');
  const [year, setYear] = useState('');
  const [query, setQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section className="international-days-content" aria-labelledby="international-days-title">
      <div className="international-days-content__inner">
        <header className="international-days-content__header">
          <div className="international-days-content__header-row">
            <MediaSectionHeaderIcon name="internationalDays" />
            <h2 id="international-days-title" className="international-days-content__title">
              {sectionTitle}
            </h2>
          </div>
          <span className="international-days-content__header-line" aria-hidden="true" />
        </header>

        <NewsFilters
          category={category}
          year={year}
          query={query}
          onCategoryChange={setCategory}
          onYearChange={setYear}
          onQueryChange={setQuery}
          onSubmit={handleSubmit}
        />

        <div className="international-days-content__panel">
          <div className="international-days-content__text">
            {INTERNATIONAL_DAYS_INTRO.paragraphs.map((paragraph) => (
              <p key={paragraph} className="international-days-content__paragraph">
                {paragraph}
              </p>
            ))}
          </div>

          <Link to={INTERNATIONAL_DAYS_INTRO.readMoreLink} className="international-days-content__read-more">
            <ReadMoreArrow />
            <span>{INTERNATIONAL_DAYS_INTRO.readMoreLabel}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
