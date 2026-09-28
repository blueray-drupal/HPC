import AboutShareBar from '../about-us/AboutShareBar/AboutShareBar.jsx';
import InnerHero from '../about-us/InnerHero/InnerHero.jsx';
import PublicationsCategories from './PublicationsCategories/PublicationsCategories.jsx';
import { PUBLICATIONS_PAGE, PUBLICATION_CATEGORIES } from './publicationsData.js';
import './Publications.css';

export default function Publications() {
  return (
    <div className="publications-page">
      <InnerHero
        title={PUBLICATIONS_PAGE.title}
        breadcrumbs={PUBLICATIONS_PAGE.breadcrumbs}
        backgroundImage={PUBLICATIONS_PAGE.heroImage}
      />

      <PublicationsCategories categories={PUBLICATION_CATEGORIES} />

      <div className="publications-page__share-wrap">
        <AboutShareBar />
      </div>
    </div>
  );
}
