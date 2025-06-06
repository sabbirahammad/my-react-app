// BrandPage.jsx
import React from 'react';
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
  return (
    <div className="bg-[#121318] min-h-screen">
      <Topbar/>
      <BrandBanner />
      <DiscountBanner/>
      {/* Centered Content with Sidebar and Main Content */}
      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row px-4 py-2 items-start">
        {/* Sidebar and Product Strip side by side */}
        <div className="w-full md:w-1/4">
          <CategorySidebar />
        </div>

        <div className="w-full md:w-3/4">
        <BrandCategoryTitle />
          <ProductStrip />
          <FloatingActionButtons/>
          <SponsorComponent/>
          <BrandFooter />
        </div>
      </div>
    </div>
  );
};

export default BrandPage;


