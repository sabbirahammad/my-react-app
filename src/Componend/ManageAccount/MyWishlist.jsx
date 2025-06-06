import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Dummy wishlist data
const initialWishlist = [
  {
    id: 1,
    productId: 101,
    productName: 'Premium Hoodie',
    productImage: 'https://i.imgur.com/Mg2uHSC.png',
    price: 499,
  },
  {
    id: 2,
    productId: 102,
    productName: 'Graphic T-shirt for Men',
    productImage: 'https://i.imgur.com/VDLomfu.png',
    price: 199,
  },
];

const MyWishlist = () => {
  const [wishlist, setWishlist] = useState(initialWishlist);

  const handleRemove = (productId) => {
    const updated = wishlist.filter((item) => item.id !== productId);
    setWishlist(updated);
  };

  return (
    <div className="p-4 sm:p-6 bg-[#121318] min-h-screen text-sm text-white max-w-4xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">💖 My Wishlist</h2>

      {wishlist.length === 0 ? (
        <div className="text-center text-gray-400 py-24">
          Your wishlist is empty. Start adding some products!
        </div>
      ) : (
        wishlist.map((item) => (
          <div
            key={item.id}
            className="bg-[#181a21] border border-[#2b2d35] rounded-lg mb-4 p-4 flex flex-col sm:flex-row sm:items-start gap-4 hover:shadow-lg transition"
          >
            <img
              src={item.productImage}
              alt={item.productName}
              className="w-24 h-24 rounded object-cover bg-white p-1"
            />
            <div className="flex-1 space-y-1">
              <Link
                to={`/product/${item.productId}`}
                className="text-cyan-400 hover:underline font-semibold text-sm sm:text-base"
              >
                {item.productName}
              </Link>
              <p className="text-gray-300 text-sm">৳ {item.price}</p>
            </div>

            <div className="flex justify-end sm:block">
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-500 hover:text-red-400 text-xs sm:text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyWishlist;

