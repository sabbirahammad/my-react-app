import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  FiHeart,
  FiArrowRight,
  FiZap,
  FiTrendingUp,
  FiFeather,
  FiUser,
  FiShuffle,
  FiList,
  FiGrid
} from 'react-icons/fi';
import { useProduct } from '../../Context/UseContext';

const categories = [
  { label: 'Slim Fit', icon: FiFeather, bg: 'from-indigo-100 to-white', iconColor: 'text-indigo-500' },
  { label: 'Regular Fit', icon: FiTrendingUp, bg: 'from-pink-100 to-white', iconColor: 'text-pink-500' },
  { label: 'Skinny', icon: FiUser, bg: 'from-rose-100 to-white', iconColor: 'text-rose-500' },
  { label: 'Bootcut', icon: FiShuffle, bg: 'from-blue-100 to-white', iconColor: 'text-blue-500' },
  { label: 'Straight', icon: FiList, bg: 'from-green-100 to-white', iconColor: 'text-emerald-500' },
  { label: 'All Styles', icon: FiGrid, bg: 'from-amber-100 to-white', iconColor: 'text-amber-500' },
];

const Catagoryproduct = () => {
  const { products = [] } = useProduct();

  const displayProducts = useMemo(() => {
    if (products && products.length) {
      return products.slice(0, 10).map((p, idx) => ({
        id: p._id || p.id || idx,
        img:
          (Array.isArray(p.images) && p.images[0]) ||
          p.image ||
          'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=500&q=80',
        title: p.name || p.title || 'Product',
        discount: p.badge || '-50%',
      }));
    }
    return Array.from({ length: 10 }).map((_, idx) => ({
      id: idx,
      title: 'Denim Collection',
      discount: '-50%',
      img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=500&q=80',
    }));
  }, [products]);

  return (
    <section className="w-full bg-[#f8f9fb] py-10">
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-10 space-y-8">
        {/* Category pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map(({ label, icon: Icon, bg, iconColor }) => {
            const slug = encodeURIComponent(label.toLowerCase().replace(/\s+/g, '-'));
            return (
              <Link
                key={label}
                to={`/category/${slug}`}
                className="flex flex-col items-center gap-3 group"
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${bg} shadow-[0_12px_28px_rgba(0,0,0,0.06)] flex items-center justify-center transition-transform duration-150 group-hover:-translate-y-1`}>
                  <Icon className={`text-3xl ${iconColor}`} />
                </div>
                <span className="text-sm font-semibold text-gray-700">{label}</span>
              </Link>
            );
          })}
        </div>

        {/* Flash sale row */}
        <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white grid place-items-center shadow-md">
                  <FiZap className="text-xl" />
                </span>
                <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-black text-blue-700 leading-none">Flash Sale</span>
                  <span className="text-gray-400 text-lg leading-none">:</span>
                  <div className="flex items-center gap-2">
                    {['05', '18', '42'].map((time) => (
                      <span key={time} className="px-3 py-2 rounded-xl bg-gradient-to-b from-pink-400 to-pink-500 text-white text-sm font-bold shadow-md">
                        {time}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-400">Ends in</p>
              </div>
            </div>
            <Link
              to="/products"
              className="hidden sm:inline-flex items-center gap-2 text-indigo-600 font-semibold"
            >
              See All <FiArrowRight />
            </Link>
          </div>

          {/* Products */}
          <div className="px-4 pb-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {displayProducts.map((product) => (
                <div
                  key={product.id}
                  className="rounded-3xl overflow-hidden shadow-[0_14px_35px_rgba(0,0,0,0.08)] bg-white border border-gray-100"
                >
                  <div className="relative">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.img}
                        alt={product.title}
                        className="w-full aspect-square object-cover"
                        loading="lazy"
                      />
                    </Link>
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold shadow-md">
                      {product.discount}
                    </span>
                    <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white text-gray-700 grid place-items-center shadow-md hover:text-rose-500">
                      <FiHeart />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Catagoryproduct;
