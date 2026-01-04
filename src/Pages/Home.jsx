import React from 'react';
import Navbar from '../Componend/Homepage/Navbar';
import HeroSection from '../Componend/Homepage/herosection';
import Catagoryproduct from '../Componend/Homepage/Catagoryproduct';
import Products from '../Componend/Homepage/Products';
import Footer from '../Componend/Homepage/Footer';

const Home = () => {
  return (
    <div className="font-sans w-full overflow-x-hidden bg-[#f6f7fb] text-[#1d2141]">
      <Navbar />
      <HeroSection />
      <Catagoryproduct />
      <Products />
      <Footer />
    </div>
  );
};

export default Home;
