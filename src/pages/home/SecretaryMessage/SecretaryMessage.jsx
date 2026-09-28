import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useDrupalFetch } from '@/hooks/useDrupalFetch.js';
import { fetchSecretaryMessage } from '@/services/api/secretaryMessage.js';
import { SECRETARY_MESSAGE } from './secretaryMessageData.js';
import './SecretaryMessage.css';

function mergeSecretaryMessage(message) {
  if (!message) return SECRETARY_MESSAGE;

  return {
    eyebrow: message.eyebrow || SECRETARY_MESSAGE.eyebrow,
    titleLine1: message.titleLine1 || SECRETARY_MESSAGE.titleLine1,
    titleLine2: message.titleLine2 || SECRETARY_MESSAGE.titleLine2,
    body: message.body || SECRETARY_MESSAGE.body,
    name: message.name || SECRETARY_MESSAGE.name,
    ctaLabel: SECRETARY_MESSAGE.ctaLabel,
    ctaLink: SECRETARY_MESSAGE.ctaLink,
    image: message.image || SECRETARY_MESSAGE.image,
    imageAlt: message.imageAlt || SECRETARY_MESSAGE.imageAlt,
  };
}

export default function SecretaryMessage() {
  const { data, loading } = useDrupalFetch((lang) =>
    fetchSecretaryMessage(lang).catch(() => null),
  );
  const content = useMemo(() => mergeSecretaryMessage(data), [data]);

  if (loading) return null;

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

            <p className="secretary-message__body">{content.body}</p>
            {content.name ? <p className="secretary-message__name">{content.name}</p> : null}

            <Link to={content.ctaLink} className="secretary-message__cta hpc-icon-trailing">
              <ChevronLeft size={18} aria-hidden="true" />
              <span>{content.ctaLabel}</span>
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
