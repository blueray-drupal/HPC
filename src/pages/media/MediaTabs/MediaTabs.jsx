import { useMemo } from 'react';
import { useLanguage } from '@/hooks/useLanguage.js';
import { getMediaTabs } from '@/i18n/navigation.js';
import { useTranslation } from '@/i18n/useTranslation.js';
import PageTabs from '../../../components/PageTabs/PageTabs.jsx';
import { MediaTabIcon } from './MediaTabIcons.jsx';

export default function MediaTabs() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const tabs = useMemo(() => getMediaTabs(language), [language]);

  return (
    <PageTabs
      tabs={tabs}
      ariaLabel={t('media.tabsAria')}
      renderIcon={(tab, isActive) => <MediaTabIcon name={tab.icon} isActive={isActive} />}
    />
  );
}
