import React, { useState } from 'react';

const allOrders = [
  {
    id: 1,
    status: 'Cancelled',
    seller: 'Incentive Fashion',
    product: {
      name: 'Smile Man Short Sleeve T-Shirt for Men',
      size: 'L',
      color: 'White',
      image: 'https://i.imgur.com/Mg2uHSC.png',
      price: 150,
      quantity: 1,
    },
  },
  {
    id: 2,
    status: 'Completed',
    seller: 'T-Shirt Ghor',
    product: {
      name: 'AK47 Yellow T-shirts',
      size: 'M',
      color: 'Yellow',
      image: 'https://i.imgur.com/VDLomfu.png',
      price: 190,
      quantity: 1,
    },
  },
];

const tabs = ['All', 'To Pay', 'To ship', 'To Receive'];

const MyOrdersPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = allOrders.filter((order) => {
    const matchTab =
      activeTab === 'All' || order.status.toLowerCase().includes(activeTab.toLowerCase());
    const matchSearch =
      order.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="bg-[#121318] min-h-screen text-white px-4 py-6 sm:px-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">My Orders</h2>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 border-b border-gray-700 pb-2 mb-4 text-sm">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-1 transition ${
              activeTab === tab
                ? 'border-b-2 border-orange-500 text-white font-semibold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="bg-[#1f1f27] rounded p-3 mb-4">
        <input
          type="text"
          placeholder="Search by seller, product name or order ID"
          className="w-full bg-[#2b2b33] text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Order List */}
      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-[#181a21] rounded-lg shadow mb-4 p-4 transition hover:shadow-lg"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-3">
              <span className="text-sm font-medium">{order.seller}</span>
              <span
                className={`text-xs px-3 py-1 rounded-full w-fit ${
                  order.status === 'Completed'
                    ? 'bg-green-600 text-white'
                    : order.status === 'Cancelled'
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-yellow-600 text-white'
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Product Info */}
            <div className="flex flex-col sm:flex-row gap-4">
              <img
                src={order.product.image}
                alt={order.product.name}
                className="w-full sm:w-24 sm:h-24 h-auto object-cover rounded bg-white p-1"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{order.product.name}</p>
                <p className="text-sm text-gray-400 mt-1">
                  Size: Int:{order.product.size}, Color: {order.product.color}
                </p>
                <p className="text-sm mt-2">
                  ৳ {order.product.price}{' '}
                  <span className="ml-4 text-gray-400">Qty: {order.product.quantity}</span>
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-sm text-center">No orders found.</p>
      )}
    </div>
  );
};

export default MyOrdersPage;



