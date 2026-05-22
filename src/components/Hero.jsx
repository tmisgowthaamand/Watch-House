import React, { useState, useEffect } from 'react';

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

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero">
      <div className="slider-nav">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`nav-num ${currentSlide === i ? 'active' : ''}`}
            onClick={() => setCurrentSlide(i)}
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
                  backgroundImage: `url(${slide.imageLeft})`,
                  transform: `scale(1.1) translate(var(--mx), var(--my))`
                }}></div>
                <div className="hero-content animate-fade-in">
                  <h2 className="serif-dot">
                    {slide.leftTitle}
                  </h2>
                  <p>{slide.leftDesc}</p>
                </div>
              </div>
              <div className="hero-side right-side">
                <div className="image-bg" style={{
                  backgroundImage: `url(${slide.imageRight})`,
                  backgroundSize: '150%',
                  transform: `scale(1.1) translate(calc(var(--mx) * -1), calc(var(--my) * -1))`
                }}></div>
                <div className="hero-content animate-fade-in">
                  <h2 className="serif-dot">
                    {slide.rightTitle}
                  </h2>
                  <a href="#" className="hero-link">{slide.rightLink}</a>
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
          color: white;
          opacity: 0.4;
          font-weight: 500;
          transition: all 0.3s;
        }
        .nav-num.active {
          opacity: 1;
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
          background-size: cover;
          background-position: center;
          transition: transform 0.2s ease-out;
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
          color: rgba(255,255,255,0.8);
          font-size: clamp(12px, 2vw, 14px);
          font-family: var(--font-sans);
          max-width: 350px;
        }
        .hero-link {
          color: rgba(255,255,255,0.85);
          font-size: clamp(11px, 1.8vw, 13px);
          font-family: var(--font-sans);
          border-bottom: 1px solid rgba(255,255,255,0.4);
          padding-bottom: 4px;
          transition: all 0.3s;
          display: inline-block;
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
};

export default Hero;
