import { Suspense, lazy, useState, useEffect } from 'react';
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

/* Desktop-only loading screen */
const isDesktop = typeof window !== 'undefined' && !window.matchMedia('(max-width: 767px)').matches;
const isPointerDevice = typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const LoadingScreen = () => {
  const [loading, setLoading] = useState(isDesktop);

  useEffect(() => {
    if (!isDesktop) return;
    const timer = setTimeout(() => {
      setLoading(false);
      document.documentElement.classList.remove('show-loading-screen');
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  if (!isDesktop) return null;

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
  // Deferred scroll-reveal: run AFTER first paint via requestIdleCallback
  useEffect(() => {
    let observer;
    let mutationObs;
    let debounceTimer;

    const init = () => {
      const options = { root: null, rootMargin: '0px 0px -60px 0px', threshold: 0.08 };

      const handleIntersect = (entries, obs) => {
        for (let i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            const el = entries[i].target;
            const delay = el.dataset.delay || 0;
            setTimeout(() => el.classList.add('revealed'), Number(delay));
            obs.unobserve(el);
          }
        }
      };

      observer = new IntersectionObserver(handleIntersect, options);

      const observeElements = () => {
        // Phase 1: READ - collect all elements without triggering writes
        const selectors = '.reveal:not(.revealed), .reveal-left:not(.revealed), .reveal-right:not(.revealed), .reveal-scale:not(.revealed), .reveal-stagger:not([data-stagger-init])';
        const elements = document.querySelectorAll(selectors);
        const toObserve = [];
        const staggerWrites = [];

        for (let j = 0; j < elements.length; j++) {
          const el = elements[j];
          if (el.classList.contains('reveal-stagger')) {
            const children = el.children;
            for (let i = 0; i < children.length; i++) {
              if (!children[i].classList.contains('revealed')) {
                staggerWrites.push({ el: children[i], delay: i * 100 });
              }
            }
            staggerWrites.push({ el, attr: true }); // mark as initialized
          }
          toObserve.push(el);
        }

        // Phase 2: WRITE - batch all DOM mutations in a single rAF
        if (staggerWrites.length > 0 || toObserve.length > 0) {
          requestAnimationFrame(() => {
            for (let k = 0; k < staggerWrites.length; k++) {
              const item = staggerWrites[k];
              if (item.attr) {
                item.el.setAttribute('data-stagger-init', '1');
              } else {
                item.el.classList.add('reveal');
                item.el.dataset.delay = String(item.delay);
                observer.observe(item.el);
              }
            }
            for (let k = 0; k < toObserve.length; k++) {
              observer.observe(toObserve[k]);
            }
          });
        }
      };

      observeElements();

      mutationObs = new MutationObserver(() => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(observeElements, 800);
      });
      mutationObs.observe(document.body, { childList: true, subtree: true });
    };

    // Delay init until after LCP paints
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(init, { timeout: 3000 });
      return () => { cancelIdleCallback(id); observer?.disconnect(); mutationObs?.disconnect(); };
    }
    const t = setTimeout(init, 800);
    return () => { clearTimeout(t); observer?.disconnect(); mutationObs?.disconnect(); };
  }, []);

  // Desktop-only parallax mouse tracking
  useEffect(() => {
    if (!isPointerDevice) return;

    let animationFrameId;
    let isTicking = false;
    let mouseX = 0, mouseY = 0;
    let winW = window.innerWidth;
    let winH = window.innerHeight;

    const onResize = () => { winW = window.innerWidth; winH = window.innerHeight; };
    window.addEventListener('resize', onResize, { passive: true });

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isTicking) {
        animationFrameId = requestAnimationFrame(() => {
          const x = (mouseX / winW - 0.5);
          const y = (mouseY / winH - 0.5);
          const style = document.documentElement.style;
          style.setProperty('--mx', `${x * 15}px`);
          style.setProperty('--my', `${y * 15}px`);
          style.setProperty('--mx-slow', `${x * 8}px`);
          style.setProperty('--my-slow', `${y * 8}px`);
          isTicking = false;
        });
        isTicking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('resize', onResize);
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
          {isPointerDevice && (
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
