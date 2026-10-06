import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import AboutShareBar from '../../about-us/AboutShareBar/AboutShareBar.jsx';
import InnerHero from '../../about-us/InnerHero/InnerHero.jsx';
import { useLanguage } from '@/hooks/useLanguage.js';
import { fetchMediaBriefingById } from '@/services/api/mediaBriefings.js';
import { buildHeroBreadcrumbs, INNER_HERO_BACKGROUND } from '@/i18n/innerHero.js';
import { getBriefingBody, getBriefingById } from './briefingsData.js';
import '../news/NewsDetail/NewsDetail.css';

function BackArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
      <path
        d="M2.62969 6.1875L6.47969 10.0375L5.5 11L0 5.5L5.5 0L6.47969 0.9625L2.62969 4.8125H11V6.1875H2.62969Z"
        fill="#F3F9FF"
      />
    </svg>
  );
}

export default function MediaBriefingDetail() {
  const { id } = useParams();
  const { language } = useLanguage();
  const [briefing, setBriefing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);

    fetchMediaBriefingById(id, language)
      .then((item) => {
        if (cancelled) return;
        setBriefing(item || getBriefingById(id));
      })
      .catch(() => {
        if (!cancelled) setBriefing(getBriefingById(id));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id, language]);

  const heroBreadcrumbs = useMemo(
    () =>
      briefing
        ? buildHeroBreadcrumbs(language, [
            { key: 'common.home', to: '/' },
            { key: 'pages.mediaBriefings' },
            { label: briefing.title },
          ])
        : [],
    [language, briefing],
  );

  if (loading) {
    return null;
  }

  if (!briefing) {
    return <Navigate to="/" replace />;
  }

  const paragraphs = getBriefingBody(briefing);

  return (
    <div className="news-detail-page news-detail-page--briefing">
      <InnerHero
        title={briefing.title}
        breadcrumbs={heroBreadcrumbs}
        backgroundImage={INNER_HERO_BACKGROUND}
      />

      <div className="news-detail-page__content">
        <article className="news-detail__box">
          <header className="news-detail__header">
            <div className="news-detail__meta">
              <span className="news-detail__category">{briefing.categoryLabel}</span>
              <time className="news-detail__date" dateTime={briefing.dateTime}>
                {briefing.displayDate ?? briefing.date}
              </time>
            </div>

            <h1 className="news-detail__title">{briefing.title}</h1>
          </header>

          <div className="news-detail__image-wrap">
            <img src={briefing.image} alt="" className="news-detail__image" />
          </div>

          {briefing.bodyHtml ? (
            <div
              className="news-detail__body news-detail__body--html"
              dangerouslySetInnerHTML={{ __html: briefing.bodyHtml }}
            />
          ) : (
            <div className="news-detail__body">
              {paragraphs.map((paragraph) => (
                <p key={paragraph} className="news-detail__paragraph">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </article>

        <Link to="/" className="news-detail__back">
          <BackArrowIcon />
          <span>رجوع</span>
        </Link>
      </div>

      <div className="news-detail-page__share-wrap">
        <AboutShareBar shareUrl={briefing.link} ariaLabel="مشاركة الإحاطة" />
      </div>
    </div>
  );
}
