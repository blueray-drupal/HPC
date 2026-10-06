import { Fragment, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage.js';
import {
  getFooterAddressLines,
  getFooterLegalLinks,
  getFooterPartnerLogos,
  getFooterSiteInfo,
  getFooterTopLinks,
} from '@/i18n/navigation.js';
import { useTranslation } from '@/i18n/useTranslation.js';
import { FOOTER_CONTACT, FOOTER_CREDIT, FOOTER_SOCIAL_LINKS } from './footerData.js';
import { FOOTER_SOCIAL_ICONS } from './footerSocialIcons.jsx';
import './Footer.css';

function FooterLink({ item }) {
  if (item.href?.startsWith('http')) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className="footer-topbar__link">
        {item.label}
      </a>
    );
  }

  return (
    <Link to={item.to || item.href} className="footer-topbar__link">
      {item.label}
    </Link>
  );
}

export default function Footer() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const footerTopLinks = useMemo(() => getFooterTopLinks(language), [language]);
  const footerLegalLinks = useMemo(() => getFooterLegalLinks(language), [language]);
  const addressLines = useMemo(() => getFooterAddressLines(language), [language]);
  const siteInfoLines = useMemo(() => getFooterSiteInfo(language), [language]);
  const partnerLogos = useMemo(() => getFooterPartnerLogos(language), [language]);

  return (
    <footer className="site-footer">
      <div className="footer-topbar">
        <div className="footer-topbar__inner">
          <nav className="footer-topbar__nav" aria-label={t('footer.navAria')}>
            {footerTopLinks.map((item, index) => (
              <span key={item.label} className="footer-topbar__nav-item">
                <FooterLink item={item} />
                {index < footerTopLinks.length - 1 ? (
                  <span className="footer-topbar__divider" aria-hidden="true">
                    |
                  </span>
                ) : null}
              </span>
            ))}
          </nav>

          <div className="footer-topbar__socials">
            <span className="footer-topbar__socials-label">{t('footer.socialMedia')}</span>
            <div className="footer-topbar__social-icons">
              {FOOTER_SOCIAL_LINKS.map((item) => {
                const Icon = FOOTER_SOCIAL_ICONS[item.icon];

                return (
                  <Fragment key={item.name}>
                    {item.icon === 'rss' ? (
                      <span className="footer-topbar__social-divider" aria-hidden="true">
                        |
                      </span>
                    ) : null}
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.name}
                      className="footer-topbar__social"
                    >
                      <Icon />
                    </a>
                  </Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="footer-main">
        <div className="footer-main__inner">
          <section className="footer-contact" aria-label={t('footer.contactSection')}>
            {addressLines.map((line) => (
              <p key={line} className="footer-contact__line">
                {line}
              </p>
            ))}
            <p className="footer-contact__line">
              <span className="footer-contact__label">{t('footer.phoneLabel')}</span>
              <a href={FOOTER_CONTACT.phoneHref} className="footer-contact__value--ltr">
                {t('footer.phoneDisplay')}
              </a>
            </p>
            <p className="footer-contact__line">
              <span className="footer-contact__label">{t('footer.emailLabel')}</span>
              <a href={`mailto:${FOOTER_CONTACT.email}`} className="footer-contact__value--ltr">
                {FOOTER_CONTACT.email}
              </a>
            </p>

            <Link to={FOOTER_CONTACT.readMoreLink} className="footer-contact__cta hpc-icon-trailing">
              <ChevronLeft size={16} aria-hidden="true" />
              <span>{t('common.readMore')}</span>
            </Link>
          </section>

          <section className="footer-meta" aria-label={t('footer.siteInfoSection')}>
            <ul className="footer-meta__list">
              {siteInfoLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>

          <section className="footer-logos" aria-label={t('footer.partnersAria')}>
            <div className="footer-logos__grid">
              {partnerLogos.map((logo) => (
                <a
                  key={logo.id}
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-logos__card"
                  aria-label={logo.name}
                >
                  <img src={logo.image} alt={logo.name} className="footer-logos__image" />
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom__inner">
          <div className="footer-bottom__legal">
            <div className="footer-bottom__links">
              {footerLegalLinks.map((item, index) => (
                <span key={item.to} className="footer-bottom__link-item">
                  <Link to={item.to} className="footer-bottom__link">
                    {item.label}
                  </Link>
                  {index < footerLegalLinks.length - 1 ? (
                    <span className="footer-bottom__separator" aria-hidden="true">
                      |
                    </span>
                  ) : null}
                </span>
              ))}
            </div>
            <p className="footer-bottom__copyright">{t('footer.copyright')}</p>
          </div>

          <p className="footer-bottom__credit">
            {t('footer.creditLabel')}{' '}
            <a href={FOOTER_CREDIT.href} target="_blank" rel="noopener noreferrer">
              {FOOTER_CREDIT.company}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
