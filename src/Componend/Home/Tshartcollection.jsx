import React, { useState } from "react";
import { useProduct } from "../../Context/UseContext";

const TshirtShowcase = () => {
  const { products } = useProduct();
  const filteredProducts = products.slice(0, 6);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleName = (index) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
    <section className="bg-gray-900 py-20 px-6 min-h-screen text-white font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {filteredProducts.map((item, index) => (
            <div
              key={item.id || index}
              className="relative rounded-2xl shadow-2xl overflow-hidden cursor-pointer"
              onClick={() => toggleName(index)}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-96 object-cover rounded-2xl"
                loading="lazy"
              />

              {/* Name container */}
              <div
                className={`absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white px-4 py-3
                  transform transition-transform duration-300 ease-in-out
                  ${activeIndex === index ? "translate-y-0" : "translate-y-full"}
                `}
                style={{ pointerEvents: "none" }}
              >
                <h3
                  className="text-xl font-semibold"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {item.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TshirtShowcase;
