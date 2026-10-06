import { Link } from 'react-router-dom';
import { useTranslation } from '@/i18n/useTranslation.js';
import './InnerHero.css';

export default function InnerHero({ title, breadcrumbs, backgroundImage }) {
  const { t } = useTranslation();
  return (
    <section className="inner-hero" aria-labelledby="inner-hero-title">
      <img
        src={backgroundImage}
        alt=""
        className="inner-hero__background"
        aria-hidden="true"
      />

      <div className="inner-hero__overlay" aria-hidden="true" />

      <div className="inner-hero__content">
        <h1 id="inner-hero-title" className="inner-hero__title">
          {title}
        </h1>

        <nav className="inner-hero__breadcrumbs" aria-label={t('common.breadcrumbsAria')}>
          {breadcrumbs.map((item, index) => (
            <span key={`${index}-${item.to ?? 'current'}`} className="inner-hero__breadcrumb-item">
              {item.to ? (
                <Link to={item.to} className="inner-hero__breadcrumb-link">
                  {item.label}
                </Link>
              ) : (
                <span className="inner-hero__breadcrumb-current">{item.label}</span>
              )}
              {index < breadcrumbs.length - 1 ? (
                <span className="inner-hero__breadcrumb-separator" aria-hidden="true">
                  |
                </span>
              ) : null}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}
