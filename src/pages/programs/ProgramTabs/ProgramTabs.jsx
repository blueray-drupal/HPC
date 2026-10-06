import { useMemo } from 'react';
import { useLanguage } from '@/hooks/useLanguage.js';
import { getProgramTabs } from '@/i18n/navigation.js';
import { useTranslation } from '@/i18n/useTranslation.js';
import PageTabs from '../../../components/PageTabs/PageTabs.jsx';
import { ProgramTabIcon } from './ProgramTabIcons.jsx';

export default function ProgramTabs() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const tabs = useMemo(() => getProgramTabs(language), [language]);

  return (
    <PageTabs
      tabs={tabs}
      ariaLabel={t('programs.tabsAria')}
      renderIcon={(tab, isActive) => <ProgramTabIcon name={tab.icon} isActive={isActive} />}
    />
  );
}
