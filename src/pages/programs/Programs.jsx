import { useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useDrupalFetch } from '@/hooks/useDrupalFetch.js';
import { useLanguage } from '@/hooks/useLanguage.js';
import { getSimpleInnerHeroMeta } from '@/i18n/innerHero.js';
import { getProgramTabs } from '@/i18n/navigation.js';
import { fetchProgramSections } from '@/services/api/programs.js';
import AboutShareBar from '../about-us/AboutShareBar/AboutShareBar.jsx';
import InnerHero from '../about-us/InnerHero/InnerHero.jsx';
import ProgramContent from './ProgramContent/ProgramContent.jsx';
import ProgramTabs from './ProgramTabs/ProgramTabs.jsx';
import {
  DEFAULT_PROGRAM_SECTION,
  PROGRAM_SECTIONS,
} from './programsData.js';
import './Programs.css';

export default function Programs() {
  const { language } = useLanguage();
  const hero = useMemo(() => getSimpleInnerHeroMeta(language, 'nav.programs'), [language]);
  const programTabs = useMemo(() => getProgramTabs(language), [language]);
  const { section = DEFAULT_PROGRAM_SECTION } = useParams();
  const { data, loading } = useDrupalFetch((lang) => fetchProgramSections(lang, PROGRAM_SECTIONS));
  const sections = data ?? PROGRAM_SECTIONS;
  const isValidSection = programTabs.some((tab) => tab.id === section);

  if (!isValidSection) {
    return <Navigate to={`/programs/${DEFAULT_PROGRAM_SECTION}`} replace />;
  }

  const activeSection = sections[section];

  return (
    <div className="programs-page">
      <InnerHero
        title={hero.title}
        breadcrumbs={hero.breadcrumbs}
        backgroundImage={hero.heroImage}
      />

      <div className="programs-page__body">
        <ProgramTabs />
        <div className="programs-page__panel">
          {!loading ? <ProgramContent section={activeSection} sectionId={section} /> : null}
        </div>
      </div>

      <div className="programs-page__share-wrap">
        <AboutShareBar />
      </div>
    </div>
  );
}
