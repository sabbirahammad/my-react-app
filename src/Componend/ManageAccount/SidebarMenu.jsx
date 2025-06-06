import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProduct } from '../../Context/UseContext';

const SidebarMenu = () => {
  const location = useLocation();
  const { user } = useProduct();

  const navLinks = [
    { path: '/profilecart', label: 'My Profile' },
    { path: '/addresses', label: 'Address Book' },
    { path: '/payments', label: 'My Payment Options' },
  ];

  const orderLinks = [
    { path: '/returns', label: 'My Returns' },
    { path: '/cancellations', label: 'My Cancellations' },
    { path: '/orders', label: 'All Orders' },
  ];

  const reviewLinks = [{ path: '/reviews', label: 'View Reviews' }];
  const wishlistLinks = [{ path: '/wishlist', label: 'Wishlist & Stores' }];

  return (
    <div className="w-40 md:w-100 p-4 text-[13px] text-white bg-[#0d0f1c] min-h-screen">
      {/* For desktop: padding-left; for mobile: none */}
      <div className="md:ml-56 space-y-6">
        {/* Header */}
        <div>
          <p className="text-gray-300 mb-1">Hello, {user?.name || 'User'}</p>
          <span className="bg-green-500 text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block">
            ✅ Verified Account
          </span>
        </div>

        {/* Manage My Account */}
        <div>
          <p className="text-blue-400 font-semibold mb-1">Manage My Account</p>
          <ul className="space-y-1">
            {navLinks.map(({ path, label }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`block hover:text-yellow-400 ${
                    location.pathname === path ? 'text-yellow-400 font-semibold' : ''
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* My Orders */}
        <div>
          <h3 className="text-white font-semibold mb-1">My Orders</h3>
          <ul className="space-y-1">
            {orderLinks.map(({ path, label }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`block hover:text-yellow-400 ${
                    location.pathname === path ? 'text-yellow-400 font-semibold' : ''
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* My Reviews */}
        <div>
          <h3 className="text-white font-semibold mb-1">My Reviews</h3>
          <ul className="space-y-1">
            {reviewLinks.map(({ path, label }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`block hover:text-yellow-400 ${
                    location.pathname === path ? 'text-yellow-400 font-semibold' : ''
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Wishlist */}
        <div>
          <h3 className="text-white font-semibold mb-1">My Wishlist</h3>
          <ul className="space-y-1">
            {wishlistLinks.map(({ path, label }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`block hover:text-yellow-400 ${
                    location.pathname === path ? 'text-yellow-400 font-semibold' : ''
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;








