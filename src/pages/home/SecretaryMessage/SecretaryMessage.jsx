import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDrupalFetch } from '@/hooks/useDrupalFetch.js';
import { useLanguage } from '@/hooks/useLanguage.js';
import { useTranslation } from '@/i18n/useTranslation.js';
import { fetchSecretaryMessage } from '@/services/api/secretaryMessage.js';
import { mergeSecretaryMessage } from '@/services/api/secretaryMessageContent.js';
import './SecretaryMessage.css';

export default function SecretaryMessage() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const isRtl = language === 'ar';
  const { data, loading } = useDrupalFetch((lang) =>
    fetchSecretaryMessage(lang).catch(() => null),
  );
  const content = useMemo(() => mergeSecretaryMessage(data, language), [data, language]);

  if (loading || !content) return null;

  return (
    <section className="secretary-message" aria-labelledby="secretary-message-title">
      <div className="secretary-message__container">
        <div className="secretary-message__row">
          <div className="secretary-message__content">
            <div className="secretary-message__eyebrow">
              <span className="secretary-message__eyebrow-line" aria-hidden="true" />
              <span>{content.eyebrow}</span>
            </div>

            <h2 id="secretary-message-title" className="secretary-message__title">
              <span className="secretary-message__title-line1">{content.titleLine1}</span>
              <span className="secretary-message__title-line2">{content.titleLine2}</span>
            </h2>

            <p className="secretary-message__body secretary-message__body--excerpt">{content.body}</p>
            {content.name ? <p className="secretary-message__name">{content.name}</p> : null}

            <Link to={content.ctaLink} className="secretary-message__cta hpc-icon-trailing">
              {isRtl ? (
                <>
                  <ChevronLeft size={18} aria-hidden="true" />
                  <span>{t('home.secretaryMessage.cta')}</span>
                </>
              ) : (
                <>
                  <span>{t('home.secretaryMessage.cta')}</span>
                  <ChevronRight size={18} aria-hidden="true" />
                </>
              )}
            </Link>
          </div>

          <div className="secretary-message__media">
            <div className="secretary-message__media-bg" aria-hidden="true" />
            <img src={content.image} alt={content.imageAlt} className="secretary-message__image" />
          </div>
        </div>
      </div>
    </section>
  );
}
