import StrategyDownload from '../about-us/StrategySection/StrategyDownload.jsx';
import InfoPageLayout from '../info/InfoPageLayout.jsx';
import { CODE_OF_CONDUCT_ATTACHMENT, CODE_OF_CONDUCT_PAGE } from './codeOfConductData.js';
import './CodeOfConductPage.css';

export default function CodeOfConductPage() {
  return (
    <InfoPageLayout
      title={CODE_OF_CONDUCT_PAGE.title}
      breadcrumbs={CODE_OF_CONDUCT_PAGE.breadcrumbs}
      shareUrl={CODE_OF_CONDUCT_PAGE.shareUrl}
    >
      <div className="code-of-conduct">
        <StrategyDownload data={CODE_OF_CONDUCT_ATTACHMENT} hideHeader />
      </div>
    </InfoPageLayout>
  );
}
