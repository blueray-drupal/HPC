import { TENDER_CATEGORIES, TENDER_STATUSES } from '../tendersData.js';
import './TendersGrid.css';

function CalendarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none" aria-hidden="true">
      <path
        d="M1.16667 11.6667C0.845833 11.6667 0.571181 11.5524 0.342708 11.324C0.114236 11.0955 0 10.8208 0 10.5V2.33333C0 2.0125 0.114236 1.73785 0.342708 1.50937C0.571181 1.2809 0.845833 1.16667 1.16667 1.16667H1.75V0H2.91667V1.16667H7.58333V0H8.75V1.16667H9.33333C9.65417 1.16667 9.92882 1.2809 10.1573 1.50937C10.3858 1.73785 10.5 2.0125 10.5 2.33333V10.5C10.5 10.8208 10.3858 11.0955 10.1573 11.324C9.92882 11.5524 9.65417 11.6667 9.33333 11.6667H1.16667ZM1.16667 10.5H9.33333V4.66667H1.16667V10.5ZM1.16667 3.5H9.33333V2.33333H1.16667V3.5ZM1.16667 3.5V2.33333V3.5ZM5.25 7C5.08472 7 4.94618 6.9441 4.83437 6.83229C4.72257 6.72049 4.66667 6.58194 4.66667 6.41667C4.66667 6.25139 4.72257 6.11285 4.83437 6.00104C4.94618 5.88924 5.08472 5.83333 5.25 5.83333C5.41528 5.83333 5.55382 5.88924 5.66563 6.00104C5.77743 6.11285 5.83333 6.25139 5.83333 6.41667C5.83333 6.58194 5.77743 6.72049 5.66563 6.83229C5.55382 6.9441 5.41528 7 5.25 7ZM2.91667 7C2.75139 7 2.61285 6.9441 2.50104 6.83229C2.38924 6.72049 2.33333 6.58194 2.33333 6.41667C2.33333 6.25139 2.38924 6.11285 2.50104 6.00104C2.61285 5.88924 2.75139 5.83333 2.91667 5.83333C3.08194 5.83333 3.22049 5.88924 3.33229 6.00104C3.4441 6.11285 3.5 6.25139 3.5 6.41667C3.5 6.58194 3.4441 6.72049 3.33229 6.83229C3.22049 6.9441 3.08194 7 2.91667 7ZM7.58333 7C7.41806 7 7.27951 6.9441 7.16771 6.83229C7.0559 6.72049 7 6.58194 7 6.41667C7 6.25139 7.0559 6.11285 7.16771 6.00104C7.27951 5.88924 7.41806 5.83333 7.58333 5.83333C7.74861 5.83333 7.88715 5.88924 7.99896 6.00104C8.11076 6.11285 8.16667 6.25139 8.16667 6.41667C8.16667 6.58194 8.11076 6.72049 7.99896 6.83229C7.88715 6.9441 7.74861 7 7.58333 7ZM5.25 9.33333C5.08472 9.33333 4.94618 9.27743 4.83437 9.16562C4.72257 9.05382 4.66667 8.91528 4.66667 8.75C4.66667 8.58472 4.72257 8.44618 4.83437 8.33438C4.94618 8.22257 5.08472 8.16667 5.25 8.16667C5.41528 8.16667 5.55382 8.22257 5.66563 8.33438C5.77743 8.44618 5.83333 8.58472 5.83333 8.75C5.83333 8.91528 5.77743 9.05382 5.66563 9.16562C5.55382 9.27743 5.41528 9.33333 5.25 9.33333ZM2.91667 9.33333C2.75139 9.33333 2.61285 9.27743 2.50104 9.16562C2.38924 9.05382 2.33333 8.91528 2.33333 8.75C2.33333 8.58472 2.38924 8.44618 2.50104 8.33438C2.61285 8.22257 2.75139 8.16667 2.91667 8.16667C3.08194 8.16667 3.22049 8.22257 3.33229 8.33438C3.4441 8.44618 3.5 8.58472 3.5 8.75C3.5 8.91528 3.4441 9.05382 3.33229 9.16562C3.22049 9.27743 3.08194 9.33333 2.91667 9.33333ZM7.58333 9.33333C7.41806 9.33333 7.27951 9.27743 7.16771 9.16562C7.0559 9.05382 7 8.91528 7 8.75C7 8.58472 7.0559 8.44618 7.16771 8.33438C7.27951 8.22257 7.41806 8.16667 7.58333 8.16667C7.74861 8.16667 7.88715 8.22257 7.99896 8.33438C8.11076 8.44618 8.16667 8.58472 8.16667 8.75C8.16667 8.91528 8.11076 9.05382 7.99896 9.16562C7.88715 9.27743 7.74861 9.33333 7.58333 9.33333Z"
        fill="#414754"
      />
    </svg>
  );
}

function CategoryIcon({ type }) {
  if (type === 'consulting') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path
          d="M6.75 1.5L10.5 6.75V10.5C10.5 10.9125 10.1625 11.25 9.75 11.25H2.25C1.8375 11.25 1.5 10.9125 1.5 10.5V6.75L5.25 1.5C5.4375 1.2375 5.8125 1.1625 6.075 1.35C6.15 1.4025 6.6975 1.95 6.75 1.5Z"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === 'maintenance') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path
          d="M7.35 1.65L10.35 4.65L4.65 10.35L1.65 7.35L7.35 1.65Z"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M2 3.5H10V10.5H2V3.5Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path d="M4 3.5V2.5H8V3.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function TenderCard({ item }) {
  const status = TENDER_STATUSES[item.status] || TENDER_STATUSES.closed;
  const categoryKey = TENDER_CATEGORIES[item.category] ? item.category : 'supply';
  const category = TENDER_CATEGORIES[categoryKey];
  const categoryLabel = item.categoryLabel || category?.label || '';
  const cardClassName = `tenders-grid__card${item.downloadUrl ? ' tenders-grid__card--link' : ''}`;

  const content = (
    <>
      <div className="tenders-grid__badges">
        <span className={`tenders-grid__badge tenders-grid__badge--category tenders-grid__badge--${categoryKey}`}>
          {item.categoryIcon ? (
            <img src={item.categoryIcon} alt="" className="tenders-grid__category-icon" />
          ) : (
            <CategoryIcon type={categoryKey} />
          )}
          <span>{categoryLabel}</span>
        </span>
        <span className={`tenders-grid__badge tenders-grid__badge--${item.status}`}>
          {status.label}
        </span>
      </div>

      <div className="tenders-grid__body">
        <p className="tenders-grid__number">رقم العطاء: {item.number}</p>
        <h3 className="tenders-grid__title">{item.title}</h3>
        {item.excerpt ? <p className="tenders-grid__excerpt">{item.excerpt}</p> : null}
      </div>

      <div className="tenders-grid__date">
        <CalendarIcon />
        <span>تاريخ الطرح: {item.publishDate}</span>
      </div>
    </>
  );

  if (item.downloadUrl) {
    return (
      <a
        href={item.downloadUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClassName}
        aria-label={`فتح ملف ${item.title}`}
      >
        {content}
      </a>
    );
  }

  return (
    <article className={cardClassName}>
      {content}
    </article>
  );
}

export default function TendersGrid({ items }) {
  if (!items.length) {
    return <p className="tenders-grid__empty">لا توجد عطاءات مطابقة لمعايير البحث.</p>;
  }

  return (
    <div className="tenders-grid">
      {items.map((item) => (
        <TenderCard key={item.id} item={item} />
      ))}
    </div>
  );
}
