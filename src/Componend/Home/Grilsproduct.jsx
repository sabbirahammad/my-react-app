
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
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-9 gap-4 sm:gap-6">
          {/* Left Small Cards (2x2 Grid) */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 grid grid-cols-2 gap-4">
            {products.slice(1, 5).map((product, index) => (
              <SmallProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          {/* Center Featured Product */}
          {products[0] && (
            <motion.div
              className="col-span-1 sm:col-span-2 lg:col-span-3 relative rounded-xl overflow-hidden cursor-pointer shadow-lg shadow-yellow-500/30"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={products[0].image || 'https://via.placeholder.com/300x200?text=No+Image'}
                alt={products[0].name || 'Featured Product'}
                className="w-full h-[300px] sm:h-[400px] lg:h-[490px] object-cover"
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

          {/* Right Small Cards (2x2 Grid) */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 grid grid-cols-2 gap-4">
            {products.slice(5, 9).map((product, index) => (
              <SmallProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SmallProductCard = ({ product, index }) => {
  const price = product.price ?? 1000;
  const oldPrice = product.oldPrice ?? 1500;

  return (
    <motion.div
      className="relative rounded-lg overflow-hidden cursor-pointer shadow-md shadow-yellow-400/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(234, 179, 8, 0.4)' }}
    >
      <img
        src={product.image || 'https://via.placeholder.com/300x200?text=No+Image'}
        alt={product.name || 'Product'}
        className="w-full h-36 sm:h-48 object-cover rounded"
        aria-label={product.name || 'Product'}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
        <p className="text-xs sm:text-sm font-semibold text-white truncate">{product.name || 'Unnamed Product'}</p>
        <p className="text-yellow-400 text-xs sm:text-sm font-medium">৳{price}</p>
        <p className="text-gray-400 text-xs line-through">৳{oldPrice}</p>
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
  );
};

export default ProductShowcase;