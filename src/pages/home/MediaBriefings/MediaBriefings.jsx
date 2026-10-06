import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useDrupalFetch } from '@/hooks/useDrupalFetch.js';
import { useTranslation } from '@/i18n/useTranslation.js';
import { fetchMediaBriefings } from '@/services/api/mediaBriefings.js';
import { MEDIA_BRIEFINGS_FALLBACK } from '@/pages/media/briefings/briefingsData.js';
import './MediaBriefings.css';

function CalendarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none" aria-hidden="true">
      <path
        d="M1.16667 11.6667C0.845833 11.6667 0.571181 11.5524 0.342708 11.324C0.114236 11.0955 0 10.8208 0 10.5V2.33333C0 2.0125 0.114236 1.73785 0.342708 1.50937C0.571181 1.2809 0.845833 1.16667 1.16667 1.16667H1.75V0H2.91667V1.16667H7.58333V0H8.75V1.16667H9.33333C9.65417 1.16667 9.92882 1.2809 10.1573 1.50937C10.3858 1.73785 10.5 2.0125 10.5 2.33333V10.5C10.5 10.8208 10.3858 11.0955 10.1573 11.324C9.92882 11.5524 9.65417 11.6667 9.33333 11.6667H1.16667ZM1.16667 10.5H9.33333V4.66667H1.16667V10.5ZM1.16667 3.5H9.33333V2.33333H1.16667V3.5ZM1.16667 3.5V2.33333V3.5Z"
        fill="#A9362D"
      />
    </svg>
  );
}

const AUTO_PLAY_MS = 8000;

export default function MediaBriefings() {
  const { t } = useTranslation();
  const { data, loading } = useDrupalFetch((lang) =>
    fetchMediaBriefings(lang).catch(() => MEDIA_BRIEFINGS_FALLBACK),
  );
  const briefings = data?.length ? data : loading ? [] : MEDIA_BRIEFINGS_FALLBACK;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [data]);

  useEffect(() => {
    if (briefings.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % briefings.length);
    }, AUTO_PLAY_MS);

    return () => window.clearInterval(timer);
  }, [activeIndex, briefings.length]);

  if (loading || !briefings.length) return null;

  const item = briefings[activeIndex];

  return (
    <section className="media-briefings" aria-labelledby="media-briefings-title">
      <h2 id="media-briefings-title" className="media-briefings__heading">
        {t('pages.mediaBriefings')}
      </h2>

      <article className="media-briefings__card">
        <div className="media-briefings__image-wrap">
          <img src={item.image} alt="" className="media-briefings__image" />
        </div>

        <div className="media-briefings__content">
          <time className="media-briefings__date" dateTime={item.dateTime}>
            <CalendarIcon />
            <span>{item.date}</span>
          </time>

          <h3 className="media-briefings__title">{item.title}</h3>
          <p className="media-briefings__description">{item.description}</p>

          <Link to={item.link} className="media-briefings__cta hpc-icon-trailing">
            <ChevronLeft size={18} aria-hidden="true" />
            <span>{t('common.readMore')}</span>
          </Link>
        </div>
      </article>

      {briefings.length > 1 ? (
        <div className="media-briefings__dots" role="tablist" aria-label={t('pages.mediaBriefings')}>
          {briefings.map((briefing, index) => (
            <button
              key={briefing.id}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`${t('home.mediaBriefings.briefingTab')} ${index + 1}`}
              className={['media-briefings__dot', index === activeIndex ? 'is-active' : ''].join(' ')}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
