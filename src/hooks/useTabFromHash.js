import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Keeps a tabbed page in sync with the URL hash, so header dropdown links
 * such as `/financing#calculator` open the matching section.
 */
export function useTabFromHash({ basePath, isValidTab, defaultTab }) {
  const location = useLocation();

  const readTab = useCallback(() => {
    const hash = window.location.hash.replace('#', '');
    return isValidTab(hash) ? hash : defaultTab;
  }, [isValidTab, defaultTab]);

  const [activeTab, setActiveTab] = useState(readTab);

  const selectTab = useCallback(
    (tabId) => {
      setActiveTab(tabId);
      window.history.replaceState(null, '', `${basePath}#${tabId}`);
    },
    [basePath]
  );

  useEffect(() => {
    setActiveTab(readTab());
  }, [location.pathname, location.hash, readTab]);

  useEffect(() => {
    const syncFromHash = () => setActiveTab(readTab());
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, [readTab]);

  return { activeTab, selectTab };
}
