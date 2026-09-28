import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import './SearchResults.css';

function CalendarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none" aria-hidden="true">
      <path
        d="M1.16667 11.6667C0.845833 11.6667 0.571181 11.5524 0.342708 11.324C0.114236 11.0955 0 10.8208 0 10.5V2.33333C0 2.0125 0.114236 1.73785 0.342708 1.50937C0.571181 1.2809 0.845833 1.16667 1.16667 1.16667H1.75V0H2.91667V1.16667H7.58333V0H8.75V1.16667H9.33333C9.65417 1.16667 9.92882 1.2809 10.1573 1.50937C10.3858 1.73785 10.5 2.0125 10.5 2.33333V10.5C10.5 10.8208 10.3858 11.0955 10.1573 11.324C9.92882 11.5524 9.65417 11.6667 9.33333 11.6667H1.16667ZM1.16667 10.5H9.33333V4.66667H1.16667V10.5ZM1.16667 3.5H9.33333V2.33333H1.16667V3.5Z"
        fill="#64748B"
      />
    </svg>
  );
}

function CategoryIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M2 2.5H10V10.5H2V2.5Z"
        stroke="#64748B"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path d="M4 2.5V1.5H8V2.5" stroke="#64748B" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function SearchResultCard({ item }) {
  return (
    <article className="search-result-card">
      <div className="search-result-card__meta">
        <span className="search-result-card__date">
          <CalendarIcon />
          <span>{item.publishDate}</span>
        </span>

        <span className="search-result-card__category">
          <CategoryIcon />
          <span>{item.categoryLabel}</span>
        </span>
      </div>

      <h3 className="search-result-card__title">{item.title}</h3>
      <p className="search-result-card__excerpt">{item.excerpt}</p>

      <Link to={item.path} className="search-result-card__cta hpc-icon-trailing">
        <ChevronLeft size={16} aria-hidden="true" />
        <span>اقرأ المزيد</span>
      </Link>
    </article>
  );
}

export default function SearchResults({ items, query, loading }) {
  if (loading) {
    return (
      <div className="search-results__loading" role="status">
        جاري البحث...
      </div>
    );
  }

  if (!query.trim()) {
    return (
      <div className="search-results__empty" role="status">
        اكتب كلمة البحث في الحقل أعلاه ثم اضغط «بحث».
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="search-results__empty" role="status">
        لم يتم العثور على نتائج مطابقة لـ &ldquo;{query}&rdquo;.
      </div>
    );
  }

  return (
    <div className="search-results">
      <p className="search-results__summary">
        تم العثور على {items.length} نتيجة لـ &ldquo;{query}&rdquo;
      </p>

      <ul className="search-results__list">
        {items.map((item) => (
          <li key={item.id}>
            <SearchResultCard item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
