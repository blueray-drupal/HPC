import { Navigate, useParams } from 'react-router-dom';
import { useDrupalFetch } from '@/hooks/useDrupalFetch.js';
import { fetchAboutUsSections } from '@/services/api/aboutUs.js';
import {
  ABOUT_PAGE,
  ABOUT_SECTIONS,
  ABOUT_TABS,
  DEFAULT_ABOUT_SECTION,
} from './aboutUsData.js';
import InnerHero from './InnerHero/InnerHero.jsx';
import AboutTabs from './AboutTabs/AboutTabs.jsx';
import AboutContent from './AboutContent/AboutContent.jsx';
import './AboutUs.css';

export default function AboutUs() {
  const { section = DEFAULT_ABOUT_SECTION } = useParams();
  const { data, loading } = useDrupalFetch((lang) => fetchAboutUsSections(lang, ABOUT_SECTIONS));
  const sections = data ?? ABOUT_SECTIONS;
  const isValidSection = ABOUT_TABS.some((tab) => tab.id === section);

  if (!isValidSection) {
    return <Navigate to={`/about/${DEFAULT_ABOUT_SECTION}`} replace />;
  }

  const activeSection = sections[section];

  return (
    <div className="about-us-page">
      <InnerHero
        title={ABOUT_PAGE.title}
        breadcrumbs={ABOUT_PAGE.breadcrumbs}
        backgroundImage={ABOUT_PAGE.heroImage}
      />
      <AboutTabs />
      {!loading ? <AboutContent section={activeSection} /> : null}
    </div>
  );
}
