import { useMemo } from 'react';
import { useLanguage } from '@/hooks/useLanguage.js';
import { useTranslation } from '@/i18n/useTranslation.js';
import PageTabs from '../../../components/PageTabs/PageTabs.jsx';
import { getPublicationCategories, PUBLICATION_TABS } from '../publicationsData.js';
import { PublicationTabIcon } from './PublicationTabIcons.jsx';

export default function PublicationTabs() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const tabs = useMemo(() => {
    const categories = getPublicationCategories(language);
    return PUBLICATION_TABS.map((id) => categories.find((category) => category.id === id)).filter(Boolean);
  }, [language]);

  return (
    <PageTabs
      tabs={tabs}
      ariaLabel={t('publications.categoriesAria')}
      getLabel={(tab) => tab.title}
      renderIcon={(tab, isActive) => <PublicationTabIcon name={tab.icon} isActive={isActive} />}
    />
  );
}
