import PageTabs from '../../../components/PageTabs/PageTabs.jsx';
import { MEDIA_TABS } from '../mediaData.js';
import { MediaTabIcon } from './MediaTabIcons.jsx';

export default function MediaTabs() {
  return (
    <PageTabs
      tabs={MEDIA_TABS}
      ariaLabel="أقسام المركز الإعلامي"
      renderIcon={(tab, isActive) => <MediaTabIcon name={tab.icon} isActive={isActive} />}
    />
  );
}
