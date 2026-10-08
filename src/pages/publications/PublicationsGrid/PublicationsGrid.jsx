import { useTranslation } from '@/i18n/useTranslation.js';
import './PublicationsGrid.css';

const YEAR_BADGE_STYLES = {
  2023: { background: '#FDE68A', color: '#92400E' },
  2024: { background: '#FED7AA', color: '#9A3412' },
  2025: { background: '#BFDBFE', color: '#1E40AF' },
};

function DownloadIcon() {  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 1.5V10.5M8 10.5L4.5 7M8 10.5L11.5 7M2.5 14.5H13.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PublicationsGrid({ items }) {
  const { t } = useTranslation();

  if (!items.length) {
    return (
      <div className="publications-grid__empty" role="status">
        {t('publications.emptyResults')}
      </div>
    );
  }

  return (
    <ul className="publications-grid">
      {items.map((item) => (
        <li key={item.id} className="publications-grid__item">
          <article className="publication-card">
            <div className="publication-card__cover-wrap">
              <img src={item.coverImage} alt="" className="publication-card__cover" loading="lazy" />
            </div>

            <div className="publication-card__body">
              {item.year != null ? (
                <p
                  className="publication-card__year"
                  style={YEAR_BADGE_STYLES[item.year] ?? undefined}
                >
                  {t('publications.editionLabel')} {item.year}
                </p>
              ) : null}

              <h3 className="publication-card__title">{item.title}</h3>

              {item.hasDownload !== false && item.downloadUrl ? (
                <a href={item.downloadUrl} className="publication-card__download" download>
                  <span>{t('publications.downloadFile')}</span>
                  <DownloadIcon />
                </a>
              ) : null}
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
