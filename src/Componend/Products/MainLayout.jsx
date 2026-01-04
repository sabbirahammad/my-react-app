import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Topbar from './Topbar';
import SearchBar from './Searchbar';
import SidebarFilter from './SidebarFilter';
import SortingDropdown from './SortingDropdown';
import ProductGrid from './ProductGrid';
import Navbar from './Navbar';
import ChatButton from './ChatButton';
import CartSidebar from './CartSideBar';
import { useProduct } from '../../Context/UseContext';

const MainLayout = ({
  selectedCategories = [],
  searchQuery = '',
  onCategoryChange,
  onSearchChange,
  clearAllFilters
}) => {
  const [sortBy, setSortBy] = useState('default');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hideSearchBar, setHideSearchBar] = useState(false);

  const { cartItems, setCartItems } = useProduct();

  // ✅ Read category from route state
  const location = useLocation();
  const routeCategory = location.state?.category;

  // ✅ Set selected category if passed via routing - optimized to prevent unnecessary calls
  useEffect(() => {
    if (routeCategory && onCategoryChange) {
      // Only call onCategoryChange if the category has actually changed
      onCategoryChange(routeCategory);
    }
  }, [routeCategory]); // Removed onCategoryChange from dependencies to prevent loops

  const handleAddToCart = useCallback((product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      return existing
        ? prev.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + 1 } : item
          )
        : [...prev, { ...product, qty: 1 }];
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isSidebarOpen && window.innerWidth < 768) {
        setHideSearchBar(window.scrollY > 50);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen font-sans bg-[#f6f7fb]" style={{ color: '#1d2141' }}>
      <Topbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        selectedCategories={selectedCategories}
        handleCategoryChange={onCategoryChange}
      />

      <Navbar
        setSidebarOpen={setIsSidebarOpen}
        selectedCategories={selectedCategories}
        onCategoryChange={onCategoryChange}
      />
      <CartSidebar
        cartItems={cartItems}
        setCartItems={setCartItems}
        isDarkMode={isDarkMode}
      />

      <SearchBar
        onSearch={onSearchChange}
        isSidebarOpen={isSidebarOpen}
        hideSearchBar={hideSearchBar}
      />

      <div className="flex">
        {/* ✅ Sidebar only for desktop */}
        <SidebarFilter
          selectedCategories={selectedCategories}
          onCategoryChange={onCategoryChange}
          className="hidden md:block sticky top-16"
        />

        <main className="flex-1 p-6">
           {/* Filter Status and Clear Filters */}
           {(selectedCategories.length > 0 || searchQuery) && clearAllFilters && (
             <div className="mb-4 p-3 rounded-lg flex items-center justify-between border border-[#e5e7fb] bg-white shadow-sm">
               <div className="flex items-center gap-2">
                 <span className="text-sm text-[#4b5563]">
                   Active filters:
                   {selectedCategories.length > 0 && (
                     <span className="ml-1 text-indigo-600">
                       {selectedCategories.length} categories
                     </span>
                   )}
                   {searchQuery && (
                     <span className="ml-1 text-indigo-500">
                       "{searchQuery}"
                     </span>
                   )}
                 </span>
               </div>
               <button
                 onClick={clearAllFilters}
                 className="px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow hover:opacity-90 transition"
               >
                 Clear All
               </button>
             </div>
           )}

           <SortingDropdown sortBy={sortBy} onChange={setSortBy} />
           <ProductGrid
             searchQuery={searchQuery}
             selectedCategories={selectedCategories}
             sortBy={sortBy}
             addToCart={handleAddToCart}
           />
         </main>
      </div>

      <ChatButton />
    </div>
  );
};

export default MainLayout;











