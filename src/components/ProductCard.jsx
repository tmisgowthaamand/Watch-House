import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const ProductCard = ({ title, category, price, image }) => {
  const [showVariants, setShowVariants] = useState(false);

  const grinds = ['Whole Bean', 'Pour Over', 'French Press', 'Aeropress', 'Espresso'];

  return (
    <div className="product-card-container">
      {!showVariants ? (
        <div className="product-card">
          <Link to="/product" className="image-link">
            <div className="product-image-wrapper">
              <OptimizedImage src={image} alt={title} className="product-image" sizes="(max-width: 640px) 100vw, 320px" />
            </div>
          </Link>
          <div className="product-info">
            <span className="product-category">{category}</span>
            <Link to="/product">
              <h3 className="product-title serif-dot">{title}</h3>
            </Link>
            <div className="price-row">
              <p className="product-price">From £{price}</p>
              <button
                className="add-btn"
                onClick={() => setShowVariants(true)}
              >
                Add to cart +
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="variant-overlay active animate-fade-in">
          <div className="variant-header">
            <h3 className="serif-dot">Select Grind</h3>
            <button className="close-btn" onClick={() => setShowVariants(false)}>
              <X size={20} />
            </button>
          </div>
          <p className="variant-price">£{price}</p>
          <ul className="grind-list">
            {grinds.map(g => (
              <li key={g} className="grind-item">
                <span>{g}</span>
                <button className="select-dot" aria-label={`Select ${g}`}></button>
              </li>
            ))}
          </ul>
          <button className="confirm-btn">Confirm</button>
        </div>
      )}

      <style>{`
        .product-card-container {
          position: relative;
          height: 500px;
        }
        .product-card {
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .product-image-wrapper {
          aspect-ratio: 1;
          overflow: hidden;
          background-color: #fff;
        }
        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .product-card:hover .product-image {
          transform: scale(1.05);
        }
        .product-category {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          opacity: 0.6;
        }
        .product-title {
          font-size: 20px;
          margin: 5px 0;
          color: black;
          text-decoration: none;
        }
        .price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
        }
        .product-price {
          font-size: 14px;
          font-weight: 500;
        }
        .add-btn {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          border-bottom: 2px solid black;
          padding-bottom: 2px;
        }

        /* Variant Overlay */
        .variant-overlay {
          height: 100%;
          background: white;
          padding: 30px;
          display: flex;
          flex-direction: column;
        }
        .variant-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .variant-header h3 { font-size: 24px; }
        .variant-price {
          font-size: 14px;
          opacity: 0.6;
          margin-bottom: 30px;
        }
        .grind-list {
          flex: 1;
        }
        .grind-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 0;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          cursor: pointer;
          font-size: 14px;
          font-family: var(--font-sans);
        }
        .grind-item:hover {
          font-weight: 600;
        }
        .select-dot {
          width: 14px;
          height: 14px;
          border: 1px solid #ccc;
          border-radius: 50%;
        }
        .confirm-btn {
          background: black;
          color: white;
          width: 100%;
          padding: 15px;
          font-weight: 600;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
