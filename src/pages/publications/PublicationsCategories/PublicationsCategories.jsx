import { Link } from 'react-router-dom';
import { useTranslation } from '@/i18n/useTranslation.js';
import { PublicationArrowIcon, PublicationCategoryIcon } from '../PublicationCategoryIcons.jsx';
import './PublicationsCategories.css';

export default function PublicationsCategories({ categories }) {
  const { t } = useTranslation();

  if (!categories?.length) return null;

  return (
    <section className="publications-categories" aria-label={t('publications.categoriesAria')}>
      <div className="publications-categories__grid">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={category.to}
            className={[
              'publication-category',
              `publication-category--${category.theme}`,
              `publication-category--${category.size}`,
            ].join(' ')}
          >
            <span className="publication-category__arrow" aria-hidden="true">
              <PublicationArrowIcon />
            </span>

            <span className="publication-category__icon" aria-hidden="true">
              <PublicationCategoryIcon name={category.icon} />
            </span>

            <div className="publication-category__content">
              <h2 className="publication-category__title">{category.title}</h2>
              <p className="publication-category__description">{category.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
