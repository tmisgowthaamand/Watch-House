import { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { getLocalImageMeta } from '../utils/imageProps';
import OptimizedImage from './OptimizedImage';

const slides = [
  {
    leftTitle: "No two Houses the same",
    leftDesc: "Brewing daily across London, New York and Dubai.",
    rightTitle: "Our Houses",
    rightLink: "Find your nearest House. →",
    imageLeft: "/hero.png",
    imageRight: "/hero2.png"
  },
  {
    leftTitle: "World Class Coffee",
    leftDesc: "Directly sourced from the world's best producers.",
    rightTitle: "Shop Beans",
    rightLink: "Explore our range. →",
    imageLeft: "/hero2.png",
    imageRight: "/hero3.png"
  },
  {
    leftTitle: "The WatchHouse App",
    leftDesc: "Order ahead and skip the queue.",
    rightTitle: "Download",
    rightLink: "Available on iOS & Android. →",
    imageLeft: "/hero3.png",
    imageRight: "/hero.png"
  }
];

const slideLinks = ['/locations', '/collections/all', '/subscribe'];

const Hero = memo(() => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesPrimed, setImagesPrimed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const preloadSlides = () => {
      slides.forEach((slide) => {
        [slide.imageLeft, slide.imageRight].forEach((src) => {
          const meta = getLocalImageMeta(src);
          const img = new Image();
          img.decoding = 'async';
          img.src = meta ? `${meta.base}-640.avif` : src;
        });
      });
      setImagesPrimed(true);
    };

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(preloadSlides, { timeout: 1800 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timer = window.setTimeout(preloadSlides, 900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="hero">
      <h1 className="sr-only">WatchHouse - Modern Coffee Across Distinctive Houses</h1>
      <div className="slider-nav">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`nav-num ${currentSlide === i ? 'active' : ''}`}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Show hero slide ${i + 1}`}
          >
            0{i + 1}
          </button>
        ))}
      </div>

      <div className="slide-container" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, i) => (
          <div key={i} className="hero-slide">
            <div className="hero-split">
              <div className="hero-side left-side">
                <div className="image-bg" style={{
                  opacity: currentSlide === i || imagesPrimed ? 1 : 0,
                  transform: `scale(1.1) translate(var(--mx), var(--my))`
                }}>
                  <OptimizedImage
                    src={slide.imageLeft}
                    alt=""
                    aria-hidden="true"
                    className="image-bg-img"
                    loading={i === 0 ? 'eager' : 'lazy'}
                    fetchPriority={i === 0 ? 'high' : undefined}
                    sizes="(max-width: 767px) 100vw, 50vw"
                    width="1024"
                    height="1024"
                  />
                </div>
                <div className="hero-content animate-fade-in">
                  <h2 className="serif-dot">
                    {slide.leftTitle}
                  </h2>
                  <p>{slide.leftDesc}</p>
                </div>
              </div>
              <div className="hero-side right-side">
                <div className="image-bg image-bg-zoomed" style={{
                  opacity: currentSlide === i || imagesPrimed ? 1 : 0,
                  transform: `scale(1.1) translate(calc(var(--mx) * -1), calc(var(--my) * -1))`
                }}>
                  <OptimizedImage
                    src={slide.imageRight}
                    alt=""
                    aria-hidden="true"
                    className="image-bg-img"
                    loading={i === 0 ? 'eager' : 'lazy'}
                    fetchPriority={i === 0 ? 'high' : undefined}
                    sizes="(max-width: 767px) 100vw, 50vw"
                    width="1024"
                    height="1024"
                  />
                </div>
                <div className="hero-content animate-fade-in">
                  <h2 className="serif-dot">
                    {slide.rightTitle}
                  </h2>
                  <Link to={slideLinks[i]} className="hero-link">{slide.rightLink}</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .hero {
          height: clamp(60vh, 85vh, 95vh);
          width: 100%;
          position: relative;
          overflow: hidden;
        }
        .slider-nav {
          position: absolute;
          top: clamp(20px, 3vw, 40px);
          left: var(--container-padding);
          z-index: 10;
          display: flex;
          gap: clamp(12px, 2vw, 20px);
        }
        .nav-num {
          font-family: var(--font-sans);
          font-size: clamp(12px, 1.5vw, 14px);
          color: rgba(255,255,255,0.86);
          transition: color 0.3s, transform 0.3s, font-weight 0.3s;
        }
        .nav-num.active {
          color: white;
          font-weight: 800;
          transform: scale(1.2);
        }
        .slide-container {
          display: flex;
          height: 100%;
          width: 100%;
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-slide {
          flex: 0 0 100%;
          height: 100%;
        }
        .hero-split {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        @media (min-width: 768px) {
          .hero-split {
            flex-direction: row;
          }
        }
        .hero-side {
          flex: 1;
          position: relative;
          display: flex;
          align-items: flex-end;
          padding: clamp(20px, 4vw, 60px);
          overflow: hidden;
          transition: transform 0.2s ease-out;
          min-height: 300px;
        }
        @media (min-width: 768px) {
          .hero-side {
            min-height: auto;
          }
        }
        .image-bg {
          position: absolute;
          top: -20px;
          left: -20px;
          right: -20px;
          bottom: -20px;
          transition: transform 0.2s ease-out;
        }
        .image-bg-zoomed {
          top: -25%;
          left: -25%;
          right: -25%;
          bottom: -25%;
        }
        .image-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        .hero-content {
          position: relative;
          max-width: clamp(100%, 500px, 100%);
          z-index: 2;
          transform: translate(var(--mx-slow), var(--my-slow));
          width: 100%;
        }
        .hero h2 {
          font-size: clamp(1.8rem, 5vw, 4.5rem);
          line-height: 1;
          margin-bottom: clamp(10px, 2vw, 20px);
          color: white;
          text-shadow: 0 2px 20px rgba(0,0,0,0.3);
        }
        .hero p {
          color: rgba(255,255,255,0.92);
          font-size: clamp(12px, 2vw, 14px);
          font-family: var(--font-sans);
          max-width: 350px;
          text-shadow: 0 1px 10px rgba(0,0,0,0.75);
        }
        .hero-link {
          color: rgba(255,255,255,0.95);
          font-size: clamp(11px, 1.8vw, 13px);
          font-family: var(--font-sans);
          border-bottom: 1px solid rgba(255,255,255,0.75);
          padding-bottom: 4px;
          transition: color 0.3s, border-bottom-color 0.3s;
          display: inline-block;
          text-shadow: 0 1px 10px rgba(0,0,0,0.75);
        }
        .hero-link:hover {
          color: white;
          border-bottom-color: white;
        }
        .right-side .hero-content {
          text-align: left;
        }
        @media (min-width: 768px) {
          .right-side .hero-content {
            text-align: right;
          }
        }
        .right-side .hero-content h2 {
          font-size: clamp(1.5rem, 4vw, 3rem);
        }
      `}</style>
    </section>
  );
});

Hero.displayName = 'Hero';
export default Hero;
