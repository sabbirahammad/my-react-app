import React from 'react';

const BrandFooter = () => {
  return (
    <div className="bg-[#0f1015] text-gray-400 text-xs text-center py-6 border-t border-[#2b2d35]">
      <p>ElitePass International</p>
      <p className="mt-1">Pakistan | Bangladesh | Sri Lanka | Myanmar | Nepal</p>
      <div className="flex justify-center gap-4 mt-3 text-lg">
        <a href="#" className="hover:text-white">🌐</a>
        <a href="#" className="hover:text-white">📘</a>
        <a href="#" className="hover:text-white">📺</a>
        <a href="#" className="hover:text-white">📸</a>
        <a href="#" className="hover:text-white">🐦</a>
      </div>
      <div className="flex justify-center items-center gap-2 mt-4">
        <img
          src="https://seeklogo.com/images/P/PCI-DSS-logo-F79FCA2057-seeklogo.com.png"
          alt="PCI DSS"
          className="h-5"
        />
        <span className="text-gray-500">Registration ID : 304903094</span>
      </div>
      <p className="mt-2 text-gray-600">© ElitePass 2025</p>
    </div>
  );
};

export default BrandFooter;