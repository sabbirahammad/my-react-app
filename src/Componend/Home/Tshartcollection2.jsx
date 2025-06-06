
import React from 'react';
import { motion } from 'framer-motion';
import { useProduct } from '../../Context/UseContext';

const ProductShowcase = () => {
  const { products } = useProduct();

  if (!products || products.length === 0) {
    return (
      <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-lg font-semibold">No products available</p>
          <p className="text-sm text-gray-400">Check back later for new items!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen flex justify-center items-start py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl w-full bg-gradient-to-b from-gray-900 to-black rounded-xl p-8">
        <div className="grid grid-cols-12 gap-6 sm:gap-8">
          {/* Left Big Product */}
          {products[0] && (
            <motion.div
              className="col-span-12 sm:col-span-6 relative rounded-xl overflow-hidden cursor-pointer shadow-lg shadow-yellow-500/30"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={products[0].image || 'https://via.placeholder.com/300x200?text=No+Image'}
                alt={products[0].name || 'Featured Product'}
                className="w-full h-[300px] sm:h-[400px] lg:h-[490px] object-cover rounded-xl"
                aria-label={products[0].name || 'Featured Product'}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-lg sm:text-xl font-semibold text-white truncate">{products[0].name || 'Unnamed Product'}</h3>
                <p className="text-yellow-400 text-sm sm:text-base font-medium">৳{products[0].price || 1000}</p>
                <p className="text-gray-400 text-xs sm:text-sm line-through">৳{products[0].oldPrice || 1500}</p>
                <motion.button
                  className="mt-2 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium hover:bg-yellow-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`View details for ${products[0].name || 'Featured Product'}`}
                >
                  View Details
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Right Small Products Grid */}
          <div className="col-span-12 sm:col-span-6 grid grid-cols-3 gap-4 sm:gap-6">
            {products.slice(1, 9).map((product, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-lg overflow-hidden cursor-pointer shadow-md shadow-yellow-400/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(234, 179, 8, 0.4)' }}
              >
                <img
                  src={product.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                  alt={product.name || 'Product'}
                  className="w-full h-36 sm:h-48 object-cover rounded-lg"
                  aria-label={product.name || 'Product'}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                  <p className="text-xs sm:text-sm font-semibold text-white truncate">{product.name || 'Unnamed Product'}</p>
                  <p className="text-yellow-400 text-xs sm:text-sm font-medium">৳{product.price || 1000}</p>
                  <p className="text-gray-400 text-xs line-through">৳{product.oldPrice || 1500}</p>
                  <motion.button
                    className="mt-1 bg-yellow-500 text-black px-2 py-0.5 rounded-full text-xs font-medium hover:bg-yellow-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`View details for ${product.name || 'Product'}`}
                  >
                    View
                  </motion.button>
                </div>
              </motion.div>
            ))}

            {/* Last Product with More Options */}
            {products[9] && (
              <motion.div
                className="relative rounded-lg overflow-hidden cursor-pointer shadow-md shadow-yellow-400/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(234, 179, 8, 0.4)' }}
              >
                <img
                  src={products[9].image || 'https://via.placeholder.com/300x200?text=No+Image'}
                  alt={products[9].name || 'Product'}
                  className="w-full h-36 sm:h-48 object-cover rounded-lg"
                  aria-label={products[9].name || 'Product'}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                  <p className="text-xs sm:text-sm font-semibold text-white truncate max-w-[70%]">{products[9].name || 'Unnamed Product'}</p>
                  <p className="text-yellow-400 text-xs sm:text-sm font-medium">৳{products[9].price || 1000}</p>
                  <p className="text-gray-400 text-xs line-through">৳{products[9].oldPrice || 1500}</p>
                  <motion.button
                    className="mt-1 bg-yellow-500 text-black px-2 py-0.5 rounded-full text-xs font-medium hover:bg-yellow-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`View details for ${products[9].name || 'Product'}`}
                  >
                    View
                  </motion.button>
                </div>
                <motion.button
                  aria-label="More options"
                  className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 hover:bg-yellow-400 hover:text-black transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6 10a2 2 0 114 0 2 2 0 01-4 0zm4 0a2 2 0 114 0 2 2 0 01-4 0zM2 10a2 2 0 114 0 2 2 0 01-4 0z" />
                  </svg>
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;


