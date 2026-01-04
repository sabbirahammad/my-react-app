// src/Components/NavberSection/UserMenu.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/GoogleAuth';

const UserMenu = ({ isDarkMode, activeDropdown, setActiveDropdown }) => {
  const { user, logout, login, loading } = useAuth();
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // API Base URL
  const API_BASE_URL = 'https://my-railway-server-production.up.railway.app/api/v1';

  // Handle URL token processing (for Google OAuth callback)
  useEffect(() => {
    const handleTokenFromURL = async () => {
      const url = new URL(window.location.href);
      const token = url.searchParams.get('token');

      // Skip if no token or user already logged in
      if (!token || user) return;

      try {
        console.log('🔄 Processing token from URL...');
        
        // Decode token to get user info
        const payload = token.split('.')[1];
        let base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        base64 += '='.repeat((4 - base64.length % 4) % 4);
        const decoded = JSON.parse(atob(base64));

        const userInfo = {
          id: decoded.user_id || decoded.sub || decoded.id,
          email: decoded.email,
          name: decoded.name || 
                (decoded.given_name && decoded.family_name 
                  ? `${decoded.given_name} ${decoded.family_name}` 
                  : decoded.given_name || 'User'),
          given_name: decoded.given_name,
          family_name: decoded.family_name,
          picture: decoded.picture || null,
          verified_email: decoded.email_verified || false,
        };

        // Login with token
        await login(token, userInfo);
        console.log('🎉 Login successful!', userInfo);

        // Clean URL and redirect
        window.history.replaceState({}, document.title, window.location.pathname);
        
        const redirectPath = localStorage.getItem('redirect_after_login');
        localStorage.removeItem('redirect_after_login');
        
        if (redirectPath !== window.location.pathname) {
          navigate(redirectPath, { replace: true });
        }

      } catch (err) {
        console.error('❌ Token processing failed:', err);
        alert('Login failed: ' + err.message);
        logout();
      }
    };

    handleTokenFromURL();
  }, [login, logout, navigate, user]);

  // Handle Google OAuth login
  const handleGoogleLogin = async () => {
    if (isLoggingIn) return;

    try {
      setIsLoggingIn(true);
      setActiveDropdown(null);

      // Store current path for redirect after login
      localStorage.setItem('redirect_after_login', window.location.pathname);

      console.log('🔄 Initiating Google login...');

      // Request Google auth URL from backend
      const response = await fetch(`${API_BASE_URL}/auth/google/login`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to get Google auth URL`);
      }

      const data = await response.json();
      
      if (data.auth_url) {
        console.log('🚀 Redirecting to Google...');
        window.location.href = data.auth_url;
      } else {
        throw new Error('No auth_url received from server');
      }

    } catch (err) {
      console.error('❌ Google login error:', err);
      alert(`Login failed: ${err.message}`);
      setIsLoggingIn(false);
    }
  };

  // User state
  const isSignedIn = !!user && !loading;

  const getUserName = () => {
    if (user?.displayName) return user.displayName;
    if (user?.name) return user.name;
    if (user?.given_name) return user.given_name;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  const getUserImage = () => {
    return user?.picture || user?.avatar || user?.photo || null;
  };

  // Loading state
  if (loading) {
    return (
      <div className="relative">
        <button className="flex items-center opacity-50 cursor-default">
          <div className="w-5 h-5 mr-2 rounded-full bg-gray-400 animate-pulse"></div>
          <span className="animate-pulse">Loading...</span>
        </button>
      </div>
    );
  }

  const userName = getUserName();
  const userImage = getUserImage();

  return (
    <div
      className="relative"
      onMouseEnter={() => setActiveDropdown('signin')}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <button
        className="flex items-center hover:text-yellow-400 transition-colors focus:outline-none"
        aria-haspopup="true"
        aria-expanded={activeDropdown === 'signin'}
      >
        {/* User Avatar */}
        {isSignedIn && userImage ? (
          <img
            src={userImage}
            alt={`${userName}'s avatar`}
            className="w-6 h-6 rounded-full mr-2 object-cover border border-gray-600"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <svg
            className={`w-5 h-5 mr-2 flex-shrink-0 ${isSignedIn && userImage ? 'hidden' : 'block'}`}
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
        )}

        {/* User Name / Sign In Text */}
        <span className="truncate max-w-[150px] font-medium">
          {isSignedIn ? `Hi, ${userName}` : 'SIGN IN'}
        </span>

        {/* Dropdown Arrow */}
        <svg
          className={`w-4 h-4 ml-1 transition-transform duration-200 ${
            activeDropdown === 'signin' ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
     {/* Dropdown Menu */}
<AnimatePresence>
  {activeDropdown === 'signin' && (
    <motion.div
      className={`absolute left-1/2 -translate-x-1/2 mt-2 w-72 rounded-lg shadow-xl z-50 p-4 border ${
        isDarkMode
          ? 'bg-gray-800 text-white border-gray-700'
          : 'bg-white text-gray-900 border-gray-200'
      }`}
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      style={{ minWidth: '288px' }} // w-72 = 288px
    >
      {isSignedIn ? (
        // Signed In Menu
        <>
          {/* User Info Section */}
          <div className="mb-4 pb-4 border-b border-opacity-20 border-gray-500">
            <div className="flex items-center space-x-3">
              {userImage ? (
                <img
                  src={userImage}
                  alt={`${userName}'s avatar`}
                  className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div 
                className={`w-12 h-12 rounded-full bg-yellow-400 items-center justify-center text-gray-900 font-bold ${
                  userImage ? 'hidden' : 'flex'
                }`}
              >
                {userName.charAt(0).toUpperCase()}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-400">Welcome back!</p>
                <p className="text-lg font-bold truncate text-yellow-400">{userName}</p>
                {user?.email && (
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                )}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-1 mb-4">
            <button
              onClick={() => {
                navigate('/profile');
                setActiveDropdown(null);
              }}
              className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors text-left ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              My Profile
            </button>
            
            <button
              onClick={() => {
                navigate('/orders');
                setActiveDropdown(null);
              }}
              className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors text-left ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M8 11v6h8v-6M8 11H6a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2h-2" />
              </svg>
              My Orders
            </button>

            <button
              onClick={() => {
                navigate('/wishlist');
                setActiveDropdown(null);
              }}
              className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors text-left ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Wishlist
            </button>
          </div>

          {/* Logout Button */}
          <div className="pt-4 border-t border-opacity-20 border-gray-500">
            <button
              onClick={() => {
                logout();
                setActiveDropdown(null);
                navigate('/');
              }}
              className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                isDarkMode
                  ? 'hover:bg-red-900/50 text-red-400 border border-red-900/50'
                  : 'hover:bg-red-50 text-red-600 border border-red-200'
              }`}
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </>
      ) : (
        // Sign In Menu
        <>
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold mb-2">Welcome!</h3>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Sign in to access your account and enjoy personalized shopping
            </p>
          </div>

          {/* Regular Sign In Button */}
          <button
            onClick={() => {
              navigate('/auth');
              setActiveDropdown(null);
            }}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 py-3 px-4 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 mb-3 flex items-center justify-center font-medium shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Sign In / Sign Up
          </button>

          {/* Divider */}
          <div className="relative mb-3">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className={`px-2 ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Login Button */}
          {/* <button
            onClick={handleGoogleLogin}
            disabled={isLoggingIn}
            className={`flex items-center justify-center w-full py-3 px-4 rounded-lg border transition-colors ${
              isLoggingIn
                ? 'opacity-50 cursor-not-allowed'
                : isDarkMode
                ? 'border-gray-600 hover:bg-gray-700 text-white'
                : 'border-gray-300 hover:bg-gray-50 text-gray-900'
            }`}
          >
            {isLoggingIn ? (
              <>
                <div className="w-5 h-5 mr-3 animate-spin rounded-full border-2 border-transparent border-l-current"></div>
                Connecting...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.02.68-2.33 1.08-3.71 1.08-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC04" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 4.24 3.99 2.18 7.84l3.66 2.84C6.71 7.69 9.14 5.38 12 5.38z"/>
                </svg>
                Next Update
              </>
            )}
          </button> */}

          {/* Terms */}
          <p className={`text-xs text-center mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            By signing in, you agree to our{' '}
            <a href="/terms" className="text-yellow-400 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="/privacy" className="text-yellow-400 hover:underline">Privacy Policy</a>
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
