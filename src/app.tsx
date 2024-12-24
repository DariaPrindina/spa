import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Products from './pages/Products';
import ProductDetails from './pages/productDetails/ProductDetails';
import CreateProduct from './pages/CreateProduct';
import EditProduct from './pages/editProduct/EditProduct';
import './app.css'

const App: React.FC = () => {
  return (
    <div className='background'>
      <div className="circle"></div>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products/:id/edit" element={<EditProduct />} />
        <Route path="/create" element={<CreateProduct />} />
      </Routes>
    </div>
  );
};

export default App;