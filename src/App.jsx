import { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import useScrollReveal from './hooks/useScrollReveal';
import CustomCursor from './components/CustomCursor';

const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Locations = lazy(() => import('./pages/Locations'));
const About = lazy(() => import('./pages/About'));
const Subscribe = lazy(() => import('./pages/Subscribe'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Products = lazy(() => import('./pages/Products'));

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  // Activate global scroll-reveal animations
  useScrollReveal();

  useEffect(() => {
    let animationFrameId;
    let isTicking = false;
    let mouseX = 0, mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isTicking) {
        animationFrameId = requestAnimationFrame(() => {
          const x = (mouseX / window.innerWidth - 0.5);
          const y = (mouseY / window.innerHeight - 0.5);
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
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <Router>
      <div className="app">
        <CustomCursor />
        <LoadingScreen />
        <TopBar />
        <Header />
        <PageWrapper>
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
        </PageWrapper>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
