import LegalPageView from './LegalPageView.jsx';
import { PRIVACY_PAGE } from './legalPagesData.js';

const FALLBACK = {
  paragraphs: PRIVACY_PAGE.paragraphs,
};

export default function PrivacyPage() {
  return (
    <LegalPageView
      pageKey="privacy"
      pageMeta={PRIVACY_PAGE}
      fallback={FALLBACK}
    />
  );
}
