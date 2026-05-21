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
          padding: 100px 0 40px;
          transition: transform 0.1s ease-out;
        }
        .footer-links-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1.2fr 2fr;
          gap: 40px;
          margin-bottom: 100px;
        }
        .footer-col h3 {
          font-size: 1.8rem;
          margin-bottom: 30px;
          font-weight: 600;
        }
        .footer-col ul li {
          margin-bottom: 12px;
        }
        .footer-col ul li a {
          font-size: 14px;
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
          gap: 5px;
          width: 160px;
          margin-bottom: 15px;
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
        .insta-handle { font-size: 11px; opacity: 0.6; font-family: var(--font-sans); }

        .newsletter-col p {
          font-size: 14px;
          opacity: 0.8;
          line-height: 1.6;
          margin-bottom: 30px;
          max-width: 300px;
        }
        .email-input-wrapper {
          position: relative;
          border-bottom: 1px solid rgba(255,255,255,0.3);
          display: flex;
          align-items: center;
          padding-bottom: 10px;
          transition: border-color 0.3s;
        }
        .email-input-wrapper:focus-within { border-color: white; }
        .email-input-wrapper input {
          background: transparent;
          border: none;
          color: white;
          width: 100%;
          font-family: var(--font-sans);
          font-size: 12px;
          letter-spacing: 0.1em;
          outline: none;
        }
        .email-submit {
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          opacity: 0.6;
          transition: 0.3s;
        }
        .email-submit:hover { opacity: 1; transform: translateX(5px); }



        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 40px;
          border-top: 1px solid rgba(255,255,255,0.1);
          font-size: 12px;
          opacity: 0.7;
        }
        .bottom-left { display: flex; gap: 40px; }
        .legal-links { display: flex; gap: 20px; }
        .social-links { display: flex; gap: 30px; }
        .social-links span { cursor: pointer; transition: 0.3s; }
        .social-links span:hover { opacity: 1; text-decoration: underline; }

        @media (max-width: 1024px) {
          .footer-links-grid { grid-template-columns: repeat(2, 1fr); }
          .newsletter-col { grid-column: span 2; margin-top: 40px; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
