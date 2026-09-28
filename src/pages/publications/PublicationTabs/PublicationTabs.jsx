import PageTabs from '../../../components/PageTabs/PageTabs.jsx';
import { PUBLICATION_CATEGORIES, PUBLICATION_TABS } from '../publicationsData.js';
import { PublicationTabIcon } from './PublicationTabIcons.jsx';

export default function PublicationTabs() {
  const tabs = PUBLICATION_TABS.map((id) => PUBLICATION_CATEGORIES.find((category) => category.id === id)).filter(
    Boolean,
  );

  return (
    <PageTabs
      tabs={tabs}
      ariaLabel="فئات الإصدارات"
      getLabel={(tab) => tab.title}
      renderIcon={(tab, isActive) => <PublicationTabIcon name={tab.icon} isActive={isActive} />}
    />
  );
}
