import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiChevronDown,
  FiGrid,
  FiHeart,
  FiSearch,
  FiShoppingCart
} from 'react-icons/fi';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { useProduct } from '../../Context/UseContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { products = [] } = useProduct();
  const [categories, setCategories] = useState([]);
  const [openCategories, setOpenCategories] = useState(false);
  const [loadingCats, setLoadingCats] = useState(false);
  const [catError, setCatError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCats(true);
        setCatError('');
        const res = await fetch('http://localhost:5000/api/v1/categories');
        if (!res.ok) throw new Error('Failed to load categories');
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : data?.data || []);
      } catch (err) {
        setCatError('Could not load categories');
        console.error(err);
      } finally {
        setLoadingCats(false);
      }
    };
    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchTerm.trim();
    navigate(query ? `/products?search=${encodeURIComponent(query)}` : '/products');
  };

  const suggestions = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term || !products.length) return [];
    return products
      .filter((p) => (p.name || p.title || '').toLowerCase().includes(term))
      .slice(0, 6)
      .map((p) => ({
        id: p._id || p.id,
        label: p.name || p.title || 'Product',
      }));
  }, [products, searchTerm]);

  const handleSelectSuggestion = (id) => {
    setSearchTerm('');
    navigate(id ? `/product/${id}` : '/products');
  };

  return (
    <header className="w-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-10 py-4 flex items-center gap-3 sm:gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-200">
              <HiOutlineShoppingBag className="text-white text-2xl" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-indigo-900">
              JeansHub
            </span>
          </Link>
        </div>

        {/* Categories */}
        <div className="hidden lg:block relative">
          <button
            onClick={() => setOpenCategories((p) => !p)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-gray-700 font-semibold bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <span className="w-5 h-5 rounded-md bg-indigo-50 text-indigo-500 grid place-items-center shadow-sm">
              <FiGrid className="text-sm" />
            </span>
            Categories
            <FiChevronDown className="text-lg text-gray-500" />
          </button>
          {openCategories && (
            <div className="absolute left-0 mt-3 w-64 max-h-72 overflow-y-auto rounded-2xl border border-gray-100 bg-white shadow-xl z-20">
              <div className="p-3 border-b border-gray-100 text-sm font-semibold text-gray-600 flex items-center justify-between">
                <span>All Categories</span>
                {loadingCats && <span className="text-xs text-indigo-500">Loading...</span>}
              </div>
              <div className="divide-y divide-gray-100">
                {catError && (
                  <div className="px-4 py-3 text-sm text-rose-500">{catError}</div>
                )}
                {!catError &&
                  (categories.length ? (
                    categories.map((cat) => {
                      const label = cat.title || cat.name || 'Unnamed';
                      const slug = label.toLowerCase().replace(/\s+/g, '-');
                      return (
                        <Link
                          key={cat.id || cat._id || label}
                          to={`/category/${encodeURIComponent(slug)}`}
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50"
                          onClick={() => setOpenCategories(false)}
                        >
                          {label}
                        </Link>
                      );
                    })
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-500">
                      {loadingCats ? 'Loading...' : 'No categories found'}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Search */}
        <div className="flex-1">
          <form onSubmit={handleSearch} className="relative block">
            <button
              type="submit"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"
              aria-label="Search"
            >
              <FiSearch />
            </button>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search premium denim, brands, styles..."
              className="w-full h-12 pl-11 pr-4 rounded-2xl bg-gray-50 border border-gray-200 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all"
            />
            {suggestions.length > 0 && (
              <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden z-30">
                {suggestions.map((item) => (
                  <button
                    type="button"
                    key={item.id || item.label}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50"
                    onClick={() => handleSelectSuggestion(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </form>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/products"
            className="relative p-3 rounded-full text-gray-600 hover:text-indigo-600 hover:bg-gray-50 transition-all"
            aria-label="Wishlist"
          >
            <FiHeart className="text-xl" />
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 text-[11px] font-bold text-white bg-rose-500 rounded-full grid place-items-center shadow-sm">
              3
            </span>
          </Link>

          <Link
            to="/cartpayment"
            className="relative p-3 rounded-full text-gray-600 hover:text-indigo-600 hover:bg-gray-50 transition-all"
            aria-label="Cart"
          >
            <FiShoppingCart className="text-xl" />
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 text-[11px] font-bold text-white bg-indigo-500 rounded-full grid place-items-center shadow-sm">
              5
            </span>
          </Link>

          <Link
            to="/auth"
            className="hidden sm:inline-flex items-center justify-center h-12 px-5 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md hover:shadow-lg transition-all"
          >
            Login
          </Link>
          <Link
            to="/auth"
            className="hidden sm:inline-flex items-center justify-center h-12 px-5 rounded-xl font-semibold text-indigo-600 border border-indigo-100 bg-white hover:bg-indigo-50 transition-all"
          >
            Sign Up
          </Link>
        </div>
      </div>
      {/* close dropdown when clicking outside simple handler */}
      {openCategories && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setOpenCategories(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default Navbar;
