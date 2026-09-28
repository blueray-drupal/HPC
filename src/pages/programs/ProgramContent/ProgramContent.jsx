import { ProgramSectionHeaderIcon } from '../ProgramTabs/ProgramTabIcons.jsx';
import './ProgramContent.css';

export default function ProgramContent({ section }) {
  if (!section) return null;

  return (
    <section className="program-content" aria-labelledby="program-section-title">
      <div className="program-content__inner">
        <header className="program-content__header">
          <div className="program-content__header-row">
            <ProgramSectionHeaderIcon name={section.icon} image={section.image} />
            <h2 id="program-section-title" className="program-content__title">
              {section.title}
            </h2>
          </div>
          <span className="program-content__header-line" aria-hidden="true" />
        </header>

        <div className="program-content__text">
          {section.bodyHtml ? (
            <div
              className="program-content__html"
              dangerouslySetInnerHTML={{ __html: section.bodyHtml }}
            />
          ) : (
            section.paragraphs?.map((paragraph) => (
              <p key={paragraph} className="program-content__paragraph">
                {paragraph}
              </p>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
