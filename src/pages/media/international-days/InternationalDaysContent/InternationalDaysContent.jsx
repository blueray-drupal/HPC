import { Link } from 'react-router-dom';
import { useDrupalFetch } from '@/hooks/useDrupalFetch.js';
import { useLanguage } from '@/hooks/useLanguage.js';
import { getMediaSectionTitle } from '@/i18n/navigation.js';
import { useTranslation } from '@/i18n/useTranslation.js';
import { fetchInternationalDaysList } from '@/services/api/internationalDays.js';
import { localizedStaticFallback } from '@/services/api/languageContent.js';
import { MediaSectionHeaderIcon } from '../../MediaTabs/MediaTabIcons.jsx';
import { INTERNATIONAL_DAYS_INTRO } from '../internationalDaysData.js';
import './InternationalDaysContent.css';

function ReadMoreArrow() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3.825 7H16V9H3.825L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7Z" fill="currentColor" />
    </svg>
  );
}

export default function InternationalDaysContent() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const sectionTitle = getMediaSectionTitle(language, 'international-days');
  const { data: drupalIntro } = useDrupalFetch((lang) =>
    fetchInternationalDaysList(lang).catch(() => null),
  );
  const staticIntro = localizedStaticFallback(language, INTERNATIONAL_DAYS_INTRO);
  const paragraphs = drupalIntro?.description
    ? [drupalIntro.description]
    : staticIntro?.paragraphs ?? [];
  const readMoreLink = staticIntro?.readMoreLink ?? '/media/international-days/list';

  return (
    <section className="international-days-content" aria-labelledby="international-days-title">
      <div className="international-days-content__inner">
        <header className="international-days-content__header">
          <div className="international-days-content__header-row">
            <MediaSectionHeaderIcon name="internationalDays" />
            <h2 id="international-days-title" className="international-days-content__title">
              {sectionTitle}
            </h2>
          </div>
          <span className="international-days-content__header-line" aria-hidden="true" />
        </header>

        <div className="international-days-content__panel">
          {paragraphs.length ? (
            <div className="international-days-content__text">
              {paragraphs.map((paragraph) => (
                <p key={paragraph} className="international-days-content__paragraph">
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}

          <Link to={readMoreLink} className="international-days-content__read-more">
            <ReadMoreArrow />
            <span>{t('common.readMore')}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
