import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import Hero from '../components/Hero';
import OptimizedImage from '../components/OptimizedImage';
import { ArrowRight } from 'lucide-react';

const HouseFavourites = lazy(() => import('../components/HouseFavourites'));

const houses = [
  { name: 'Northcote Road.', code: 'SW11 1NZ', video: 'https://watchhouse.com/cdn/shop/videos/c/vp/2a5bc27ddd424179b7fce2ef32926456/2a5bc27ddd424179b7fce2ef32926456.HD-1080p-7.2Mbps-81873238.mp4' },
  { name: 'Millennium Bridge.', code: 'EC4V 4AU', video: 'https://watchhouse.com/cdn/shop/videos/c/vp/c363824d639e435aad60079f22c04b70/c363824d639e435aad60079f22c04b70.HD-1080p-7.2Mbps-82836805.mp4' },
  { name: 'Battersea Power Station.', code: 'SW11 8BJ', video: 'https://watchhouse.com/cdn/shop/videos/c/vp/2a5bc27ddd424179b7fce2ef32926456/2a5bc27ddd424179b7fce2ef32926456.HD-1080p-7.2Mbps-81873238.mp4' },
  { name: 'Marsa Boulevard.', code: 'Dubai', video: 'https://watchhouse.com/cdn/shop/videos/c/vp/c363824d639e435aad60079f22c04b70/c363824d639e435aad60079f22c04b70.HD-1080p-7.2Mbps-82836805.mp4' },
  { name: 'Chrysler Building.', code: 'NY 10174', video: 'https://watchhouse.com/cdn/shop/videos/c/vp/2a5bc27ddd424179b7fce2ef32926456/2a5bc27ddd424179b7fce2ef32926456.HD-1080p-7.2Mbps-81873238.mp4' },
  { name: 'Fitzrovia.', code: 'W1T 3PT', video: 'https://watchhouse.com/cdn/shop/videos/c/vp/c363824d639e435aad60079f22c04b70/c363824d639e435aad60079f22c04b70.HD-1080p-7.2Mbps-82836805.mp4' },
];

