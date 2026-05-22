import { useState, useEffect } from 'react';

const announcements = [
  "Free UK delivery on orders over £40",
  "Subscribe & save 10% on all coffees",
  "Now shipping internationally"
];

const TopBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="top-bar">
      <div className="container top-bar-content">
        <div className="announcement-wrapper">
          <div className="bullet"></div>
          <div className="announcement-text" key={currentIndex}>
            {announcements[currentIndex]}
          </div>
        </div>
        <div className="localization">
          <span>£ GBP</span>
          <span className="separator">|</span>
          <span>India</span>
        </div>
      </div>
      <style>{`
        .top-bar {
          background-color: #1A1A1A;
          color: #fff;
          font-size: 11px;
          padding: 10px 0;
          font-family: var(--font-sans);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .top-bar-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .announcement-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
          overflow: hidden;
          height: 15px; /* Fixed height for clean animation container */
        }
        .bullet {
          width: 5px;
          height: 5px;
          border: 1px solid #fff;
          border-radius: 50%;
          display: inline-block;
          flex-shrink: 0;
        }
        .announcement-text {
          animation: slideUpFade 0.5s ease-out forwards;
        }
        @keyframes slideUpFade {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .localization {
          display: flex;
          gap: 15px;
          align-items: center;
        }
        .separator {
          opacity: 0.3;
        }
      `}</style>
    </div>
  );
};

export default TopBar;
