import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Wishlist = () => {
  useEffect(() => {
    document.title = "Wishlist – WatchHouse";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="wishlist-page reveal">
      {/* HERO SECTION */}
      <section className="wishlist-hero">
        <img src="/hero3.png" alt="Brewing coffee" className="hero-bg" />
        <div className="hero-overlay">
          <div className="container">
            <span className="label">WISHLIST</span>
            <h1 className="serif-dot">Your items, saved</h1>
          </div>
        </div>
      </section>

      {/* EMPTY STATE */}
      <section className="wishlist-empty">
        <div className="empty-content">
          <h2 className="serif-dot">Wishlist</h2>
          <p>Your wishlist is empty</p>
          <Link to="/product" className="discover-btn-black">Discover more</Link>
        </div>
      </section>

      {/* COLLECTIONS (Reused from Shop Mega Menu layout) */}
      <section className="wishlist-collections">
        <div className="container">
          <div className="col-divider"></div>
          <h3 className="col-title">Our collections.</h3>

          <p className="shop-intro">
            Our collections are designed to give shape to the range of coffees we source and roast. Some are more familiar, others more complex, but each one has its place, and each one shows a different side of what coffee can be.
          </p>

          <div className="shop-grid">
            <div className="shop-card">
              <div className="shop-img-box"><img src="/hero.png" alt="Rituals" /></div>
              <div className="shop-card-text">
                <span className="serif-dot shop-card-title">Rituals.</span>
                <span className="shop-card-desc">Warm, comforting and familiar.</span>
              </div>
              <button className="discover-link">DISCOVER COLLECTION <ArrowRight size={14} /></button>
            </div>
            <div className="shop-card">
              <div className="shop-img-box"><img src="/hero2.png" alt="Ventures" /></div>
              <div className="shop-card-text">
                <span className="serif-dot shop-card-title">Ventures.</span>
                <span className="shop-card-desc">Complex and adventurous.</span>
              </div>
              <button className="discover-link">DISCOVER COLLECTION <ArrowRight size={14} /></button>
            </div>
            <div className="shop-card">
              <div className="shop-img-box"><img src="/hero3.png" alt="Horizons" /></div>
              <div className="shop-card-text">
                <span className="serif-dot shop-card-title">Horizons.</span>
                <span className="shop-card-desc">Expressive and unique.</span>
              </div>
              <button className="discover-link">DISCOVER COLLECTION <ArrowRight size={14} /></button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .wishlist-page {
          background-color: #A3A3A2;
          min-height: 100vh;
        }

        /* Hero */
        .wishlist-hero {
          position: relative;
          height: 60vh;
          width: 100%;
          overflow: hidden;
        }
        .hero-bg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.7);
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-end;
          padding-bottom: 60px;
        }
        .hero-overlay .label {
          display: block;
          color: white;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          margin-bottom: 20px;
        }
        .hero-overlay h1 {
          color: white;
          font-size: 5rem;
          line-height: 1;
          text-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }

        /* Empty State */
        .wishlist-empty {
          padding: 100px 20px;
          display: flex;
          justify-content: center;
          text-align: center;
          color: #1A1A1A;
        }
        .empty-content h2 {
          font-size: 4rem;
          margin-bottom: 30px;
        }
        .empty-content p {
          font-size: 16px;
          margin-bottom: 30px;
          font-family: var(--font-sans);
        }
        .discover-btn-black {
          display: inline-block;
          background: #1A1A1A;
          color: white;
          padding: 15px 30px;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          font-family: var(--font-sans);
          transition: 0.3s;
        }
        .discover-btn-black:hover {
          opacity: 0.8;
          transform: translateY(-2px);
        }

        /* Collections */
        .wishlist-collections {
          padding-bottom: 150px;
        }
        .col-divider {
          width: 100%;
          height: 1px;
          background: rgba(0,0,0,0.9);
          margin-bottom: 20px;
        }
        .col-title {
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 60px;
        }
        
        .shop-intro {
          font-family: var(--font-serif); 
          font-size: 1.8rem; 
          line-height: 1.25;
          max-width: 1300px; 
          margin-bottom: 60px;
        }
        .shop-grid { 
          display: grid; 
          grid-template-columns: repeat(3, 1fr); 
          gap: 40px; 
        }
        .shop-img-box { 
          aspect-ratio: 1; 
          overflow: hidden; 
          margin-bottom: 20px; 
        }
        .shop-img-box img { 
          width: 100%; 
          height: 100%; 
          object-fit: cover; 
          transition: 0.5s; 
        }
        .shop-card:hover .shop-img-box img { 
          transform: scale(1.05); 
        }
        .shop-card-text { margin-bottom: 30px; display: flex; align-items: baseline; gap: 15px; }
        .shop-card-title { font-size: 1.3rem; font-weight: 500; }
        .shop-card-desc { font-size: 15px; opacity: 0.8; }
        .discover-link {
          width: 100%; 
          display: flex; 
          justify-content: space-between; 
          align-items: center;
          padding: 15px 0; 
          background: transparent;
          border: none;
          border-top: 1px solid rgba(0,0,0,0.3); 
          border-bottom: 1px solid rgba(0,0,0,0.3);
          font-family: var(--font-sans); 
          font-size: 12px; 
          font-weight: 700; 
          letter-spacing: 0.1em;
          color: #1A1A1A;
          cursor: pointer;
          transition: 0.3s;
        }
        .discover-link:hover {
          background: rgba(0,0,0,0.05);
          padding-left: 10px;
          padding-right: 10px;
        }

        @media (max-width: 768px) {
          .hero-overlay h1 { font-size: 3.5rem; }
          .shop-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default Wishlist;
