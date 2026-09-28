import './DemographicPdfList.css';

function PdfIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <path
        d="M10.5 15.75H12V12.75H13.5C13.925 12.75 14.2812 12.6063 14.5688 12.3188C14.8563 12.0312 15 11.675 15 11.25V9.75C15 9.325 14.8563 8.96875 14.5688 8.68125C14.2812 8.39375 13.925 8.25 13.5 8.25H10.5V15.75ZM12 11.25V9.75H13.5V11.25H12ZM16.5 15.75H19.5C19.925 15.75 20.2812 15.6063 20.5688 15.3188C20.8563 15.0312 21 14.675 21 14.25V9.75C21 9.325 20.8563 8.96875 20.5688 8.68125C20.2812 8.39375 19.925 8.25 19.5 8.25H16.5V15.75ZM18 14.25V9.75H19.5V14.25H18ZM22.5 15.75H24V12.75H25.5V11.25H24V9.75H25.5V8.25H22.5V15.75ZM9 24C8.175 24 7.46875 23.7062 6.88125 23.1187C6.29375 22.5312 6 21.825 6 21V3C6 2.175 6.29375 1.46875 6.88125 0.88125C7.46875 0.29375 8.175 0 9 0H27C27.825 0 28.5312 0.29375 29.1187 0.88125C29.7062 1.46875 30 2.175 30 3V21C30 21.825 29.7062 22.5312 29.1187 23.1187C28.5312 23.7062 27.825 24 27 24H9ZM3 30C2.175 30 1.46875 29.7062 0.88125 29.1187C0.29375 28.5312 0 27.825 0 27V6H3V27H24V30H3Z"
        fill="#BA1A1A"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none" aria-hidden="true">
      <path
        d="M1.16667 11.6667C0.845833 11.6667 0.571181 11.5524 0.342708 11.324C0.114236 11.0955 0 10.8208 0 10.5V2.33333C0 2.0125 0.114236 1.73785 0.342708 1.50937C0.571181 1.2809 0.845833 1.16667 1.16667 1.16667H1.75V0H2.91667V1.16667H7.58333V0H8.75V1.16667H9.33333C9.65417 1.16667 9.92882 1.2809 10.1573 1.50937C10.3858 1.73785 10.5 2.0125 10.5 2.33333V10.5C10.5 10.8208 10.3858 11.0955 10.1573 11.324C9.92882 11.5524 9.65417 11.6667 9.33333 11.6667H1.16667ZM1.16667 10.5H9.33333V4.66667H1.16667V10.5ZM1.16667 3.5H9.33333V2.33333H1.16667V3.5Z"
        fill="#414754"
      />
    </svg>
  );
}

function FileSizeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <circle cx="6" cy="6" r="5" stroke="#414754" strokeWidth="1" />
      <path d="M6 3.5V6.5L7.75 7.75" stroke="#414754" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 2V10M8 10L5 7M8 10L11 7M3 13H13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function DemographicPdfList({ items }) {
  if (!items.length) {
    return <p className="demographic-pdf-list__empty">لا توجد ملفات متاحة حالياً.</p>;
  }

  return (
    <ul className="demographic-pdf-list">
      {items.map((item) => (
        <li key={item.id} className="demographic-pdf-list__item">
          <article className="demographic-pdf-card">
            <div className="demographic-pdf-card__icon-wrap">
              <PdfIcon />
            </div>

            <div className="demographic-pdf-card__content">
              <h3 className="demographic-pdf-card__title">{item.title}</h3>

              <div className="demographic-pdf-card__meta">
                <span className="demographic-pdf-card__meta-item">
                  <CalendarIcon />
                  <span>تم النشر: {item.publishDate}</span>
                </span>
                <span className="demographic-pdf-card__meta-item">
                  <FileSizeIcon />
                  <span>{item.fileSize}</span>
                </span>
              </div>
            </div>

            <a href={item.downloadUrl} className="demographic-pdf-card__download" download>
              <DownloadIcon />
              <span>تحميل</span>
            </a>
          </article>
        </li>
      ))}
    </ul>
  );
}
