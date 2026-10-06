import { Download } from 'lucide-react';
import './StrategyDownload.css';

const PDF_ICON_SRC = '/home/pdf-hpc.svg';

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
            <img
              src={PDF_ICON_SRC}
              alt=""
              className="strategy-download__file-icon"
              width={20}
              height={20}
              decoding="async"
            />
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
