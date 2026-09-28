import { Navigate, useParams } from 'react-router-dom';
import { useDrupalFetch } from '@/hooks/useDrupalFetch.js';
import { fetchProgramSections } from '@/services/api/programs.js';
import AboutShareBar from '../about-us/AboutShareBar/AboutShareBar.jsx';
import InnerHero from '../about-us/InnerHero/InnerHero.jsx';
import ProgramContent from './ProgramContent/ProgramContent.jsx';
import ProgramTabs from './ProgramTabs/ProgramTabs.jsx';
import {
  DEFAULT_PROGRAM_SECTION,
  PROGRAM_SECTIONS,
  PROGRAM_TABS,
  PROGRAMS_PAGE,
} from './programsData.js';
import './Programs.css';

export default function Programs() {
  const { section = DEFAULT_PROGRAM_SECTION } = useParams();
  const { data, loading } = useDrupalFetch((lang) => fetchProgramSections(lang, PROGRAM_SECTIONS));
  const sections = data ?? PROGRAM_SECTIONS;
  const isValidSection = PROGRAM_TABS.some((tab) => tab.id === section);

  if (!isValidSection) {
    return <Navigate to={`/programs/${DEFAULT_PROGRAM_SECTION}`} replace />;
  }

  const activeSection = sections[section];

  return (
    <div className="programs-page">
      <InnerHero
        title={PROGRAMS_PAGE.title}
        breadcrumbs={PROGRAMS_PAGE.breadcrumbs}
        backgroundImage={PROGRAMS_PAGE.heroImage}
      />

      <div className="programs-page__body">
        <ProgramTabs />
        <div className="programs-page__panel">
          {!loading ? <ProgramContent section={activeSection} /> : null}
        </div>
      </div>

      <div className="programs-page__share-wrap">
        <AboutShareBar />
      </div>
    </div>
  );
}
