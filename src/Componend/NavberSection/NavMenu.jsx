import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NavMenu = ({ isDarkMode, activeDropdown, setActiveDropdown }) => {
  const menuItems = [
    {
      key: 'allcategories',
      label: 'All categories',
      dropdownContent: (
        <div className="flex space-x-8">
          {[
            { title: 'Mens', items: ['T-shirts', 'Shirts'] },
            { title: 'Womens', items: ['Dresses', 'Tops'] },
            { title: 'Kids', items: ['Clothing', 'Accessories'] },
            { title: 'Footwear', items: ['Sneakers', 'Sandals'] },
            { title: 'Accessories', items: ['Watches', 'Bags'] },
            { title: 'Sports', items: ['Gear', 'Equipment'] },
            { title: 'Electronics', items: ['Phones', 'Laptops'] },
          ].map((category) => (
            <div key={category.title}>
              <h4 className={`text-xs mb-2 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {category.title}
              </h4>
              {category.items.map((item) => (
                <a
                  key={item}
                  href="#"
                  className={`block px-3 py-1 text-sm rounded transition-colors ${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          ))}
        </div>
      ),
      dropdownWidth: 'auto',
    },
    {
      key: 'featured',
      label: 'Featured selections',
      dropdownContent: (
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: 'M13 10V3L4 14h7v7l9-11h-7z', text: 'Top ranking' },
            { icon: 'M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z', text: 'New arrivals' },
            { icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z', text: 'Top deals' },
          ].map((item) => (
            <div
              key={item.text}
              className={`flex flex-col items-center p-3 rounded-md transition-colors ${
                isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              <svg className="w-8 h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              <a href="#" className="text-sm font-medium text-center">
                {item.text}
              </a>
            </div>
          ))}
        </div>
      ),
      dropdownWidth: 'w-80',
    },
    {
      key: 'help',
      label: 'Help Center',
      dropdownContent: (
        <div className="flex gap-4">
          <div className="flex-1 grid grid-cols-2 gap-4">
            {[ // icons & text
              { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3', text: 'Sample Center' },
              { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', text: 'Online Trade Show' },
              { icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', text: 'Tips' },
              { icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14m0-4v4m0-4l-4.553 2.276A1 1 0 009 15.382V8.618a1 1 0 011.447-.894L15 10z', text: 'LIVE' },
            ].map((item) => (
              <div
                key={item.text}
                className={`flex flex-col items-center p-3 rounded-md transition-colors ${
                  isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                <svg className="w-8 h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                <a href="#" className="text-sm font-medium text-center">
                  {item.text}
                </a>
              </div>
            ))}
          </div>
          <div className="w-[150px] flex flex-col items-center justify-center p-3 rounded-md">
            <div className="w-full h-24 bg-gray-600 rounded-md mb-2"></div>
            <p className="text-sm font-medium text-center">Need Help?</p>
            <p className={`text-xs text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Contact us for support
            </p>
          </div>
        </div>
      ),
      dropdownWidth: 'w-[450px]',
    },
    {
      key: 'seller',
      label: 'Become a Seller',
      dropdownContent: (
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: 'M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4', text: 'Start Selling' },
            { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', text: 'Grow Your Business' },
            { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z', text: 'Join Trade' },
          ].map((item) => (
            <div
              key={item.text}
              className={`flex flex-col items-center p-3 rounded-md transition-colors ${
                isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              <svg className="w-8 h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              <a href="#" className="text-sm font-medium text-center">
                {item.text}
              </a>
            </div>
          ))}
        </div>
      ),
      dropdownWidth: 'w-80',
    },
  ];

  return (
    <ul
      className={`md:flex items-center space-x-8 text-sm font-semibold ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}
    >
      {menuItems.map(({ key, label, dropdownContent, dropdownWidth }) => (
        <li
          key={key}
          className="relative"
          onMouseEnter={() => setActiveDropdown(key)}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <a
            href="#"
            className="hover:text-yellow-400 transition-colors duration-300"
          >
            {label}
          </a>

          <AnimatePresence>
            {activeDropdown === key && (
              <motion.div
                className={`absolute left-0 mt-2 rounded-md shadow-xl z-50 p-4 ${dropdownWidth} ${
                  isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {dropdownContent}
              </motion.div>
            )}
          </AnimatePresence>
        </li>
      ))}
    </ul>
  );
};

export default NavMenu;

