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
      <div className="container" style={{ paddingLeft: '40px', paddingRight: 0 }}>
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
          padding: 80px 0 100px 0;
          overflow: hidden;
        }
        .hf-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 40px;
          padding-right: 40px;
        }
        .hf-title-area {
          display: flex;
          align-items: baseline;
          gap: 40px;
        }
        .hf-title {
          font-family: var(--font-serif);
          font-size: 2.8rem;
          color: #1A1A1A;
          letter-spacing: -0.01em;
          font-weight: 500;
        }
        .hf-tabs {
          display: flex;
          gap: 15px;
        }
        .hf-tab-btn {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          color: #1A1A1A;
          opacity: 0.5;
          cursor: pointer;
        }
        .hf-tab-btn.active {
          opacity: 1;
        }
        .view-all-btn {
          font-size: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          color: #1A1A1A;
        }

        .scroll-wrapper {
          overflow-x: auto;
          scrollbar-width: none;
          padding-right: 40px;
        }
        .scroll-wrapper::-webkit-scrollbar {
          display: none;
        }
        .hf-grid {
          display: inline-flex;
          gap: 20px;
        }

        .hf-card {
           width: 320px;
           flex-shrink: 0;
           display: flex;
           flex-direction: column;
        }
        
        .hf-img-box {
           background-color: #DCD8D2; /* Approx from the image */
           aspect-ratio: 0.85;
           position: relative;
           padding: 15px;
           display: flex;
           justify-content: center;
           align-items: center;
        }
        .hf-img-top {
           position: absolute;
           top: 15px;
           left: 15px;
           right: 15px;
           display: flex;
           justify-content: space-between;
        }
        .hf-tag {
           font-size: 10px;
           font-weight: 700;
           display: flex;
           align-items: center;
           gap: 5px;
        }
        .circ {
           font-size: 8px;
        }
        .hf-img {
           width: 50%;
           object-fit: contain;
           mix-blend-mode: multiply; /* Just in case image has white bg */
           transition: transform 0.4s;
        }
        .hf-card:hover .hf-img {
           transform: translateY(-5px);
        }
        .hf-bookmark {
           position: absolute;
           bottom: 15px;
           right: 15px;
        }

        .hf-info {
           padding-top: 15px;
           color: #1A1A1A;
        }
        .hf-prod-title {
           font-family: var(--font-serif);
           font-size: 1.4rem;
           margin-bottom: 20px;
           font-weight: 500;
        }
        .hf-meta {
           display: flex;
           justify-content: space-between;
           font-size: 10px;
           font-weight: 500;
           line-height: 1.4;
           padding-bottom: 20px;
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
           padding-top: 15px;
           padding-bottom: 15px;
           border-bottom: 1px solid rgba(0,0,0,0.2);
           font-size: 11px;
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
