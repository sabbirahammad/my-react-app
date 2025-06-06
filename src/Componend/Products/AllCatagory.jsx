import React, { useState } from "react";

const categories = [
  {
    title: "MENS",
    items: [
      "Half Sleeve T-shirt",
      "Full Sleeve T-shirt",
      "Drop Shoulder T-shirt",
      "Sports T-shirt",
      "Polo T-shirt",
      "Shirt",
      "Underwear",
      "Panjabi",
      "Denim Jeans",
      "Comfy Trouser",
      "Sports Trouser",
      "Joggers",
      "Hoodie",
      "Jacket",
      "Shorts",
    ],
  },
  {
    title: "ACCESSORIES",
    items: [
      "Socks",
      "Wallet",
      "Belt",
      "Cap",
      "Underwear",
      "Face Mask",
    ],
  },
  {
    title: "WOMENS",
    items: [
      "Kurti, Tunic & Tops",
      "Teens Kurti, Tunic & Tops",
      "T-Shirt",
      "Designer Pajamas",
      "Pants",
      "Palazzo",
      "Comfy Trouser",
    ],
  },
  {
    title: "KIDS (BOYS)",
    items: [
      "T-shirt",
      "Full Sleeve T-shirt",
      "Polo T-shirt",
      "Jacket",
      "Shorts",
      "Trouser",
      "Panjabi",
    ],
  },
  {
    title: "KIDS (GIRLS)",
    items: [
      "T-shirt",
      "Full Sleeve T-shirt",
      "Frock",
      "Two Piece Set",
      "Shorts",
      "Jacket",
      "Trouser",
    ],
  },
  {
    title: "SPORTS",
    items: [
      "Football Jersey",
      "Sports T-shirt",
      "Maggie (Single Jersey)",
      "Shorts",
      "Underwear",
      "Socks",
    ],
  },
];

const ShopDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="font-semibold text-gray-300 hover:text-white flex items-center gap-1"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        Shop
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-1/2 mt-2 bg-[#171717] text-gray-300 rounded shadow-lg w-[900px] p-6 grid grid-cols-6 gap-6 z-50"
          style={{ transform: "translateX(-50%)" }}
        >
          {categories.map((cat) => (
            <div key={cat.title}>
              <h3 className="font-semibold mb-3 text-white">{cat.title}</h3>
              <ul className="space-y-2 text-sm cursor-pointer">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopDropdown;