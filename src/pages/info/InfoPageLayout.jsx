import AboutShareBar from '../about-us/AboutShareBar/AboutShareBar.jsx';
import InnerHero from '../about-us/InnerHero/InnerHero.jsx';
import './InfoPageLayout.css';

export default function InfoPageLayout({ title, breadcrumbs, shareUrl, children }) {
  return (
    <div className="info-page">
      <InnerHero title={title} breadcrumbs={breadcrumbs} backgroundImage="/inner-hero-image.png" />

      <div className="info-page__body">
        <div className="info-page__inner">{children}</div>
      </div>

      <div className="info-page__share-wrap">
        <AboutShareBar shareUrl={shareUrl} />
      </div>
    </div>
  );
}
