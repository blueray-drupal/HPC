import { MediaSectionHeaderIcon } from '../MediaTabs/MediaTabIcons.jsx';
import './MediaSection.css';

export default function MediaSection({ section }) {
  if (!section) return null;

  return (
    <section className="media-section" aria-labelledby="media-section-title">
      <div className="media-section__inner">
        <header className="media-section__header">
          <div className="media-section__header-row">
            <MediaSectionHeaderIcon name={section.icon} />
            <h2 id="media-section-title" className="media-section__title">
              {section.title}
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
