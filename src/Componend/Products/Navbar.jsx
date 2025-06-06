import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CartDrawer from './CartDrawer';
import AllCatagory from './AllCatagory';
import SidebarFilter from './SidebarFilter';
import { FiMenu } from 'react-icons/fi';

const Navbar = ({ setSidebarOpen }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'T-shirt', qty: 2, price: 499 },
    { id: 2, name: 'Sneakers', qty: 1, price: 1299 },
  ]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  // Pass the sidebar state up to parent for controlling other UI like search bar
  const toggleSidebar = (open) => {
    setIsSidebarOpen(open);
    setSidebarOpen(open);
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-40 px-6 py-4 flex justify-between items-center ${
          isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
        }`}
      >
        {/* ✅ Left: Logo & Menu (only on mobile) */}
        <div className="flex items-center space-x-4">
          <button
            className="md:hidden text-2xl"
            onClick={() => toggleSidebar(true)}
          >
            <FiMenu />
          </button>

          <Link
            to="/"
            className="text-2xl font-extrabold text-gray-700 tracking-tight hover:underline"
          >
            ELITEPASS
          </Link>
        </div>

        {/* ✅ Center: AllCategory (desktop only) */}
        <div className="hidden md:block">
          <AllCatagory />
        </div>

        {/* ✅ Right: Theme toggle & Cart */}
        <div className="flex items-center space-x-6">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label="Toggle dark mode"
            className="text-xl hover:text-yellow-400 transition-colors"
          >
            {isDarkMode ? '🌞' : '🌙'}
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Open cart"
            className="relative p-2 rounded-md hover:bg-yellow-500 hover:text-black transition-colors"
          >
            🛒
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 -mt-1 -mr-1 inline-flex items-center justify-center w-5 h-5 bg-red-600 text-white text-xs font-semibold rounded-full ring-2 ring-white">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* ✅ Cart Drawer */}
      <CartDrawer
        isDarkMode={isDarkMode}
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />

      {/* ✅ Mobile Sidebar (only on menu open and only mobile) */}
      {isSidebarOpen && (
        <div className="fixed top-10 left-0 w-64 h-full bg-[#1a1a1a] z-40 p-4 overflow-y-auto transition-transform duration-300 md:hidden">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => toggleSidebar(false)}
              className="text-white text-lg hover:text-yellow-500"
            >
              ✕ Close
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




