import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useDrupalFetch } from '@/hooks/useDrupalFetch.js';
import { useLanguage } from '@/hooks/useLanguage.js';
import { useTranslation } from '@/i18n/useTranslation.js';
import { fetchNews } from '@/services/api/news.js';
import { localizedStaticFallback } from '@/services/api/languageContent.js';
import { NEWS_ITEMS as NEWS_ITEMS_FALLBACK } from './newsSectionData.js';
import './NewsSection.css';

function CalendarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none" aria-hidden="true">
      <path
        d="M1.16667 11.6667C0.845833 11.6667 0.571181 11.5524 0.342708 11.324C0.114236 11.0955 0 10.8208 0 10.5V2.33333C0 2.0125 0.114236 1.73785 0.342708 1.50937C0.571181 1.2809 0.845833 1.16667 1.16667 1.16667H1.75V0H2.91667V1.16667H7.58333V0H8.75V1.16667H9.33333C9.65417 1.16667 9.92882 1.2809 10.1573 1.50937C10.3858 1.73785 10.5 2.0125 10.5 2.33333V10.5C10.5 10.8208 10.3858 11.0955 10.1573 11.324C9.92882 11.5524 9.65417 11.6667 9.33333 11.6667H1.16667ZM1.16667 10.5H9.33333V4.66667H1.16667V10.5ZM1.16667 3.5H9.33333V2.33333H1.16667V3.5ZM1.16667 3.5V2.33333V3.5Z"
        fill="#9CA3AF"
      />
    </svg>
  );
}

const LATEST_NEWS_COUNT = 4;
const NEWS_LIST_PATH = '/media/news';

export default function NewsSection() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const { data, loading } = useDrupalFetch((lang) =>
    fetchNews(lang).catch(() => localizedStaticFallback(lang, NEWS_ITEMS_FALLBACK) ?? []),
  );
  const newsItems = data?.length
    ? data
    : loading
      ? []
      : localizedStaticFallback(language, NEWS_ITEMS_FALLBACK) ?? [];

  const latestNews = [...newsItems]
    .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
    .slice(0, LATEST_NEWS_COUNT);

  if (loading || !latestNews.length) return null;

  return (
    <section className="news-section" aria-labelledby="news-section-title">
      <div className="news-section__inner">
        <header className="news-section__header">
          <div className="news-section__intro">
            <div className="news-section__eyebrow">
              <span className="news-section__eyebrow-line" aria-hidden="true" />
              <span>{t('home.newsSection.eyebrow')}</span>
            </div>
            <h2 id="news-section-title" className="news-section__title">
              {t('home.newsSection.title')}
            </h2>
          </div>

          <Link to={NEWS_LIST_PATH} className="news-section__view-all hpc-icon-trailing">
            <ChevronLeft size={18} aria-hidden="true" />
            <span>{t('home.newsSection.viewAll')}</span>
          </Link>
        </header>

        <div className="news-section__grid">
          {latestNews.map((item) => (
            <article key={item.id} className="news-section__card">
              <div className="news-section__image-wrap">
                <img src={item.image} alt="" className="news-section__image" />
                <span className="news-section__badge">{item.category}</span>
              </div>

              <div className="news-section__body">
                <time className="news-section__date" dateTime={item.dateTime}>
                  <CalendarIcon />
                  <span>{item.date}</span>
                </time>

                <h3 className="news-section__card-title">{item.title}</h3>

                <Link to={item.link} className="news-section__read-more hpc-icon-trailing">
                  <ChevronLeft size={16} aria-hidden="true" />
                  <span>{t('common.readMore')}</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
