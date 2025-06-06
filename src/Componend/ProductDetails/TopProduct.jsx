import React from 'react';
import { useProduct } from '../../Context/UseContext';
import { Link } from 'react-router-dom';

const RecentlyViewed = () => {
  const { recentlyViewed } = useProduct();

  if (!recentlyViewed || recentlyViewed.length === 0) return null;

  return (
    <div className="py-8 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-bold text-white mb-4">Recently Viewed</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {recentlyViewed.map((item) => (
            <div
              key={item.id}
              className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition bg-[#1a1a1a]"
            >
              <Link to={`/product/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-56 object-cover cursor-pointer"
                />
              </Link>

              <div className="p-3">
                <h4 className="text-sm font-semibold text-white truncate">
                  {item.name}
                </h4>
                <p className="text-yellow-500 text-sm font-bold">৳{item.price}</p>
                <p className="text-gray-400 text-xs mt-1">{item.sold} sold</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentlyViewed;






