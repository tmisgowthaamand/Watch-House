import { Suspense, lazy, useState, useEffect, useCallback, startTransition } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';

import TopBar from './components/TopBar';
import Header from './components/Header';

const CustomCursor = lazy(() => import('./components/CustomCursor'));
const Footer = lazy(() => import('./components/Footer'));

const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Locations = lazy(() => import('./pages/Locations'));
const About = lazy(() => import('./pages/About'));
const Subscribe = lazy(() => import('./pages/Subscribe'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Products = lazy(() => import('./pages/Products'));

const LoadingScreen = () => {
  const [loading, setLoading] = useState(() => !window.matchMedia('(max-width: 767px)').matches);

  useEffect(() => {
    if (window.matchMedia('(max-width: 767px)').matches) {
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
      document.documentElement.classList.remove('show-loading-screen');
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loading-screen ${loading ? 'active' : 'hidden'}`}>
      <div className="loading-logo serif-dot">WatchHouse</div>
      <style>{`
        .loading-screen {
          position: fixed;
          inset: 0;
          background: #000;
          color: #fff;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.8s ease-out, visibility 0.8s ease-out;
        }
        .loading-screen.hidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }
        .loading-logo {
          font-family: var(--font-serif);
          font-size: 2rem;
          letter-spacing: 0.1em;
          animation: pulse 1s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @media (max-width: 767px) {
          .loading-screen {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

/* Scroll-to-top + page transition on route change */
const PageWrapper = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return <div className="page-transition" key={location.pathname}>{children}</div>;
};

function App() {
  // Deferred scroll-reveal: run AFTER first paint
  useEffect(() => {
    let observer;
    let mutationObs;
    let debounceTimer;

    const init = () => {
      const options = { root: null, rootMargin: '0px 0px -60px 0px', threshold: 0.08 };

      const handleIntersect = (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.dataset.delay || 0;
            setTimeout(() => el.classList.add('revealed'), Number(delay));
            obs.unobserve(el);
          }
        });
      };

      observer = new IntersectionObserver(handleIntersect, options);

      const observeElements = () => {
        const selectors = '.reveal:not(.revealed), .reveal-left:not(.revealed), .reveal-right:not(.revealed), .reveal-scale:not(.revealed), .reveal-stagger';
        document.querySelectorAll(selectors).forEach(el => {
          if (el.classList.contains('reveal-stagger')) {
            Array.from(el.children).forEach((child, i) => {
              if (!child.classList.contains('revealed')) {
                child.classList.add('reveal');
                child.dataset.delay = String(i * 100);
                observer.observe(child);
              }
            });
          }
          observer.observe(el);
        });
      };

      observeElements();

      mutationObs = new MutationObserver(() => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(observeElements, 300);
      });
      mutationObs.observe(document.body, { childList: true, subtree: true });
    };

    // Delay initialization until after LCP paints
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(init, { timeout: 2500 });
      return () => { cancelIdleCallback(id); observer?.disconnect(); mutationObs?.disconnect(); };
    }
    const t = setTimeout(init, 500);
    return () => { clearTimeout(t); observer?.disconnect(); mutationObs?.disconnect(); };
  }, []);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;

    let animationFrameId;
    let isTicking = false;
    let mouseX = 0, mouseY = 0;

    let winWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
    let winHeight = typeof window !== 'undefined' ? window.innerHeight : 768;

    const updateDimensions = () => {
      winWidth = window.innerWidth;
      winHeight = window.innerHeight;
    };

    window.addEventListener('resize', updateDimensions, { passive: true });

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isTicking) {
        animationFrameId = requestAnimationFrame(() => {
          const x = (mouseX / winWidth - 0.5);
          const y = (mouseY / winHeight - 0.5);
          document.documentElement.style.setProperty('--mx', `${x * 15}px`);
          document.documentElement.style.setProperty('--my', `${y * 15}px`);
          document.documentElement.style.setProperty('--mx-slow', `${x * 8}px`);
          document.documentElement.style.setProperty('--my-slow', `${y * 8}px`);
          isTicking = false;
        });
        isTicking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <Router>
      <div className="app">
        <LoadingScreen />
        <TopBar />
        <Header />
        <PageWrapper>
          {typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches && (
            <Suspense fallback={null}>
              <CustomCursor />
            </Suspense>
          )}
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product" element={<ProductDetail />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/about" element={<About />} />
              <Route path="/subscribe" element={<Subscribe />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/collections/all" element={<Products />} />
            </Routes>
          </Suspense>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </PageWrapper>
      </div>
    </Router>
  );
}

export default App;
