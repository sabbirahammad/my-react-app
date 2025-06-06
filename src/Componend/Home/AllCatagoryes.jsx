import React from 'react';

// Replace with real SVGs or images if needed
const DummyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white group-hover:text-blue-500 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

// Category Data
const categories = [
  { name: 'Electronics', icon: <DummyIcon />, link: '/electronics' },
  { name: 'Fashion', icon: <DummyIcon />, link: '/fashion' },
  { name: 'Home & Garden', icon: <DummyIcon />, link: '/home-garden' },
  { name: 'Beauty & Health', icon: <DummyIcon />, link: '/beauty-health' },
  { name: 'Sports', icon: <DummyIcon />, link: '/sports' },
  { name: 'Toys', icon: <DummyIcon />, link: '/toys' },
  { name: 'Automotive', icon: <DummyIcon />, link: '/automotive' },
  { name: 'Tools', icon: <DummyIcon />, link: '/tools' },
  { name: 'Jewelry', icon: <DummyIcon />, link: '/jewelry' },
  { name: 'Food & Drinks', icon: <DummyIcon />, link: '/food-drinks' },
  { name: 'Books', icon: <DummyIcon />, link: '/books' },
  { name: 'Pets', icon: <DummyIcon />, link: '/pets' },
];

const Categories = () => {
  return (
    <div className="bg-black py-12 px-4">
      <h2 className="text-3xl font-semibold text-white mb-10 text-center">Shop by Category</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
        {categories.map((category, index) => (
          <a
            key={index}
            href={category.link}
            className="group bg-gray-900 rounded-xl p-6 flex flex-col items-center justify-center shadow-md hover:shadow-xl transition-transform hover:-translate-y-1 duration-300"
          >
            <div className="mb-4">{category.icon}</div>
            <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors duration-300 text-center">
              {category.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Categories;
