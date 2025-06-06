import React from 'react';

const Topbar = () => {
  return (
    <div className="hidden md:flex bg-black text-white text-sm px-4 py-2 justify-between items-center">
      <div className="flex items-center space-x-4">
        <span>⚡ EXCLUSIVE T-SHIRTS ON SALE | Limited time only</span>
      </div>
      <div className="flex items-center space-x-4">
        <a href="#">Order Bulk / Corporate Sales</a>
        <a href="#">Store Locations</a>
        <a href="/about">About Us</a>
        <a href="#" className="text-blue-400">Login</a>
      </div>
    </div>
  );
};

export default Topbar;

