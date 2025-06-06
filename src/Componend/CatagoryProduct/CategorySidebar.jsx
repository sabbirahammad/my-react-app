import React, { useState } from 'react';
import { useSidebarData } from '../../Context/SidebarDataContext';
import { useProduct } from '../../Context/UseContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Section = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-700 pb-2">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full font-semibold mb-1 text-left"
      >
        <span>{title}</span>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {open && <div className="pl-1 space-y-2">{children}</div>}
    </div>
  );
};

const CategorySidebar = () => {
  const {
    categories,
    brands,
    services,
    shoppingFrom,
    colorFamily,
  } = useSidebarData();

  const {
    setSelectedCategory,
    setSelectedBrand,
    setSelectedServices,
    setSelectedShoppingFrom,
    setSelectedColorFamily,
  } = useProduct();

  const [showMore, setShowMore] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setSelectedCategory(category);
  };

  const handleCheckboxChange = (value, setFunction) => {
    setFunction((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="bg-[#1c1c1c] text-white p-4 w-full md:w-64 text-sm space-y-4 rounded-lg shadow-md">
      {/* Category */}
      <Section title="Category">
        <ul className="space-y-1">
          {(showMore ? categories : categories.slice(0, 6)).map((cat, index) => (
            <li
              key={index}
              className={`cursor-pointer hover:text-orange-400 transition ${
                activeCategory === (cat.name || cat) ? 'text-orange-500 font-medium' : ''
              }`}
              onClick={() => handleCategoryClick(typeof cat === 'object' ? cat.name : cat)}
            >
              {typeof cat === 'object' ? cat.name : cat}
            </li>
          ))}
          {!showMore && (
            <li>
              <button
                className="text-cyan-400 hover:underline text-xs mt-1"
                onClick={() => setShowMore(true)}
              >
                VIEW MORE
              </button>
            </li>
          )}
        </ul>
      </Section>

      {/* Brand */}
      <Section title="Brand">
        {brands.map((brand, index) => (
          <label key={index} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="accent-orange-500"
              onChange={() => handleCheckboxChange(brand, setSelectedBrand)}
            />
            <span>{brand}</span>
          </label>
        ))}
      </Section>

      {/* Services */}
      <Section title="Service">
        {services.map((srv, index) => (
          <label key={index} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="accent-orange-500"
              onChange={() => handleCheckboxChange(srv, setSelectedServices)}
            />
            <span>{srv}</span>
          </label>
        ))}
      </Section>

      {/* Shopping From */}
      <Section title="Shopping From">
        {shoppingFrom.map((shop, index) => (
          <label key={index} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="accent-orange-500"
              onChange={() => handleCheckboxChange(shop, setSelectedShoppingFrom)}
            />
            <span>{shop}</span>
          </label>
        ))}
      </Section>

      {/* Color Family */}
      <Section title="Color Family">
        {colorFamily.map((color, index) => (
          <label key={index} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="accent-orange-500"
              onChange={() => handleCheckboxChange(color, setSelectedColorFamily)}
            />
            <span>{color}</span>
          </label>
        ))}
      </Section>
    </div>
  );
};

export default CategorySidebar;




