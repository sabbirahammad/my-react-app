import React from 'react';
import { useProduct } from '../../Context/UseContext';

const BrandCategoryTitle = () => {
  const { currentBrand, sortOption, setSortOption } = useProduct();

  return (
    <div className="bg-[#121318] text-white py-6 px-4 sm:px-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <p className="text-sm sm:text-base text-gray-400">Category</p>
        <h2 className="text-xl sm:text-2xl font-semibold mt-1">{currentBrand}</h2>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="sort" className="text-sm text-gray-400">
          Sort by:
        </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="bg-[#1c1c1c] text-white border border-gray-600 rounded px-3 py-1 text-sm focus:outline-none"
        >
          <option value="popularity">Most Popular</option>
          <option value="latest">Newest First</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default BrandCategoryTitle;

