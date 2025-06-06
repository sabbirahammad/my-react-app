import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProduct } from '../../Context/UseContext';

const CartDrawer = ({ isOpen, setIsOpen, isDarkMode }) => {
  const { cartItems, setCartItems } = useProduct();
  // Mock user login status (replace with actual auth logic)
  const isLoggedIn = false; // Change to true for testing logged-in state

  useEffect(() => {
    const handleScroll = () => setIsOpen(false);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setIsOpen]);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const incrementQty = (id) => {
    setCartItems(items =>
      items.map(item => (item.id === id ? { ...item, qty: item.qty + 1 } : item))
    );
  };

  const decrementQty = (id) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty - 1) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed top-16 right-4 w-[280px] max-h-[75vh] z-50 shadow-xl rounded-lg p-4 overflow-y-auto transition-all ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'
          }`}
          initial={{ x: 50, opacity: 0, scale: 0.95 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: 50, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-base font-semibold flex items-center gap-2">
              🛒 Your Cart
              <span className="bg-indigo-500 text-white text-xs rounded-full px-2 py-1">
                {totalItems}
              </span>
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-lg font-bold hover:text-yellow-400 transition-colors"
            >
              ×
            </button>
          </div>

          {cartItems.length === 0 ? (
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Your cart is empty.
            </p>
          ) : (
            <div className="space-y-3">
              {cartItems.map(({ id, name, qty, price }) => (
                <div
                  key={id}
                  className="flex justify-between bg-gray-900 dark:bg-gray-700 p-2 rounded"
                >
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{name}</h4>
                    <p className="text-xs text-gray-400 dark:text-gray-300">
                      {qty} × {price}৳
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => decrementQty(id)}
                      className="w-5 h-5 flex items-center justify-center bg-gray-600 dark:bg-gray-500 rounded-full text-xs hover:bg-gray-500 dark:hover:bg-gray-400 transition-colors"
                    >
                      −
                    </button>
                    <span className="text-xs">{qty}</span>
                    <button
                      onClick={() => incrementQty(id)}
                      className="w-5 h-5 flex items-center justify-center bg-gray-600 dark:bg-gray-500 rounded-full text-xs hover:bg-gray-500 dark:hover:bg-gray-400 transition-colors"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(id)}
                      className="text-red-500 hover:text-red-600 text-xs font-bold transition-colors"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
              <p className="mt-3 text-sm font-semibold text-right">
                Total: {totalPrice}৳
              </p>
              <div className="flex gap-2">
                <button
                  className="w-full mt-2 bg-yellow-500 hover:bg-yellow-600 text-black text-sm py-1 rounded transition-colors"
                >
                  Checkout
                </button>
                <button
                  onClick={clearCart}
                  className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white text-sm py-1 rounded transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}

          {/* Two-Layer Button Section */}
          <div className="mt-3 pt-3 border-t border-gray-300 dark:border-gray-600">
            <div className="space-y-2">
              {/* First Layer: Login or Category Buttons */}
              {isLoggedIn ? (
                <div className="grid grid-cols-3 gap-1">
                  <button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs py-1 rounded transition-colors"
                  >
                    Electronics
                  </button>
                  <button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs py-1 rounded transition-colors"
                  >
                    Fashion
                  </button>
                  <button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs py-1 rounded transition-colors"
                  >
                    Home
                  </button>
                </div>
              ) : (
                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 rounded transition-colors"
                  onClick={() => alert('Please log in to proceed')}
                >
                  Login to Shop
                </button>
              )}
              {/* Second Layer: More Shop Button */}
              <button
                className="w-full bg-green-600 hover:bg-green-700 text-white text-sm py-1 rounded transition-colors"
              >
                More Shop
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;