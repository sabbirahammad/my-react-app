import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Dummy data - replace with real data from Context or API
const initialReviews = [
  {
    id: 1,
    productId: 101,
    productName: 'Premium Hoodie',
    productImage: 'https://i.imgur.com/Mg2uHSC.png',
    message: 'Really good quality. I liked the material and fitting!',
    date: '2025-06-03 14:21',
  },
  {
    id: 2,
    productId: 102,
    productName: 'Graphic T-shirt for Men',
    productImage: 'https://i.imgur.com/VDLomfu.png',
    message: 'Print was vibrant, but the size felt a little small.',
    date: '2025-05-30 10:52',
  },
];

const MyReviews = () => {
  const [myReviews, setMyReviews] = useState(initialReviews);

  const handleDelete = (reviewId) => {
    const confirmed = window.confirm('Are you sure you want to delete this review?');
    if (confirmed) {
      setMyReviews((prev) => prev.filter((r) => r.id !== reviewId));
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-[#121318] min-h-screen text-sm text-white max-w-4xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">📝 My Reviews</h2>

      {myReviews.length === 0 ? (
        <div className="text-center text-gray-400 py-24 text-sm sm:text-base">
          You haven't reviewed any product yet.
        </div>
      ) : (
        myReviews.map((review) => (
          <div
            key={review.id}
            className="bg-[#181a21] border border-[#2b2d35] rounded-lg mb-4 p-4 flex flex-col sm:flex-row sm:items-start gap-4 transition hover:shadow-lg"
          >
            {/* Product Image */}
            <img
              src={review.productImage}
              alt={review.productName}
              className="w-24 h-24 rounded object-cover bg-white p-1"
            />

            {/* Info */}
            <div className="flex-1 space-y-1">
              <Link
                to={`/product/${review.productId}`}
                className="text-cyan-400 hover:underline font-semibold text-sm sm:text-base"
              >
                {review.productName}
              </Link>
              <p className="text-gray-300 text-sm">{review.message}</p>
              <p className="text-gray-500 text-xs mt-1">Reviewed on {review.date}</p>
            </div>

            {/* Delete */}
            <div className="flex justify-end sm:block">
              <button
                onClick={() => handleDelete(review.id)}
                className="text-red-500 hover:text-red-400 text-xs sm:text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyReviews;
