import { useEffect, useId, useRef, useState } from 'react';
import {
  AlignLeft,
  BookOpen,
  Contrast,
  Link2,
  MoveVertical,
  Type,
  WholeWord,
  X,
} from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityProvider.jsx';
import { useTranslation } from '@/i18n/useTranslation.js';
import './AccessibilityWidget.css';

const A11Y_TRIGGER_ICON = '/home/Button - Show Accessibility Preferences.svg';

function OptionTile({ icon: Icon, label, active, onClick, wide }) {
  return (
    <button
      type="button"
      className={['a11y-widget__option', wide ? 'a11y-widget__option--wide' : '', active ? 'is-active' : '']
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
      aria-pressed={active}
    >
      <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
}

export default function AccessibilityWidget() {
  const { t } = useTranslation();
  const { settings, toggleFlag, cycleLevel, cycleTextAlign, resetSettings } = useAccessibility();
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const alignActive = Boolean(settings.textAlign);

  return (
    <div className="a11y-widget">
      <button
        type="button"
        className="a11y-widget__trigger"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={t('accessibility.title')}
      >
        <img
          src={A11Y_TRIGGER_ICON}
          alt=""
          className="a11y-widget__trigger-img"
          width={65}
          height={65}
          decoding="async"
        />
      </button>

      {open ? (
        <div
          ref={panelRef}
          className="a11y-widget__panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <div className="a11y-widget__panel-head">
            <div className="a11y-widget__panel-head-text">
              <h2 id={titleId} className="a11y-widget__panel-title">
                {t('accessibility.panelTitle')}
              </h2>
              <p className="a11y-widget__panel-intro">{t('accessibility.panelIntro')}</p>
            </div>
            <button
              type="button"
              className="a11y-widget__close"
              onClick={() => setOpen(false)}
              aria-label={t('accessibility.close')}
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <div className="a11y-widget__options">
            <OptionTile
              icon={Link2}
              label={t('accessibility.highlightLinks')}
              active={settings.highlightLinks}
              onClick={() => toggleFlag('highlightLinks')}
            />
            <OptionTile
              icon={Contrast}
              label={t('accessibility.contrast')}
              active={settings.highContrast}
              onClick={() => toggleFlag('highContrast')}
            />
            <OptionTile
              icon={WholeWord}
              label={t('accessibility.letterSpacing')}
              active={settings.letterSpacing > 0}
              wide
              onClick={() => cycleLevel('letterSpacing', 2)}
            />
            <OptionTile
              icon={Type}
              label={t('accessibility.fontType')}
              active={settings.readableFont}
              onClick={() => toggleFlag('readableFont')}
            />
            <OptionTile
              icon={Type}
              label={t('accessibility.fontSize')}
              active={settings.fontSize > 0}
              onClick={() => cycleLevel('fontSize', 3)}
            />
            <OptionTile
              icon={BookOpen}
              label={t('accessibility.readingMode')}
              active={settings.readingMode}
              wide
              onClick={() => toggleFlag('readingMode')}
            />
            <OptionTile
              icon={AlignLeft}
              label={t('accessibility.textAlign')}
              active={alignActive}
              onClick={cycleTextAlign}
            />
            <OptionTile
              icon={MoveVertical}
              label={t('accessibility.lineHeight')}
              active={settings.lineHeight > 0}
              onClick={() => cycleLevel('lineHeight', 2)}
            />
          </div>

          <button type="button" className="a11y-widget__reset" onClick={resetSettings}>
            {t('accessibility.reset')}
          </button>
        </div>
      ) : null}
    </div>
  );
}
