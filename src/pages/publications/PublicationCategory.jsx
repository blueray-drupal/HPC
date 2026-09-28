import { Navigate, useParams } from 'react-router-dom';
import AboutShareBar from '../about-us/AboutShareBar/AboutShareBar.jsx';
import InnerHero from '../about-us/InnerHero/InnerHero.jsx';
import PublicationCategoryContent from './PublicationCategoryContent/PublicationCategoryContent.jsx';
import PublicationTabs from './PublicationTabs/PublicationTabs.jsx';
import { getPublicationCategoryBySlug, PUBLICATIONS_PAGE } from './publicationsData.js';
import './Publications.css';

export default function PublicationCategory() {
  const { categorySlug } = useParams();
  const category = getPublicationCategoryBySlug(categorySlug);

  if (!category) {
    return <Navigate to="/publications" replace />;
  }

  return (
    <div className="publications-page">
      <InnerHero
        title={PUBLICATIONS_PAGE.title}
        breadcrumbs={[
          { label: 'الرئيسية', to: '/' },
          { label: PUBLICATIONS_PAGE.title },
        ]}
        backgroundImage={PUBLICATIONS_PAGE.heroImage}
      />

      <PublicationTabs />

      <PublicationCategoryContent category={category} />

      <div className="publications-page__share-wrap">
        <AboutShareBar />
      </div>
    </div>
  );
}
