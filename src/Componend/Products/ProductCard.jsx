import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ id, name, price, oldPrice, image }) => {
  const navigate = useNavigate();
  const discount = oldPrice - price;

  const handleBuyNow = () => {
    navigate(`/product/${id}`, {
      state: {
        id,
        name,
        price,
        oldPrice,
        image,
      },
    });
  };

  return (
    <div className="bg-[#1a1a1a] rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300">
      {/* ✅ Product Image */}
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
          SALE
        </div>
      </div>

      {/* ✅ Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-white font-semibold text-base mb-1 truncate">{name}</h3>

        <div className="text-xs text-center text-gray-400 bg-gray-800 py-1 rounded mb-2">
          Save ৳{discount}
        </div>

        <div className="text-center mb-3">
          <span className="line-through text-gray-600 mr-2">৳{oldPrice}</span>
          <span className="text-yellow-400 font-bold text-lg">৳{price}</span>
        </div>

        {/* ✅ Buy Now Button */}
        <button
          onClick={handleBuyNow}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-sm py-2 rounded mt-auto transition-colors flex items-center justify-center gap-2"
        >
          🛒 Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;


