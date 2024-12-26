import React from 'react';
import { HashRouter  as Router, Routes, Route, Navigate  } from 'react-router-dom';
import Products from './pages/products/Products';
import ProductDetails from './pages/product-details/ProductDetails';
import CreateProduct from './pages/create-product/CreateProduct';
import EditProduct from './pages/edit-product/EditProduct';
import './app.css'

const App: React.FC = () => {
  return (
    <Router  basename="/spa"> 
      <div className='background'>
        <div className="circle"></div>
        <Routes>
          <Route path="/" element={<Navigate to="/products" />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/products/:id/edit" element={<EditProduct />} />
          <Route path="/create" element={<CreateProduct />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;