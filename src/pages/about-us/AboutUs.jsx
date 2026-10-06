import { useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useDrupalFetch } from '@/hooks/useDrupalFetch.js';
import { fetchAboutUsSections } from '@/services/api/aboutUs.js';
import { useLanguage } from '@/hooks/useLanguage.js';
import { getAboutTabs } from '@/i18n/navigation.js';
import { getSimpleInnerHeroMeta } from '@/i18n/innerHero.js';
import {
  ABOUT_SECTIONS,
  DEFAULT_ABOUT_SECTION,
} from './aboutUsData.js';
import InnerHero from './InnerHero/InnerHero.jsx';
import AboutTabs from './AboutTabs/AboutTabs.jsx';
import AboutContent from './AboutContent/AboutContent.jsx';
import './AboutUs.css';

export default function AboutUs() {
  const { section = DEFAULT_ABOUT_SECTION } = useParams();
  const { language } = useLanguage();
  const hero = useMemo(() => getSimpleInnerHeroMeta(language, 'about.pageTitle'), [language]);
  const aboutTabs = getAboutTabs(language);
  const { data, loading } = useDrupalFetch((lang) => fetchAboutUsSections(lang, ABOUT_SECTIONS));
  const sections = data ?? ABOUT_SECTIONS;
  const isValidSection = aboutTabs.some((tab) => tab.id === section);

  if (!isValidSection) {
    return <Navigate to={`/about/${DEFAULT_ABOUT_SECTION}`} replace />;
  }

  const activeSection = sections[section];

  return (
    <div className="about-us-page">
      <InnerHero
        title={hero.title}
        breadcrumbs={hero.breadcrumbs}
        backgroundImage={hero.heroImage}
      />
      <AboutTabs />
      {!loading ? <AboutContent section={activeSection} sectionId={section} /> : null}
    </div>
  );
}
