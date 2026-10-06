import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AccessibilityWidget from './components/accessibility/AccessibilityWidget.jsx';
import { AccessibilityProvider } from './context/AccessibilityProvider.jsx';
import { LanguageProvider } from './context/LanguageProvider.jsx';
import { useScrollToTop } from './hooks/useScrollToTop.js';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import Home from './pages/home/Home.jsx';
import AboutUs from './pages/about-us/AboutUs.jsx';
import Publications from './pages/publications/Publications.jsx';
import PublicationCategory from './pages/publications/PublicationCategory.jsx';
import Programs from './pages/programs/Programs.jsx';
import Media from './pages/media/Media.jsx';
import NewsDetail from './pages/media/news/NewsDetail/NewsDetail.jsx';
import MediaBriefingDetail from './pages/media/briefings/MediaBriefingDetail.jsx';
import PhotoDetail from './pages/media/photos/PhotoDetail/PhotoDetail.jsx';
import InternationalDaysList from './pages/media/international-days/InternationalDaysList/InternationalDaysList.jsx';
import Tenders from './pages/tenders/Tenders.jsx';
import Jobs from './pages/jobs/Jobs.jsx';
import JobDetail from './pages/jobs/JobDetail/JobDetail.jsx';
import Contact from './pages/contact/Contact.jsx';
import DemographicIndicators from './pages/demographic-indicators/DemographicIndicators.jsx';
import Search from './pages/search/Search.jsx';
import FaqPage from './pages/info/faq/FaqPage.jsx';
import PrivacyPage from './pages/info/PrivacyPage.jsx';
import TermsPage from './pages/info/TermsPage.jsx';
import DisclaimerPage from './pages/info/DisclaimerPage.jsx';
import CopyrightPage from './pages/info/CopyrightPage.jsx';
import UsefulLinks from './pages/useful-links/UsefulLinks.jsx';
import CodeOfConductPage from './pages/code-of-conduct/CodeOfConductPage.jsx';

function AppRoutes() {
  useScrollToTop();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<Navigate to="/about/establishment" replace />} />
      <Route path="/about/:section" element={<AboutUs />} />
      <Route path="/publications" element={<Publications />} />
      <Route path="/publications/:categorySlug" element={<PublicationCategory />} />
      <Route path="/programs" element={<Navigate to="/programs/population-development" replace />} />
      <Route path="/programs/:section" element={<Programs />} />
      <Route path="/media" element={<Navigate to="/media/news" replace />} />
      <Route path="/media/news/:id" element={<NewsDetail />} />
      <Route path="/media/briefings/:id" element={<MediaBriefingDetail />} />
      <Route path="/media/photos/:id" element={<PhotoDetail />} />
      <Route path="/media/international-days/list" element={<InternationalDaysList />} />
      <Route path="/media/:section" element={<Media />} />
      <Route path="/tenders" element={<Tenders />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:id" element={<JobDetail />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/demographic-indicators" element={<DemographicIndicators />} />
      <Route path="/search" element={<Search />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/useful-links" element={<UsefulLinks />} />
      <Route path="/code-of-conduct" element={<CodeOfConductPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/disclaimer" element={<DisclaimerPage />} />
      <Route path="/copyright" element={<CopyrightPage />} />
    </Routes>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AccessibilityProvider>
        <Router>
          <Header />
          <main>
            <AppRoutes />
          </main>
          <Footer />
          <AccessibilityWidget />
        </Router>
      </AccessibilityProvider>
    </LanguageProvider>
  );
}

export default App;
