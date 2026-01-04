import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CartDrawer from './CartDrawer';
import AllCatagory from './AllCatagory';
import SidebarFilter from './SidebarFilter';
import { FiMenu, FiMoon, FiSun, FiShoppingCart } from 'react-icons/fi';

const Navbar = ({
  setSidebarOpen,
  selectedCategories = [],
  onCategoryChange
}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'T-shirt', qty: 2, price: 499 },
    { id: 2, name: 'Sneakers', qty: 1, price: 1299 },
  ]);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleCategoryChange = (subcategory, categoryTitle) => {
    if (onCategoryChange) {
      onCategoryChange(subcategory, categoryTitle);
    }
  };

  const toggleSidebar = (open) => {
    setIsSidebarOpen(open);
    setSidebarOpen(open);
  };

  return (
    <>
      <nav className="sticky top-0 z-40 px-6 py-4 flex justify-between items-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg shadow-gray-900/30">
        {/* Left: Logo & Menu (only on mobile) */}
        <div className="flex items-center space-x-4">
          <button
            className="md:hidden text-2xl text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-gray-800"
            onClick={() => toggleSidebar(true)}
            aria-label="Open sidebar"
          >
            <FiMenu />
          </button>

          <Link
            to="/"
            className="text-2xl font-extrabold tracking-tight hover:text-yellow-400 transition-all duration-300 hover:scale-105"
          >
            <span className="bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
              OUTZEN
            </span>
          </Link>
        </div>

        {/* Center: AllCategory (desktop only) */}
        <div className="hidden md:block">
          <AllCatagory />
        </div>

        {/* Right: Theme toggle & Cart */}
        <div className="flex items-center space-x-6">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label="Toggle dark mode"
            className="text-xl text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-gray-800"
          >
            {isDarkMode ? <FiMoon /> : <FiSun />}
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Open cart"
            className="relative p-2 rounded-full hover:bg-gray-800 hover:scale-110 transition-all duration-300 text-gray-300 hover:text-yellow-400"
          >
            <FiShoppingCart className="text-xl" />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 -mt-1 -mr-1 inline-flex items-center justify-center w-5 h-5 bg-red-600 text-white text-xs font-semibold rounded-full ring-2 ring-white">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      <CartDrawer
        isDarkMode={isDarkMode}
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />

      {isSidebarOpen && (
        <div className="fixed top-10 left-0 w-64 h-full z-40 p-4 overflow-y-auto transition-transform duration-300 md:hidden bg-gray-900 shadow-2xl shadow-gray-900/50">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => toggleSidebar(false)}
              className="text-lg text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-gray-800"
            >
              Close
            </button>
          </div>
          <SidebarFilter
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
            className="block md:hidden"
          />
        </div>
      )}
    </>
  );
};

export default Navbar;