const Home = () => {
  const [activeHouse, setActiveHouse] = useState(0);
  const [videoInView, setVideoInView] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    document.title = "WatchHouse.";
    const timer = setInterval(() => {
      setActiveHouse((prev) => (prev + 1) % houses.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVideoInView(true);
        observer.disconnect();
      }
    }, { rootMargin: '400px' });
    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (videoRef.current && videoInView) {
      videoRef.current.load();
      // Only play if intentionally intersecting
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => { /* Autoplay prevented */ });
      }
    }
  }, [activeHouse, videoInView]);

  return (
    <main className="home-page">
      {/* 1. HERO */}
      <Hero />

      {/* 2. UNIFIED COMMITMENT + WATCHHOUSE AT HOME SECTION */}
      <section className="wh-home-wrapper reveal">
        {/* TOP: Commitment Grid */}
        <div className="commitment-grid container">
          <div className="wh-home-title-col reveal-left">
            <h2 className="serif-dot tiny-label">Modern Coffee.</h2>
          </div>
          <div className="commitment-right reveal-right">
            <p className="large-text serif text-spacing">
              A commitment to excellence beyond what we serve - world-class coffee, sourced, roasted and brewed in our Houses, all designed to be returned to.
            </p>
          </div>
        </div>

        {/* BOTTOM: WatchHouse at home */}
        <div className="wh-home-section">
          <div className="wh-home-grid">
            <div className="wh-home-title-col">
              <h2 className="serif-dot">WatchHouse at home.</h2>
            </div>
            <div className="wh-home-cards">
              {[
                { id: '1', title: 'Coffee beans.', img: '/hero3.png' },
                { id: '2', title: 'Pods.', img: '/hero.png' },
                { id: '3', title: 'Matcha.', img: '/hero2.png' },
                { id: '4', title: 'Merch.', img: '/coffee_bag.png' },
                { id: '5', title: 'Equipment.', img: '/hero.png' }
              ].map(item => (
                <div key={item.id} className="wh-home-card">
                  <div className="whc-img">
                    <OptimizedImage src={item.img} alt={item.title} sizes="(max-width: 640px) 50vw, 280px" />
                  </div>
                  <div className="whc-text">
                    <h3 className="serif-dot" style={{ fontSize: 'var(--text-xl)', lineHeight: 1.3 }}>{item.title}</h3>
                    <button className="whc-discover">
                      <span className="discover-text">DISCOVER</span>
                      <ArrowRight size={12} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. HIGHLIGHTED HOUSES WITH VIDEO & ANIMATION */}
      <section className="highlighted-houses-section reveal-scale">
        <div className="houses-banner">
          <video
            ref={videoRef}
            autoPlay={videoInView}
            muted
            loop
            playsInline
            preload="none"
            poster="/hero-320.webp"
            className="banner-video"
          >
            {videoInView && <source src={houses[activeHouse].video} type="video/mp4" />}
            <track kind="captions" src="/captions.vtt" srcLang="en" label="English captions" default />
          </video>

          <div className="houses-overlay">
            <div className="container overlay-content">
              {/* Visit House Card on Left */}
              <div className="visit-house-card">
                <div className="thumb-img">
                  <OptimizedImage src="/hero.png" alt="Thumbnail" sizes="320px" />
                </div>
                <button className="visit-btn">VISIT HOUSE <ArrowRight size={14} /></button>
              </div>

              <div className="houses-info">
                <h2>Highlighted Houses.</h2>
                <ul className="house-list">
                  {houses.map((house, idx) => (
                    <li
                      key={house.name}
                      className={activeHouse === idx ? 'active' : ''}
                      onMouseEnter={() => setActiveHouse(idx)}
                    >
                      <div className="house-name-row">
                        <div className="loader-container">
                          {activeHouse === idx && <div className="circular-loader"></div>}
                        </div>
                        <span className="name">{house.name}</span>
                      </div>
                      <span className="code">{house.code}</span>
                    </li>
                  ))}
                </ul>
                <button className="all-houses-btn">ALL HOUSES <ArrowRight size={14} /></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRESS LOGOS */}
      <section className="press-section reveal">
        <div className="container press-grid">
          <span className="press-logo">Dezeen.</span>
          <span className="press-logo">Financial Times.</span>
          <span className="press-logo">Vogue.</span>
          <span className="press-logo">Wallpaper*</span>
          <span className="press-logo">Broadsheet.</span>
          <span className="press-logo">Elle.</span>
          <span className="press-logo">SheerLuxe.</span>
        </div>
      </section>

      {/* 5. SUBSCRIPTION PROMO */}
      <section className="section-padding reveal">
        <div className="container sub-promo-container">
          <h2 className="sub-promo-title">Coffee on subscription.</h2>
          <div className="subscription-promo">
            <div className="promo-left">
              <OptimizedImage src="/hero2.png" alt="Lifestyle" sizes="(max-width: 1023px) 0px, 45vw" />
            </div>
            <div className="promo-right">
              <div>
                <h2>Coffee that delivers. For slow pours on quiet days, and stolen moments in busy ones. You set the schedule. We deliver. It's that simple.</h2>
                <div className="promo-benefits">
                  <div className="benefit-col">
                    <ul className="benefit-list left-list">
                      <li><span className="bullet">○</span> 10% off, always.</li>
                      <li><span className="bullet">○</span> Pause or cancel as you like.</li>
                    </ul>
                  </div>
                  <div className="benefit-col">
                    <ul className="benefit-list right-list">
                      <li><span className="bullet">○</span> UK shipping included, no extra charge.</li>
                    </ul>
                  </div>
                </div>
                <div className="options-selector-mini">
                  <p className="options-title">Select one of the below options to get started.</p>
                  <div className="mini-options">
                    <div className="mini-opt-card">
                      <OptimizedImage src="/hero.png" alt="Home" sizes="(max-width: 640px) 50vw, 320px" />
                      <div className="card-label"><span>HOME</span> <ArrowRight size={14} /></div>
                    </div>
                    <div className="mini-opt-card">
                      <OptimizedImage src="/hero3.png" alt="Office" sizes="(max-width: 640px) 50vw, 320px" />
                      <div className="card-label"><span>OFFICE</span> <ArrowRight size={14} /></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="build-sub-wrapper">
                <button className="build-sub-btn">
                  <span>BUILD YOUR<br />SUBSCRIPTION</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOUSE FAVOURITES */}
      <Suspense fallback={<div style={{ height: '800px' }} />}>
        <HouseFavourites />
      </Suspense>

      {/* 7. POINT OF ORIGIN */}
      <section className="point-of-origin-section reveal-scale">
        <div className="poo-bg">
          <OptimizedImage src="/hero.png" alt="Landscape" sizes="100vw" />
          <div className="poo-overlay"></div>
        </div>
        <div className="poo-content">
          <h2 className="poo-title">Point of Origin:<br />Bette Buna</h2>
          <div className="poo-thumb">
            <OptimizedImage src="/hero2.png" alt="Video thumbnail" sizes="(max-width: 640px) 80vw, 480px" />
          </div>
          <div className="poo-text">
            <p>The first chapter in our new documentary series, tracing the people, places and<br />processes behind the coffees we serve.</p>
            <button className="watch-film-btn">Watch the film <ArrowRight size={14} style={{ marginLeft: 8 }} /></button>
          </div>
        </div>
      </section>

      {/* 8. SPLIT CARDS */}
      <section className="split-cards-section reveal">
        <div className="split-card left-card">
          <OptimizedImage src="/hero2.png" alt="Menu" sizes="(max-width: 768px) 100vw, 50vw" />
          <div className="split-card-content">
            <h2 className="serif-dot">Our menu</h2>
            <button className="view-more-btn">VIEW MORE <ArrowRight size={10} style={{ marginLeft: 5 }} /></button>
          </div>
        </div>
        <div className="split-card right-card">
          <OptimizedImage src="/hero3.png" alt="Story" sizes="(max-width: 768px) 100vw, 50vw" />
          <div className="split-card-content">
            <h2 className="serif-dot">Our story</h2>
            <button className="view-more-btn">VIEW MORE <ArrowRight size={10} style={{ marginLeft: 5 }} /></button>
          </div>
        </div>
      </section>

      <style>{`
        .section-padding { padding: clamp(60px, 10vw, 120px) 0; }
        .bg-warm { background-color: var(--color-bg); }
        .section-title { font-size: clamp(2rem, 6vw, 3rem); margin-bottom: clamp(40px, 5vw, 60px); }

        /* WATCHHOUSE AT HOME / COMMITMENT WRAPPER */
        .wh-home-wrapper {
          background-color: #B2AFA9;
          padding: clamp(60px, 10vw, 80px) 0;
          color: #1a1a1a;
          overflow: hidden;
        }
        .commitment-grid {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
          gap: clamp(20px, 3vw, 40px);
          margin-bottom: clamp(40px, 5vw, 80px);
        }
        @media (min-width: 1024px) {
          .commitment-grid {
            flex-direction: row;
            align-items: flex-start;
            gap: clamp(40px, 5vw, 80px);
          }
        }
        .tiny-label {
          font-size: clamp(11px, 1.5vw, 14px);
          font-weight: 700;
          letter-spacing: 0.05em;
          margin: 0;
          padding-top: clamp(8px, 1.5vw, 10px);
        }
        .large-text.serif {
          font-size: clamp(1.8rem, 5vw, 2.6rem);
          line-height: 1.1;
          font-weight: 400;
          margin: 0;
        }
        .text-spacing {
          letter-spacing: -0.02em;
        }

        .wh-home-section {
          border-top: 1px solid rgba(0,0,0,0.3);
          padding-top: clamp(30px, 5vw, 50px);
        }
        .wh-home-grid {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
          gap: clamp(20px, 3vw, 40px);
          padding-left: 0;
        }
        @media (min-width: 1024px) {
          .wh-home-grid {
            flex-direction: row;
            gap: clamp(40px, 5vw, 80px);
            padding-left: max(var(--container-padding), calc(50vw - 720px + 20px));
          }
        }
        .wh-home-title-col {
          flex: 0 0 auto;
          margin-top: 0;
        }
        @media (min-width: 1024px) {
          .wh-home-title-col {
            flex: 0 0 320px;
            margin-top: -6px;
          }
        }
        .wh-home-title-col h2:not(.tiny-label) {
          font-size: clamp(1.8rem, 5vw, 3.2rem);
          font-weight: 500;
          margin: 0;
          line-height: 1.05;
        }
        .wh-home-cards {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(clamp(200px, 50vw, 280px), 1fr));
          gap: clamp(15px, 3vw, 20px);
          width: 100%;
        }
        @media (min-width: 768px) {
          .wh-home-cards {
            gap: clamp(15px, 2vw, 20px);
          }
        }
        @media (min-width: 1024px) {
          .wh-home-cards {
            display: flex;
            gap: 20px;
            overflow-x: auto;
            scrollbar-width: thin;
            scrollbar-color: rgba(0,0,0,0.3) transparent;
            padding-right: clamp(40px, 5vw, 80px);
          }
          .wh-home-cards::-webkit-scrollbar {
            height: 8px;
          }
          .wh-home-cards::-webkit-scrollbar-thumb {
            background-color: rgba(0,0,0,0.3);
            border-radius: 4px;
          }
        }
        .wh-home-card {
          flex: 0 0 clamp(200px, 50vw, 280px);
          display: flex;
          flex-direction: column;
        }
        @media (min-width: 1024px) {
          .wh-home-card {
            flex: 0 0 280px;
          }
        }
        .whc-img {
          width: 100%;
          aspect-ratio: 4 / 5;
          margin-bottom: clamp(8px, 1.5vw, 12px);
          background-color: rgba(0,0,0,0.05);
        }
        .whc-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .whc-text h4 {
          font-size: clamp(0.9rem, 2vw, 1.05rem);
          margin-bottom: clamp(8px, 1.5vw, 12px);
          font-weight: 600;
        }
        .whc-discover {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: clamp(6px, 1vw, 8px);
          border: none;
          background: transparent;
          border-bottom: 1px solid rgba(0,0,0,0.2);
          cursor: pointer;
          color: #1a1a1a;
        }
        .discover-text {
          font-family: var(--font-sans);
          font-size: clamp(8px, 1.2vw, 10px);
          letter-spacing: 0.15em;
          font-weight: 600;
          color: rgba(0,0,0,0.7);
        }

        .large-text { font-size: clamp(1.8rem, 5vw, 2.8rem); line-height: 1.1; font-family: var(--font-serif); }

        .highlighted-houses-section { position: relative; height: clamp(50vh, 90vh, 95vh); width: 100%; overflow: hidden; margin: 0 0 clamp(60px, 10vw, 100px) 0; }
        .banner-video { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.85); }
        .houses-overlay { position: absolute; inset: 0; background: linear-gradient(to right, rgba(0,0,0,0.2), rgba(0,0,0,0.5)); display: flex; align-items: center; color: white; }
        .overlay-content { display: flex; flex-direction: column-reverse; justify-content: space-between; align-items: flex-start; width: 100%; padding-bottom: clamp(40px, 5vw, 80px); gap: clamp(30px, 5vw, 60px); }
        @media (min-width: 768px) {
          .overlay-content {
            flex-direction: row;
            align-items: flex-end;
          }
        }

        .visit-house-card { width: clamp(200px, 60vw, 320px); transform: translateY(20px); opacity: 0; animation: fade-up 0.8s forwards; }
        .thumb-img { aspect-ratio: 1; overflow: hidden; margin-bottom: clamp(10px, 2vw, 15px); border: 1px solid rgba(255,255,255,0.2); }
        .thumb-img img { width: 100%; height: 100%; object-fit: cover; }
        .visit-btn { font-size: clamp(8px, 1.2vw, 10px); font-weight: 700; border-bottom: 1px solid white; padding-bottom: 4px; width: 100%; text-align: left; }

        .houses-info { max-width: 600px; width: 100%; }
        .houses-info h2 { font-size: clamp(1.5rem, 4vw, 2.2rem); margin-bottom: clamp(20px, 3vw, 30px); text-align: left; }
        @media (min-width: 768px) {
          .houses-info h2 { text-align: right; }
        }
        .house-list { margin-bottom: clamp(20px, 3vw, 40px); }
        .house-list li {
          display: flex; justify-content: space-between; align-items: center;
          padding: clamp(12px, 2vw, 15px) 0; border-bottom: 1px solid rgba(255,255,255,0.2);
          font-size: clamp(12px, 1.8vw, 14px); opacity: 0.5; transition: all 0.4s; cursor: pointer;
        }
        .house-list li:hover, .house-list li.active { opacity: 1; border-bottom-color: white; }
        .house-name-row { display: flex; align-items: center; gap: clamp(10px, 2vw, 15px); }

        .loader-container { width: 18px; height: 18px; position: relative; }
        .circular-loader {
          width: 100%; height: 100%;
          border: 2px solid rgba(255,255,255,0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 6s linear infinite;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        .all-houses-btn { border-bottom: 1px solid white; padding-bottom: 5px; font-weight: 700; font-size: clamp(10px, 1.5vw, 12px); float: right; margin-top: clamp(15px, 2vw, 20px); }

        .sub-promo-container { position: relative; }
        .sub-promo-title { font-size: clamp(1.3rem, 3vw, 1.8rem); font-family: var(--font-serif); margin-bottom: clamp(30px, 5vw, 40px); font-weight: 500; }
        .subscription-promo { display: flex; flex-direction: column; gap: clamp(30px, 5vw, 60px); align-items: stretch; }
        @media (min-width: 1024px) {
          .subscription-promo {
            flex-direction: row;
            gap: 60px;
            align-items: stretch;
          }
        }
        .promo-left { flex: 1; aspect-ratio: 0.75; overflow: hidden; display: none; }
        @media (min-width: 1024px) {
          .promo-left { display: block; }
        }
        .promo-left img { width: 100%; height: 100%; object-fit: cover; }
        .promo-right { flex: 1.5; display: flex; flex-direction: column; justify-content: space-between; padding-top: clamp(10px, 2vw, 20px); }
        .promo-right h2 { font-size: clamp(1.5rem, 4vw, 2.8rem); line-height: 1.1; margin-bottom: clamp(30px, 5vw, 60px); font-family: var(--font-serif); letter-spacing: -0.01em; font-weight: 400; }

        .promo-benefits { display: flex; flex-direction: column; gap: clamp(15px, 3vw, 30px); margin-bottom: clamp(30px, 5vw, 80px); }
        @media (min-width: 768px) {
          .promo-benefits {
            flex-direction: row;
            gap: 30px;
          }
        }
        .benefit-col { flex: 1; }
        .benefit-list li { display: flex; align-items: center; padding: clamp(10px, 2vw, 15px) 0; font-size: clamp(13px, 1.8vw, 15px); font-weight: 500; border-top: 1px solid rgba(0,0,0,0.8); }
        .benefit-list li .bullet { font-size: clamp(11px, 1.5vw, 13px); margin-right: clamp(10px, 2vw, 15px); font-weight: normal; }

        .options-selector-mini { margin-bottom: clamp(20px, 3vw, 30px); }
        .options-title { font-family: var(--font-serif); font-size: clamp(1.2rem, 3vw, 1.6rem); margin-bottom: clamp(15px, 3vw, 25px); font-weight: 500; }
        .mini-options { display: flex; gap: 2px; max-width: 100%; width: 100%; }
        .mini-opt-card { flex: 1; position: relative; cursor: pointer; aspect-ratio: 1; overflow: hidden; background: #000; }
        .mini-opt-card img { width: 100%; height: 100%; object-fit: cover; opacity: 0.8; transition: opacity 0.4s; }
        .mini-opt-card:hover img { opacity: 1; }
        .card-label { position: absolute; bottom: clamp(12px, 2vw, 20px); left: clamp(12px, 2vw, 20px); right: clamp(12px, 2vw, 20px); color: white; display: flex; justify-content: space-between; align-items: center; font-size: clamp(8px, 1.2vw, 11px); font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; margin: 0; }

        .build-sub-wrapper { display: flex; justify-content: flex-end; margin-top: auto; padding-bottom: clamp(8px, 1.5vw, 10px);}
        .build-sub-btn { display: flex; align-items: center; gap: clamp(20px, 3vw, 40px); border-top: 1px solid rgba(0,0,0,0.8); border-bottom: 1px solid rgba(0,0,0,0.8); padding: clamp(10px, 2vw, 15px) 0; text-align: left; font-size: clamp(10px, 1.5vw, 12px); font-weight: 700; letter-spacing: 0.05em; font-family: var(--font-sans); }
        .build-sub-btn span { line-height: 1.4; color: rgba(0,0,0,0.8); }

        .press-section { background: #eee; padding: clamp(40px, 5vw, 60px) 0; border-top: 1px solid rgba(0,0,0,0.05); }
        .press-grid { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: clamp(20px, 3vw, 40px); opacity: 0.5; filter: grayscale(1); }
        .press-logo { font-size: clamp(14px, 3vw, 18px); font-weight: 800; font-family: var(--font-serif); }

        /* Point of Origin */
        .point-of-origin-section { position: relative; height: clamp(60vh, 100vh, 100vh); display: flex; align-items: center; justify-content: center; overflow: hidden; margin: 0; }
        .poo-bg { position: absolute; inset: 0; }
        .poo-bg img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.5) blur(1px); }
        .poo-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(50,40,30,0.5), rgba(30,40,30,0.2)); mix-blend-mode: multiply; }
        .poo-content { position: relative; z-index: 10; text-align: center; color: white; display: flex; flex-direction: column; align-items: center; margin-top: clamp(30px, 5vw, 60px); padding: 0 var(--container-padding); }
        .poo-title { font-size: clamp(1.8rem, 5vw, 3.5rem); font-family: var(--font-serif); font-weight: 500; line-height: 1; margin-bottom: clamp(20px, 3vw, 30px); letter-spacing: -0.01em; }
        .poo-thumb { width: clamp(200px, 80vw, 480px); aspect-ratio: 1.4; margin-bottom: clamp(15px, 3vw, 25px); border: 1px solid rgba(255,255,255,0.1); }
        .poo-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .poo-text { max-width: 480px; font-size: clamp(10px, 1.5vw, 11px); font-weight: 700; text-align: left; line-height: 1.4; letter-spacing: 0.02em; }
        .poo-text p { margin-bottom: clamp(15px, 2vw, 20px); }
        .watch-film-btn { display: inline-flex; align-items: center; color: white; font-size: clamp(9px, 1.2vw, 11px); font-weight: 700; border-bottom: 1px solid rgba(255,255,255,0.8); padding-bottom: 4px; }

        /* Split Cards */
        .split-cards-section { display: flex; flex-direction: column; gap: 4px; padding: 0 4px; margin-bottom: 0; }
        @media (min-width: 768px) {
          .split-cards-section {
            flex-direction: row;
          }
        }
        .split-card { flex: 1; position: relative; aspect-ratio: 1.1; overflow: hidden; min-height: clamp(300px, 50vw, auto); }
        .split-card img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.85); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        .split-card:hover img { transform: scale(1.05); }
        .split-card-content { position: absolute; top: clamp(20px, 3vw, 40px); left: clamp(20px, 3vw, 40px); color: white; text-align: left; z-index: 2; }
        .split-card-content h2 { font-size: clamp(1.5rem, 5vw, 3rem); margin-bottom: clamp(12px, 2vw, 20px); text-shadow: 0 2px 10px rgba(0,0,0,0.3); }
        .view-more-btn { display: flex; align-items: center; color: rgba(255,255,255,0.7); font-size: clamp(8px, 1.2vw, 10px); font-weight: 700; letter-spacing: 0.1em; transition: color 0.3s; }
        .split-card:hover .view-more-btn { color: white; }
      `}</style>
    </main>
  );
};

export default Home;
