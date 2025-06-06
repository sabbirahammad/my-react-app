import React from 'react';

const RecentOrdersTable = () => {
  return (
    <div className="px-4 pt-6 text-white text-[11px]">
      <h2 className="text-[15px] font-semibold mb-2">Recent Orders</h2>

      <div className="bg-[#0d0f1c] rounded overflow-x-auto">
        {/* Table Headings */}
        <div className="grid grid-cols-4 px-4 py-2 border-b border-gray-800 text-gray-400 font-semibold">
          <span>Order #</span>
          <span>Placed On</span>
          <span>Items</span>
          <span>Total</span>
        </div>

        {/* Order Row 1 */}
        <div className="grid grid-cols-4 items-center px-4 py-3 border-b border-gray-800">
          <span className="truncate">638754800796505</span>
          <span>08/03/2023</span>
          <img
            src="https://i.ibb.co/nc9GQJh/image.jpg"
            alt="item"
            className="w-8 h-8 object-cover rounded"
          />
          <div className="flex justify-between items-center">
            <span>৳ 653</span>
            <a href="#" className="text-blue-400 ml-2 text-[10px]">MANAGE</a>
          </div>
        </div>

        {/* Order Row 2 */}
        <div className="grid grid-cols-4 items-center px-4 py-3">
          <span className="truncate">638753818496505</span>
          <span>08/03/2023</span>
          <img
            src="https://i.ibb.co/nc9GQJh/image.jpg"
            alt="item"
            className="w-8 h-8 object-cover rounded"
          />
          <div className="flex justify-between items-center">
            <span>৳ 643</span>
            <a href="#" className="text-blue-400 ml-2 text-[10px]">MANAGE</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentOrdersTable;
