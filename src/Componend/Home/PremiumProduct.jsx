import React from "react";
import { useProduct } from "../../Context/UseContext";

const ProductShowcase = () => {
  const { products } = useProduct();

  if (!products || products.length === 0) {
    return (
      <section className="bg-gradient-to-b from-gray-900 to-black min-h-screen flex items-center justify-center p-6">
        <div className="text-center text-gray-300 animate-fade-in">
          <h2 className="text-4xl font-extrabold mb-4 tracking-tight">No Products Available</h2>
          <p className="text-lg">Check back soon for exciting new items!</p>
        </div>
      </section>
    );
  }

  const displayProducts = products.slice(0, 7);

  return (
    <section className="bg-gradient-to-b from-gray-900 to-black min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-center text-white text-5xl font-extrabold mb-16 tracking-wide"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Explore Our Premium Collection
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayProducts.map((product, i) => (
            <div
              key={product.id || i}
              className="group relative flex flex-col bg-gray-800 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              tabIndex={0}
              aria-label={`Product: ${product.name || "Unnamed Product"}`}
            >
              <img
                src={product.image || "https://via.placeholder.com/300x200?text=No+Image"}
                alt={product.name || "Product"}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-4">
                <span className="text-white text-lg font-semibold">
                  ৳{product.price ?? 670}.00
                </span>
                {product.originalPrice && (
                  <span className="text-gray-400 line-through text-sm ml-3">
                    ৳{product.originalPrice}
                  </span>
                )}
              </div>
              <div className="p-4 text-center">
                <h3 className="text-white text-base font-medium truncate">
                  {product.name || "Unnamed Product"}
                </h3>
              </div>
            </div>
          ))}

          {/* VIEW MORE Card */}
          <div
            className="group relative flex flex-col bg-gray-800 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            tabIndex={0}
            aria-label="View more products"
            onClick={() => console.log("View more clicked")}
          >
            <img
              src="https://via.placeholder.com/300x200?text=More"
              alt="View More Products"
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 brightness-50"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold text-lg tracking-wide transform transition-all duration-300 group-hover:bg-yellow-400 group-hover:text-black">
                View More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
