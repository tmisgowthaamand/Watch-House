import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useCart();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Menu specific background colors (matched from screenshots)
  const menuColors = {
    search: '#E1DDD5',
    login: '#A6A6A5',
    shop: '#E1DDD5', // Specifically matched to screenshot's warm beige
    wishlist: '#000000', // overlay for image
  };

  const currentBgColor = activeMenu && menuColors[activeMenu] ? menuColors[activeMenu] : 'var(--color-bg)';
  const currentTextColor = activeMenu === 'wishlist' ? '#fff' : '#1A1A1A';

  return (
    <>
      <div className={`nav-overlay-blur ${(activeMenu || cartOpen) ? 'active' : ''}`} onMouseEnter={() => { setActiveMenu(null); setCartOpen(false); }}></div>

      {/* --- CART DRAWER --- */}
      <div className={`cart-drawer-wrapper ${cartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2 className="serif-dot">Your Cart.</h2>
          <button className="close-cart" onClick={() => setCartOpen(false)}>×</button>
        </div>
        <div className="cart-body">
          {cartItems.length === 0 ? (
            <>
              <h3 className="serif-dot">Your cart is empty</h3>
              <button
                className="continue-shopping"
                onClick={() => {
                  setCartOpen(false);
                  navigate('/collections/all');
                }}
              >
                Continue shopping →
              </button>
            </>
          ) : (
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="ci-img"><img src={item.img} alt={item.name} /></div>
                  <div className="ci-info">
                    <h4 className="serif-dot">{item.name}</h4>
                    <span className="ci-price">{item.price}</span>
                    <span className="ci-qty">Qty: {item.quantity}</span>
                  </div>
                  <button className="ci-remove" onClick={() => removeFromCart(item.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <div className="cart-total">
                <button
                  className="continue-shopping checkout-btn"
                  onClick={() => alert("Checkout flow is under construction!")}
                >
                  Checkout →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <header
        className="header"
        onMouseLeave={() => setActiveMenu(null)}
        style={{ backgroundColor: currentBgColor, color: currentTextColor }}
      >
        <div className="container header-content">
          <Link to="/" className="logo" onClick={() => setActiveMenu(null)}>
            <span className={`logo-text ${scrolled ? 'scrolled-logo' : ''}`}>
              {scrolled ? 'WH' : 'WatchHouse.'}
            </span>
          </Link>

          <nav className="nav-main">
            <ul className="nav-menu">
              <li><Link to="/subscribe" className="serif-dot hover-underline">Subscribe.</Link></li>
              <li onMouseEnter={() => setActiveMenu('shop')}><Link to="/collections/all" className="serif-dot hover-underline">Shop.</Link></li>
              <li onMouseEnter={() => setActiveMenu('visit-us')}><Link to="/locations" className="serif-dot hover-underline">Visit us.</Link></li>
              <li onMouseEnter={() => setActiveMenu('about')}><Link to="/about" className="serif-dot hover-underline">About.</Link></li>
            </ul>
          </nav>

          <div className="nav-utility">
            <button className="utility-item serif-dot hover-underline" onMouseEnter={() => setActiveMenu('search')}>Search.</button>
            <button className="utility-item serif-dot hover-underline" onMouseEnter={() => setActiveMenu('login')}>Login.</button>
            <Link to="/wishlist" className="utility-item serif-dot hover-underline" onMouseEnter={() => setActiveMenu('wishlist')}>Wishlist.</Link>
            <button className="utility-btn cart-btn" onClick={() => setCartOpen(true)}>
              Cart [{cartCount}]
            </button>
          </div>
        </div>

        {/* --- SEARCH MENU --- */}
        {activeMenu === 'search' && (
          <div className="megamenu mm-search animate-fade-in" style={{ backgroundColor: currentBgColor }}>
            <div className="container mm-search-grid">
              <div className="search-left">
                <h2 className="serif-dot">Search.</h2>
                <div className="search-input-wrapper">
                  <input type="text" placeholder="What are you looking for?" />
                  <ArrowRight size={18} />
                </div>
                <div className="search-links-area">
                  <ul className="search-quick-links">
                    <li className="serif-dot">Beans.</li>
                    <li className="serif-dot">Pods.</li>
                    <li className="serif-dot">Grinders.</li>
                    <li className="serif-dot">Machines.</li>
                    <li className="serif-dot">Gift cards.</li>
                    <li className="serif-dot">Locations.</li>
                  </ul>
                  <div className="search-boxes-img">
                    <img src="/coffee_bag.png" alt="Boxes" />
                  </div>
                </div>
              </div>
              <div className="search-right">
                <div className="search-collections">
                  <div className="search-col-item">
                    <img src="/hero2.png" alt="Rituals" />
                    <div className="sc-text">
                      <h4 className="serif-dot">Rituals.</h4>
                      <p>Warm, comforting and familiar.</p>
                    </div>
                  </div>
                  <div className="search-col-item">
                    <img src="/hero3.png" alt="Ventures" />
                    <div className="sc-text">
                      <h4 className="serif-dot">Ventures.</h4>
                      <p>Complex and adventurous.</p>
                    </div>
                  </div>
                  <div className="search-col-item">
                    <img src="/hero.png" alt="Horizons" />
                    <div className="sc-text">
                      <h4 className="serif-dot">Horizons.</h4>
                      <p>Expressive and unique.</p>
                    </div>
                  </div>
                </div>
                <div className="search-subscribe">
                  <img src="/hero2.png" alt="Subscribe" />
                  <div className="ss-text">
                    <h3 className="serif-dot">Subscribe.</h3>
                    <p>Coffee that delivers. For slow pours on quiet days, and stolen moments in busy ones. You set the schedule. We deliver. It's that simple.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- LOGIN MENU --- */}
        {activeMenu === 'login' && (
          <div className="megamenu mm-login animate-fade-in" style={{ backgroundColor: currentBgColor }}>
            <div className="login-box">
              <h2 className="serif-dot">Login</h2>
              <form className="login-form">
                <input type="email" placeholder="Email address" />
                <input type="password" placeholder="Password" />
                <a href="#" className="forgot-pw">Forgotten your password?</a>
                <button type="button" className="login-submit">Login</button>
              </form>
              <a href="#" className="create-acc hover-underline">Create an account</a>
            </div>
          </div>
        )}

        {/* --- SHOP MENU --- */}
        {activeMenu === 'shop' && (
          <div className="megamenu mm-shop animate-fade-in" style={{ backgroundColor: currentBgColor }}>
            <div className="container mm-shop-grid">

              {/* Col 1 */}
              <div className="shop-link-col">
                <ul className="shop-link-list">
                  <li><Link to="/collections/all">BEANS</Link></li>
                  <li><Link to="/collections/all">PODS</Link></li>
                  <li><Link to="/collections/all">DECAF</Link></li>
                  <li><Link to="/collections/all">MATCHA</Link></li>
                  <li><Link to="/collections/all">SETS</Link></li>
                  <li className="push-down"><Link to="/collections/all">SHOP ALL</Link></li>
                </ul>
                <h2 className="serif-dot shop-col-title">Coffee.</h2>
              </div>

              {/* Col 2 */}
              <div className="shop-link-col">
                <ul className="shop-link-list">
                  <li><Link to="/collections/all">BREWERS</Link></li>
                  <li><Link to="/collections/all">GRINDERS</Link></li>
                  <li><Link to="/collections/all">BARISTA ACCESSORIES</Link></li>
                  <li><Link to="/collections/all">MACHINES</Link></li>
                  <li className="push-down"><Link to="/collections/all">SHOP ALL</Link></li>
                </ul>
                <h2 className="serif-dot shop-col-title">Equipment.</h2>
              </div>

              {/* Col 3 */}
              <div className="shop-link-col">
                <ul className="shop-link-list">
                  <li><Link to="/collections/all">MERCH</Link></li>
                  <li><Link to="/collections/all">SETS</Link></li>
                  <li><Link to="/collections/all">GIFT CARDS</Link></li>
                  <li><Link to="/collections/all">CHOCOLATE</Link></li>
                  <li className="push-down"><Link to="/collections/all">SHOP ALL</Link></li>
                </ul>
                <h2 className="serif-dot shop-col-title">Merch.</h2>
              </div>

              {/* Col 4 (Collections) */}
              <div className="shop-collection-col">
                <div className="shop-collection-item">
                  <div className="collection-thumb"><img src="/hero.png" alt="Rituals" /></div>
                  <div className="collection-text">
                    <h4 className="serif-dot">Rituals.</h4>
                    <p>Warm, comforting and familiar.</p>
                  </div>
                </div>
                <div className="shop-collection-item">
                  <div className="collection-thumb"><img src="/hero2.png" alt="Ventures" /></div>
                  <div className="collection-text">
                    <h4 className="serif-dot">Ventures.</h4>
                    <p>Complex and adventurous.</p>
                  </div>
                </div>
                <div className="shop-collection-item last-item">
                  <div className="collection-thumb"><img src="/hero3.png" alt="Horizons" /></div>
                  <div className="collection-text">
                    <h4 className="serif-dot">Horizons.</h4>
                    <p>Expressive and unique.</p>
                  </div>
                </div>
              </div>

              {/* Col 5 (Promo) */}
              <div className="shop-promo-col">
                <img src="/hero2.png" alt="Subscription" className="promo-img" />
                <h3 className="serif-dot">Coffee on subscription.</h3>
                <p>Coffee that delivers. For slow pours on quiet days, and stolen moments in busy ones. You set the schedule. We deliver. It's that simple.</p>
              </div>

            </div>
          </div>
        )}

        {/* --- VISIT US MENU --- */}
        {activeMenu === 'visit-us' && (
          <div className="megamenu mm-shop animate-fade-in" style={{ backgroundColor: currentBgColor }}>
            <div className="container mm-visit-grid">

              {/* Col 1 */}
              <div className="shop-link-col">
                <ul className="shop-link-list">
                  <li><Link to="/locations">TOWER BRIDGE</Link></li>
                  <li><Link to="/locations">MARYLEBONE</Link></li>
                  <li><Link to="/locations">FITZROVIA</Link></li>
                  <li><Link to="/locations">SEVEN DIALS</Link></li>
                  <li><Link to="/locations">HAMPSTEAD HEATH</Link></li>
                  <li><Link to="/locations">BELSIZE PARK</Link></li>
                  <li><Link to="/locations">BATH</Link></li>
                  <li><Link to="/locations">COVENT GARDEN</Link></li>
                  <li><Link to="/locations">SOMERSET HOUSE</Link></li>
                  <li className="push-down"><Link to="/locations">VIEW ALL</Link></li>
                </ul>
                <h2 className="serif-dot shop-col-title">Brunch Houses.</h2>
              </div>

              {/* Col 2 */}
              <div className="shop-link-col">
                <ul className="shop-link-list">
                  <li><Link to="/locations">ST JOHN'S WOOD</Link></li>
                  <li><Link to="/locations">MILLENNIUM BRIDGE</Link></li>
                  <li><Link to="/locations">NORTHCOTE ROAD</Link></li>
                  <li><Link to="/locations">HANOVER</Link></li>
                  <li><Link to="/locations">BERMONDSEY</Link></li>
                  <li><Link to="/locations">FETTER LANE</Link></li>
                  <li><Link to="/locations">CANARY WHARF</Link></li>
                  <li><Link to="/locations">MARBLE ARCH</Link></li>
                  <li><Link to="/locations">BISHOPSGATE</Link></li>
                  <li className="push-down"><Link to="/locations">VIEW ALL</Link></li>
                </ul>
                <h2 className="serif-dot shop-col-title">Espresso Houses.</h2>
              </div>

              {/* Col 3 */}
              <div className="shop-collection-col">
                <div className="shop-collection-item">
                  <div className="collection-thumb"><img src="/hero.png" alt="Loyalty" /></div>
                  <div className="collection-text">
                    <h4 className="serif-dot">Loyalty.</h4>
                    <p>Six stamps. One on the House.</p>
                  </div>
                </div>
                <div className="shop-collection-item">
                  <div className="collection-thumb"><img src="/hero2.png" alt="Menu" /></div>
                  <div className="collection-text">
                    <h4 className="serif-dot">Menu.</h4>
                    <p>Because you can't live on food alone.</p>
                  </div>
                </div>
                <div className="shop-collection-item last-item">
                  <div className="collection-thumb"><img src="/hero3.png" alt="Private hire" /></div>
                  <div className="collection-text">
                    <h4 className="serif-dot">Private hire.</h4>
                    <p>Unique venues for gatherings and brand moments.</p>
                  </div>
                </div>
              </div>

              {/* Col 4 (Promo) */}
              <div className="shop-promo-col">
                <img src="/hero.png" alt="Borough Market" className="promo-img" />
                <h3 className="serif-dot">Borough Market, opening soon.</h3>
                <p>Opening soon in Borough Market. Granite, tile, timber and steel, built for coffee and the rhythm of the market.</p>
              </div>

            </div>
          </div>
        )}

        {/* --- ABOUT MENU --- */}
        {activeMenu === 'about' && (
          <div className="megamenu mm-shop animate-fade-in" style={{ backgroundColor: currentBgColor }}>
            <div className="container mm-about-grid">

              {/* Col 1 – Our Story */}
              <div className="shop-link-col">
                <ul className="shop-link-list">
                  <li><Link to="/about">THE BEGINNING</Link></li>
                  <li><Link to="/about">OUR APPROACH</Link></li>
                  <li><Link to="/about">INNOVATION</Link></li>
                  <li><Link to="/about">SUSTAINABILITY</Link></li>
                  <li className="push-down"><Link to="/about">READ MORE</Link></li>
                </ul>
                <h2 className="serif-dot shop-col-title">Our Story.</h2>
              </div>

              {/* Col 2 – Our Ethos */}
              <div className="shop-link-col">
                <ul className="shop-link-list">
                  <li><Link to="/about">SOURCING</Link></li>
                  <li><Link to="/about">ROASTING</Link></li>
                  <li><Link to="/about">DESIGN</Link></li>
                  <li><Link to="/about">COMMUNITY</Link></li>
                  <li className="push-down"><Link to="/about">READ MORE</Link></li>
                </ul>
                <h2 className="serif-dot shop-col-title">Our Ethos.</h2>
              </div>

              {/* Col 3 – People */}
              <div className="shop-collection-col">
                <div className="shop-collection-item">
                  <div className="collection-thumb"><img src="/hero2.png" alt="Roland Horne" /></div>
                  <div className="collection-text">
                    <h4 className="serif-dot">Roland Horne.</h4>
                    <p>Founder & CEO</p>
                  </div>
                </div>
                <div className="shop-collection-item">
                  <div className="collection-thumb"><img src="/hero.png" alt="Our Team" /></div>
                  <div className="collection-text">
                    <h4 className="serif-dot">Our Team.</h4>
                    <p>The people behind every cup.</p>
                  </div>
                </div>
                <div className="shop-collection-item last-item">
                  <div className="collection-thumb"><img src="/hero3.png" alt="Careers" /></div>
                  <div className="collection-text">
                    <h4 className="serif-dot">Careers.</h4>
                    <p>Join the WatchHouse family.</p>
                  </div>
                </div>
              </div>

              {/* Col 4 – Promo */}
              <div className="shop-promo-col">
                <img src="/hero2.png" alt="WatchHouse Interior" className="promo-img" />
                <h3 className="serif-dot">Modern Coffee.</h3>
                <p>Originally originating in a former 19th-century watch house on London's famous Bermondsey Street. Built around coffee, design and hospitality.</p>
              </div>

            </div>
          </div>
        )}

        {/* --- WISHLIST MENU --- */}
        {activeMenu === 'wishlist' && (
          <div className="megamenu mm-wishlist animate-fade-in">
            <div className="wishlist-bg">
              <img src="/hero3.png" alt="Brewing" />
              <div className="wishlist-overlay">
                <div className="container">
                  <span className="wl-label">WISHLIST</span>
                  <h2 className="serif-dot wl-title">Your items, saved.</h2>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <style>{`
        .header {
          border-bottom: 1px solid rgba(0,0,0,0.05);
          padding: 20px 0;
          position: sticky;
          top: 0;
          z-index: 1000;
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        .header-content {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          align-items: center;
        }
        .logo-text { font-family: var(--font-serif); font-size: 24px; font-weight: 700; transition: all 0.3s ease; }
        .scrolled-logo { font-size: 32px; letter-spacing: -2px; }
        
        .nav-main ul { display: flex; justify-content: center; gap: 40px; }
        .nav-main li { padding: 10px 0; }
        .nav-main a { font-family: var(--font-serif); font-size: 18px; font-weight: 500; }
        .nav-utility { display: flex; justify-content: flex-end; gap: 20px; align-items: center; }
        
        .hover-underline { position: relative; }
        .hover-underline::after {
          content: ''; position: absolute; width: 100%; transform: scaleX(0);
          height: 1px; bottom: 0; left: 0; background-color: currentColor;
          transform-origin: bottom right; transition: transform 0.3s ease-out;
        }
        .hover-underline:hover::after { transform: scaleX(1); transform-origin: bottom left; }

        .nav-overlay-blur {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.05); backdrop-filter: blur(10px);
          z-index: 999; opacity: 0; visibility: hidden; transition: all 0.3s;
        }
        .nav-overlay-blur.active { opacity: 1; visibility: visible; }

        .megamenu {
          position: absolute; top: 100%; left: 0; width: 100%;
          border-top: 1px solid rgba(0,0,0,0.1);
          box-shadow: 0 40px 100px rgba(0,0,0,0.1);
          color: #1A1A1A;
          overflow: hidden;
        }

        /* SEARCH MENU */
        .mm-search { padding: 40px 0 60px; }
        .mm-search-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }
        .search-left h2 { font-size: 2.5rem; margin-bottom: 50px; }
        .search-input-wrapper {
          display: flex; align-items: center; border-bottom: 1px solid rgba(0,0,0,0.8);
          padding-bottom: 10px; margin-bottom: 50px;
        }
        .search-input-wrapper input {
          width: 100%; background: transparent; border: none; outline: none;
          font-family: var(--font-sans); font-size: 18px;
        }
        .search-links-area { display: flex; justify-content: space-between; }
        .search-quick-links li { font-size: 1.4rem; margin-bottom: 15px; cursor: pointer; }
        .search-boxes-img { width: 150px; }
        .search-boxes-img img { width: 100%; mix-blend-mode: multiply; }
        
        .search-right { border-left: 1px solid rgba(0,0,0,0.1); padding-left: 60px; }
        .search-collections { display: grid; grid-template-rows: repeat(3, 1fr); gap: 20px; margin-bottom: 40px; }
        .search-col-item { display: flex; gap: 20px; align-items: center; border-bottom: 1px solid rgba(0,0,0,0.1); padding-bottom: 15px; }
        .search-col-item img { width: 80px; height: 80px; object-fit: cover; }
        .sc-text h4 { font-size: 1.3rem; margin-bottom: 5px; }
        .sc-text p { font-size: 14px; opacity: 0.8; }
        .search-subscribe img { width: 100%; height: 250px; object-fit: cover; margin-bottom: 20px; }
        .ss-text h3 { font-size: 1.5rem; margin-bottom: 15px; }
        .ss-text p { font-size: 14px; line-height: 1.5; opacity: 0.9; }

        /* LOGIN MENU */
        .mm-login { padding: 80px 0; display: flex; justify-content: center; }
        .login-box { width: 100%; max-width: 400px; text-align: left; }
        .login-box h2 { font-size: 2rem; margin-bottom: 40px; }
        .login-form input {
          width: 100%; background: transparent; border: none; border-bottom: 1px solid rgba(0,0,0,0.2);
          padding: 15px 0; margin-bottom: 20px; font-family: var(--font-sans); font-size: 14px;
        }
        .forgot-pw { font-size: 12px; display: block; margin-bottom: 40px; opacity: 0.6; }
        .login-submit {
          width: 100px; background: #1A1A1A; color: white; padding: 12px 0;
          font-family: var(--font-sans); font-weight: 700; font-size: 12px;
          margin-bottom: 30px; letter-spacing: 0.05em;
        }
        .create-acc { font-size: 14px; border-bottom: 1px solid #1A1A1A; padding-bottom: 3px; }

        /* MEGA MENU - SHOP */
        .mm-shop {
          padding: 0;
        }

        .mm-shop-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr 1fr 1.5fr 1.5fr; /* Matches visual weight */
          min-height: 450px;
        }

        .mm-visit-grid {
          display: grid;
          grid-template-columns: 1.2fr 1.2fr 1.5fr 1.8fr;
          min-height: 450px;
        }

        .mm-about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1.5fr 1.8fr;
          min-height: 450px;
        }

        .shop-link-col {
          border-right: 1px solid rgba(0,0,0,0.2);
          display: flex;
          flex-direction: column;
          padding: 20px 20px 20px 0;
        }
        
        .mm-shop-grid > .shop-link-col:first-child, .mm-visit-grid > .shop-link-col:first-child, .mm-about-grid > .shop-link-col:first-child {
          padding-left: 0;
        }
        
        .mm-shop-grid > .shop-link-col:not(:first-child), .mm-visit-grid > .shop-link-col:not(:first-child), .mm-about-grid > .shop-link-col:not(:first-child) {
          padding-left: 20px;
        }

        .shop-link-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 15px;
          flex: 1;
        }

        .shop-link-list li {
          font-family: var(--font-sans);
          font-size: 11px;
          letter-spacing: 0.1em;
          font-weight: 500;
        }

        .shop-link-list li a {
          color: #1a1a1a;
          text-decoration: none;
          transition: 0.3s opacity;
        }
        
        .shop-link-list li a:hover {
          opacity: 0.5;
        }

        .push-down {
          margin-top: auto;
          margin-bottom: 30px;
        }

        .shop-col-title {
          font-size: 2.5rem;
          margin: 0;
        }

        .shop-collection-col {
          border-right: 1px solid rgba(0,0,0,0.2);
          display: flex;
          flex-direction: column;
        }

        .shop-collection-item {
          display: flex;
          gap: 15px;
          padding: 20px;
          border-bottom: 1px solid rgba(0,0,0,0.2);
          flex: 1;
          align-items: center;
          cursor: pointer;
          transition: 0.2s background-color;
        }
        
        .shop-collection-item:hover {
          background-color: rgba(255,255,255,0.1);
        }

        .shop-collection-item.last-item {
          border-bottom: none;
        }

        .collection-thumb {
          width: 70px;
          height: 70px;
          background: rgba(0,0,0,0.05); /* Placeholder tint if image fails */
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .collection-thumb img {
          max-width: 100%;
          max-height: 100%;
          object-fit: cover;
        }

        .collection-text h4 {
          font-size: 16px;
          margin: 0 0 5px;
        }

        .collection-text p {
          font-family: var(--font-sans);
          font-size: 11px;
          margin: 0;
          opacity: 0.7;
        }

        .shop-promo-col {
          padding: 20px;
          display: flex;
          flex-direction: column;
        }

        .promo-img {
          width: 100%;
          aspect-ratio: 16/9;
          object-fit: cover;
          margin-bottom: 25px;
        }

        .shop-promo-col h3 {
          font-size: 1.5rem;
          margin: 0 0 15px;
        }

        .shop-promo-col p {
          font-family: var(--font-sans);
          font-size: 11px;
          line-height: 1.5;
          margin: 0;
          opacity: 0.8;
          max-width: 90%;
        }
        
        /* WISHLIST MENU */
        .mm-wishlist { height: 600px; position: relative; }
        .wishlist-bg { position: absolute; inset: 0; }
        .wishlist-bg img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.7); }
        .wishlist-overlay { position: absolute; inset: 0; display: flex; align-items: flex-end; padding-bottom: 80px; }
        .wl-label { display: block; color: white; font-size: 10px; font-weight: 700; letter-spacing: 0.15em; margin-bottom: 15px; }
        .wl-title { color: white; font-size: 4.5rem; line-height: 1; text-shadow: 0 4px 10px rgba(0,0,0,0.3); }

        /* CART DRAWER */
        .cart-drawer-wrapper {
          position: fixed;
          top: 0;
          right: -450px;
          width: 450px;
          height: 100vh;
          background: #E6E3DE; /* Matching the beige cart background screenshot */
          z-index: 2000;
          transition: right 0.4s cubic-bezier(0.77, 0, 0.175, 1);
          border-left: 1px solid rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
        }
        .cart-drawer-wrapper.open { right: 0; }
        .cart-header {
          display: flex;
          justify-content: space-between;
          padding: 30px 40px;
          align-items: center;
        }
        .cart-header h2 { font-size: 1.5rem; }
        .close-cart { background: transparent; border: none; font-size: 2rem; cursor: pointer; color: #1a1a1a; transition: 0.3s; }
        .close-cart:hover { transform: rotate(90deg); }
        .cart-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 150px;
        }
        .cart-body h3 { font-size: 2rem; margin-bottom: 30px; font-weight: 500; }
        .continue-shopping {
          background: #1C1C1C;
          color: #fff;
          border: none;
          padding: 15px 30px;
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 15px;
          transition: opacity 0.3s;
        }
        .continue-shopping:hover { opacity: 0.8; }
        
        .cart-items {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          padding: 0 40px;
        }
        .cart-item {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px 0;
          border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        .ci-img { width: 80px; height: 100px; background: #D0C8BB; display: flex; justify-content: center; align-items: center; }
        .ci-img img { width: 80%; mix-blend-mode: multiply; }
        .ci-info { flex: 1; display: flex; flex-direction: column; gap: 5px; }
        .ci-info h4 { font-size: 1.1rem; }
        .ci-price, .ci-qty { font-family: var(--font-sans); font-size: 12px; font-weight: 600; opacity: 0.8; }
        .ci-remove { background: transparent; border: none; cursor: pointer; padding: 10px; color: #666; transition: 0.3s; }
        .ci-remove:hover { color: red; }
        .cart-total { margin-top: 30px; display: flex; justify-content: center; }
        .checkout-btn { width: 100%; justify-content: center; letter-spacing: 0.05em; }
        
        @media (max-width: 500px) {
          .cart-drawer-wrapper { width: 100%; right: -100%; }
        }
      `}</style>
    </>
  );
};

export default Header;
