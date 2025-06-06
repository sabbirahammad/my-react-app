import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiPlus, HiMinus, HiTrash } from 'react-icons/hi';
import { FaShoppingCart } from 'react-icons/fa';
import { useProduct } from '../../Context/UseContext';

const CartDropdown = ({ isDarkMode, isOpen, setIsOpen }) => {
  const { cartItems, setCartItems } = useProduct();

  const incrementQty = (id) => {
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item))
    );
  };

  const decrementQty = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        aria-label="Shopping cart"
        className={`p-2 rounded-full hover:bg-yellow-400 hover:text-black transition-colors relative focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        <FaShoppingCart className="w-5 h-5" />
        {cartItems.length > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-semibold rounded-full ring-2 ring-white">
            {cartItems.length}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`absolute top-full mt-3 w-80 rounded-xl shadow-2xl z-50 overflow-hidden ${
              isDarkMode
                ? 'bg-gradient-to-b from-gray-800 to-gray-900 text-white'
                : 'bg-gradient-to-b from-white to-gray-100 text-gray-900'
            }`}
            style={{ right: '-100px' }}
          >
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-xl tracking-tight">Your Cart</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close cart dropdown"
                  className="p-1 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                >
                  <HiX className="w-5 h-5" />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <p className="text-sm text-center text-gray-400">Your cart is empty.</p>
              ) : (
                <>
                  <ul className="divide-y divide-gray-600/50 max-h-60 overflow-y-auto mb-5">
                    {cartItems.map(({ id, name, qty, price }) => (
                      <li
                        key={id}
                        className="flex justify-between items-center py-3 transition-all duration-200 hover:bg-gray-700/20 rounded-lg px-2"
                      >
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm">{name}</span>
                          <span className="text-xs text-gray-400">৳{price} each</span>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1 bg-gray-800/50 rounded-full px-2 py-1">
                            <button
                              onClick={() => decrementQty(id)}
                              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-600 transition-colors"
                              aria-label={`Decrease quantity of ${name}`}
                            >
                              <HiMinus className="w-4 h-4" />
                            </button>
                            <span className="w-6 text-center text-sm">{qty}</span>
                            <button
                              onClick={() => incrementQty(id)}
                              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-600 transition-colors"
                              aria-label={`Increase quantity of ${name}`}
                            >
                              <HiPlus className="w-4 h-4" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(id)}
                            className="text-red-400 hover:text-red-600 transition-colors"
                            aria-label={`Remove ${name} from cart`}
                          >
                            <HiTrash className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="font-semibold text-sm">৳{price * qty}</div>
                      </li>
                    ))}
                  </ul>

                  <div className="flex justify-between font-bold text-lg mb-5 border-t border-gray-600/50 pt-4">
                    <span>Total:</span>
                    <span>৳{totalPrice}</span>
                  </div>

                  <button
                    className="w-full bg-yellow-400 text-black py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors shadow-md"
                    onClick={() => alert('Proceed to Checkout')}
                  >
                    Proceed to Checkout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartDropdown;

