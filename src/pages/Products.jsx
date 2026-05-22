import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import productsData from '../productsData.json';
import { useCart } from '../context/CartContext';
import OptimizedImage from '../components/OptimizedImage';

const Products = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedBrew, setSelectedBrew] = useState([]);
  const [selectedNotes] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    document.title = "Products – WatchHouse";
    window.scrollTo(0, 0);
  }, []);

  const toggleOption = (setState, stateValue, opt) => {
    if (stateValue.includes(opt)) setState(stateValue.filter(v => v !== opt));
    else setState([...stateValue, opt]);
  };

  const filteredProducts = productsData.filter(p => {
    if (selectedBrew.length > 0) {
      if (!p.badgeLeft) return false;
      if (!selectedBrew.some(b => p.badgeLeft.includes(b))) return false;
    }
    if (selectedNotes.length > 0) {
      if (!selectedNotes.some(n => p.tag1Val === n || p.tag2Val === n)) return false;
    }
    if (selectedCollection.length > 0) {
      if (!selectedCollection.some(c => p.name.includes(c) || p.tag1Val === c || p.tag2Val === c)) return false;
    }
    return true;
  });

  return (
    <div className="products-page page-transition reveal">
      <div className="pw-header">
        <h1 className="serif-dot reveal-scale">Products</h1>
      </div>

      <div className="pw-container">

        {/* Editoral Strip */}
        <div className="pw-filter-strip" onClick={() => setFilterOpen(!filterOpen)}>
          <div className="pw-filter-label">Brew.</div>
          <div className="pw-filter-label">Coffee Range.</div>
          <div className="pw-filter-label">Hardware.</div>
          <div className="pw-filter-label flex-between">
            <span>Merchandise.</span>
            <span className="plus-icon">{filterOpen ? '−' : '+'}</span>
          </div>
        </div>

        {/* Filter Panel */}
        {filterOpen && (
          <div className="pw-filter-panel reveal">
            <div className="filter-col">
              {['Espresso', 'Filter'].map(opt => (
                <div className="filter-option" key={opt} onClick={() => toggleOption(setSelectedBrew, selectedBrew, opt)}>
                  <span>{opt}</span>
                  <span className={`circle ${selectedBrew.includes(opt) ? 'active' : ''}`}></span>
                </div>
              ))}
            </div>
            <div className="filter-col">
              {['1829 Espresso', 'Rituals', 'Ventures', 'Horizons', 'Mixed Set'].map(opt => (
                <div className="filter-option" key={opt} onClick={() => toggleOption(setSelectedCollection, selectedCollection, opt)}>
                  <span>{opt}</span>
                  <span className={`circle ${selectedCollection.includes(opt) ? 'active' : ''}`}></span>
                </div>
              ))}
            </div>
            <div className="filter-col">
              {['Hardware Options'].map(opt => (
                <div className="filter-option" key={opt}>
                  <span>{opt}</span>
                  <span className="circle"></span>
                </div>
              ))}
            </div>
            <div className="filter-col">
              {['Merchandise Options'].map(opt => (
                <div className="filter-option" key={opt}>
                  <span>{opt}</span>
                  <span className="circle"></span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="pw-grid">
          {filteredProducts.map((p) => (
            <Link to="/product" state={{ product: p }} key={p.id} className="pw-card">
              {/* Top Badges */}
              <div className="pw-card-top">
                <span className="badge">{p.badgeLeft || '+ New Espresso'}</span>
                <span className="badge-right"></span>
              </div>

              {/* Image Area */}
              <div className="pw-card-img">
                {p.img && (
                  <OptimizedImage
                    src={p.img}
                    alt={p.name}
                    width="480"
                    height="480"
                    sizes="(max-width: 480px) 85vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 23vw"
                  />
                )}
              </div>

              {/* Bottom Info Area */}
              <div className="pw-card-bottom">
                <h4 className="pw-title">{p.name}.</h4>
                <div className="pw-meta">
                  <div className="meta-left">
                    <span className="meta-sub">{p.tag1Val}</span>
                    <span className="meta-val">{p.tag2Val}</span>
                  </div>
                  <div className="meta-right">
                    <span className="meta-price">{p.price}</span>
                    <button className="add-btn" onClick={(e) => {
                      e.preventDefault();
                      addToCart(p);
                      // In a real app we'd use a toast, for now alert
                      alert(`Added ${p.name}`);
                    }} aria-label={`Add ${p.name} to cart`}>
                      <Plus size={14} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .products-page {
          background-color: #9d9c9a; /* Perfect match to the screenshot grey */
          min-height: 100vh;
          padding-top: 50px;
          color: #1a1a1a;
          font-family: var(--font-sans);
        }

        .pw-header {
          padding: 30px 20px;
        }

        .pw-header h1 {
          font-family: var(--font-serif);
          font-size: 4rem;
          margin: 0;
          line-height: 1.1;
        }

        .pw-container {
          width: 100%;
          border-top: 1px solid rgba(0, 0, 0, 0.4); /* Solid black grid lines */
        }

        /* Filter Row */
        .pw-filter-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-bottom: 1px solid rgba(0, 0, 0, 0.4);
          cursor: pointer;
          background-color: #9d9c9a;
        }

        .pw-filter-label {
          padding: 8px 12px;
          border-right: 1px solid rgba(0, 0, 0, 0.4);
          font-size: 11px;
          font-weight: 600;
          display: flex;
          align-items: center;
        }
        
        .pw-filter-label:last-child {
          border-right: none;
        }

        .flex-between {
          justify-content: space-between;
        }
        
        .plus-icon {
          font-size: 14px;
        }

        .pw-filter-panel {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          background-color: #d6d1c8; /* Beige interior */
          border-bottom: 1px solid rgba(0, 0, 0, 0.4);
        }

        .filter-col {
          padding: 20px 12px;
          border-right: 1px solid rgba(0, 0, 0, 0.4);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .filter-col:last-child {
          border-right: none;
        }

        .filter-option {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11px;
          font-weight: 500;
          cursor: pointer;
        }

        .filter-option .circle {
          width: 8px;
          height: 8px;
          border: 1px solid #1a1a1a;
          border-radius: 50%;
        }
        .filter-option .circle.active {
          background-color: #1a1a1a;
        }

        /* Grid */
        .pw-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }

        .pw-card {
          display: flex;
          flex-direction: column;
          border-right: 1px solid rgba(0, 0, 0, 0.4);
          border-bottom: 1px solid rgba(0, 0, 0, 0.4);
          background-color: #d6d1c8; /* Beige card background */
          text-decoration: none;
          color: #1a1a1a;
          position: relative;
          aspect-ratio: 5 / 6;
          transition: background-color 0.3s;
        }

        .pw-card:nth-child(4n) {
          border-right: none;
        }

        .pw-card:hover {
          background-color: #d1ccc3;
        }

        .pw-card-top {
          display: flex;
          justify-content: space-between;
          padding: 12px;
          font-size: 10px;
          font-weight: 600;
        }

        .pw-card-img {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10%;
          overflow: hidden;
        }

        .pw-card-img img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: transform 0.4s ease;
          will-change: transform;
        }

        .pw-card:hover .pw-card-img img {
          transform: scale(1.05);
        }

        .pw-card-bottom {
          padding: 12px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .pw-title {
          font-family: var(--font-serif);
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 25px;
        }

        .pw-meta {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .meta-left {
          display: flex;
          flex-direction: column;
          gap: 2px;
          font-size: 10px;
          opacity: 0.8;
          max-width: 70%;
        }

        .meta-sub {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .meta-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 15px;
        }

        .meta-price {
          font-size: 11px;
          font-weight: 600;
        }

        .add-btn {
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #1a1a1a;
          background: transparent;
          cursor: pointer;
          transition: 0.2s all;
          color: #1a1a1a;
        }

        .add-btn:hover {
          background: #1a1a1a;
          color: #d6d1c8;
        }

        @media (max-width: 1024px) {
          .pw-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .pw-card:nth-child(4n) {
            border-right: 1px solid rgba(0, 0, 0, 0.4);
          }
          .pw-card:nth-child(3n) {
            border-right: none;
          }
        }

        @media (max-width: 768px) {
          .pw-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .pw-card:nth-child(3n) {
            border-right: 1px solid rgba(0, 0, 0, 0.4);
          }
          .pw-card:nth-child(2n) {
            border-right: none;
          }
          .pw-filter-strip {
            grid-template-columns: repeat(2, 1fr);
          }
          .pw-filter-label {
            border-bottom: 1px solid rgba(0, 0, 0, 0.4);
          }
          .pw-filter-label:nth-child(2n) {
            border-right: none;
          }
          .pw-filter-panel {
            grid-template-columns: repeat(2, 1fr);
          }
          .filter-col:nth-child(2n) {
            border-right: none;
          }
        }
        
        @media (max-width: 480px) {
          .pw-grid {
            grid-template-columns: 1fr;
          }
          .pw-card {
            border-right: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Products;
