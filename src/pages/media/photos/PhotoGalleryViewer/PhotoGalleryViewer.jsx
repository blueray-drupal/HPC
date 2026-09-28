import { useState } from 'react';
import './PhotoGalleryViewer.css';

function NavArrowIcon({ direction }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      {direction === 'prev' ? (
        <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

export default function PhotoGalleryViewer({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = images.length;

  const goToPrevious = () => {
    setActiveIndex((current) => (current === 0 ? total - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveIndex((current) => (current === total - 1 ? 0 : current + 1));
  };

  return (
    <div className="photo-gallery-viewer">
      <div className="photo-gallery-viewer__main">
        <img
          src={images[activeIndex]}
          alt=""
          className="photo-gallery-viewer__main-image"
        />

        <button
          type="button"
          className="photo-gallery-viewer__nav photo-gallery-viewer__nav--prev"
          onClick={goToPrevious}
          aria-label="الصورة السابقة"
        >
          <NavArrowIcon direction="prev" />
        </button>

        <button
          type="button"
          className="photo-gallery-viewer__nav photo-gallery-viewer__nav--next"
          onClick={goToNext}
          aria-label="الصورة التالية"
        >
          <NavArrowIcon direction="next" />
        </button>
      </div>

      <div className="photo-gallery-viewer__thumbs">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            className={`photo-gallery-viewer__thumb${index === activeIndex ? ' photo-gallery-viewer__thumb--active' : ''}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`عرض الصورة ${index + 1}`}
            aria-current={index === activeIndex ? 'true' : undefined}
          >
            <img src={image} alt="" className="photo-gallery-viewer__thumb-image" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}
