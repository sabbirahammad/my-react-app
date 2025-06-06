import React, { useState } from 'react';

const categoryData = [
  {
    name: 'Women\'s & Girls\' Fashion',
    subcategories: [],
  },
  {
    name: 'Men\'s & Boys\' Fashion',
    subcategories: [
      {
        name: 'Eyewear',
        items: [],
      },
      {
        name: 'Shoes',
        items: [],
      },
      {
        name: 'Accessories',
        items: [
          'Brooches and Cufflinks',
          'Umbrellas',
          'Ties',
          'Bow Ties',
          'Hats & Caps',
          'Belts',
        ],
      },
      {
        name: 'Muslim Wear',
        items: [],
      },
      {
        name: 'Clothing',
        items: [],
      },
    ],
  },
  {
    name: 'Electronic Accessories',
    subcategories: [],
  },
  {
    name: 'TV & Home Appliances',
    subcategories: [],
  },
  {
    name: 'Electronics Device',
    subcategories: [],
  },
  {
    name: 'Mother & Baby',
    subcategories: [],
  },
  {
    name: 'Automotive & Motorbike',
    subcategories: [],
  },
  {
    name: 'Sports & Outdoors',
    subcategories: [],
  },
  {
    name: 'Home & Lifestyle',
    subcategories: [],
  },
  {
    name: 'Groceries',
    subcategories: [],
  },
  {
    name: 'Health & Beauty',
    subcategories: [],
  },
  {
    name: 'Watches, Bags, Jewellery',
    subcategories: [],
  },
];

const CategoryMenu = () => {
  const [activeMain, setActiveMain] = useState(null);
  const [activeSub, setActiveSub] = useState(null);

  return (
    <div className="bg-[#1c1c1c] text-white text-sm w-full shadow-md">
      {/* Desktop View */}
      <div className="hidden md:flex h-[500px]">
        {/* Main Category */}
        <div className="w-60 bg-[#2c2c2c]">
          {categoryData.map((cat, i) => (
            <div
              key={i}
              onMouseEnter={() => {
                setActiveMain(i);
                setActiveSub(null);
              }}
              className={`px-4 py-2 cursor-pointer hover:bg-[#3d3d3d] ${
                activeMain === i ? 'bg-[#3d3d3d]' : ''
              }`}
            >
              {cat.name}
            </div>
          ))}
        </div>

        {/* Sub Category */}
        {activeMain !== null && categoryData[activeMain].subcategories?.length > 0 && (
          <div className="w-64 bg-[#1e1e1e] border-l border-gray-800">
            {categoryData[activeMain].subcategories.map((sub, j) => (
              <div
                key={j}
                onMouseEnter={() => setActiveSub(j)}
                className={`px-4 py-2 cursor-pointer hover:bg-[#333] ${
                  activeSub === j ? 'bg-[#333]' : ''
                }`}
              >
                {sub.name}
              </div>
            ))}
          </div>
        )}

        {/* Sub-Sub Category */}
        {activeMain !== null &&
          activeSub !== null &&
          categoryData[activeMain].subcategories[activeSub]?.items?.length > 0 && (
            <div className="w-64 bg-[#2b2b2b] border-l border-gray-800">
              {categoryData[activeMain].subcategories[activeSub].items.map((item, k) => (
                <div key={k} className="px-4 py-2 hover:text-orange-400 cursor-pointer">
                  {item}
                </div>
              ))}
            </div>
          )}
      </div>

      {/* Mobile View */}
      <div className="block md:hidden divide-y divide-gray-700">
        {categoryData.map((cat, i) => (
          <div key={i} className="px-4 py-3">
            <button
              onClick={() => setActiveMain(activeMain === i ? null : i)}
              className="w-full text-left font-semibold"
            >
              {cat.name}
            </button>

            {/* Subcategories */}
            {activeMain === i && cat.subcategories.length > 0 && (
              <div className="mt-2 ml-3 space-y-2">
                {cat.subcategories.map((sub, j) => (
                  <div key={j}>
                    <button
                      onClick={() => setActiveSub(activeSub === j ? null : j)}
                      className="w-full text-left text-sm"
                    >
                      ▸ {sub.name}
                    </button>

                    {/* Sub-sub-items */}
                    {activeSub === j && sub.items.length > 0 && (
                      <ul className="ml-4 mt-1 text-gray-300 space-y-1 text-xs">
                        {sub.items.map((item, k) => (
                          <li key={k} className="hover:text-yellow-400 cursor-pointer">
                            - {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryMenu;

