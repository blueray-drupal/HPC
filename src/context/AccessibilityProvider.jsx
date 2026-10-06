import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from 'react';

const TEXT_ALIGNS = ['', 'start', 'center', 'justify'];
const A11Y_CLASS_PREFIX = 'a11y-';

const STORAGE_KEY = 'hpc-a11y-settings';

export const DEFAULT_A11Y_SETTINGS = {
  highlightLinks: false,
  highContrast: false,
  letterSpacing: 0,
  readableFont: false,
  fontSize: 0,
  readingMode: false,
  textAlign: '',
  lineHeight: 0,
};

function clampLevel(value, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  return Math.min(max, Math.max(0, Math.round(number)));
}

function normalizeSettings(raw) {
  if (!raw || typeof raw !== 'object') return DEFAULT_A11Y_SETTINGS;

  return {
    highlightLinks: Boolean(raw.highlightLinks),
    highContrast: Boolean(raw.highContrast),
    letterSpacing: clampLevel(raw.letterSpacing, 2),
    readableFont: Boolean(raw.readableFont),
    fontSize: clampLevel(raw.fontSize, 3),
    readingMode: Boolean(raw.readingMode),
    textAlign: TEXT_ALIGNS.includes(raw.textAlign) ? raw.textAlign : '',
    lineHeight: clampLevel(raw.lineHeight, 2),
  };
}

function readStoredSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_A11Y_SETTINGS;
    return normalizeSettings(JSON.parse(raw));
  } catch {
    return DEFAULT_A11Y_SETTINGS;
  }
}

function writeStoredSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // ignore
  }
}

function clearA11yClasses(classList) {
  [...classList].forEach((className) => {
    if (className.startsWith(A11Y_CLASS_PREFIX)) {
      classList.remove(className);
    }
  });
}

function applySettingsToDocument(settings) {
  const html = document.documentElement;
  const classList = html.classList;
  const normalized = normalizeSettings(settings);

  clearA11yClasses(classList);

  if (normalized.highlightLinks) classList.add('a11y-highlight-links');
  if (normalized.highContrast) classList.add('a11y-high-contrast');
  if (normalized.readableFont) classList.add('a11y-readable-font');
  if (normalized.readingMode) classList.add('a11y-reading-mode');

  classList.add(`a11y-font-size-${normalized.fontSize}`);
  classList.add(`a11y-letter-spacing-${normalized.letterSpacing}`);
  classList.add(`a11y-line-height-${normalized.lineHeight}`);

  if (normalized.textAlign) {
    classList.add(`a11y-text-align-${normalized.textAlign}`);
  }
}

export const AccessibilityContext = createContext(null);

export function AccessibilityProvider({ children }) {
  const [settings, setSettingsState] = useState(() => readStoredSettings());

  const setSettings = useCallback((updater) => {
    setSettingsState((current) => {
      const merged =
        typeof updater === 'function' ? updater(current) : { ...current, ...updater };
      const next = normalizeSettings(merged);
      writeStoredSettings(next);
      return next;
    });
  }, []);

  const toggleFlag = useCallback((key) => {
    setSettings((current) => ({ ...current, [key]: !current[key] }));
  }, [setSettings]);

  const cycleLevel = useCallback(
    (key, maxLevel) => {
      setSettings((current) => ({
        ...current,
        [key]: current[key] >= maxLevel ? 0 : current[key] + 1,
      }));
    },
    [setSettings],
  );

  const cycleTextAlign = useCallback(() => {
    setSettings((current) => {
      const order = ['', 'start', 'center', 'justify'];
      const index = order.indexOf(current.textAlign);
      const nextIndex = index === -1 ? 0 : (index + 1) % order.length;
      return { ...current, textAlign: order[nextIndex] };
    });
  }, [setSettings]);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_A11Y_SETTINGS);
  }, [setSettings]);

  useLayoutEffect(() => {
    applySettingsToDocument(settings);
  }, [settings]);

  const value = useMemo(
    () => ({
      settings,
      toggleFlag,
      cycleLevel,
      cycleTextAlign,
      resetSettings,
    }),
    [cycleLevel, cycleTextAlign, resetSettings, settings, toggleFlag],
  );

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
}
