import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import { useProduct } from '../../Context/UseContext';

const filters = [
  { label: 'Best Seller', active: true },
  { label: 'Keep Stylish' },
  { label: 'Special Discount' },
  { label: 'Official Store' },
];

const Products = () => {
  const navigate = useNavigate();
  const { products = [], loading, addToCart } = useProduct();
  const [activeFilter, setActiveFilter] = useState(filters[0].label);
  const [favorites, setFavorites] = useState(new Set());

  const displayProducts = useMemo(() => {
    if (products && products.length) {
      const mapped = products.slice(0, 20).map((p, idx) => ({
        id: p._id || p.id || idx,
        title: p.name || p.title || 'Product',
        price: p.price ? `৳${p.price}` : '৳0',
        oldPrice: p.oldPrice ? `৳${p.oldPrice}` : '',
        numericPrice: Number(p.price) || 0,
        numericOldPrice: Number(p.oldPrice) || 0,
        rating: p.rating || 5.0,
        badge: p.badge || (idx === 2 ? 'SALE' : '-'),
        isTopProduct: p.isTopProduct,
        isTrending: p.isTrending,
        officialStore: p.officialStore,
        img:
          (Array.isArray(p.images) && p.images[0]) ||
          p.image ||
          'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80',
        original: p,
      }));

      const applyFilter = (list) => {
        switch (activeFilter) {
          case 'Best Seller':
            return list.filter((p) => p.isTopProduct);
          case 'Keep Stylish':
            return list.filter((p) => p.isTrending);
          case 'Special Discount':
            return list.filter((p) => (p.numericOldPrice || 0) > (p.numericPrice || 0));
          case 'Official Store':
            return list.filter((p) => p.officialStore);
          default:
            return list;
        }
      };

      const filtered = applyFilter(mapped);
      return (filtered.length ? filtered : mapped).slice(0, 8);
    }
    return Array.from({ length: 8 }).map((_, idx) => ({
      id: idx,
      title: "Essential Men's Denim Jeans",
      price: '৳2,530',
      oldPrice: '৳3,999',
      rating: 5.0,
      badge: idx === 2 ? 'SALE' : '-',
      img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80',
    }));
  }, [products]);

  return (
    <section className="w-full bg-[#f6f7fb] py-10">
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl font-black text-[#1d2141]">Today&apos;s For You!</h2>
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter.label}
                onClick={() => setActiveFilter(filter.label)}
                className={`px-5 py-3 rounded-2xl text-sm font-semibold border transition-all duration-150 ${
                  activeFilter === filter.label
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-transparent shadow-md'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-200 hover:text-indigo-600'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {displayProducts.map((product) => {
            const productId = product.id || product._id || 'item';
            const productPath = `/product/${productId}`;
            const isFav = favorites.has(productId);
            return (
              <div
                key={productId}
                className="bg-white rounded-3xl shadow-[0_18px_55px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden transition-transform duration-200 hover:-translate-y-1 cursor-pointer"
                onClick={() => navigate('/products')}
              >
                <div className="relative">
                  <Link to={productPath} className="block" onClick={(e) => e.stopPropagation()}>
                    <img
                      src={product.img}
                      alt={product.title}
                      className="w-full aspect-[4/3] object-cover"
                      loading="lazy"
                    />
                  </Link>
                  <button
                    className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white text-gray-700 grid place-items-center shadow-md hover:text-rose-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFavorites((prev) => {
                        const next = new Set(prev);
                        if (next.has(productId)) {
                          next.delete(productId);
                        } else {
                          next.add(productId);
                        }
                        return next;
                      });
                    }}
                  >
                    <FiHeart className={isFav ? 'text-rose-500' : ''} />
                  </button>
                  {product.badge === 'SALE' ? (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-rose-500 text-white text-xs font-bold shadow-md">
                      SALE
                    </span>
                  ) : (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold shadow-md">
                      -50%
                    </span>
                  )}
                </div>

                <div className="px-4 pt-4 pb-5 space-y-2">
                  <h3 className="text-base font-semibold text-[#1d2141] leading-snug">{product.title}</h3>
                  <div className="flex items-center gap-2 text-yellow-400 text-sm">
                    {'★★★★★'.split('').map((star, idx) => (
                      <span key={idx}>{star}</span>
                    ))}
                    <span className="text-gray-600 font-semibold ml-1">{product.rating}</span>
                  </div>
                  <div className="flex items-end justify-between mt-1">
                    <div>
                      <div className="text-xl font-black text-[#1d2141]">{product.price}</div>
                      <div className="text-sm text-gray-400 line-through">{product.oldPrice}</div>
                    </div>
                    <button
                      className="w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white grid place-items-center shadow-md hover:shadow-lg"
                      onClick={async (e) => {
                        e.stopPropagation();
                        if (addToCart) {
                          await addToCart(product.original || {});
                        } else {
                          navigate('/product');
                        }
                      }}
                    >
                      <FiShoppingBag className="text-lg" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {loading && <div className="text-sm text-gray-500">Loading products...</div>}
      </div>
    </section>
  );
};

export default Products;
