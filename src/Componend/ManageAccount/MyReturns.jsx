import React from 'react';
import { Link } from 'react-router-dom';

const dummyReturns = []; // [] থাকলে কোনো রিটার্ন দেখাবে না

// যদি রিটার্ন থাকা লাগে, এইভাবে দাও:
/*
const dummyReturns = [
  {
    id: 1,
    name: 'Premium Hoodie',
    image: 'https://picsum.photos/seed/hoodie/100',
    returnDate: '2025-06-01',
    status: 'Refunded',
    reason: 'Size too small',
  },
];
*/

const MyReturns = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">🧾 My Returns</h2>

      {dummyReturns.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg">No returns found.</p>
          <Link
            to="/products"
            className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {dummyReturns.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border p-4 rounded-xl shadow-sm"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">Return Date: {item.returnDate}</p>
                <p className="text-sm text-gray-500">Reason: {item.reason}</p>
              </div>
              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${
                  item.status === 'Refunded'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-yellow-100 text-yellow-600'
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReturns;
