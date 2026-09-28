import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import {
  FOOTER_CONTACT,
  FOOTER_COPYRIGHT,
  FOOTER_CREDIT,
  FOOTER_LEGAL_LINKS,
  FOOTER_PARTNER_LOGOS,
  FOOTER_SITE_INFO,
  FOOTER_SOCIAL_LINKS,
  FOOTER_TOP_LINKS,
} from './footerData.js';
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
  return (
    <footer className="site-footer">
      <div className="footer-topbar">
        <div className="footer-topbar__inner">
          <nav className="footer-topbar__nav" aria-label="روابط الفوتر">
            {FOOTER_TOP_LINKS.map((item, index) => (
              <span key={item.label} className="footer-topbar__nav-item">
                <FooterLink item={item} />
                {index < FOOTER_TOP_LINKS.length - 1 ? (
                  <span className="footer-topbar__divider" aria-hidden="true">
                    |
                  </span>
                ) : null}
              </span>
            ))}
          </nav>

          <div className="footer-topbar__socials">
            <span className="footer-topbar__socials-label">وسائل التواصل الاجتماعي</span>
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
          <section className="footer-contact" aria-label="معلومات التواصل">
            {FOOTER_CONTACT.addressLines.map((line) => (
              <p key={line} className="footer-contact__line">
                {line}
              </p>
            ))}
            <p className="footer-contact__line">
              <span className="footer-contact__label">الهاتف:</span>
              <a href={FOOTER_CONTACT.phoneHref}>{FOOTER_CONTACT.phone}</a>
            </p>
            <p className="footer-contact__line">
              <span className="footer-contact__label">البريد الإلكتروني:</span>
              <a href={`mailto:${FOOTER_CONTACT.email}`}>{FOOTER_CONTACT.email}</a>
            </p>

            <Link to={FOOTER_CONTACT.readMoreLink} className="footer-contact__cta hpc-icon-trailing">
              <ChevronLeft size={16} aria-hidden="true" />
              <span>{FOOTER_CONTACT.readMoreLabel}</span>
            </Link>
          </section>

          <section className="footer-meta" aria-label="معلومات الموقع">
            <ul className="footer-meta__list">
              {FOOTER_SITE_INFO.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>

          <section className="footer-logos" aria-label="شعارات الشركاء">
            <div className="footer-logos__grid">
              {FOOTER_PARTNER_LOGOS.map((logo) => (
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
            <nav className="footer-bottom__links" aria-label="الروابط القانونية">
              {FOOTER_LEGAL_LINKS.map((item, index) => (
                <span key={item.label} className="footer-bottom__link-item">
                  <Link to={item.to} className="footer-bottom__link">
                    {item.label}
                  </Link>
                  {index < FOOTER_LEGAL_LINKS.length - 1 ? (
                    <span className="footer-bottom__separator" aria-hidden="true">
                      -
                    </span>
                  ) : null}
                </span>
              ))}
            </nav>
            <p className="footer-bottom__copyright">{FOOTER_COPYRIGHT}</p>
          </div>

          <p className="footer-bottom__credit">
            {FOOTER_CREDIT.label}{' '}
            <a href={FOOTER_CREDIT.href} target="_blank" rel="noopener noreferrer">
              {FOOTER_CREDIT.company}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
