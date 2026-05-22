import { useEffect } from 'react';
import OptimizedImage from '../components/OptimizedImage';

const locations = [
  { name: 'Bermondsey', img: '/hero.png' },
  { name: 'Tower Bridge', img: '/hero2.png' },
  { name: 'Marylebone', img: '/hero3.png' },
  { name: 'Fitzrovia', img: '/hero.png' }
];

const Locations = () => {
  useEffect(() => {
    document.title = "Visit us – WatchHouse";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="locations-page page-transition reveal">

      {/* 1. Hero Banner */}
      <div className="loc-full-hero">
        <OptimizedImage src="/hero3.png" alt="Visit us background" className="loc-hero-img" loading="eager" fetchPriority="high" sizes="100vw" />
        <div className="loc-hero-overlay">
          <span className="loc-hero-small">FIND YOUR NEAREST HOUSE</span>
          <h1 className="loc-hero-title serif-dot">Visit us.</h1>
        </div>
      </div>

      {/* 2. Search Strip */}
      <div className="loc-search-strip">
        <div className="loc-search-inner">
          <div className="loc-input-wrapper">
            <input type="text" placeholder="Search" />
          </div>
          <div className="loc-tagline">
            Each House is shaped by its own setting, while sharing our approach to coffee, design and hospitality.
          </div>
        </div>
      </div>

      {/* 3. Map Mockup */}
      <div className="loc-map-container">
        {/* We use CSS for the map texture */}
        <div className="map-texture"></div>
        {/* Render a cluster of pins like the screenshot */}
        <div className="map-cluster">
          <div className="map-pin" style={{ left: '46%', top: '80%' }}>W<span>H</span></div>
          <div className="map-pin" style={{ left: '48%', top: '88%' }}>W<span>H</span></div>
          <div className="map-pin" style={{ left: '50%', top: '82%' }}>W<span>H</span></div>
          <div className="map-pin" style={{ left: '52%', top: '85%' }}>W<span>H</span></div>
          <div className="map-pin" style={{ left: '55%', top: '92%' }}>W<span>H</span></div>
        </div>
      </div>

      {/* 4. 4-Column Location Cards Grid */}
      <div className="loc-grid-container">
        {locations.map((loc) => (
          <div className="loc-simple-card" key={loc.name}>
            <div className="loc-simple-img">
              <OptimizedImage src={loc.img} alt={loc.name} sizes="(max-width: 900px) 50vw, 25vw" />
            </div>
            <div className="loc-simple-bottom">
              <div className="loc-simple-row">
                <span className="loc-simple-name">{loc.name}</span>
                <span className="loc-simple-arrow">VISIT HOUSE <span>→</span></span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Big Promo Image (Borough Market / WatchHouse 36) */}
      <div className="loc-promo-banner">
        <OptimizedImage src="/hero.png" alt="WatchHouse Exterior" className="promo-banner-img" sizes="100vw" />
      </div>

      <style>{`
        .locations-page {
          background-color: #9d9c9a; /* Perfect match for the grey background */
          color: #1a1a1a;
          font-family: var(--font-sans);
        }

        /* HERO BANNER */
        .loc-full-hero {
          position: relative;
          width: 100%;
          height: 350px;
          overflow: hidden;
        }

        .loc-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.65) sepia(0.2); /* Moody interior feel */
        }

        .loc-hero-overlay {
          position: absolute;
          bottom: 40px;
          left: 40px;
          color: #fff;
        }

        .loc-hero-small {
          display: block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.15em;
          margin-bottom: 5px;
          opacity: 0.9;
        }

        .loc-hero-title {
          font-family: var(--font-serif);
          font-size: 4rem;
          margin: 0;
          line-height: 1;
        }

        /* SEARCH STRIP */
        .loc-search-strip {
          background-color: #9d9c9a;
          border-bottom: 1px solid rgba(0,0,0,0.2);
        }

        .loc-search-inner {
          display: flex;
          align-items: center;
          padding: 20px 40px;
          gap: 60px;
        }

        .loc-input-wrapper {
          flex: 0 0 300px;
        }

        .loc-input-wrapper input {
          width: 100%;
          background: transparent;
          border: 1px solid rgba(0,0,0,0.3);
          padding: 8px 12px;
          font-family: var(--font-sans);
          font-size: 12px;
          color: #1a1a1a;
          outline: none;
        }
        
        .loc-input-wrapper input::placeholder {
          color: rgba(0,0,0,0.5);
        }

        .loc-tagline {
          font-size: 14px;
          font-weight: 500;
        }

        /* MAP MOCKUP */
        .loc-map-container {
          position: relative;
          width: 100%;
          height: 300px;
          background-color: #e5deb2; /* Pale map yellow */
          border-bottom: 1px solid rgba(0,0,0,0.2);
          overflow: hidden;
        }

        /* Fake abstract streets */
        .map-texture {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          opacity: 0.3;
          background-image: 
            linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px);
          background-size: 50px 50px;
          transform: perspective(500px) rotateX(60deg) scale(2);
        }

        .map-cluster {
          position: absolute;
          inset: 0;
        }

        .map-pin {
          position: absolute;
          width: 45px;
          height: 45px;
          background-color: #1a1a1a;
          border-radius: 50%;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-serif);
          font-size: 18px;
          line-height: 1;
          border: 2px solid #e5deb2; /* stroke match to map */
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          transform: translate(-50%, -50%);
          cursor: pointer;
          transition: transform 0.2s;
        }
        
        .map-pin:hover {
          transform: translate(-50%, -50%) scale(1.1);
          z-index: 10;
        }
        
        .map-pin span {
          display: inline-block;
          margin-left: 2px;
          opacity: 0.7;
        }

        /* 4-COL GRID */
        .loc-grid-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          background-color: #9d9c9a;
          border-bottom: 1px solid rgba(0,0,0,0.2);
        }

        .loc-simple-card {
          border-right: 1px solid rgba(0,0,0,0.2);
          display: flex;
          flex-direction: column;
          padding: 20px 40px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        
        .loc-simple-card:last-child {
          border-right: none;
        }

        .loc-simple-card:hover {
          background-color: rgba(255,255,255,0.08);
        }

        .loc-simple-img {
          width: 100%;
          aspect-ratio: 16/10;
          overflow: hidden;
          margin-bottom: 15px;
        }

        .loc-simple-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .loc-simple-card:hover .loc-simple-img img {
          transform: scale(1.05);
        }

        .loc-simple-bottom {
          border-bottom: 1px solid rgba(0,0,0,0.3);
          padding-bottom: 8px;
          margin-top: auto;
        }

        .loc-simple-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .loc-simple-name {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          opacity: 0.8;
          display: none; /* Hide to strictly match the reference image where names were cut off or absent */
        }

        .loc-simple-arrow {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        
        .loc-simple-arrow span {
          margin-left: 5px;
          transition: transform 0.3s;
          display: inline-block;
        }

        .loc-simple-card:hover .loc-simple-arrow span {
          transform: translateX(4px);
        }

        /* BOTTOM PROMO */
        .loc-promo-banner {
          width: 100%;
          height: 500px;
        }
        
        .promo-banner-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: bottom;
        }

        @media (max-width: 900px) {
          .loc-grid-container {
            grid-template-columns: repeat(2, 1fr);
          }
          .loc-simple-card {
            border-bottom: 1px solid rgba(0,0,0,0.2);
          }
          .loc-search-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }
        }
      `}</style>
    </main>
  );
};

export default Locations;
