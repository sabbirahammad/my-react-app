import React, { useState, useEffect } from "react";

const CartSidebar = ({ cartItems, setCartItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showOnScroll, setShowOnScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowOnScroll(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <>
      {/* Floating Cart Button - right center */}
      {showOnScroll && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 group"
        >
          <span className="text-white text-2xl font-bold">🛍️</span>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center group-hover:scale-110 transition-transform">
              {totalItems}
            </span>
          )}
        </button>
      )}

      {/* Cart Drawer */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center md:justify-end transition-opacity duration-500 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className={`bg-gray-900 border border-gray-700 shadow-2xl rounded-xl p-4 overflow-y-auto transform transition-all duration-500 ease-in-out
          ${isOpen ? "scale-100" : "scale-90"}
          w-[90%] max-w-sm 
          md:w-96 md:mr-6 md:max-h-[85vh] md:rounded-xl
          scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-gray-800`}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-2xl">🛒</span> Cart
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-red-500 text-2xl"
              title="Close"
            >
              ×
            </button>
          </div>

          {/* Content */}
          {cartItems.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-400 text-sm">Your cart is empty.</p>
              <p className="text-gray-500 text-xs mt-1">Start shopping to add items!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-gray-800 p-3 rounded-md shadow hover:shadow-md"
                >
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-white">{item.name}</h4>
                    <p className="text-xs text-gray-400">
                      {item.qty} × {item.price}৳ = {(item.qty * item.price).toFixed(2)}৳
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decrementQty(item.id)}
                      className="w-6 h-6 bg-gray-700 rounded-full text-white text-xs hover:bg-gray-600"
                    >
                      -
                    </button>
                    <span className="text-xs text-white w-4 text-center">{item.qty}</span>
                    <button
                      onClick={() => incrementQty(item.id)}
                      className="w-6 h-6 bg-gray-700 rounded-full text-white text-xs hover:bg-gray-600"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-400 hover:text-red-500 text-base font-bold"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-4 pt-3 border-t border-gray-700">
                <p className="text-sm font-semibold text-white flex justify-between">
                  <span>Total:</span>
                  <span>{totalPrice.toFixed(2)}৳</span>
                </p>
                <button className="w-full mt-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-md hover:from-indigo-700 hover:to-purple-700 text-sm font-semibold shadow">
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;

