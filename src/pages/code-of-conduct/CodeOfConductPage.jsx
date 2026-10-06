import { useMemo } from 'react';
import { useLanguage } from '@/hooks/useLanguage.js';
import { getInfoPageHeroMeta } from '@/i18n/innerHero.js';
import StrategyDownload from '../about-us/StrategySection/StrategyDownload.jsx';
import InfoPageLayout from '../info/InfoPageLayout.jsx';
import { CODE_OF_CONDUCT_ATTACHMENT, CODE_OF_CONDUCT_PAGE } from './codeOfConductData.js';
import './CodeOfConductPage.css';

export default function CodeOfConductPage() {
  const { language } = useLanguage();
  const hero = useMemo(() => getInfoPageHeroMeta(language, CODE_OF_CONDUCT_PAGE), [language]);

  return (
    <InfoPageLayout
      title={hero.title}
      breadcrumbs={hero.breadcrumbs}
      shareUrl={hero.shareUrl}
    >
      <div className="code-of-conduct">
        <StrategyDownload data={CODE_OF_CONDUCT_ATTACHMENT} hideHeader />
      </div>
    </InfoPageLayout>
  );
}
