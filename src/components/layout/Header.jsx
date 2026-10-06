import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Briefcase, ChevronDown, Menu, Search, X } from 'lucide-react';
import { FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useHeaderScroll } from '@/hooks/useHeaderScroll.js';
import { useLanguage } from '@/hooks/useLanguage.js';
import { getHeaderNav } from '@/i18n/navigation.js';
import { useTranslation } from '@/i18n/useTranslation.js';
import { SOCIAL_LINKS } from './headerNav.js';
import './Header.css';

const SOCIAL_ICONS = {
  Facebook: FaFacebookF,
  X: FaXTwitter,
  LinkedIn: FaLinkedinIn,
  YouTube: FaYoutube,
};

const LANG_LABELS = {
  ar: 'عربي',
  en: 'English',
};

function TopBar() {
  const { language, setLanguage, supportedLanguages } = useLanguage();
  const { t } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);

  return (
    <div className="topbar">
      <div className="topbar-inner">
        <div className="topbar-socials">
          {SOCIAL_LINKS.map((item) => {
            const Icon = SOCIAL_ICONS[item.name];
            return (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.name}
                className="topbar-social"
              >
                <Icon />
              </a>
            );
          })}
        </div>

        <div className="topbar-utils">
          <Link to="/search" className="topbar-link">
            <Search size={14} />
            <span>{t('common.search')}</span>
          </Link>

          <span className="topbar-divider" aria-hidden="true" />

          <Link to="/jobs" className="topbar-link">
            <Briefcase size={14} />
            <span>{t('common.jobs')}</span>
          </Link>

          <span className="topbar-divider" aria-hidden="true" />

          <div className={['topbar-lang', langOpen ? 'topbar-lang--open' : ''].filter(Boolean).join(' ')}>
            <button
              type="button"
              onClick={() => setLangOpen((open) => !open)}
              onBlur={() => setLangOpen(false)}
              className="topbar-lang-btn"
              aria-expanded={langOpen}
              aria-haspopup="listbox"
            >
              {LANG_LABELS[language] || language}
              <ChevronDown size={14} />
            </button>

            {langOpen ? (
              <ul className="topbar-lang-menu" role="listbox">
                {supportedLanguages.map((lang) => (
                  <li key={lang}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={language === lang}
                      className={['topbar-lang-option', language === lang ? 'is-active' : '']
                        .filter(Boolean)
                        .join(' ')}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => {
                        setLanguage(lang);
                        setLangOpen(false);
                      }}
                    >
                      {LANG_LABELS[lang] || lang}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function Logo() {
  const { t } = useTranslation();

  return (
    <Link to="/" className="header-logo" aria-label={t('logo.ariaLabel')}>
      <img src="/logo.png" alt="" />
      <span className="header-logo-text">
        <span className="header-logo-title">{t('logo.title')}</span>
        <span className="header-logo-slogan">{t('logo.slogan')}</span>
      </span>
    </Link>
  );
}

function itemIsActive(item, pathname) {
  if (item.end) return pathname === item.to;
  if (pathname === item.to) return true;
  if (item.children?.some((child) => pathname === child.to)) return true;
  return pathname.startsWith(`${item.to}/`);
}

function DesktopDropdown({ item, active }) {
  return (
    <div className="header-dropdown">
      <Link to={item.to} className={['header-nav-parent', active ? 'is-active' : ''].filter(Boolean).join(' ')}>
        {item.label}
        <ChevronDown size={14} className="header-nav-chevron" aria-hidden="true" />
      </Link>

      <div className="header-dropdown-panel">
        <div className="header-dropdown-card">
          {item.children.map((child) => (
            <NavLink
              key={child.to}
              to={child.to}
              className={({ isActive }) =>
                ['header-dropdown-link', isActive ? 'is-active' : ''].filter(Boolean).join(' ')
              }
            >
              {child.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

function DesktopNav({ pathname }) {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const headerNav = useMemo(() => getHeaderNav(language), [language]);

  return (
    <nav className="header-nav" aria-label={t('common.mainNav')}>
      {headerNav.map((item) => {
        const active = itemIsActive(item, pathname);

        if (item.children) {
          return <DesktopDropdown key={item.to} item={item} active={active} />;
        }

        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={['header-nav-link', active ? 'is-active' : ''].filter(Boolean).join(' ')}
          >
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );
}

function MobileMenu({ open, onClose, pathname }) {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const headerNav = useMemo(() => getHeaderNav(language), [language]);
  const [openSection, setOpenSection] = useState(null);

  useEffect(() => {
    if (!open) setOpenSection(null);
  }, [open]);

  if (!open) return null;

  return (
    <div className="mobile-menu">
      <button type="button" className="mobile-menu-backdrop" aria-label={t('common.closeMenu')} onClick={onClose} />

      <div className="mobile-menu-panel">
        <div className="mobile-menu-head">
          <span className="mobile-menu-title">{t('common.menu')}</span>
          <button type="button" onClick={onClose} className="mobile-menu-close" aria-label={t('common.closeMenu')}>
            <X size={22} />
          </button>
        </div>

        <nav className="mobile-nav" aria-label={t('common.mobileNav')}>
          {headerNav.map((item) => {
            const active = itemIsActive(item, pathname);

            if (!item.children) {
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={onClose}
                  className={['mobile-nav-link', active ? 'is-active' : ''].filter(Boolean).join(' ')}
                >
                  {item.label}
                </NavLink>
              );
            }

            const expanded = openSection === item.to;

            return (
              <div key={item.to} className="mobile-nav-section">
                <button
                  type="button"
                  onClick={() => setOpenSection(expanded ? null : item.to)}
                  className={['mobile-nav-toggle', active ? 'is-active' : ''].filter(Boolean).join(' ')}
                  aria-expanded={expanded}
                >
                  {item.label}
                  <ChevronDown size={16} className={['mobile-nav-chevron', expanded ? 'is-open' : ''].join(' ')} />
                </button>

                {expanded ? (
                  <div className="mobile-subnav">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        onClick={onClose}
                        className={({ isActive }) =>
                          ['mobile-subnav-link', isActive ? 'is-active' : ''].filter(Boolean).join(' ')
                        }
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export default function Header() {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const scrolled = useHeaderScroll();
  const headerMainRef = useRef(null);
  const [headerMainHeight, setHeaderMainHeight] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useLayoutEffect(() => {
    const element = headerMainRef.current;
    if (!element) return undefined;

    const updateHeight = () => {
      setHeaderMainHeight(element.getBoundingClientRect().height);
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(element);
    window.addEventListener('resize', updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className={['site-header', scrolled ? 'site-header--scrolled' : ''].filter(Boolean).join(' ')}>
      <TopBar />
      <div className="header-main" ref={headerMainRef}>
        <div className="header-inner">
          <div className="header-brand-row">
            <Logo />
            <DesktopNav pathname={pathname} />
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="header-menu-btn"
            aria-label={t('common.openMenu')}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {scrolled && headerMainHeight ? (
        <div className="header-main-spacer" style={{ height: headerMainHeight }} aria-hidden="true" />
      ) : null}

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} pathname={pathname} />
    </header>
  );
}
