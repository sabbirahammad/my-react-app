import { createContext, useContext, useState, useEffect } from 'react';
import imaze1 from '../imaze/i.jpg';
import imaze2 from '../imaze/i2.jpg'
import imaze3 from '../Photo/i3.jpg'
import imaze4 from '../Photo/i4.jpg'

const ProductContext = createContext();

// Dummy categories
const categories = [
  { name: 'Men', image: 'https://picsum.photos/200/300?random=1' },
  { name: 'Women', image: 'https://picsum.photos/200/300?random=2' },
  { name: 'Custom Print', image: 'https://picsum.photos/200/300?random=3' },
  { name: 'Premium', image: 'https://picsum.photos/200/300?random=4' },
];

// Dummy products
const products = Array.from({ length: 100 }, (_, i) => {
  const category = categories[i % categories.length];
  return {
    id: i + 1,
    name: `Product ${i + 1}`,
    price: 500 + i * 10,
    oldPrice: 600 + i * 10,
    category: category.name,
    image: category.image,
    description: `This is the description of Product ${i + 1}`,
    sold: Math.floor(Math.random() * 100),
  };
});

// Banner images per category
const categoryBanners = {
  Men: imaze1,
  Women: imaze2,
  "Custom Print": imaze3,
  Premium: imaze3,
};

export const ProductProvider = ({ children }) => {
  // Cart state with localStorage sync
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem('cartItems');
    return stored ? JSON.parse(stored) : [];
  });

  // Recently viewed state with localStorage sync
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const stored = localStorage.getItem('recentlyViewed');
    return stored ? JSON.parse(stored) : [];
  });

  const [sortOption, setSortOption] = useState('popularity');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedShoppingFrom, setSelectedShoppingFrom] = useState([]);
  const [selectedColorFamily, setSelectedColorFamily] = useState([]);

  // Sync cart & recently viewed
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const addToCart = (newItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => item.id === newItem.id && item.selectedSize === newItem.selectedSize
      );
      if (existingItem) {
        return prev.map((item) =>
          item.id === newItem.id && item.selectedSize === newItem.selectedSize
            ? { ...item, qty: item.qty + newItem.qty }
            : item
        );
      } else {
        return [...prev, newItem];
      }
    });
  };

  const addToRecentlyViewed = (product) => {
    setRecentlyViewed((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev;
      return [product, ...prev].slice(0, 10);
    });
  };

  // Fallback banner if no category is selected
  const bannerImage = selectedCategory
    ? categoryBanners[selectedCategory] || imaze1
    : imaze1;

  return (
    <ProductContext.Provider
      value={{
        categories,
        products,
        bannerImage,
        categoryBanners, // for BrandBanner if needed
        cartItems,
        setCartItems,
        addToCart,
        recentlyViewed,
        addToRecentlyViewed,
        selectedCategory,
        setSelectedCategory,
        selectedBrand,
        setSelectedBrand,
        selectedServices,
        setSelectedServices,
        selectedShoppingFrom,
        setSelectedShoppingFrom,
        selectedColorFamily,
        setSelectedColorFamily,
        sortOption,
        setSortOption,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);









