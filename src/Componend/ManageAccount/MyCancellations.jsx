import React from 'react';
import { useNavigate } from 'react-router-dom';

const cancelledOrders = [
  {
    id: '601744433064619',
    requestedDate: '2019-06-12 18:25:41',
    products: [
      {
        id: 'p1',
        name: 'Smile Short Sleeve T-Shirt for Men',
        qty: 1,
        image: 'https://i.imgur.com/Mg2uHSC.png',
      },
    ],
    status: 'Cancelled',
  },
  {
    id: '601753148364619',
    requestedDate: '2019-05-30 11:34:35',
    products: [
      {
        id: 'p2',
        name: 'Smile Man Short Sleeve T-Shirt for Men',
        qty: 1,
        image: 'https://i.imgur.com/VDLomfu.png',
      },
    ],
    status: 'Cancelled',
  },
];

const MyCancellations = () => {
  const navigate = useNavigate();

  const handleMoreDetails = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  return (
    <div className="p-4 sm:p-6 bg-[#121318] min-h-screen text-white text-sm space-y-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">My Cancellations</h2>

      {cancelledOrders.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          You have no cancelled orders.
        </div>
      ) : (
        cancelledOrders.map((order) => (
          <div
            key={order.id}
            className="bg-[#181a21] rounded shadow border border-[#2b2d35]"
          >
            {/* Order Header */}
            <div className="flex flex-col sm:flex-row justify-between gap-2 sm:items-center px-4 py-3 border-b border-[#2b2d35]">
              <div>
                <p className="text-gray-400 text-sm">Requested on {order.requestedDate}</p>
                <p className="text-gray-400 text-sm">
                  Order{' '}
                  <span className="text-cyan-400 hover:underline cursor-pointer text-sm">
                    #{order.id}
                  </span>
                </p>
              </div>
              <button
                onClick={() => handleMoreDetails(order.id)}
                className="text-cyan-400 hover:underline text-sm sm:text-[13px]"
              >
                MORE DETAILS
              </button>
            </div>

            {/* Product List */}
            {order.products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col sm:flex-row items-start sm:items-center p-4 gap-4 border-t border-[#2b2d35]"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 sm:w-20 sm:h-20 rounded object-cover bg-white p-1"
                />
                <div className="flex-1">
                  <h3 className="text-[15px] font-semibold mb-1">{product.name}</h3>
                  <p className="text-gray-400 text-sm">Qty: {product.qty}</p>
                </div>
                <span className="bg-[#2b2d35] text-gray-300 text-xs px-3 py-1 rounded-full mt-2 sm:mt-0">
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default MyCancellations;


