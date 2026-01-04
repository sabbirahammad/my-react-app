import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ id, name, price, oldPrice, image, category }) => {
  const navigate = useNavigate();

  // যদি image একটি array হয় তাহলে প্রথম ছবি নাও, না হলে single image
  const displayImage = Array.isArray(image)
    ? image[0]
    : image || '/fallback.jpg'; // fallback যদি image না থাকে

  const discount = oldPrice && price ? oldPrice - price : 0;

  const handleBuyNow = () => {
    navigate(`/products/${id}`, {
      state: {
        highlightId: id,
        category: category,
      },
    });
  };

  const handleViewClick = (e) => {
    e.stopPropagation();
    navigate(`/product/${id}`);
  };

  return (
    <div className="bg-neutral-50 rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300" style={{ backgroundColor: '#F9F9F9' }}>
      {/* ✅ Product Image */}
      <div className="relative">
        <img
          src={displayImage}
          alt={name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
          SALE
        </div>
      </div>

      {/* ✅ Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-base mb-1 truncate" style={{ color: '#374151' }}>{name}</h3>

        <div className="text-xs text-center py-1 rounded mb-2" style={{ color: '#6B7280', backgroundColor: '#F3F4F6' }}>
          Save ৳{discount || 0}
        </div>

        <div className="text-center mb-3">
          {oldPrice && <span className="line-through mr-2" style={{ color: '#9CA3AF' }}>৳{oldPrice}</span>}
          <span className="font-bold text-lg" style={{ color: '#F59E0B' }}>৳{price}</span>
        </div>

        {/* ✅ View Details Button */}
        <button
          onClick={handleViewClick}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-sm py-2 rounded mt-auto transition-colors flex items-center justify-center gap-2"
        >
          🛒 Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;


