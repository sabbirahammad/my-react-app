import React, { useState, useEffect } from 'react';
import Topbar from './Topbar';
import SearchBar from './Searchbar';
import SidebarFilter from './SidebarFilter';
import SortingDropdown from './SortingDropdown';
import ProductGrid from './ProductGrid';
import Navbar from './Navbar';
import ChatButton from './ChatButton';
import CartSidebar from './CartSideBar';
import { useProduct } from '../../Context/UseContext';

const MainLayout = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hideSearchBar, setHideSearchBar] = useState(false);

  const { cartItems, setCartItems } = useProduct();

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      return existing
        ? prev.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + 1 } : item
          )
        : [...prev, { ...product, qty: 1 }];
    });
  };

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
    <div className="min-h-screen bg-black text-white font-sans">
      <Topbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        selectedCategories={selectedCategories}
        handleCategoryChange={handleCategoryChange}
      />

      <Navbar setSidebarOpen={setIsSidebarOpen} />
      <CartSidebar
        cartItems={cartItems}
        setCartItems={setCartItems}
        isDarkMode={isDarkMode}
      />

      <SearchBar
        onSearch={setSearchQuery}
        isSidebarOpen={isSidebarOpen}
        hideSearchBar={hideSearchBar}
      />

      <div className="flex">
        {/* ✅ Sidebar only for desktop */}
        <SidebarFilter
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
          className="hidden md:block sticky top-16"
        />

        <main className="flex-1 p-6">
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

