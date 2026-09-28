import PageTabs from '../../../components/PageTabs/PageTabs.jsx';
import { PROGRAM_TABS } from '../programsData.js';
import { ProgramTabIcon } from './ProgramTabIcons.jsx';

export default function ProgramTabs() {
  return (
    <PageTabs
      tabs={PROGRAM_TABS}
      ariaLabel="أقسام البرامج"
      renderIcon={(tab, isActive) => <ProgramTabIcon name={tab.icon} isActive={isActive} />}
    />
  );
}
