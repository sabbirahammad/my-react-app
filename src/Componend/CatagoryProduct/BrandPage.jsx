import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../../Context/UseContext';

import BrandBanner from './BrandBanner';
import BrandCategoryTitle from './BrandCategoryTitle';
import ProductStrip from './ProductStrip';
import BrandFooter from './BrandFooter';
import CategorySidebar from './CategorySidebar';
import SponsorComponent from './SponsorComponent';
import Topbar from '../Home/Topbar';
import FloatingActionButtons from '../ProductDetails/FloatingActionButtons';
import DiscountBanner from './DiscountBanner';

const BrandPage = () => {
  const { slug } = useParams();
  const { setSelectedCategory } = useProduct();

  useEffect(() => {
    if (slug) {
      // slug থেকে ক্যাটাগরি তৈরি করো এবং lowercase করো
      const formatted = slug.replace(/-/g, ' ').toLowerCase();
      setSelectedCategory(formatted);
    }
  }, [slug, setSelectedCategory]);

  return (
    <div className="bg-[#121318] min-h-screen">
      <Topbar />
      <BrandBanner />
      <DiscountBanner />
      
      {/* Sidebar + Main Section */}
      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row px-4 py-2 items-start">
        {/* Left Sidebar */}
        <div className="w-full md:w-1/4">
          <CategorySidebar />
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4">
          <BrandCategoryTitle />
          <ProductStrip />
          <FloatingActionButtons />
          <SponsorComponent />
          <BrandFooter />
        </div>
      </div>
    </div>
  );
};

export default BrandPage;






