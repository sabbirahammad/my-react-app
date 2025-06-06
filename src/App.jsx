import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Product from './Pages/Product';
import ProductDetailPage from './Componend/ProductDetails/ProductDetailPage';
import ScrollToTop from './Pages/ScrollToTop';
import DashboardPage from './Componend/ManageAccount/DashboardPage'; // ✅ This imports the page with Sidebar
import BrandPage from './Componend/CatagoryProduct/BrandPage';
import AboutPageinfo from './Componend/about/AboutPage';

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/productdetails" element={<ProductDetailPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />

        {/* Dashboard routes (with sidebar) */}
        <Route path="/*" element={<DashboardPage />} />
        <Route path='/brandpage' element={<BrandPage/>}/>
        <Route path='/about' element={<AboutPageinfo/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
