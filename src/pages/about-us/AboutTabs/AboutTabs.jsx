import PageTabs from '../../../components/PageTabs/PageTabs.jsx';
import { ABOUT_TABS } from '../aboutUsData.js';
import { AboutTabIcon } from './AboutTabIcons.jsx';

export default function AboutTabs() {
  return (
    <PageTabs
      tabs={ABOUT_TABS}
      ariaLabel="أقسام عن المجلس"
      renderIcon={(tab, isActive) => <AboutTabIcon name={tab.icon} isActive={isActive} />}
    />
  );
}
