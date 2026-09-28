import HeroSlider from './HeroSlider';
import NewsTicker from './NewsTicker';
import SecretaryMessage from './SecretaryMessage';
import MediaBriefings from './MediaBriefings';
import DemographicSection from './DemographicSection';
import KnowledgePlatforms from './KnowledgePlatforms';
import NewsSection from './NewsSection';
import PartnersSection from './PartnersSection';
import PageRating from './PageRating';

export default function Home() {
  return (
    <>
      <HeroSlider />
      <NewsTicker />
      <SecretaryMessage />
      <MediaBriefings />
      <DemographicSection />
      <KnowledgePlatforms />
      <NewsSection />
      <PartnersSection />
      <PageRating />
    </>
  );
}
