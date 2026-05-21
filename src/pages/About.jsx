import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  React.useEffect(() => {
    document.title = "Our Story – WatchHouse";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="about-page page-transition reveal">

      {/* 1. HERO – Full bleed storefront */}
      <section className="ab-hero">
        <img src="/hero2.png" alt="WatchHouse storefront" className="ab-hero-img" />
        <div className="ab-hero-overlay">
          <span className="ab-hero-label">OUR STORY SINCE 2014</span>
          <h1 className="ab-hero-title serif-dot">Our story.</h1>
        </div>
      </section>

      {/* 2. INTRO STATEMENT */}
      <section className="ab-intro">
        <div className="ab-intro-inner">
          <span className="ab-section-label">Our story.</span>
          <p className="ab-intro-text serif-dot">
            Originally originating in a former 19th-century watch house on London's famous St Bermondsey Street.
          </p>
        </div>
      </section>

      {/* 3. TWO-IMAGE + TEXT */}
      <section className="ab-duo-section">
        <div className="ab-duo-grid">
          <div className="ab-duo-left">
            <img src="/hero.png" alt="Interior" />
          </div>
          <div className="ab-duo-right">
            <img src="/hero3.png" alt="Coffee detail" />
            <div className="ab-duo-caption">
              <span className="ab-caption-label">INNOVATION IN SPECIALITY COFFEE</span>
            </div>
          </div>
        </div>
        <div className="ab-duo-text-row">
          <p className="ab-duo-description">
            Innovation's a fancy word for what coffee makes intuitive — blending the speciality and the commercial, old craft and new technology, tradition and restlessness (relentless evolution) — in — to get it into everyone's hands, without pulling punches.
          </p>
        </div>
      </section>

      {/* 4. ETHOS – 4-Column Cards */}
      <section className="ab-ethos">
        <span className="ab-section-label">Our ethos.</span>
        <div className="ab-ethos-grid">
          <div className="ab-ethos-card">
            <h4 className="serif-dot">The Original WatchHouse.</h4>
            <p>What started as a Watch House on Bermondsey Street became the home of Modern Coffee.</p>
            <div className="ab-ethos-img"><img src="/hero.png" alt="Original" /></div>
          </div>
          <div className="ab-ethos-card">
            <h4 className="serif-dot">Sourced and roasted here.</h4>
            <p>Direct relationships with producers. Precision roasting at our London roastery for maximum expression.</p>
            <div className="ab-ethos-img"><img src="/hero2.png" alt="Roasted" /></div>
          </div>
          <div className="ab-ethos-card">
            <h4 className="serif-dot">Coffee-centric food.</h4>
            <p>Our food menus are designed to complement the coffee. Seasonal, considered, and made fresh daily.</p>
            <div className="ab-ethos-img"><img src="/hero3.png" alt="Food" /></div>
          </div>
          <div className="ab-ethos-card">
            <h4 className="serif-dot">By invitation only.</h4>
            <p>Private hire and exclusive brand events hosted across our Houses in London, New York, and Dubai.</p>
            <div className="ab-ethos-img"><img src="/hero.png" alt="Private" /></div>
          </div>
        </div>
      </section>

      {/* 5. FOUNDER – Roland Horne */}
      <section className="ab-founder">
        <div className="ab-founder-grid">
          <div className="ab-founder-text">
            <span className="ab-section-label" style={{ color: 'rgba(255,255,255,0.4)' }}>Our founder and CEO.</span>
            <h2 className="serif-dot ab-founder-name">Roland Horne.</h2>
            <p className="ab-founder-bio">
              From a single site in Bermondsey, Roland has grown WatchHouse into one of London's most respected specialty coffee brands — driven by a relentless commitment to quality, design and community. Our ethos took shape naturally, but not by any happenstance.
            </p>
          </div>
          <div className="ab-founder-img">
            <img src="https://watchhouse.com/cdn/shop/files/WatchHouse-About-Roland.jpg?v=1776178526&width=1050" alt="Roland Horne – Founder and CEO of WatchHouse" />
          </div>
        </div>
        <p className="ab-founder-footnote">
          From the beginning, the ambition was clear: to build a brand that redefined the expectations and dramatically raised the bar of a performance. Roland not only looked inward, but believed in investment, culture of and culture, and the work ethos it began with. 'I am proud of its closeness of conscience, courage and longevity and at its fundamental essence.'
        </p>
      </section>

      {/* 6. THE STANDARD BEHIND EVERY CUP */}
      <section className="ab-standard">
        <div className="ab-standard-grid">
          <div className="ab-standard-left">
            <span className="ab-section-label">Sourced, roasted and brewed in-cup.</span>
          </div>
          <div className="ab-standard-center">
            <h2 className="serif-dot">The standard behind every cup.</h2>
            <p>
              We're obsessive about what goes into every cup. From the first handshake at origin to the final pour in-house, sourcing and roasting are handled with a level of care normally reserved for fine wine. No shortcuts. No compromise. Every bean is selected, profiled and roasted in-house.
            </p>
          </div>
          <div className="ab-standard-right"></div>
        </div>
        <div className="ab-standard-images">
          <div className="ab-std-img"><img src="/hero3.png" alt="Roasting" /></div>
          <div className="ab-std-img"><img src="/hero.png" alt="Interior" /></div>
        </div>
        <p className="ab-standard-footnote">
          There are currently over 100 coffee-producing countries, and we work directly with producers in over 20 of them. We travel to Burmandol, Sao Paulo and Guatemala to source the finest coffees, and build long-lasting relationships with incredible people.
        </p>
      </section>

      {/* 7. BRUNCH CTA – Dark block */}
      <section className="ab-brunch">
        <div className="ab-brunch-inner">
          <div className="ab-brunch-left">
            <span className="ab-section-label" style={{ color: 'rgba(255,255,255,0.5)' }}>Brewing.</span>
          </div>
          <div className="ab-brunch-center">
            <h3 className="serif-dot">Because you can't live on coffee alone.</h3>
            <p>
              Our coffee's constantly matched by inventive food. Brunch with a serious side for coffee to co-exist, collaborating with chefs and bakers to create something that's far more than an afterthought.
            </p>
          </div>
          <div className="ab-brunch-right">
            <img src="/hero3.png" alt="Brunch plate" />
          </div>
        </div>
      </section>

      {/* 8. BOTTOM STOREFRONT */}
      <section className="ab-bottom-img">
        <img src="/hero.png" alt="WatchHouse exterior" />
      </section>

      <style>{`
        .about-page {
          background-color: #E6E3DE;
          color: #1a1a1a;
          font-family: var(--font-sans);
        }

        .ab-section-label {
          display: block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          opacity: 0.5;
          margin-bottom: 10px;
        }

        /* 1. HERO */
        .ab-hero {
          position: relative;
          width: 100%;
          height: 70vh;
          overflow: hidden;
        }
        .ab-hero-img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: brightness(0.6);
        }
        .ab-hero-overlay {
          position: absolute;
          bottom: 50px; left: 40px;
          color: #fff;
        }
        .ab-hero-label {
          display: block;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.15em;
          margin-bottom: 8px;
          opacity: 0.8;
        }
        .ab-hero-title {
          font-family: var(--font-serif);
          font-size: 4.5rem;
          margin: 0; line-height: 1;
        }

        /* 2. INTRO STATEMENT */
        .ab-intro {
          padding: 60px 40px;
          border-bottom: 1px solid rgba(0,0,0,0.15);
        }
        .ab-intro-inner {
          display: flex;
          align-items: flex-start;
          gap: 80px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .ab-intro-inner .ab-section-label {
          flex-shrink: 0;
          width: 120px;
          padding-top: 8px;
        }
        .ab-intro-text {
          font-family: var(--font-serif);
          font-size: 2rem;
          line-height: 1.3;
          font-weight: 400;
          max-width: 650px;
        }

        /* 3. DUO IMAGE SECTION */
        .ab-duo-section {
          padding: 0 40px 60px;
        }
        .ab-duo-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 0;
          margin-bottom: 30px;
        }
        .ab-duo-left {
          height: 420px;
          overflow: hidden;
        }
        .ab-duo-left img {
          width: 100%; height: 100%;
          object-fit: cover;
        }
        .ab-duo-right {
          position: relative;
          height: 420px;
          overflow: hidden;
        }
        .ab-duo-right img {
          width: 100%; height: 100%;
          object-fit: cover;
        }
        .ab-duo-caption {
          position: absolute;
          bottom: 20px; left: 20px;
          background: rgba(0,0,0,0.5);
          padding: 8px 15px;
        }
        .ab-caption-label {
          color: #fff;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.12em;
        }
        .ab-duo-text-row {
          display: flex;
          justify-content: center;
          padding-top: 30px;
        }
        .ab-duo-description {
          font-size: 14px;
          line-height: 1.7;
          opacity: 0.8;
          max-width: 700px;
          text-align: center;
        }

        /* 4. ETHOS */
        .ab-ethos {
          padding: 60px 40px;
          border-top: 1px solid rgba(0,0,0,0.15);
        }
        .ab-ethos-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
          margin-top: 30px;
        }
        .ab-ethos-card {
          border-top: 1px solid rgba(0,0,0,0.15);
          padding-top: 20px;
        }
        .ab-ethos-card h4 {
          font-size: 16px;
          margin-bottom: 10px;
        }
        .ab-ethos-card p {
          font-size: 12px;
          line-height: 1.6;
          opacity: 0.65;
          margin-bottom: 25px;
        }
        .ab-ethos-img {
          width: 100%;
          aspect-ratio: 4/3;
          overflow: hidden;
        }
        .ab-ethos-img img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .ab-ethos-card:hover .ab-ethos-img img {
          transform: scale(1.05);
        }

        /* 5. FOUNDER */
        .ab-founder {
          padding: 60px 40px 40px;
          background: #1a1a1a;
          color: #fff;
          position: relative;
        }
        .ab-founder-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto;
          align-items: start;
        }
        .ab-founder-name {
          font-family: var(--font-serif);
          font-size: 3rem;
          font-weight: 500;
          margin: 0 0 25px;
          line-height: 1;
          color: #fff;
        }
        .ab-founder-bio {
          font-size: 13px;
          line-height: 1.8;
          opacity: 0.6;
          max-width: 420px;
        }
        .ab-founder-img {
          width: 100%;
          margin-top: 40px; /* Push the image down relative to the text */
          overflow: hidden;
        }
        .ab-founder-img img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
        }
        .ab-founder-footnote {
          font-size: 11px;
          line-height: 1.6;
          color: #fff;
          opacity: 0.7;
          max-width: 700px;
          margin-left: auto;
          margin-top: 30px;
          text-align: right;
          padding-right: 0;
        }

        /* 6. THE STANDARD */
        .ab-standard {
          padding: 80px 40px;
          border-top: 1px solid rgba(0,0,0,0.15);
        }
        .ab-standard-grid {
          display: grid;
          grid-template-columns: 0.8fr 2fr 0.8fr;
          gap: 40px;
          margin-bottom: 50px;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }
        .ab-standard-center h2 {
          font-family: var(--font-serif);
          font-size: 2.5rem;
          font-weight: 400;
          margin-bottom: 20px;
          line-height: 1.15;
        }
        .ab-standard-center p {
          font-size: 14px;
          line-height: 1.7;
          opacity: 0.75;
        }
        .ab-standard-images {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          margin-bottom: 40px;
        }
        .ab-std-img {
          height: 350px;
          overflow: hidden;
        }
        .ab-std-img img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .ab-std-img:hover img {
          transform: scale(1.03);
        }
        .ab-standard-footnote {
          font-size: 13px;
          line-height: 1.7;
          opacity: 0.65;
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        /* 7. BRUNCH DARK BLOCK */
        .ab-brunch {
          background-color: #2a2a2a;
          color: #fff;
          padding: 80px 40px;
        }
        .ab-brunch-inner {
          display: grid;
          grid-template-columns: 0.5fr 1.5fr 1fr;
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto;
          align-items: center;
        }
        .ab-brunch-center h3 {
          font-family: var(--font-serif);
          font-size: 2rem;
          font-weight: 400;
          margin-bottom: 15px;
          line-height: 1.2;
        }
        .ab-brunch-center p {
          font-size: 13px;
          line-height: 1.7;
          opacity: 0.7;
          max-width: 450px;
        }
        .ab-brunch-right {
          width: 100%;
          aspect-ratio: 1;
          overflow: hidden;
        }
        .ab-brunch-right img {
          width: 100%; height: 100%;
          object-fit: cover;
        }

        /* 8. BOTTOM IMAGE */
        .ab-bottom-img {
          width: 100%;
          height: 550px;
          overflow: hidden;
        }
        .ab-bottom-img img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center;
        }

        /* MOBILE */
        @media (max-width: 900px) {
          .ab-hero { height: 50vh; }
          .ab-hero-title { font-size: 3rem; }
          .ab-intro-inner { flex-direction: column; gap: 20px; }
          .ab-intro-text { font-size: 1.4rem; }
          .ab-duo-grid { grid-template-columns: 1fr; }
          .ab-duo-left, .ab-duo-right { height: 280px; }
          .ab-ethos-grid { grid-template-columns: repeat(2, 1fr); }
          .ab-founder-grid { grid-template-columns: 1fr; }
          .ab-standard-grid { grid-template-columns: 1fr; }
          .ab-standard-images { grid-template-columns: 1fr; }
          .ab-std-img { height: 250px; }
          .ab-brunch-inner { grid-template-columns: 1fr; }
          .ab-brunch-right { max-width: 350px; }
          .ab-bottom-img { height: 350px; }
        }
      `}</style>
    </main>
  );
};

export default About;
