import React from 'react';

const SortingDropdown = ({ sortBy, onChange }) => {
  return (
    <div className="mb-4 px-4">
      <label htmlFor="sort" className="text-white mr-2 font-semibold">
        Sort by:
      </label>
      <select
        id="sort"
        value={sortBy}
        onChange={(e) => onChange(e.target.value)}
        className="rounded bg-gray-800 text-white px-3 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      >
        <option value="default">Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="newest">Newest</option>
      </select>
    </div>
  );
};

export default SortingDropdown;
