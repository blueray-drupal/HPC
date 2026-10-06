import { Link } from 'react-router-dom';
import { useTranslation } from '@/i18n/useTranslation.js';
import AboutShareBar from '../../../about-us/AboutShareBar/AboutShareBar.jsx';
import './NewsGrid.css';

function ReadMoreArrow() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3.825 7H16V9H3.825L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7Z" fill="#6B4A3D" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M3.5 5.83333H10.5M2.33333 11.6667C1.965 11.6667 1.64972 11.5222 1.41667 11.2833C1.18361 11.0444 1.04444 10.7222 1.04167 10.3833V3.5C1.04167 3.16111 1.18083 2.83889 1.41667 2.61111C1.6525 2.38333 1.965 2.25 2.33333 2.25H3.5V1.16667H4.66667V2.25H9.33333V1.16667H10.5V2.25H11.6667C12.035 2.25 12.3503 2.39444 12.5833 2.63333C12.8164 2.87222 12.9556 3.19444 12.9583 3.53333V10.3833C12.9583 10.7222 12.8192 11.0444 12.5833 11.2833C12.3475 11.5222 12.035 11.6667 11.6667 11.6667H2.33333C1.965 11.6667 1.64972 11.5222 1.41667 11.2833C1.18361 11.0444 1.04444 10.7222 1.04167 10.3833V3.5C1.04167 3.16111 1.18083 2.83889 1.41667 2.61111C1.6525 2.38333 1.965 2.25 2.33333 2.25H3.5V1.16667H4.66667V2.25H9.33333V1.16667H10.5V2.25H11.6667C12.035 2.25 12.3503 2.39444 12.5833 2.63333C12.8164 2.87222 12.9556 3.19444 12.9583 3.53333V10.3833C12.9583 10.7222 12.8192 11.0444 12.5833 11.2833C12.3475 11.5222 12.035 11.6667 11.6667 11.6667H2.33333Z"
        stroke="#F97316"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function NewsGrid({ items }) {
  const { t } = useTranslation();

  if (!items.length) {
    return <p className="news-grid__empty">{t('news.emptyResults')}</p>;
  }

  return (
    <div className="news-grid">
      {items.map((item) => (
        <article key={item.id} className="news-grid__card">
          <div className="news-grid__image-wrap">
            <img src={item.image} alt="" className="news-grid__image" loading="lazy" />
            <time className="news-grid__date-badge" dateTime={item.dateTime}>
              <CalendarIcon />
              <span>{item.date}</span>
            </time>
          </div>

          <div className="news-grid__body">
            <h3 className="news-grid__title">{item.title}</h3>
            <p className="news-grid__excerpt">{item.excerpt}</p>

            <div className="news-grid__footer">
              <Link to={item.link} className="news-grid__read-more">
                <ReadMoreArrow />
                <span>{t('common.readMore')}</span>
              </Link>
              <AboutShareBar
                className="news-grid__share"
                shareUrl={item.link}
                ariaLabel={t('share.newsArticle')}
              />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
