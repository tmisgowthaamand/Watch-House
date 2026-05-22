import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'

// Inline critical CSS in HTML, load rest async
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => import('./index.css'), { timeout: 500 });
} else {
  setTimeout(() => import('./index.css'), 100);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>,
)
