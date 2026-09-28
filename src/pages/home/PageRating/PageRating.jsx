import { useState } from 'react';
import { Star } from 'lucide-react';
import './PageRating.css';

const RATING_LABELS = {
  1: 'ضعيف',
  2: 'مقبول',
  3: 'جيد',
  4: 'جيد جداً',
  5: 'ممتاز',
};

export default function PageRating() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const activeRating = hoverRating || rating;

  return (
    <section className="page-rating" aria-labelledby="page-rating-title">
      <div className="page-rating__inner">
        <h2 id="page-rating-title" className="page-rating__title">
          تقييم محتوى الصفحة
        </h2>

        <p className="page-rating__question">
          هل كانت المعلومات المقدمة في هذه الصفحة مفيدة؟
        </p>

        <div
          className="page-rating__stars"
          role="radiogroup"
          aria-label="تقييم محتوى الصفحة"
          onMouseLeave={() => setHoverRating(0)}
        >
          {Array.from({ length: 5 }, (_, index) => {
            const value = index + 1;
            const isActive = value <= activeRating;

            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={rating === value}
                aria-label={`${value} من 5 - ${RATING_LABELS[value]}`}
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

        <p className="page-rating__hint">
          اضغط على النجوم للتقييم (1=ضعيف، 5=ممتاز)
        </p>
      </div>
    </section>
  );
}
