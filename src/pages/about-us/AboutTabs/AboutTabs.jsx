import { useMemo } from 'react';
import { useLanguage } from '@/hooks/useLanguage.js';
import { getAboutTabs } from '@/i18n/navigation.js';
import { useTranslation } from '@/i18n/useTranslation.js';
import PageTabs from '../../../components/PageTabs/PageTabs.jsx';
import { AboutTabIcon } from './AboutTabIcons.jsx';

export default function AboutTabs() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const tabs = useMemo(() => getAboutTabs(language), [language]);

  return (
    <PageTabs
      tabs={tabs}
      ariaLabel={t('about.tabsAria')}
      renderIcon={(tab, isActive) => <AboutTabIcon name={tab.icon} isActive={isActive} />}
    />
  );
}
