import { useMemo, useState } from 'react';
import { useDrupalFetch } from '@/hooks/useDrupalFetch.js';
import { fetchContactUs } from '@/services/api/contactUs.js';
import AboutShareBar from '../about-us/AboutShareBar/AboutShareBar.jsx';
import InnerHero from '../about-us/InnerHero/InnerHero.jsx';
import { useLanguage } from '@/hooks/useLanguage.js';
import { useTranslation } from '@/i18n/useTranslation.js';
import { getContactFallback, getContactPageMeta } from './contactData.js';
import './Contact.css';

function SubmitArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden="true">
      <path
        d="M11.082 -8.10623e-05L11.082 9.33325L-0.00130136 4.66658L11.082 -8.10623e-05ZM9.91537 1.74992L3.00287 4.66658L9.91536 7.58325L9.91536 5.54159L6.41537 4.66659L9.91537 3.79159L9.91537 1.74992ZM9.91537 1.74992L9.91537 4.66659L9.91536 7.58325L9.91536 5.54159L9.91537 3.79159L9.91537 1.74992Z"
        fill="#F3F9FF"
      />
    </svg>
  );
}

function ContactInfoIcon({ type }) {
  if (type === 'phone') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
          d="M16.95 18C14.8667 18 12.8083 17.5458 10.775 16.6375C8.74167 15.7292 6.89167 14.4417 5.225 12.775C3.55833 11.1083 2.27083 9.25833 1.3625 7.225C0.454167 5.19167 0 3.13333 0 1.05C0 0.75 0.1 0.5 0.3 0.3C0.5 0.1 0.75 0 1.05 0H5.1C5.33333 0 5.54167 0.0791667 5.725 0.2375C5.90833 0.395833 6.01667 0.583333 6.05 0.8L6.7 4.3C6.73333 4.56667 6.725 4.79167 6.675 4.975C6.625 5.15833 6.53333 5.31667 6.4 5.45L3.975 7.9C4.30833 8.51667 4.70417 9.1125 5.1625 9.6875C5.62083 10.2625 6.125 10.8167 6.675 11.35C7.19167 11.8667 7.73333 12.3458 8.3 12.7875C8.86667 13.2292 9.46667 13.6333 10.1 14L12.45 11.65C12.6 11.5 12.7958 11.3875 13.0375 11.3125C13.2792 11.2375 13.5167 11.2167 13.75 11.25L17.2 11.95C17.4333 12.0167 17.625 12.1375 17.775 12.3125C17.925 12.4875 18 12.6833 18 12.9V16.95C18 17.25 17.9 17.5 17.7 17.7C17.5 17.9 17.25 18 16.95 18Z"
          fill="#6B4A3D"
        />
      </svg>
    );
  }

  if (type === 'fax') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17" fill="none" aria-hidden="true">
        <path
          d="M6 16V5V0H16V5H17C17.8333 5 18.5417 5.29167 19.125 5.875C19.7083 6.45833 20 7.16667 20 8V16H6ZM2.5 17C3.2 17 3.79167 16.7583 4.275 16.275C4.75833 15.7917 5 15.2 5 14.5V6.5C5 5.8 4.75833 5.20833 4.275 4.725C3.79167 4.24167 3.2 4 2.5 4C1.8 4 1.20833 4.24167 0.725 4.725C0.241667 5.20833 0 5.8 0 6.5V14.5C0 15.2 0.241667 15.7917 0.725 16.275C1.20833 16.7583 1.8 17 2.5 17ZM8 5H14V2H8V5ZM14 10C14.2833 10 14.5208 9.90417 14.7125 9.7125C14.9042 9.52083 15 9.28333 15 9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9C13 9.28333 13.0958 9.52083 13.2875 9.7125C13.4792 9.90417 13.7167 10 14 10ZM17 10C17.2833 10 17.5208 9.90417 17.7125 9.7125C17.9042 9.52083 18 9.28333 18 9C18 8.71667 17.9042 8.47917 17.7125 8.2875C17.5208 8.09583 17.2833 8 17 8C16.7167 8 16.4792 8.09583 16.2875 8.2875C16.0958 8.47917 16 8.71667 16 9C16 9.28333 16.0958 9.52083 16.2875 9.7125C16.4792 9.90417 16.7167 10 17 10ZM14 13C14.2833 13 14.5208 12.9042 14.7125 12.7125C14.9042 12.5208 15 12.2833 15 12C15 11.7167 14.9042 11.4792 14.7125 11.2875C14.5208 11.0958 14.2833 11 14 11C13.7167 11 13.4792 11.0958 13.2875 11.2875C13.0958 11.4792 13 11.7167 13 12C13 12.2833 13.0958 12.5208 13.2875 12.7125C13.4792 12.9042 13.7167 13 14 13ZM17 13C17.2833 13 17.5208 12.9042 17.7125 12.7125C17.9042 12.5208 18 12.2833 18 12C18 11.7167 17.9042 11.4792 17.7125 11.2875C17.5208 11.0958 17.2833 11 17 11C16.7167 11 16.4792 11.0958 16.2875 11.2875C16.0958 11.4792 16 11.7167 16 12C16 12.2833 16.0958 12.5208 16.2875 12.7125C16.4792 12.9042 16.7167 13 17 13ZM8 13H12V8H8V13Z"
          fill="#6B4A3D"
        />
      </svg>
    );
  }

  if (type === 'email') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none" aria-hidden="true">
        <path
          d="M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H2ZM10 9L18 4V2L10 7L2 2V4L10 9Z"
          fill="#6B4A3D"
        />
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 16 20" fill="none" aria-hidden="true">
      <path
        d="M8 10C8.55 10 9.02083 9.80417 9.4125 9.4125C9.80417 9.02083 10 8.55 10 8C10 7.45 9.80417 6.97917 9.4125 6.5875C9.02083 6.19583 8.55 6 8 6C7.45 6 6.97917 6.19583 6.5875 6.5875C6.19583 6.97917 6 7.45 6 8C6 8.55 6.19583 9.02083 6.5875 9.4125C6.97917 9.80417 7.45 10 8 10ZM8 20C5.31667 17.7167 3.3125 15.5958 1.9875 13.6375C0.6625 11.6792 0 9.86667 0 8.2C0 5.7 0.804167 3.70833 2.4125 2.225C4.02083 0.741667 5.88333 0 8 0C10.1167 0 11.9792 0.741667 13.5875 2.225C15.1958 3.70833 16 5.7 16 8.2C16 9.86667 15.3375 11.6792 14.0125 13.6375C12.6875 15.5958 10.6833 17.7167 8 20Z"
        fill="#6B4A3D"
      />
    </svg>
  );
}

