import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-main">
        <div className="footer-links-grid">
          <div className="footer-col reveal" data-delay="0">
            <h3 className="serif-dot">WatchHouse</h3>
            <ul>
              <li><Link to="/about">Story</Link></li>
              <li><Link to="/about">Journal</Link></li>
              <li><Link to="/about">Careers</Link></li>
              <li><Link to="/about">Media & PR</Link></li>
              <li><Link to="/about">Franchise</Link></li>
            </ul>
          </div>

          <div className="footer-col reveal" data-delay="100">
            <h3 className="serif-dot">Houses</h3>
            <ul>
              <li><Link to="/locations">Visit us</Link></li>
              <li><Link to="/subscribe">App</Link></li>
              <li><Link to="/product">Menu</Link></li>
              <li><Link to="/locations">Private hire</Link></li>
            </ul>
          </div>

          <div className="footer-col reveal" data-delay="200">
            <h3 className="serif-dot">Help & Info</h3>
            <ul>
              <li><Link to="/about">FAQs</Link></li>
              <li><Link to="/about">Brew guides</Link></li>
              <li><Link to="/about">Shipping</Link></li>
              <li><Link to="/about">Returns</Link></li>
              <li><Link to="/about">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col insta-grid-col reveal" data-delay="300">
            <div className="insta-grid">
              <div className="insta-item"><img src="/hero.png" alt="Insta" /></div>
              <div className="insta-item"><img src="/hero2.png" alt="Insta" /></div>
              <div className="insta-item"><img src="/hero3.png" alt="Insta" /></div>
              <div className="insta-item"><img src="/coffee_bag.png" alt="Insta" /></div>
            </div>
            <span className="insta-handle">@watchhouse</span>
          </div>

          <div className="footer-col newsletter-col reveal" data-delay="400">
            <h3 className="serif-dot">Our emails. Your inbox</h3>
            <p>New origins. Seasonal menus. Upcoming events. And 10% off, when you subscribe.</p>
            <div className="email-input-wrapper">
              <input type="email" placeholder="EMAIL ADDRESS" />
              <button className="email-submit"><ArrowRight size={18} /></button>
            </div>
          </div>
        </div>



        <div className="footer-bottom">
          <div className="bottom-left">
            <span className="copyright">© WatchHouse 2026</span>
            <div className="legal-links">
              <span>Terms</span>
              <span>Privacy</span>
              <span>Cookies</span>
            </div>
          </div>
          <div className="social-links">
            <span>Facebook.</span>
            <span>Instagram.</span>
            <span>LinkedIn.</span>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          background: #1A1A1A;
          color: #F5EFEB;
          padding: clamp(60px, 10vw, 100px) 0 clamp(30px, 5vw, 40px);
          transition: transform 0.1s ease-out;
        }

        .footer-links-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(30px, 5vw, 60px);
          margin-bottom: clamp(60px, 10vw, 100px);
        }

        @media (min-width: 640px) {
          .footer-links-grid {
            grid-template-columns: 1fr 1fr;
            gap: clamp(30px, 5vw, 60px);
          }
        }

        @media (min-width: 1024px) {
          .footer-links-grid {
            grid-template-columns: 1fr 1fr 1fr 1.2fr 2fr;
            gap: clamp(40px, 7vw, 60px);
          }
        }

        .footer-col h3 {
          font-size: clamp(1.3rem, 3vw, 1.8rem);
          margin-bottom: clamp(20px, 3vw, 30px);
          font-weight: 600;
        }
        .footer-col ul li {
          margin-bottom: clamp(8px, 1.5vw, 12px);
        }
        .footer-col ul li a {
          font-size: clamp(12px, 1.8vw, 14px);
          opacity: 0.8;
          transition: 0.3s;
        }
        .footer-col ul li a:hover {
          opacity: 1;
          padding-left: 5px;
        }

        .insta-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(3px, 1vw, 5px);
          width: clamp(100px, 30vw, 160px);
          margin-bottom: clamp(10px, 2vw, 15px);
        }
        .insta-item {
          aspect-ratio: 1;
          overflow: hidden;
          background: #333;
        }
        .insta-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }
        .insta-item:hover img { transform: scale(1.1); }
        .insta-handle { font-size: clamp(9px, 1.5vw, 11px); opacity: 0.6; font-family: var(--font-sans); }

        .newsletter-col p {
          font-size: clamp(12px, 1.8vw, 14px);
          opacity: 0.8;
          line-height: 1.6;
          margin-bottom: clamp(20px, 3vw, 30px);
          max-width: 300px;
        }
        .email-input-wrapper {
          position: relative;
          border-bottom: 1px solid rgba(255,255,255,0.3);
          display: flex;
          align-items: center;
          padding-bottom: clamp(8px, 1.5vw, 10px);
          transition: border-color 0.3s;
        }
        .email-input-wrapper:focus-within { border-color: white; }
        .email-input-wrapper input {
          background: transparent;
          border: none;
          outline: none;
          color: white;
          width: 100%;
          font-family: var(--font-sans);
          font-size: clamp(12px, 1.8vw, 14px);
          padding: clamp(10px, 2vw, 15px) 0;
        }
        .email-input-wrapper input::placeholder { color: rgba(255, 255, 255, 0.5); }
        .email-submit {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(8px, 1.5vw, 10px);
          transition: 0.3s opacity;
        }
        .email-submit:hover { opacity: 0.7; }

        .footer-bottom {
          display: flex;
          flex-direction: column;
          gap: clamp(20px, 3vw, 40px);
          align-items: flex-start;
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: clamp(30px, 5vw, 40px);
        }

        @media (min-width: 640px) {
          .footer-bottom {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }

        .bottom-left {
          display: flex;
          flex-direction: column;
          gap: clamp(15px, 2vw, 20px);
        }

        @media (min-width: 640px) {
          .bottom-left {
            flex-direction: row;
            gap: clamp(20px, 3vw, 40px);
            align-items: center;
          }
        }

        .copyright {
          font-size: clamp(11px, 1.5vw, 12px);
          opacity: 0.7;
        }

        .legal-links {
          display: flex;
          gap: clamp(15px, 2vw, 30px);
          font-size: clamp(11px, 1.5vw, 12px);
          opacity: 0.7;
        }

        .social-links {
          display: flex;
          gap: clamp(20px, 3vw, 40px);
          font-size: clamp(11px, 1.5vw, 12px);
          opacity: 0.8;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
