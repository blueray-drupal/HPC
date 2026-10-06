import { useTranslation } from '@/i18n/useTranslation.js';
import { ProgramSectionHeaderIcon } from '../ProgramTabs/ProgramTabIcons.jsx';
import './ProgramContent.css';

const SECTION_TITLE_KEYS = {
  'population-development': 'nav.programPopulation',
  'reproductive-health': 'nav.programReproductiveHealth',
  advocacy: 'nav.programAdvocacy',
};

export default function ProgramContent({ section, sectionId }) {
  const { t } = useTranslation();

  if (!section) return null;

  const titleKey = sectionId ? SECTION_TITLE_KEYS[sectionId] : null;
  const sectionTitle = titleKey ? t(titleKey) : section.title;

  return (
    <section className="program-content" aria-labelledby="program-section-title">
      <div className="program-content__inner">
        <header className="program-content__header">
          <div className="program-content__header-row">
            <ProgramSectionHeaderIcon name={section.icon} image={section.image} />
            <h2 id="program-section-title" className="program-content__title">
              {sectionTitle}
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
