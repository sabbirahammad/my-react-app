import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import DeliveryDropdown from '../NavberSection/eliveryDropdown';
import LanguageCurrencyDropdown from '../NavberSection/LanguageCurrencyDropdown';
import UserMenu from '../NavberSection/UserMenu';
import NavMenu from '../NavberSection/NavMenu';
import SearchBar from '../NavberSection/SearchBar';  // Import SearchBar
import CartDropdown from '../Cart/CartDropDown';
import { Link } from 'react-router-dom';
import UserDropdown from './UserDropdown';

const Topbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({ code: 'BD', name: 'Bangladesh' });
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const countries = [
    { code: 'BD', name: 'Bangladesh' },
    { code: 'US', name: 'United States' },
    { code: 'UK', name: 'United Kingdom' },
    { code: 'CN', name: 'China' },
    { code: 'IN', name: 'India' },
  ];
  const languages = ['English', 'Bengali'];
  const currencies = ['USD', 'BDT'];

  const flagStyles = (code) => {
    switch (code) {
      case 'BD': return 'w-4 h-3 bg-green-600 rounded-sm mr-1';
      case 'US': return 'w-4 h-3 bg-red-600 rounded-sm mr-1';
      case 'UK': return 'w-4 h-3 bg-blue-600 rounded-sm mr-1';
      case 'CN': return 'w-4 h-3 bg-red-600 rounded-sm mr-1';
      case 'IN': return 'w-4 h-3 bg-orange-600 rounded-sm mr-1';
      default: return 'w-4 h-3 bg-gray-400 rounded-sm mr-1';
    }
  };

  return (
    <div className={isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}>
      {/* Top bar */}
      <motion.div
        className={`text-sm px-6 py-3 flex justify-between items-center shadow-lg relative ${
          isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
        }`}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-6">
          <DeliveryDropdown
            isDarkMode={isDarkMode}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            countries={countries}
            flagStyles={flagStyles}
          />
          <LanguageCurrencyDropdown
            isDarkMode={isDarkMode}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
            languages={languages}
            currencies={currencies}
          />
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center hover:text-yellow-400 transition-colors"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
        </div>

        <div className="flex items-center space-x-6">
             <Link to={"/cart"}>
               <motion.a
            href="/register"
            className=" text-white px-4 py-2 rounded-full transition-colors shadow-md hover:text-amber-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }} 
          >
            MANAGE MY ACCOUNT
          </motion.a>
      </Link>
          <UserMenu
            isDarkMode={isDarkMode}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
            isSignedIn={isSignedIn}
            setIsSignedIn={setIsSignedIn}
          />
          {/* <motion.a
            href="/register"
            className=" text-white px-4 py-2 rounded-full hover:text-yellow-600 transition-colors shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            
          </motion.a> */}
          <UserDropdown/>
        </div>
      </motion.div>

      {/* Navbar section */}
      <nav
        className={`shadow-lg px-6 py-4 sticky top-0 z-40 transition-all duration-300 ${
          isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
        } ${isScrolled ? 'shadow-xl' : 'shadow-md'}`}
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* Left Logo */}
           <Link
                  to="/"
                  className="text-2xl font-extrabold text-gray-700 tracking-tight hover:underline"
                >
                  ELITEPASS
                </Link>


          {/* Center Nav Menu */}
       <div className="hidden md:flex flex-1 justify-center" style={{ transform: 'translateX(-100px)' }}>
  <NavMenu
    isDarkMode={isDarkMode}
    activeDropdown={activeDropdown}
    setActiveDropdown={setActiveDropdown}
  />
</div>


          {/* Right side: Search + Cart + Create Account */}
          <div className="flex items-center space-x-4">
            <SearchBar isDarkMode={isDarkMode} />
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('cart')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <CartDropdown isDarkMode={isDarkMode} isOpen={activeDropdown === 'cart'} />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Topbar;