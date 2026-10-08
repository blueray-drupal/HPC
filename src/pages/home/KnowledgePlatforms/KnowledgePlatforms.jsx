import { ExternalLink } from 'lucide-react';
import { useDrupalFetch } from '@/hooks/useDrupalFetch.js';
import { useLanguage } from '@/hooks/useLanguage.js';
import { useTranslation } from '@/i18n/useTranslation.js';
import { fetchKnowledgePlatforms } from '@/services/api/knowledgePlatforms.js';
import { localizedStaticFallback } from '@/services/api/languageContent.js';
import { KNOWLEDGE_PLATFORMS_FALLBACK } from './knowledgePlatformsData.js';
import './KnowledgePlatforms.css';

export default function KnowledgePlatforms() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const { data, loading } = useDrupalFetch((lang) =>
    fetchKnowledgePlatforms(lang).catch(
      () => localizedStaticFallback(lang, KNOWLEDGE_PLATFORMS_FALLBACK) ?? [],
    ),
  );
  const platforms = data?.length
    ? data
    : loading
      ? []
      : localizedStaticFallback(language, KNOWLEDGE_PLATFORMS_FALLBACK) ?? [];

  if (loading || !platforms.length) return null;

  return (
    <section className="knowledge-platforms" aria-labelledby="knowledge-platforms-title">
      <div className="knowledge-platforms__inner">
        <h2 id="knowledge-platforms-title" className="knowledge-platforms__heading">
          <span className="knowledge-platforms__heading-line" aria-hidden="true" />
          <span className="knowledge-platforms__heading-text">{t('home.knowledgePlatforms.title')}</span>
          <span className="knowledge-platforms__heading-line" aria-hidden="true" />
        </h2>

        <div className="knowledge-platforms__grid">
          {platforms.map((platform) => (
            <article
              key={platform.id}
              className={[
                'knowledge-platforms__card',
                `knowledge-platforms__card--${platform.theme}`,
              ].join(' ')}
            >
              <img
                src={platform.logo}
                alt={platform.logoAlt}
                className="knowledge-platforms__logo"
              />

              <h3 className="knowledge-platforms__title">{platform.title}</h3>
              {platform.description ? (
                <p className="knowledge-platforms__description">{platform.description}</p>
              ) : null}

              <a
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  'knowledge-platforms__link',
                  `knowledge-platforms__link--${platform.theme}`,
                ].join(' ')}
              >
                <span>{platform.linkLabel}</span>
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
