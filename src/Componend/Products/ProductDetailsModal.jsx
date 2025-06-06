import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProductDetailsModal = ({ isOpen, onClose, product, addToCart }) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#181818] rounded-lg w-full max-w-lg sm:max-w-3xl max-h-[90vh] overflow-y-auto p-5 sm:p-6 text-white shadow-xl relative">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-4 text-2xl font-bold hover:text-yellow-500"
              >
                ×
              </button>

              {/* Modal Content */}
              <div className="flex flex-col md:flex-row gap-5">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full md:w-1/2 rounded object-contain max-h-64 md:max-h-96"
                />

                <div className="md:w-1/2 flex flex-col">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2">{product.name}</h2>
                  <p className="text-gray-400 mb-4 text-sm sm:text-base">{product.description}</p>

                  <div className="mb-4">
                    <span className="line-through text-gray-600 mr-3 text-base sm:text-lg">৳{product.oldPrice}</span>
                    <span className="text-yellow-500 font-bold text-xl sm:text-2xl">৳{product.price}</span>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(product);
                      onClose();
                    }}
                    className="mt-auto bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded text-sm sm:text-base transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductDetailsModal;


