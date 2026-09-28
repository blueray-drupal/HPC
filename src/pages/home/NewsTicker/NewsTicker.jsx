import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { NEWS_TICKER_ITEMS } from './newsTickerData.js';
import './NewsTicker.css';

function IconChevronRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none" aria-hidden="true">
      <path
        d="M0.666748 8.66675L4.66675 4.66675L0.666748 0.666748"
        stroke="#0A0A0A"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconChevronLeft() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M10 12L6 8L10 4"
        stroke="#0A0A0A"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPause() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M9.91675 2.33325H8.75008C8.42792 2.33325 8.16675 2.59442 8.16675 2.91659V11.0833C8.16675 11.4054 8.42792 11.6666 8.75008 11.6666H9.91675C10.2389 11.6666 10.5001 11.4054 10.5001 11.0833V2.91659C10.5001 2.59442 10.2389 2.33325 9.91675 2.33325Z"
        stroke="#0A0A0A"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.25 2.33325H4.08333C3.76117 2.33325 3.5 2.59442 3.5 2.91659V11.0833C3.5 11.4054 3.76117 11.6666 4.08333 11.6666H5.25C5.57217 11.6666 5.83333 11.4054 5.83333 11.0833V2.91659C5.83333 2.59442 5.57217 2.33325 5.25 2.33325Z"
        stroke="#0A0A0A"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function stepAnimation(track, direction) {
  const animation = track?.getAnimations?.()[0];
  if (!animation) return;
  animation.currentTime = Math.max(0, animation.currentTime + direction * 1800);
}

const TICKER_SEGMENT_REPEAT = 4;

function buildLoopItems(items) {
  const segment = Array.from({ length: TICKER_SEGMENT_REPEAT }, () => items).flat();
  return [...segment, ...segment];
}

export default function NewsTicker() {
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const loopItems = buildLoopItems(NEWS_TICKER_ITEMS);
  const segmentLength = loopItems.length / 2;

  const handlePrev = () => stepAnimation(trackRef.current, 1);
  const handleNext = () => stepAnimation(trackRef.current, -1);
  const togglePause = () => setPaused((current) => !current);

  return (
    <section className="news-ticker" aria-label="شريط آخر الأخبار">
      <div className="news-ticker__label">
        <span className="news-ticker__label-dot" aria-hidden="true" />
        <span>آخر الأخبار</span>
      </div>

      <div className="news-ticker__viewport">
        <div
          ref={trackRef}
          className={['news-ticker__track', paused ? 'is-paused' : ''].filter(Boolean).join(' ')}
        >
          {loopItems.map((item, index) => (
            <span
              key={`${item.id}-${index}`}
              className="news-ticker__item"
              aria-hidden={index >= segmentLength ? true : undefined}
            >
              <img src="/logo.png" alt="" className="news-ticker__separator" />
              <Link to={item.link} className="news-ticker__link">
                {item.title}
              </Link>
            </span>
          ))}
        </div>
      </div>

      <div className="news-ticker__controls">
        <button type="button" className="news-ticker__control-btn" onClick={handleNext} aria-label="الخبر التالي">
          <IconChevronRight />
        </button>

        <button
          type="button"
          className="news-ticker__control-btn"
          onClick={togglePause}
          aria-label={paused ? 'تشغيل شريط الأخبار' : 'إيقاف شريط الأخبار'}
        >
          <IconPause />
        </button>

        <button type="button" className="news-ticker__control-btn" onClick={handlePrev} aria-label="الخبر السابق">
          <IconChevronLeft />
        </button>
      </div>
    </section>
  );
}