function contactValueClassName(icon) {
  const base = 'contact-info-card__value';
  return icon === 'location' ? base : `${base} contact-info-card__value--ltr`;
}

export default function Contact() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const contactPage = getContactPageMeta(language);
  const contactFallback = getContactFallback(language);
  const { data, loading } = useDrupalFetch((lang) => fetchContactUs(lang, getContactFallback(lang)));
  const contactContent = data ?? contactFallback;

  const contactInfoItems = useMemo(() => {
    const labelKeys = {
      address: 'contact.address',
      phone: 'contact.phone',
      fax: 'contact.fax',
      email: 'contact.email',
    };

    return contactContent.infoItems.map((item) => {
      const titleKey = labelKeys[item.id];
      const title = titleKey ? t(titleKey) : item.title;
      let value = item.value;

      if (item.id === 'address') {
        value =
          language === 'en'
            ? t('contact.addressValue')
            : item.value || t('contact.addressValue');
      }

      return { ...item, title, value };
    });
  }, [contactContent.infoItems, language, t]);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="contact-page">
      <InnerHero
        title={contactPage.title}
        breadcrumbs={contactPage.breadcrumbs}
        backgroundImage={contactPage.heroImage}
      />

      <div className="contact-page__body">
        <div className="contact-page__inner">
          <div className="contact-page__main">
            {!loading ? (
              <div className="contact-page__info">
              {contactInfoItems.map((item) => (
                <article key={item.id} className="contact-info-card">
                  <span className="contact-info-card__accent" aria-hidden="true" />
                  <div className="contact-info-card__inner">
                    <div className="contact-info-card__row">
                      <div className="contact-info-card__content">
                        <h3 className="contact-info-card__title">{item.title}</h3>
                        {item.href ? (
                          <a href={item.href} className={contactValueClassName(item.icon)}>
                            {item.value}
                          </a>
                        ) : (
                          <p className={contactValueClassName(item.icon)}>{item.value}</p>
                        )}
                      </div>
                      <div className="contact-info-card__icon-wrap">
                        <ContactInfoIcon type={item.icon} />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
              </div>
            ) : null}

            <section className="contact-form" aria-labelledby="contact-form-title">
              <span className="contact-form__accent" aria-hidden="true" />
              <div className="contact-form__inner">
                <h2 id="contact-form-title" className="contact-form__title">
                  {t('contact.formTitle')}
                </h2>

                <form className="contact-form__fields" onSubmit={handleSubmit}>
                  <div className="contact-form__field">
                    <label className="contact-form__label" htmlFor="contact-name">
                      {t('contact.formNameLabel')}
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      className="contact-form__input"
                      placeholder={t('contact.formNamePlaceholder')}
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="contact-form__row">
                    <div className="contact-form__field">
                      <label className="contact-form__label" htmlFor="contact-phone">
                        {t('contact.formPhoneLabel')}
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        className="contact-form__input"
                        placeholder={t('contact.formPhonePlaceholder')}
                        value={form.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="contact-form__field">
                      <label className="contact-form__label" htmlFor="contact-email">
                        {t('contact.email')}
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        className="contact-form__input"
                        placeholder={t('contact.formEmailPlaceholder')}
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="contact-form__field">
                    <label className="contact-form__label" htmlFor="contact-message">
                      {t('contact.formMessageLabel')}
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      className="contact-form__textarea"
                      placeholder={t('contact.formMessagePlaceholder')}
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button type="submit" className="contact-form__submit">
                    <span>{t('common.submit')}</span>
                    <SubmitArrowIcon />
                  </button>
                </form>
              </div>
            </section>
          </div>

          {!loading ? (
            <div
              className="contact-page__map"
              dangerouslySetInnerHTML={{ __html: contactContent.mapHtml }}
            />
          ) : null}
        </div>
      </div>

      <div className="contact-page__share-wrap">
        <AboutShareBar shareUrl="/contact" />
      </div>
    </div>
  );
}
