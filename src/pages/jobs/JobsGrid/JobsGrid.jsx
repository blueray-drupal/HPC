import { Link } from 'react-router-dom';
import { JOB_TYPES } from '../jobsData.js';
import './JobsGrid.css';

function FieldIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none" aria-hidden="true">
      <path
        d="M3.5 9L9 0L14.5 9H3.5ZM14.5 20C13.25 20 12.1875 19.5625 11.3125 18.6875C10.4375 17.8125 10 16.75 10 15.5C10 14.25 10.4375 13.1875 11.3125 12.3125C12.1875 11.4375 13.25 11 14.5 11C15.75 11 16.8125 11.4375 17.6875 12.3125C18.5625 13.1875 19 14.25 19 15.5C19 16.75 18.5625 17.8125 17.6875 18.6875C16.8125 19.5625 15.75 20 14.5 20ZM0 19.5V11.5H8V19.5H0ZM14.5 18C15.2 18 15.7917 17.7583 16.275 17.275C16.7583 16.7917 17 16.2 17 15.5C17 14.8 16.7583 14.2083 16.275 13.725C15.7917 13.2417 15.2 13 14.5 13C13.8 13 13.2083 13.2417 12.725 13.725C12.2417 14.2083 12 14.8 12 15.5C12 16.2 12.2417 16.7917 12.725 17.275C13.2083 17.7583 13.8 18 14.5 18ZM2 17.5H6V13.5H2V17.5ZM7.05 7H10.95L9 3.85L7.05 7Z"
        fill="#874E00"
      />
    </svg>
  );
}

function QualificationIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 18" fill="none" aria-hidden="true">
      <path
        d="M11 18L4 14.2V8.2L0 6L11 0L22 6V14H20V7.1L18 8.2V14.2L11 18ZM11 9.7L17.85 6L11 2.3L4.15 6L11 9.7ZM11 15.725L16 13.025V9.25L11 12L6 9.25V13.025L11 15.725Z"
        fill="#874E00"
      />
    </svg>
  );
}

function ExperienceIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="20" viewBox="0 0 10 20" fill="none" aria-hidden="true">
      <path
        d="M0 0H10V7.85C10 8.23333 9.91667 8.575 9.75 8.875C9.58333 9.175 9.35 9.41667 9.05 9.6L5.5 11.7L6.2 14H10L6.9 16.2L8.1 20L5 17.65L1.9 20L3.1 16.2L0 14H3.8L4.5 11.7L0.95 9.6C0.65 9.41667 0.416667 9.175 0.25 8.875C0.0833333 8.575 0 8.23333 0 7.85V0ZM2 2V7.85L4 9.05V2H2ZM8 2H6V9.05L8 7.85V2Z"
        fill="#874E00"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none" aria-hidden="true">
      <path
        d="M2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V4C0 3.45 0.195833 2.97917 0.5875 2.5875C0.979167 2.19583 1.45 2 2 2H3V0H5V2H13V0H15V2H16C16.55 2 17.0208 2.19583 17.4125 2.5875C17.8042 2.97917 18 3.45 18 4V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H2ZM2 18H16V8H2V18ZM2 6H16V4H2V6ZM2 6V4V6Z"
        fill="#874E00"
      />
    </svg>
  );
}

function FullTimeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M3.5 2H8.5C8.9125 2 9.25 2.3375 9.25 2.75V9.25C9.25 9.6625 8.9125 10 8.5 10H3.5C3.0875 10 2.75 9.6625 2.75 9.25V2.75C2.75 2.3375 3.0875 2 3.5 2Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path d="M4.5 1V2.5M7.5 1V2.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function PartTimeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M6 1C3.2375 1 1 3.2375 1 6C1 8.7625 3.2375 11 6 11C8.7625 11 11 8.7625 11 6C11 3.2375 8.7625 1 6 1Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path d="M6 3.5V6L7.75 7.75" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function ApplyArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden="true">
      <path
        d="M11.082 -8.10623e-05L11.082 9.33325L-0.00130136 4.66658L11.082 -8.10623e-05ZM9.91537 1.74992L3.00287 4.66658L9.91536 7.58325L9.91536 5.54159L6.41537 4.66659L9.91537 3.79159L9.91537 1.74992ZM9.91537 1.74992L9.91537 4.66659L9.91536 7.58325L9.91536 5.54159L9.91537 3.79159L9.91537 1.74992Z"
        fill="#F3F9FF"
      />
    </svg>
  );
}

function JobMetaItem({ icon, label, value }) {
  return (
    <div className="jobs-grid__meta-item">
      <span className="jobs-grid__meta-icon">{icon}</span>
      <div className="jobs-grid__meta-text">
        <span className="jobs-grid__meta-label">{label}</span>
        <span className="jobs-grid__meta-value">{value}</span>
      </div>
    </div>
  );
}

export default function JobsGrid({ items }) {
  if (!items.length) {
    return <p className="jobs-grid__empty">لا توجد وظائف مطابقة لمعايير البحث.</p>;
  }

  return (
    <div className="jobs-grid">
      {items.map((item) => {
        const jobType = JOB_TYPES[item.type];
        const employmentLabel = jobType?.label || item.employmentTypeLabel || '';

        return (
          <article key={item.id} className="jobs-grid__card">
            <div className="jobs-grid__header">
              <h3 className="jobs-grid__title">{item.title}</h3>
              {employmentLabel ? (
                <span className={`jobs-grid__badge jobs-grid__badge--${item.type}`}>
                  {item.type === 'fullTime' ? <FullTimeIcon /> : <PartTimeIcon />}
                  <span>{employmentLabel}</span>
                </span>
              ) : null}
            </div>

            <p className="jobs-grid__description">{item.description}</p>

            <div className="jobs-grid__meta">
              <JobMetaItem icon={<FieldIcon />} label="المجال:" value={item.field} />
              <JobMetaItem icon={<QualificationIcon />} label="المؤهل:" value={item.qualification} />
              <JobMetaItem icon={<ExperienceIcon />} label="الخبرة:" value={item.experience} />
              <JobMetaItem icon={<CalendarIcon />} label="تاريخ النشر:" value={item.publishDate} />
            </div>

            <Link to={`/jobs/${item.id}`} className="jobs-grid__apply">
              <span>قدم الآن</span>
              <ApplyArrowIcon />
            </Link>
          </article>
        );
      })}
    </div>
  );
}
