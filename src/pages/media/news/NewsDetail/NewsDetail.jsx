import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import AboutShareBar from '../../../about-us/AboutShareBar/AboutShareBar.jsx';
import InnerHero from '../../../about-us/InnerHero/InnerHero.jsx';
import { useLanguage } from '@/hooks/useLanguage.js';
import { fetchNewsById } from '@/services/api/news.js';
import { buildHeroBreadcrumbs, INNER_HERO_BACKGROUND } from '@/i18n/innerHero.js';
import { translate, useTranslation } from '@/i18n/useTranslation.js';
import { getNewsBody, getNewsById } from '../newsListData.js';
import './NewsDetail.css';

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

export default function NewsDetail() {
  const { id } = useParams();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);

    fetchNewsById(id, language)
      .then((item) => {
        if (cancelled) return;
        setArticle(item || getNewsById(id));
      })
      .catch(() => {
        if (!cancelled) setArticle(getNewsById(id));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id, language]);

  const heroTitle = translate(language, 'nav.media');
  const heroBreadcrumbs = useMemo(
    () =>
      article
        ? buildHeroBreadcrumbs(language, [
            { key: 'common.home', to: '/' },
            { key: 'nav.media', to: '/media/news' },
            { key: 'nav.mediaNews', to: '/media/news' },
            { label: article.title },
          ])
        : [],
    [language, article],
  );

  if (loading) {
    return null;
  }

  if (!article) {
    return <Navigate to="/media/news" replace />;
  }

  const paragraphs = getNewsBody(article);
  const categoryLabel =
    article.categoryLabel ?? article.category ?? t('news.defaultCategory');

  return (
    <div className="news-detail-page">
      <InnerHero
        title={heroTitle}
        breadcrumbs={heroBreadcrumbs}
        backgroundImage={INNER_HERO_BACKGROUND}
      />

      <div className="news-detail-page__content">
        <article className="news-detail__box">
          <header className="news-detail__header">
            <div className="news-detail__meta">
              <span className="news-detail__category">{categoryLabel}</span>
              <time className="news-detail__date" dateTime={article.dateTime}>
                {article.displayDate ?? article.date}
              </time>
            </div>

            <h1 className="news-detail__title">{article.title}</h1>

            <AboutShareBar
              className="news-detail__share"
              shareUrl={article.link}
              ariaLabel={t('share.newsArticle')}
            />
          </header>

          <div className="news-detail__image-wrap">
            <img src={article.image} alt="" className="news-detail__image" />
          </div>

          {article.bodyHtml ? (
            <div
              className="news-detail__body news-detail__body--html"
              dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
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

        <Link to="/media/news" className="news-detail__back">
          <BackArrowIcon />
          <span>{t('news.backToNews')}</span>
        </Link>
      </div>
    </div>
  );
}
