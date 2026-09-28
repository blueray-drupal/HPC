import LegalPageView from './LegalPageView.jsx';
import { DISCLAIMER_PAGE } from './legalPagesData.js';

const FALLBACK = {
  paragraphs: DISCLAIMER_PAGE.paragraphs,
};

export default function DisclaimerPage() {
  return (
    <LegalPageView
      pageKey="disclaimer"
      pageMeta={DISCLAIMER_PAGE}
      fallback={FALLBACK}
    />
  );
}
