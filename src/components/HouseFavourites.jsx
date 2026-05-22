import React, { useState } from 'react';
import { ArrowRight, Bookmark } from 'lucide-react';

const HouseFavourites = () => {
  const [activeTab, setActiveTab] = useState('Beans.');

  const tabs = ['Beans.', 'Pods.', 'Merch.'];

  const productData = {
    'Beans.': [
      {
        title: '1829 Espresso.',
        brew: 'Espresso',
        tag: 'House favourite.',
        notesTitle: 'Tasting Notes.',
        notes: 'Orange, Caramel, Milk Chocolate',
        origin: 'Peru',
        price: '12.00',
        image: '/hero3.png'
      },
      {
        title: 'Turihamwe.',
        brew: 'Espresso',
        tag: '',
        notesTitle: 'Notes.',
        notes: 'Honey, Peach, Darjeeling Tea',
        origin: 'Burundi',
        price: '12.00',
        image: '/hero.png'
      },
      {
        title: 'Gregorio Espinoza.',
        brew: 'Filter',
        tag: '',
        notesTitle: 'Notes.',
        notes: 'Dark Chocolate, Raspberry, Caramel',
        origin: 'Peru',
        price: '12.00',
        image: '/hero2.png'
      },
      {
        title: 'Xiengkhuang.',
        brew: 'Filter',
        tag: '',
        notesTitle: 'Tasting notes.',
        notes: 'Plum, Cherry, Mandarin',
        origin: 'Laos',
        price: '14.00',
        image: '/hero3.png'
      }
    ],
    'Pods.': [
      {
        title: '1829 Pods.',
        brew: 'Nespresso',
        tag: 'House favourite.',
        notesTitle: 'Tasting Notes.',
        notes: 'Orange, Caramel, Milk Chocolate',
        origin: 'Peru',
        price: '8.00',
        image: '/hero2.png'
      },
      {
        title: 'Decaf Pods.',
        brew: 'Nespresso',
        tag: '',
        notesTitle: 'Notes.',
        notes: 'Honey, Peach, Darjeeling Tea',
        origin: 'Burundi',
        price: '8.50',
        image: '/hero.png'
      }
    ],
    'Merch.': [
      {
        title: 'WatchHouse Tote.',
        brew: 'Merch',
        tag: '',
        notesTitle: 'Material.',
        notes: '100% Organic Cotton',
        origin: 'UK',
        price: '20.00',
        image: '/hero.png'
      },
      {
        title: 'KeepCup.',
        brew: 'Merch',
        tag: '',
        notesTitle: 'Size.',
        notes: '8oz',
        origin: 'AUS',
        price: '25.00',
        image: '/hero2.png'
      }
    ]
  };

  const currentProducts = productData[activeTab] || productData['Beans.'];

  return (
    <section className="house-fav-section reveal">
      <div className="container" style={{ paddingLeft: 'var(--container-padding)', paddingRight: 0 }}>
        <div className="hf-header">
          <div className="hf-title-area">
            <h2 className="hf-title">House favourites.</h2>
            <div className="hf-tabs">
              {tabs.map(tab => (
                <button
                  key={tab}
                  className={`hf-tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <button className="view-all-btn">
            View all <ArrowRight size={14} style={{ marginLeft: 5 }} />
          </button>
        </div>

        <div className="scroll-wrapper">
          <div className="hf-grid">
            {currentProducts.map((p, i) => (
              <div className="hf-card" key={i}>
                <div className="hf-img-box">
                  <div className="hf-img-top">
                    <span className="hf-tag"><span className="circ">○</span> Brew. {p.brew}</span>
                    {p.tag && <span className="hf-tag right"><span className="circ">○</span> {p.tag}</span>}
                  </div>
                  <img src={p.image} alt={p.title} className="hf-img" />
                  <Bookmark className="hf-bookmark" size={16} />
                </div>
                <div className="hf-info">
                  <h3 className="hf-prod-title">{p.title}</h3>
                  <div className="hf-meta">
                    <div className="hf-notes">
                      <strong>{p.notesTitle}</strong><br />
                      <span>{p.notes}</span>
                    </div>
                    <div className="hf-origin">
                      <strong>Origin.</strong><br />
                      <span>{p.origin}</span>
                    </div>
                  </div>
                  <div className="hf-footer">
                    <span className="add-btn">Add to cart</span>
                    <span className="hf-price">£{p.price} +</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .house-fav-section {
          background-color: #B1AFAD;
          padding: clamp(60px, 10vw, 100px) 0;
          overflow: hidden;
        }
        .hf-header {
          display: flex;
          flex-direction: column;
          gap: clamp(20px, 3vw, 40px);
          margin-bottom: clamp(30px, 5vw, 40px);
          padding-right: var(--spacing-md);
        }
        @media (min-width: 640px) {
          .hf-header {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;
          }
        }
        .hf-title-area {
          display: flex;
          flex-direction: column;
          gap: clamp(15px, 3vw, 40px);
          align-items: flex-start;
        }
        @media (min-width: 640px) {
          .hf-title-area {
            flex-direction: row;
            align-items: baseline;
          }
        }
        .hf-title {
          font-family: var(--font-serif);
          font-size: clamp(1.8rem, 5vw, 2.8rem);
          color: #1A1A1A;
          letter-spacing: -0.01em;
          font-weight: 500;
          margin: 0;
          white-space: nowrap;
        }
        .hf-tabs {
          display: flex;
          gap: clamp(10px, 2vw, 15px);
          flex-wrap: wrap;
        }
        .hf-tab-btn {
          font-family: var(--font-serif);
          font-size: clamp(1rem, 2.5vw, 1.2rem);
          color: #1A1A1A;
          opacity: 0.5;
          cursor: pointer;
          transition: opacity 0.3s;
          white-space: nowrap;
        }
        .hf-tab-btn.active {
          opacity: 1;
        }
        .view-all-btn {
          font-size: clamp(10px, 1.5vw, 12px);
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: clamp(8px, 1vw, 10px);
          color: #1A1A1A;
          white-space: nowrap;
        }

        .scroll-wrapper {
          overflow-x: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(0,0,0,0.3) transparent;
          padding-right: var(--spacing-md);
          -webkit-overflow-scrolling: touch;
        }
        .scroll-wrapper::-webkit-scrollbar {
          height: 8px;
        }
        .scroll-wrapper::-webkit-scrollbar-track {
          background: transparent;
        }
        .scroll-wrapper::-webkit-scrollbar-thumb {
          background-color: rgba(0,0,0,0.3);
          border-radius: 4px;
        }
        .hf-grid {
          display: inline-flex;
          gap: clamp(15px, 3vw, 20px);
        }

        .hf-card {
          width: clamp(260px, 80vw, 320px);
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
        }

        @media (min-width: 1024px) {
          .hf-card {
            width: 320px;
          }
        }

        .hf-img-box {
          background-color: #DCD8D2;
          aspect-ratio: 0.85;
          position: relative;
          padding: clamp(12px, 2vw, 15px);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .hf-img-top {
          position: absolute;
          top: clamp(12px, 2vw, 15px);
          left: clamp(12px, 2vw, 15px);
          right: clamp(12px, 2vw, 15px);
          display: flex;
          justify-content: space-between;
        }
        .hf-tag {
          font-size: clamp(8px, 1.5vw, 10px);
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: clamp(3px, 0.5vw, 5px);
          background: rgba(255, 255, 255, 0.9);
          padding: clamp(4px, 1vw, 6px) clamp(6px, 1vw, 8px);
          border-radius: 2px;
        }
        .circ {
          font-size: 6px;
        }
        .hf-img {
          width: 50%;
          height: auto;
          max-height: 100%;
          object-fit: contain;
          mix-blend-mode: multiply;
          transition: transform 0.4s;
        }
        .hf-card:hover .hf-img {
          transform: translateY(-5px);
        }
        .hf-bookmark {
          position: absolute;
          bottom: clamp(12px, 2vw, 15px);
          right: clamp(12px, 2vw, 15px);
        }

        .hf-info {
          padding-top: clamp(12px, 2vw, 15px);
          color: #1A1A1A;
        }
        .hf-prod-title {
          font-family: var(--font-serif);
          font-size: clamp(1.1rem, 2.5vw, 1.4rem);
          margin-bottom: clamp(15px, 3vw, 20px);
          font-weight: 500;
          margin: 0 0 clamp(15px, 3vw, 20px);
        }
        .hf-meta {
          display: flex;
          justify-content: space-between;
          font-size: clamp(9px, 1.5vw, 10px);
          font-weight: 500;
          line-height: 1.4;
          padding-bottom: clamp(15px, 3vw, 20px);
        }
        .hf-notes strong, .hf-origin strong {
          font-weight: 700;
        }
        .hf-origin {
          text-align: right;
        }
        .hf-footer {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid rgba(0,0,0,0.8);
          padding-top: clamp(12px, 2vw, 15px);
          padding-bottom: clamp(12px, 2vw, 15px);
          border-bottom: 1px solid rgba(0,0,0,0.2);
          font-size: clamp(10px, 1.5vw, 11px);
          font-weight: 700;
        }
        .hf-card:hover .hf-footer {
          border-bottom-color: rgba(0,0,0,0.8);
        }
      `}</style>
    </section>
  );
};

export default HouseFavourites;
