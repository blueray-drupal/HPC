import { useState } from 'react';
import { Star } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation.js';
import './PageRating.css';

const RATING_LEVEL_KEYS = {
  1: 'home.pageRating.level1',
  2: 'home.pageRating.level2',
  3: 'home.pageRating.level3',
  4: 'home.pageRating.level4',
  5: 'home.pageRating.level5',
};

export default function PageRating() {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const activeRating = hoverRating || rating;

  return (
    <section className="page-rating" aria-labelledby="page-rating-title">
      <div className="page-rating__inner">
        <h2 id="page-rating-title" className="page-rating__title">
          {t('home.pageRating.title')}
        </h2>

        <p className="page-rating__question">{t('home.pageRating.question')}</p>

        <div
          className="page-rating__stars"
          role="radiogroup"
          aria-label={t('home.pageRating.groupAria')}
          onMouseLeave={() => setHoverRating(0)}
        >
          {Array.from({ length: 5 }, (_, index) => {
            const value = index + 1;
            const isActive = value <= activeRating;
            const levelLabel = t(RATING_LEVEL_KEYS[value]);

            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={rating === value}
                aria-label={`${value} ${t('home.pageRating.ofFive')} - ${levelLabel}`}
                className={['page-rating__star', isActive ? 'is-active' : ''].join(' ')}
                onMouseEnter={() => setHoverRating(value)}
                onFocus={() => setHoverRating(value)}
                onBlur={() => setHoverRating(0)}
                onClick={() => setRating(value)}
              >
                <Star
                  size={32}
                  strokeWidth={1.5}
                  fill={isActive ? 'currentColor' : 'none'}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>

        <p className="page-rating__hint">{t('home.pageRating.hint')}</p>
      </div>
    </section>
  );
}
