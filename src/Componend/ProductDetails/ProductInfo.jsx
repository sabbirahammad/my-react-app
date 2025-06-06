import React, { useState } from 'react';
import SizeChartModal from './SizeChartModal';
import FeatureProductDescription from './FeatureProductDescription';
import SuccessMessageModal from './SuccessMessageModal';
import { FaStar, FaLock, FaGift, FaShippingFast } from 'react-icons/fa';
import { useProduct } from '../../Context/UseContext';

const ProductInfo = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState('M');
  const [qty, setQty] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { addToCart } = useProduct();

  const toggleWishlist = () => setIsWishlisted(!isWishlisted);

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: product.name, url });
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied!');
    }
  };

  const handleAddToCart = () => {
    const item = { ...product, selectedSize, qty };
    addToCart(item);
    setShowSuccessModal(true);
  };

  return (
    <div className="bg-[#161616] text-gray-200 p-5 rounded-lg shadow-xl space-y-5 border border-gray-700">
      {/* Title + Rating */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-semibold text-white">{product.name}</h1>
          <div className="flex items-center gap-1 text-yellow-400 text-sm mt-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
            <span className="text-xs text-gray-400 ml-2">(128 reviews)</span>
          </div>
        </div>
        <div className="bg-red-600 text-xs px-2 py-1 rounded-full text-white font-medium">
          🔥 Best Seller
        </div>
      </div>

      {/* Price + Stock */}
      <div className="flex items-center gap-3">
        <span className="text-yellow-400 text-base font-bold">৳{product.price}</span>
        <span className="line-through text-sm text-gray-500">৳{product.oldPrice}</span>
        <span className="ml-auto text-green-400 text-xs bg-green-800 px-2 py-1 rounded-full">In Stock</span>
      </div>

      {/* Delivery Tag */}
      <div className="flex items-center text-sm text-blue-300 gap-2">
        <FaShippingFast className="text-blue-400" /> Delivery in 2-4 days
      </div>

      {/* Description */}
      <p className="text-[12px] text-gray-400">{product.description}</p>

      {/* Size Selection */}
      <div>
        <div className="mb-1 text-xs font-medium">Size:</div>
        <div className="flex gap-2">
          {['S', 'M', 'L', 'XL'].map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-2 py-1 rounded text-xs border relative group ${
                selectedSize === size
                  ? 'bg-yellow-400 text-black font-bold'
                  : 'border-gray-600 text-gray-300'
              }`}
            >
              {size}
              <div className="absolute hidden group-hover:block left-0 top-full mt-1 text-[10px] text-white bg-black p-1 rounded z-10">
                Chest: {size === 'S' ? '36"' : size === 'M' ? '38"' : size === 'L' ? '40"' : '42"'}
              </div>
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowSizeChart(true)}
          className="text-[10px] mt-1 text-blue-400 underline"
        >
          View Size Chart
        </button>
      </div>

      {/* Quantity */}
      <div>
        <div className="mb-1 text-xs font-medium">Quantity:</div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="w-6 h-6 bg-gray-800 text-white rounded"
          >
            -
          </button>
          <span className="text-sm font-semibold">{qty}</span>
          <button
            onClick={() => setQty(qty + 1)}
            className="w-6 h-6 bg-gray-800 text-white rounded"
          >
            +
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
        <button
          onClick={handleAddToCart}
          className="bg-yellow-400 hover:bg-yellow-500 text-black text-xs py-2 rounded font-semibold"
        >
          Add to Cart
        </button>

        <button
          onClick={toggleWishlist}
          className={`text-xs py-2 rounded font-medium border ${
            isWishlisted ? 'border-red-500 text-red-400' : 'border-gray-600 text-white'
          }`}
        >
          {isWishlisted ? '❤️ Wishlisted' : '🤍 Wishlist'}
        </button>

        <button
          onClick={handleShare}
          className="text-xs py-2 rounded font-medium border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
        >
          🔗 Share
        </button>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-3 text-[10px] text-gray-400 pt-2">
        <FaLock className="text-sm text-green-400" />
        <span>100% secure payment</span>
        <FaGift className="ml-4 text-sm text-pink-400" />
        <span>Gift wrap available</span>
      </div>

      {/* Modals */}
      <SizeChartModal isOpen={showSizeChart} onClose={() => setShowSizeChart(false)} />
      <SuccessMessageModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
      <FeatureProductDescription product={product} />
    </div>
  );
};

export default ProductInfo;



