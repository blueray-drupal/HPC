import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDrupalFetch } from '@/hooks/useDrupalFetch.js';
import { useTranslation } from '@/i18n/useTranslation.js';
import { fetchSliders } from '@/services/api/slider.js';
import { HERO_SLIDES } from './heroSlides.js';
import './HeroSlider.css';

const AUTO_PLAY_MS = 7000;

function SlideCta({ slide }) {
  if (slide.ctaExternal) {
    return (
      <a
        href={slide.ctaLink}
        className="hero-slider__cta hpc-icon-trailing"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ChevronLeft size={18} aria-hidden="true" />
        <span>{slide.ctaLabel}</span>
      </a>
    );
  }

  return (
    <Link to={slide.ctaLink || '#'} className="hero-slider__cta hpc-icon-trailing">
      <ChevronLeft size={18} aria-hidden="true" />
      <span>{slide.ctaLabel}</span>
    </Link>
  );
}

function mapSlides(items, readMoreLabel) {
  if (!items?.length) return HERO_SLIDES;

  return items.map((slide, index) => ({
    id: slide.id || index + 1,
    image: slide.image || HERO_SLIDES[index % HERO_SLIDES.length]?.image || HERO_SLIDES[0].image,
    badge: slide.badge || '',
    title: slide.title,
    description: slide.description,
    ctaLabel: slide.ctaLabel || readMoreLabel,
    ctaLink: slide.ctaLink && slide.ctaLink !== '#' ? slide.ctaLink : '/about',
    ctaExternal: slide.ctaExternal,
  }));
}

export default function HeroSlider() {
  const { t } = useTranslation();
  const { data, loading } = useDrupalFetch((lang) => fetchSliders(lang));
  const slides = useMemo(() => {
    if (data?.length) return mapSlides(data, t('common.readMore'));
    if (!loading) return HERO_SLIDES;
    return [];
  }, [data, loading, t]);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = slides.length;

  useEffect(() => {
    setActiveIndex(0);
  }, [data]);

  const goToSlide = (index) => {
    setActiveIndex((index + totalSlides) % totalSlides);
  };

  const goNext = () => goToSlide(activeIndex + 1);
  const goPrev = () => goToSlide(activeIndex - 1);

  useEffect(() => {
    if (totalSlides <= 1) return undefined;
    const timer = window.setInterval(goNext, AUTO_PLAY_MS);
    return () => window.clearInterval(timer);
  }, [activeIndex, totalSlides]);

  if (loading || !totalSlides) return null;

  return (
    <section className="hero-slider" aria-label="سلايدر الصفحة الرئيسية">
      <div className="hero-slider__track">
        {slides.map((slide, index) => (
          <article
            key={slide.id}
            className={['hero-slider__slide', index === activeIndex ? 'is-active' : ''].join(' ')}
            aria-hidden={index !== activeIndex}
          >
            <img src={slide.image} alt="" className="hero-slider__image" />
            <div className="hero-slider__overlay" aria-hidden="true" />

            <div className="hero-slider__content">
              <div className="hero-slider__inner">
                <div className="hero-slider__text">
                  {slide.badge ? <span className="hero-slider__badge">{slide.badge}</span> : null}
                  <h1 className="hero-slider__title">{slide.title}</h1>
                  {slide.description ? (
                    <p className="hero-slider__description">{slide.description}</p>
                  ) : null}
                  <SlideCta slide={slide} />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {totalSlides > 1 ? (
        <>
          <button
            type="button"
            className="hero-slider__arrow hero-slider__arrow--prev"
            onClick={goPrev}
            aria-label="الشريحة السابقة"
          >
            <ChevronRight size={22} />
          </button>

          <button
            type="button"
            className="hero-slider__arrow hero-slider__arrow--next"
            onClick={goNext}
            aria-label="الشريحة التالية"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="hero-slider__dots" role="tablist" aria-label="شرائح السلايدر">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`الشريحة ${index + 1}`}
                className={['hero-slider__dot', index === activeIndex ? 'is-active' : ''].join(' ')}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
