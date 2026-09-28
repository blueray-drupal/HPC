import { AboutSectionHeaderIcon } from '../AboutTabs/AboutTabIcons.jsx';
import EstablishmentExtended from '../EstablishmentExtended/EstablishmentExtended.jsx';
import CoreValuesSection from '../CoreValuesSection/CoreValuesSection.jsx';
import CouncilDutiesSection from '../CouncilDutiesSection/CouncilDutiesSection.jsx';
import StrategySection from '../StrategySection/StrategySection.jsx';
import StructureSection from '../StructureSection/StructureSection.jsx';
import UnitDutiesSection from '../UnitDutiesSection/UnitDutiesSection.jsx';
import VisionSection from '../VisionSection/VisionSection.jsx';
import './AboutContent.css';

function EstablishmentSection({ section }) {
  return (
    <div className="about-content__grid about-content__grid--establishment">
      <div className="about-content__text">
        {section.bodyHtml ? (
          <div
            className="about-content__html"
            dangerouslySetInnerHTML={{ __html: section.bodyHtml }}
          />
        ) : (
          section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="about-content__paragraph">
              {paragraph}
            </p>
          ))
        )}
      </div>

      <div className="about-content__media">
        <img src={section.image} alt={section.imageAlt} className="about-content__media-image" />
      </div>
    </div>
  );
}

function ParagraphsSection({ section }) {
  return (
    <div className="about-content__text about-content__text--full">
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph} className="about-content__paragraph">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function ListSection({ section }) {
  return (
    <ul className="about-content__list">
      {section.list.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function AboutContent({ section }) {
  if (!section) return null;

  return (
    <>
      <section className="about-content" aria-labelledby="about-section-title">
        <div className="about-content__inner">
          <header className="about-content__header">
            <div className="about-content__header-row">
              <AboutSectionHeaderIcon name={section.icon} />
              <h2 id="about-section-title" className="about-content__title">
                {section.title}
              </h2>
            </div>
            <span className="about-content__header-line" aria-hidden="true" />
          </header>

          {section.paragraphs && section.image !== undefined ? (
            <EstablishmentSection section={section} />
          ) : null}

          {section.cards ? <VisionSection cards={section.cards} /> : null}

          {section.goals ? (
            <StrategySection
              goals={section.goals}
              download={section.strategyDownload}
              showShareBar={section.showShareBar}
            />
          ) : null}

          {section.orgChart ? (
            <StructureSection orgChart={section.orgChart} showShareBar={section.showShareBar} />
          ) : null}

          {section.councilDuties ? (
            <CouncilDutiesSection data={section.councilDuties} showShareBar={section.showShareBar} />
          ) : null}

          {section.unitDuties ? (
            <UnitDutiesSection data={section.unitDuties} showShareBar={section.showShareBar} />
          ) : null}

          {section.paragraphs && section.image === undefined && !section.goals && !section.orgChart && !section.councilDuties && !section.unitDuties ? (
            <ParagraphsSection section={section} />
          ) : null}

          {section.list && !section.councilDuties && !section.unitDuties ? <ListSection section={section} /> : null}
        </div>
      </section>

      {section.coreValues ? <CoreValuesSection data={section.coreValues} /> : null}

      {section.extended ? <EstablishmentExtended data={section.extended} /> : null}
    </>
  );
}
