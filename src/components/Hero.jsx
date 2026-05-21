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
          height: 85vh;
          width: 100%;
          position: relative;
          overflow: hidden;
        }
        .slider-nav {
          position: absolute;
          top: 40px;
          left: var(--spacing-md);
          z-index: 10;
          display: flex;
          gap: 20px;
        }
        .nav-num {
          font-family: var(--font-sans);
          font-size: 14px;
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
          width: 100%; /* Fixed from 300% */
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-slide {
          flex: 0 0 100%; /* Fixed to ensure exactly 100vw width */
          height: 100%;
        }
        .hero-split {
          display: flex;
          height: 100%;
        }
        .hero-side {
          flex: 1;
          position: relative;
          display: flex;
          align-items: flex-end;
          padding: 60px;
          overflow: hidden;
          transition: transform 0.2s ease-out;
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
          max-width: 500px;
          z-index: 2;
          transform: translate(var(--mx-slow), var(--my-slow)); /* Applying parallax to content too */
        }
        .hero h2 {
          font-size: 4.5rem;
          line-height: 1;
          margin-bottom: 20px;
          color: white;
          text-shadow: 0 2px 20px rgba(0,0,0,0.3);
        }
        .hero p {
          color: rgba(255,255,255,0.8);
          font-size: 14px;
          font-family: var(--font-sans);
          max-width: 350px;
        }
        .hero-link {
          color: rgba(255,255,255,0.85);
          font-size: 13px;
          font-family: var(--font-sans);
          border-bottom: 1px solid rgba(255,255,255,0.4);
          padding-bottom: 4px;
          transition: all 0.3s;
        }
        .hero-link:hover {
          color: white;
          border-bottom-color: white;
        }
        .right-side .hero-content {
          text-align: right;
        }
        .right-side .hero-content h2 {
          font-size: 3rem;
        }

        @media (max-width: 768px) {
          .hero-split { flex-direction: column; }
          .hero-side { padding: 30px; }
          .hero h2 { font-size: 2.5rem; }
          .right-side .hero-content h2 { font-size: 1.8rem; }
          .slider-nav { top: 20px; left: 20px; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
