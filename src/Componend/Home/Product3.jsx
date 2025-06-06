import React from 'react';
import { motion } from 'framer-motion';
import { useProduct } from '../../Context/UseContext';

const ModernShowcase = () => {
  const { products } = useProduct();
  const displayProducts = products ? products.slice(0, 3) : [];

  if (!products || products.length === 0) {
    return (
      <div className="bg-black min-h-screen py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-lg font-semibold">No products available</p>
          <p className="text-sm text-gray-400 mt-2">Check back later for new items!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen flex justify-center items-center py-20 px-4 sm:px-6 lg:px-8 -mt-[330px]">
      <div className="max-w-screen-xl w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
          {displayProducts.map((product, index) => (
            <motion.div
              key={product.id || index}
              className="relative rounded-xl overflow-hidden shadow-lg shadow-yellow-500/40 cursor-default"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <img
                src={product.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                alt={product.name || 'Product'}
                className="w-full h-80 object-cover"
                aria-label={product.name || 'Product'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end items-center p-4">
                <h2
                  className="text-white text-center max-w-[90%] truncate"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 500,
                    fontSize: '1.5rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  {product.name || 'Unnamed Product'}
                </h2>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModernShowcase;