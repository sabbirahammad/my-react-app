import React from 'react';
import { motion } from 'framer-motion';
import { useProduct } from '../../Context/UseContext';

const ProductShowcase = () => {
  const { products } = useProduct();

  // Empty state for no products
  if (!products || products.length === 0) {
    return (
      <section className="py-16 px-4 bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">No Trending Items</h2>
          <p className="text-gray-400">Check back later for new products!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-950 via-black to-gray-900 relative overflow-hidden">
      {/* Radial Gradient Overlay for Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_2px_4px_rgba(0,255,255,0.3)]"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Our Trending Items
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8">
          {products.slice(0, 8).map((product, index) => (
            <motion.div
              key={product.id || index}
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15, ease: 'easeOut' }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: 1, boxShadow: '0 0 15px rgba(0, 255, 255, 0.5), 0 0 15px rgba(147, 51, 234, 0.5)' }}
              className="relative rounded-xl overflow-hidden group bg-gray-800/50 backdrop-blur-sm shadow-lg border border-gray-700/50"
            >
              {/* Product Image */}
              <img
                src={product.image || 'https://via.placeholder.com/300x300?text=No+Image'}
                alt={product.name || 'Product'}
                className="h-52 w-full object-cover transform transition duration-500 group-hover:scale-110"
                aria-label={product.name || 'Product'}
              />

              {/* Trending Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.15 + 0.3 }}
                className="absolute top-4 left-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md"
              >
                Trending
              </motion.div>

              {/* Overlay with Product Details */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-center items-center p-4 backdrop-blur-md">
                <h3
                  className="text-lg sm:text-xl font-bold text-white mb-2 drop-shadow-lg text-center max-w-[90%] truncate"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {product.name || 'Unnamed Product'}
                </h3>
                <p className="text-cyan-400 font-semibold text-sm mb-4 drop-shadow-lg">
                  ৳{product.price || 499}
                </p>
                <motion.button
                  whileHover={{ scale: 1.1, boxShadow: '0 0 10px rgba(0, 255, 255, 0.7)' }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 1.5 } }}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-5 py-2 rounded-full shadow-md font-medium"
                  aria-label={`Shop now for ${product.name || 'Product'}`}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Shop Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;


