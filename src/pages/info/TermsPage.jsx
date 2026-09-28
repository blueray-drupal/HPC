import LegalPageView from './LegalPageView.jsx';
import { TERMS_PAGE } from './legalPagesData.js';

const FALLBACK = {
  paragraphs: TERMS_PAGE.paragraphs,
};

export default function TermsPage() {
  return (
    <LegalPageView
      pageKey="terms"
      pageMeta={TERMS_PAGE}
      fallback={FALLBACK}
    />
  );
}
