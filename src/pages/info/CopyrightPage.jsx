import LegalPageView from './LegalPageView.jsx';
import { COPYRIGHT_PAGE } from './legalPagesData.js';

const FALLBACK = {
  intro: COPYRIGHT_PAGE.intro,
  items: COPYRIGHT_PAGE.items,
};

export default function CopyrightPage() {
  return (
    <LegalPageView
      pageKey="copyright"
      pageMeta={COPYRIGHT_PAGE}
      fallback={FALLBACK}
    />
  );
}
