import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Dummy order detail (normally fetched via orderId)
const dummyOrderData = {
  id: '601744433064619',
  date: '2019-06-12 18:25:41',
  status: 'Cancelled',
  cancelReason: 'Customer changed mind',
  refundAmount: 499,
  products: [
    {
      id: 'p1',
      name: 'Smile Short Sleeve T-Shirt for Men',
      qty: 1,
      price: 499,
      image: 'https://i.imgur.com/Mg2uHSC.png',
    },
    {
      id: 'p2',
      name: 'Smile Socks Pair',
      qty: 2,
      price: 99,
      image: 'https://via.placeholder.com/80x80.png?text=Socks',
    },
  ],
};

const OrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = dummyOrderData; // Replace with actual fetch logic

  const subtotal = order.products.reduce(
    (acc, p) => acc + p.qty * p.price,
    0
  );

  return (
    <div className="p-6 bg-[#121318] min-h-screen text-sm text-white space-y-6 max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/cancellations')}
        className="text-cyan-400 text-[13px] hover:underline"
      >
        ← Back to My Cancellations
      </button>

      <h2 className="text-xl font-semibold mb-2">Order Details</h2>

      {/* Order Info */}
      <div className="bg-[#181a21] rounded p-4 border border-[#2b2d35] space-y-2">
        <p>Order ID: <span className="text-cyan-400">#{order.id}</span></p>
        <p>Status: <span className="text-yellow-400">{order.status}</span></p>
        <p>Placed on: {order.date}</p>
      </div>

      {/* Cancel Reason */}
      {order.status === 'Cancelled' && (
        <div className="bg-[#181a21] border border-[#2b2d35] p-4 rounded">
          <p className="text-red-400 font-medium">Cancellation Reason:</p>
          <p className="text-gray-300 text-sm mt-1">{order.cancelReason}</p>
        </div>
      )}

      {/* Product List */}
      <div className="space-y-4">
        {order.products.map((product) => (
          <div
            key={product.id}
            className="flex items-center gap-4 bg-[#181a21] border border-[#2b2d35] p-4 rounded"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 bg-white p-1 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-gray-400">Qty: {product.qty}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-300">৳ {product.price}</p>
              <p className="text-gray-400 text-xs">Total: ৳ {product.price * product.qty}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-[#181a21] border border-[#2b2d35] p-4 rounded space-y-2">
        <h3 className="font-semibold text-white">Summary</h3>
        <div className="flex justify-between">
          <span className="text-gray-400">Subtotal</span>
          <span>৳ {subtotal}</span>
        </div>
        <div className="flex justify-between font-semibold text-green-400">
          <span>Refunded</span>
          <span>৳ {order.refundAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;

