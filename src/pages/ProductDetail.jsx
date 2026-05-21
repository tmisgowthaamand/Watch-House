import React, { useState } from 'react';
import { ArrowRight, Heart, ChevronDown, Minus, Plus } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const ProductDetail = () => {
  const location = useLocation();
  const product = location.state?.product || null;

  const [selectedGrind, setSelectedGrind] = useState('Whole Bean');
  const [selectedWeight, setSelectedWeight] = useState('250g');
  const [quantity, setQuantity] = useState(1);
  const [openDetail, setOpenDetail] = useState(null);

  React.useEffect(() => {
    document.title = "1829 Espresso – WatchHouse";
  }, []);

  const grinds = ['Whole Bean', 'Espresso', 'Filter', 'Cafetière'];
  const weights = [
    { label: '250g', price: '£12.00' },
    { label: '1kg', price: '£42.00' }
  ];

  const currentPrice = weights.find(w => w.label === selectedWeight)?.price || (product ? product.price : '£12.00');

  const details = [
    {
      title: 'The detail',
      content: (
        <div className="detail-grid">
          <div><span className="dt-label">Region</span><span className="dt-value">Huila, Colombia</span></div>
          <div><span className="dt-label">Process</span><span className="dt-value">Washed</span></div>
          <div><span className="dt-label">Altitude</span><span className="dt-value">1700–1900 MASL</span></div>
          <div><span className="dt-label">Variety</span><span className="dt-value">Red Caturra</span></div>
        </div>
      )
    },
    {
      title: 'Brew guide',
      content: (
        <p>We recommend a 1:2 ratio with a 28-second extraction. 18g in, 36g out. Pre-infuse for 5 seconds before full pressure.</p>
      )
    },
    {
      title: 'Shipping & returns',
      content: (
        <p>Free UK delivery on orders over £40. Orders placed before 12pm are dispatched same day. Returns accepted within 14 days.</p>
      )
    }
  ];

  return (
    <main className="pdp">
      {/* Breadcrumb */}
      <div className="container pdp-breadcrumb">
        <span>Shop</span>
        <span className="bc-sep">/</span>
        <span>Beans</span>
        <span className="bc-sep">/</span>
        <span className="bc-active">1829 Espresso</span>
      </div>

      <div className="container pdp-layout">
        {/* Gallery */}
        <div className="pdp-gallery">
          <div className="gallery-main reveal">
            <img src={product ? product.img : "/coffee_bag.png"} alt={product ? product.name : "1829 Espresso"} />
          </div>
          <div className="gallery-secondary">
            <div className="gallery-img reveal" data-delay="100">
              <img src="/hero.png" alt="Lifestyle shot" />
            </div>
            <div className="gallery-img reveal" data-delay="200">
              <img src="/hero2.png" alt="Detail shot" />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="pdp-info">
          <div className="pdp-sticky">
            {/* Title Block */}
            <div className="pdp-header reveal">
              <span className="pdp-collection">{product ? product.tag1Val?.toUpperCase() : 'RITUALS'}</span>
              <h1>{product ? product.name : '1829 Espresso'}</h1>
              <p className="pdp-flavor">{product ? product.tag2Val : 'Stone Fruit. Caramel. Milk Chocolate.'}</p>
              <p className="pdp-desc">
                {product ?
                  `Our ${product.name} is a fine selection. We source, roast and brew specifically for a great expression which pairs perfectly with this roast.` :
                  `Our 1829 Espresso is our seasonal espresso for milk. We source, roast and brew specifically for a great expression of Red Caturra which pairs perfectly with milk.`
                }
              </p>
            </div>

            {/* Selectors */}
            <div className="pdp-selectors reveal" data-delay="150">
              {/* Grind */}
              <div className="selector-block">
                <label>Grind</label>
                <div className="grind-options">
                  {grinds.map(g => (
                    <button
                      key={g}
                      className={`grind-btn ${selectedGrind === g ? 'active' : ''}`}
                      onClick={() => setSelectedGrind(g)}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight */}
              <div className="selector-block">
                <label>Weight</label>
                <div className="weight-options">
                  {weights.map(w => (
                    <button
                      key={w.label}
                      className={`weight-btn ${selectedWeight === w.label ? 'active' : ''}`}
                      onClick={() => setSelectedWeight(w.label)}
                    >
                      <span>{w.label}</span>
                      <span className="w-price">{w.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="selector-block">
                <label>Quantity</label>
                <div className="qty-control">
                  <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus size={14} />
                  </button>
                  <span className="qty-val">{quantity}</span>
                  <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}>
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="pdp-actions reveal" data-delay="250">
              <button className="add-to-cart-btn">
                <span>ADD TO CART</span>
                <span>{currentPrice}</span>
              </button>
              <div className="pdp-sub-actions">
                <button className="wishlist-btn">
                  <Heart size={14} />
                  <span>Add to Wishlist</span>
                </button>
                <button className="subscribe-link">
                  Subscribe & save 10% <ArrowRight size={12} style={{ marginLeft: 4 }} />
                </button>
              </div>
            </div>

            {/* Expandable Details */}
            <div className="pdp-details reveal" data-delay="350">
              {details.map((d, i) => (
                <div key={i} className={`detail-accordion ${openDetail === i ? 'open' : ''}`}>
                  <button
                    className="detail-trigger"
                    onClick={() => setOpenDetail(openDetail === i ? null : i)}
                  >
                    <span>{d.title}</span>
                    <ChevronDown size={16} className={`detail-chevron ${openDetail === i ? 'rotated' : ''}`} />
                  </button>
                  <div className="detail-body">
                    {d.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .pdp { background: var(--color-bg); padding-bottom: 100px; }

        /* BREADCRUMB */
        .pdp-breadcrumb {
          padding: 20px 0;
          font-size: 11px; font-weight: 500; letter-spacing: 0.05em;
          opacity: 0.5; text-transform: uppercase;
          display: flex; gap: 8px; align-items: center;
        }
        .bc-sep { opacity: 0.3; }
        .bc-active { opacity: 1; font-weight: 700; }

        /* LAYOUT */
        .pdp-layout {
          display: grid; grid-template-columns: 1.4fr 1fr; gap: 60px;
          align-items: start;
        }

        /* GALLERY */
        .pdp-gallery { display: flex; flex-direction: column; gap: 10px; }
        .gallery-main {
          background: #eae5df; display: flex;
          align-items: center; justify-content: center; padding: 60px;
        }
        .gallery-main img { max-width: 70%; height: auto; }
        .gallery-secondary { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .gallery-img { aspect-ratio: 1; overflow: hidden; }
        .gallery-img img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .gallery-img:hover img { transform: scale(1.05); }

        /* INFO */
        .pdp-info { position: relative; }
        .pdp-sticky { position: sticky; top: 120px; }

        /* HEADER */
        .pdp-collection {
          font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
          opacity: 0.4; display: block; margin-bottom: 12px;
        }
        .pdp-header h1 {
          font-family: var(--font-serif); font-size: 3.5rem;
          font-weight: 500; line-height: 1; margin-bottom: 15px;
          letter-spacing: -0.02em;
        }
        .pdp-flavor {
          font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em;
          opacity: 0.6; font-weight: 600; margin-bottom: 20px;
        }
        .pdp-desc {
          font-size: 15px; line-height: 1.6; opacity: 0.75;
          margin-bottom: 35px;
        }

        /* SELECTORS */
        .pdp-selectors { margin-bottom: 30px; }
        .selector-block { margin-bottom: 25px; }
        .selector-block label {
          display: block; font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em;
          margin-bottom: 12px; opacity: 0.5;
        }
        .grind-options { display: flex; gap: 6px; flex-wrap: wrap; }
        .grind-btn {
          padding: 10px 18px; font-size: 13px; font-weight: 500;
          border: 1px solid rgba(0,0,0,0.12); transition: all 0.3s;
          font-family: var(--font-sans);
        }
        .grind-btn.active {
          background: var(--color-text); color: var(--color-bg);
          border-color: var(--color-text);
        }
        .grind-btn:hover:not(.active) { border-color: rgba(0,0,0,0.4); }

        .weight-options { display: flex; gap: 10px; }
        .weight-btn {
          flex: 1; padding: 14px 18px;
          border: 1px solid rgba(0,0,0,0.12);
          display: flex; justify-content: space-between; align-items: center;
          font-family: var(--font-sans); font-size: 14px; font-weight: 500;
          transition: all 0.3s;
        }
        .weight-btn.active {
          background: var(--color-text); color: var(--color-bg);
          border-color: var(--color-text);
        }
        .w-price { font-size: 12px; opacity: 0.6; }
        .weight-btn.active .w-price { opacity: 0.8; }

        .qty-control {
          display: inline-flex; align-items: center;
          border: 1px solid rgba(0,0,0,0.12);
        }
        .qty-btn {
          width: 45px; height: 45px; 
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .qty-btn:hover { background: rgba(0,0,0,0.05); }
        .qty-val {
          width: 50px; text-align: center; font-size: 14px; font-weight: 600;
          font-family: var(--font-sans);
        }

        /* ACTIONS */
        .add-to-cart-btn {
          width: 100%; background: var(--color-text); color: var(--color-bg);
          padding: 18px 25px; display: flex; justify-content: space-between;
          font-size: 13px; font-weight: 700; letter-spacing: 0.05em;
          text-transform: uppercase; font-family: var(--font-sans);
          transition: all 0.3s; margin-bottom: 15px;
        }
        .add-to-cart-btn:hover { opacity: 0.85; }
        .pdp-sub-actions {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 35px;
        }
        .wishlist-btn {
          display: flex; align-items: center; gap: 6px;
          font-size: 12px; opacity: 0.6; transition: all 0.3s;
        }
        .wishlist-btn:hover { opacity: 1; }
        .subscribe-link {
          display: flex; align-items: center;
          font-size: 12px; font-weight: 600; opacity: 0.7;
          text-decoration: underline; transition: all 0.3s;
        }
        .subscribe-link:hover { opacity: 1; }

        /* DETAILS ACCORDION */
        .detail-accordion { border-top: 1px solid rgba(0,0,0,0.1); }
        .detail-accordion:last-child { border-bottom: 1px solid rgba(0,0,0,0.1); }
        .detail-trigger {
          width: 100%; padding: 18px 0;
          display: flex; justify-content: space-between; align-items: center;
          font-family: var(--font-serif); font-size: 1.1rem; font-weight: 500;
          text-align: left;
        }
        .detail-chevron { transition: transform 0.3s; opacity: 0.4; }
        .detail-chevron.rotated { transform: rotate(180deg); }
        .detail-body {
          max-height: 0; overflow: hidden; transition: max-height 0.4s ease, padding 0.4s ease;
          padding: 0;
        }
        .detail-accordion.open .detail-body {
          max-height: 300px; padding-bottom: 20px;
        }
        .detail-body p { font-size: 14px; line-height: 1.6; opacity: 0.7; }
        .detail-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
        }
        .detail-grid > div { display: flex; flex-direction: column; gap: 2px; }
        .dt-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.4; font-weight: 600; }
        .dt-value { font-size: 14px; font-weight: 500; }

        @media (max-width: 900px) {
          .pdp-layout { grid-template-columns: 1fr; gap: 40px; }
          .pdp-sticky { position: static; }
          .pdp-header h1 { font-size: 2.5rem; }
        }
      `}</style>
    </main>
  );
};

export default ProductDetail;
