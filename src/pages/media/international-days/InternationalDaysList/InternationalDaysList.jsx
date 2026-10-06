import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDrupalFetch } from '@/hooks/useDrupalFetch.js';
import { useLanguage } from '@/hooks/useLanguage.js';
import { buildHeroBreadcrumbs, INNER_HERO_BACKGROUND } from '@/i18n/innerHero.js';
import { translate, useTranslation } from '@/i18n/useTranslation.js';
import { fetchInternationalDaysList } from '@/services/api/internationalDays.js';
import AboutShareBar from '../../../about-us/AboutShareBar/AboutShareBar.jsx';
import InnerHero from '../../../about-us/InnerHero/InnerHero.jsx';
import InternationalDaysTable from '../InternationalDaysTable/InternationalDaysTable.jsx';
import { INTERNATIONAL_DAYS_LIST_PAGE } from '../internationalDaysListData.js';
import './InternationalDaysList.css';

const INTERNATIONAL_DAYS_SECTION_PATH = '/media/international-days';

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

export default function InternationalDaysList() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const { data: drupalContent, loading } = useDrupalFetch((lang) =>
    fetchInternationalDaysList(lang).catch(() => null),
  );

  const heroTitle = translate(language, 'nav.mediaInternationalDays');
  const heroBreadcrumbs = useMemo(
    () =>
      buildHeroBreadcrumbs(language, [
        { key: 'common.home', to: '/' },
        { key: 'nav.media', to: '/media/international-days' },
        { key: 'nav.mediaInternationalDays' },
      ]),
    [language],
  );

  const description =
    drupalContent?.description || INTERNATIONAL_DAYS_LIST_PAGE.description;

  return (
    <div className="international-days-list-page">
      <InnerHero
        title={heroTitle}
        breadcrumbs={heroBreadcrumbs}
        backgroundImage={INNER_HERO_BACKGROUND}
      />

      {!loading ? (
        <div className="international-days-list-page__content">
          <div className="international-days-list-page__intro">
            <h2 className="international-days-list-page__section-title">
              {INTERNATIONAL_DAYS_LIST_PAGE.sectionTitle}
            </h2>
            {drupalContent?.bodyHtml ? (
              <div
                className="international-days-list-page__description international-days-list-page__description--html"
                dangerouslySetInnerHTML={{ __html: drupalContent.bodyHtml }}
              />
            ) : (
              <p className="international-days-list-page__description">{description}</p>
            )}
          </div>

          {drupalContent?.items?.some((item) => item.image) ? (
            <div className="international-days-list-page__images">
              {drupalContent.items
                .filter((item) => item.image)
                .map((item) => (
                  <figure key={item.id} className="international-days-list-page__figure">
                    <img
                      src={item.image}
                      alt={item.title || INTERNATIONAL_DAYS_LIST_PAGE.sectionTitle}
                      className="international-days-list-page__image"
                      loading="lazy"
                    />
                  </figure>
                ))}
            </div>
          ) : (
            <InternationalDaysTable />
          )}

          <Link
            to={INTERNATIONAL_DAYS_SECTION_PATH}
            className="international-days-list-page__back"
          >
            <BackArrowIcon />
            <span>{t('media.backToInternationalDays')}</span>
          </Link>
        </div>
      ) : null}

      <div className="international-days-list-page__share-wrap">
        <AboutShareBar />
      </div>
    </div>
  );
}
