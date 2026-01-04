// ✅ ProductGrid.jsx (updated for multiple images)
import React, { useState } from 'react';
import { useProduct } from '../../Context/UseContext';
import { useLocation } from 'react-router-dom';
import ProductCard from './ProductCard';
import ProductDetailsModal from './ProductDetailsModal';

const ProductGrid = ({ searchQuery = '', selectedCategories = [], sortBy }) => {
  const { products, setCartItems } = useProduct();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();
  const state = location.state || {};
  const highlightId = state.highlightId || null;
  const selectedCategoryFromState = state.category || null;

  const filteredProducts = products
    .filter((p) => {
      const matchesSearch = p.name?.toLowerCase().includes(searchQuery.toLowerCase()) || false;

      const matchesCategory =
        selectedCategories.length > 0
          ? selectedCategories.some(selectedCat => {
              // Check if product category matches any selected category filter
              return p.category?.toLowerCase() === selectedCat?.toLowerCase();
            })
          : selectedCategoryFromState
          ? p.category === selectedCategoryFromState
          : true;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      // Always prioritize highlighted product
      if (a.id === highlightId) return -1;
      if (b.id === highlightId) return 1;

      // Apply sorting based on sortBy prop
      switch (sortBy) {
        case 'popularity':
          // Sort by rating (assuming higher rating = more popular)
          return (b.rating || 0) - (a.rating || 0);

        case 'rating':
          // Sort by average rating
          return (b.rating || 0) - (a.rating || 0);

        case 'newest':
          // Sort by creation date (newest first)
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);

        case 'oldest':
          // Sort by creation date (oldest first)
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);

        case 'price-asc':
          // Sort by price (low to high)
          return (a.price || 0) - (b.price || 0);

        case 'price-desc':
          // Sort by price (high to low)
          return (b.price || 0) - (a.price || 0);

        case 'name-asc':
          // Sort by name (A to Z)
          return (a.name || '').localeCompare(b.name || '');

        case 'name-desc':
          // Sort by name (Z to A)
          return (b.name || '').localeCompare(a.name || '');

        case 'default':
        default:
          // Default sorting (no specific order, maintain original order)
          return 0;
      }
    });

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      return exists
        ? prev.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + 1 } : item
          )
        : [...prev, { ...product, qty: 1 }];
    });
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 px-3 sm:px-6 lg:px-8 mt-5">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => openModal(product)}
              className="cursor-pointer"
            >
              <ProductCard
  id={product.id}
  name={product.name}
  price={product.price}
  oldPrice={product.oldPrice}
  image={product.images} // ✅ updated: send full image array
  category={product.category}
  isHighlighted={product.id === highlightId}
/>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400">
            No products found.
          </div>
        )}
      </div>

      <ProductDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedProduct}
        addToCart={handleAddToCart}
      />
    </>
  );
};

export default ProductGrid;





