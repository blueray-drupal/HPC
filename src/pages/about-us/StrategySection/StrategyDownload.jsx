import { Download } from 'lucide-react';
import './StrategyDownload.css';

function PdfIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 2C5.45 2 4.97917 2.19583 4.5875 2.5875C4.19583 2.97917 4 3.45 4 4V20C4 20.55 4.19583 21.0208 4.5875 21.4125C4.97917 21.8042 5.45 22 6 22H18C18.55 22 19.0208 21.8042 19.4125 21.4125C19.8042 21.0208 20 20.55 20 20V8L14 2H6ZM13 9V3.5L18.5 9H13ZM8 12H16V14H8V12ZM8 16H13V18H8V16Z"
        fill="#6B4A3D"
      />
    </svg>
  );
}

export default function StrategyDownload({ data, hideHeader = false }) {
  if (!data) return null;

  return (
    <section
      className="strategy-download"
      aria-labelledby={hideHeader ? undefined : 'strategy-download-title'}
    >
      {!hideHeader ? (
        <header className="strategy-download__header">
          <Download size={22} strokeWidth={2} className="strategy-download__header-icon" aria-hidden="true" />
          <h3 id="strategy-download-title" className="strategy-download__title">
            {data.title}
          </h3>
        </header>
      ) : null}

      <div className="strategy-download__table" role="table" aria-label="مرفقات الخطة الإستراتيجية">
        <div className="strategy-download__thead" role="row">
          <span className="strategy-download__th strategy-download__th--attachment" role="columnheader">
            المرفق
          </span>
          <span className="strategy-download__th strategy-download__th--size" role="columnheader">
            الحجم
          </span>
        </div>

        <div className="strategy-download__row" role="row">
          <a
            href={data.file.href}
            className="strategy-download__file"
            target="_blank"
            rel="noopener noreferrer"
            role="cell"
          >
            <PdfIcon />
            <span>{data.file.label}</span>
          </a>
          <span className="strategy-download__size" role="cell">
            {data.file.size}
          </span>
        </div>
      </div>
    </section>
  );
}
