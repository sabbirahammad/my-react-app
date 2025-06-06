import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const UserMenu = ({
  isDarkMode,
  activeDropdown,
  setActiveDropdown,
  isSignedIn,
  setIsSignedIn,
}) => {
  return (
    <div
      className="relative"
      onMouseEnter={() => setActiveDropdown('signin')}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <button className="flex items-center hover:text-yellow-400 transition-colors">
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        {isSignedIn ? 'User' : 'SIGN IN'}
      </button>

      <AnimatePresence>
        {activeDropdown === 'signin' && (
          <motion.div
            className={`absolute right-0 mt-2 w-56 rounded-md shadow-xl z-50 p-4 ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {isSignedIn ? (
              <>
                <a
                  href="/orders"
                  className={`block px-2 py-1 text-sm rounded transition-colors ${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                  }`}
                >
                  My Orders
                </a>
                <a
                  href="/settings"
                  className={`block px-2 py-1 text-sm rounded transition-colors ${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                  }`}
                >
                  Settings
                </a>
                <button
                  onClick={() => {
                    setIsSignedIn(false);
                    setActiveDropdown(null);
                  }}
                  className={`w-full text-left px-2 py-1 text-sm rounded transition-colors ${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                  }`}
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <p
                  className={`text-xs mb-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Welcome to Elitepassbd.com!
                </p>
                <button
                  className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition-colors mb-2"
                  onClick={() => {
                    setIsSignedIn(true);
                    setActiveDropdown(null);
                  }}
                >
                  Sign In
                </button>
                <p
                  className={`text-xs mb-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Or, continue with:
                </p>
                <div className="flex justify-around mb-2">
                  {/* Social Icons */}
                  <button className="hover:text-blue-400 transition-colors" aria-label="Sign in with Google">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.02.68-2.33 1.08-3.71 1.08-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  </button>
                  <button className="hover:text-red-400 transition-colors" aria-label="Sign in with Google">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.549 3.921 1.453l2.814-2.814C17.503 2.988 15.139 2 12.545 2 7.021 2 2.543 6.477 2.543 12s4.478 10 9.999 10c4.889 0 8.959-3.434 9.918-8.007l-2.713-2.281c-.418-.351-1.059-.682-2.202-.682z" />
                    </svg>
                  </button>
                  <button className="hover:text-blue-700 transition-colors" aria-label="Sign in with LinkedIn">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 00-1.68-1.68c-.93 0-1.69.76-1.69 1.68 0 .93.76 1.68 1.69 1.68.93 0 1.68-.76 1.68-1.68zM7.1 9.85h-2.8v8.37h2.8V9.85z" />
                    </svg>
                  </button>
                </div>
                <p
                  className={`text-xs mb-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  By signing in via social media, I agree to the Elitepassbd.com Free Membership Agreement and Privacy Policy.
                </p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;
