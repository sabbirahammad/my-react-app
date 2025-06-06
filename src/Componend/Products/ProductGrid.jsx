import React, { useState } from 'react';
import { useProduct } from '../../Context/UseContext';
import { useLocation } from 'react-router-dom';
import ProductCard from './ProductCard';
import ProductDetailsModal from './ProductDetailsModal';

const ProductGrid = ({ searchQuery = '', selectedCategories = [] }) => {
  const { products, setCartItems } = useProduct();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔍 Get highlight ID from URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const highlightId = parseInt(queryParams.get('highlight'));

  // 🧠 Filter & sort products
  const filteredProducts = products
    .filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(p.category);
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (a.id === highlightId) return -1;
      if (b.id === highlightId) return 1;
      return 0;
    });

  // 🛒 Add to Cart
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

  // 🔍 Modal control
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
                {...product}
                isHighlighted={product.id === highlightId}
                onBuy={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400">
            No products found.
          </div>
        )}
      </div>

      {/* Modal */}
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



