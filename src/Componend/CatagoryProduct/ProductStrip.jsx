import React, { useState, useEffect } from 'react';
import { useProduct } from '../../Context/UseContext';
import { Link } from 'react-router-dom';

const PRODUCTS_PER_PAGE = 32;

const ProductStrip = () => {
  const { products, sortOption } = useProduct();
  const [currentPage, setCurrentPage] = useState(1);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Sorting logic
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case 'latest':
        return b.id - a.id;
      case 'priceLowHigh':
        return a.price - b.price;
      case 'priceHighLow':
        return b.price - a.price;
      default:
        return b.sold - a.sold;
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="w-full space-y-6">
      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {paginatedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-[#181a21] border border-[#2b2d35] rounded-xl p-2 flex flex-col items-center hover:shadow-xl transition-transform duration-200 hover:scale-[1.02]"
          >
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-50 h-48 object-cover mb-3 rounded-md"
              />
            </Link>
            <h3 className="text-sm font-semibold text-center text-gray-200 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-orange-400 font-bold mt-1">৳ {product.price}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md bg-[#1f1f1f] text-white hover:bg-[#333] disabled:opacity-30"
        >
          &lt;
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 rounded-md text-sm ${
              currentPage === i + 1
                ? 'bg-cyan-500 text-white'
                : 'bg-[#1f1f1f] text-gray-300 hover:bg-[#333]'
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md bg-[#1f1f1f] text-white hover:bg-[#333] disabled:opacity-30"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ProductStrip;





