import { useEffect, useState } from 'react';

const STORAGE_KEY = 'hajfund-theme';

export function getStoredTheme() {
  if (typeof window === 'undefined') return 'light';
  return localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light';
}

export function applyTheme(theme) {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('dark', theme === 'dark');
  localStorage.setItem(STORAGE_KEY, theme);
}

export function useTheme() {
  const [theme, setThemeState] = useState(getStoredTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  const resetTheme = () => setThemeState('light');

  return {
    theme,
    isDark: theme === 'dark',
    toggleTheme,
    resetTheme,
    setTheme: setThemeState,
  };
}
