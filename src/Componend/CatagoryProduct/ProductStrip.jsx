import React, { useState, useEffect } from 'react';
import { useProduct } from '../../Context/UseContext';
import { Link } from 'react-router-dom';

const PRODUCTS_PER_PAGE = 32;

const ProductStrip = () => {
  const { products, selectedCategory, sortOption } = useProduct();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedCategory]);

  // ক্যাটাগরি অনুযায়ী ফিল্টারিং
  const filteredProducts =
  !selectedCategory || selectedCategory.trim() === ''
    ? products
    : products.filter(
        (p) =>
          p.category &&
          p.category.toLowerCase() === selectedCategory.toLowerCase()
      );


  // সোর্ট অপশন অনুযায়ী সাজানো
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'latest':
        return b.id.localeCompare(a.id);
      case 'priceLowHigh':
        return Number(a.price) - Number(b.price);
      case 'priceHighLow':
        return Number(b.price) - Number(a.price);
      default:
        return 0; // ডিফল্ট অর্ডার
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
    <div className="w-full space-y-6 p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {paginatedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-[#181a21] border border-[#2b2d35] rounded-xl p-2 flex flex-col items-center hover:shadow-xl transition-transform duration-200 hover:scale-[1.02]"
          >
            <Link to={`/product/${product.id}`}>
              <img
                src={
                  product.images && product.images[0]
                    ? product.images[0]
                    : 'https://via.placeholder.com/300x300?text=No+Image'
                }
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-3"
                onError={(e) => {
                  e.target.src =
                    'https://via.placeholder.com/300x300?text=No+Image';
                }}
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
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
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
      )}
    </div>
  );
};

export default ProductStrip;











