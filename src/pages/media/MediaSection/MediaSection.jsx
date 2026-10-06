import { useLanguage } from '@/hooks/useLanguage.js';
import { getMediaSectionTitle } from '@/i18n/navigation.js';
import { MediaSectionHeaderIcon } from '../MediaTabs/MediaTabIcons.jsx';
import './MediaSection.css';

export default function MediaSection({ section, sectionId }) {
  const { language } = useLanguage();

  if (!section) return null;

  const sectionTitle = sectionId ? getMediaSectionTitle(language, sectionId) : section.title;

  return (
    <section className="media-section" aria-labelledby="media-section-title">
      <div className="media-section__inner">
        <header className="media-section__header">
          <div className="media-section__header-row">
            <MediaSectionHeaderIcon name={section.icon} />
            <h2 id="media-section-title" className="media-section__title">
              {sectionTitle || section.title}
            </h2>
          </div>
          <span className="media-section__header-line" aria-hidden="true" />
        </header>

        <div className="media-section__text">
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="media-section__paragraph">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
