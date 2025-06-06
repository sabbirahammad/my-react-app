import React from 'react';
import { useProduct } from '../../Context/UseContext';

const BrandBanner = () => {
  const { selectedCategory, categoryBanners, bannerImage } = useProduct();

  const bannerImagee = categoryBanners[selectedCategory] || bannerImage;

  return (
    <div className="w-full bg-[#121318] flex justify-center py-6">
      <img
        src={bannerImagee}
        alt={`${selectedCategory || 'Default'} Banner`}
        className="w-[1200px] h-[430px] object-cover mt-20 sm:mt-10"
      />
    </div>
  );
};

export default BrandBanner;



