import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';
import { CartProvider } from './components/CartContext';

function App() {
  return (
    <div>
    <CartProvider>
      <Router>      
          <Routes>
            <Route path="/" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>      
      </Router>
    </CartProvider>
    </div>
  );
}

export default App;
