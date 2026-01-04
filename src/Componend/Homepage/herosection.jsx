import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiZap } from 'react-icons/fi';

const heroImages = [
  {
    src: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    alt: 'Dark denim pocket close-up',
  },
  {
    src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
    alt: 'Person wearing denim jeans',
  },
  {
    src: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=600&q=80',
    alt: 'Stacked denim clothes',
  },
];

const HeroSection = () => {
  return (
    <section className="w-full pt-10 pb-8">
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white shadow-[0_20px_55px_rgba(79,70,229,0.32)]">
          <div className="relative flex flex-col md:flex-row items-center md:items-center gap-10 md:gap-12 px-8 sm:px-12 py-12">
            {/* Left content */}
            <div className="flex-1 flex flex-col justify-center space-y-7">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 rounded-full text-sm font-semibold backdrop-blur-md">
                <span className="p-1.5 rounded-full bg-white/20 grid place-items-center">
                  <FiZap className="text-yellow-300" />
                </span>
                #Big Fashion Sale
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight drop-shadow-[0_8px_18px_rgba(0,0,0,0.16)]">
                  Limited Time
                  <br />
                  <span className="text-yellow-300">50% OFF!</span>
                </h1>
                <p className="text-lg sm:text-xl text-white/90">
                  Redefine Your Everyday Style
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 bg-white text-indigo-700 font-semibold rounded-full shadow-xl hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-200"
                >
                  Shop Now
                  <FiArrowRight className="text-lg" />
                </Link>
              </div>
            </div>

            {/* Right gallery */}
            <div className="flex-1 flex items-end justify-center gap-4 sm:gap-5">
              {heroImages.map((img, index) => (
                <div
                  key={img.alt}
                  className="relative w-[150px] sm:w-[170px] md:w-[180px] lg:w-[200px] aspect-[3/4] rounded-[18px] overflow-hidden shadow-xl bg-black/10 border border-white/15 transition-transform duration-300"
                  style={{ transform: `translateY(${index === 1 ? '0' : index === 0 ? '18px' : '-6px'})` }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/18 to-transparent pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
          {/* Dots bottom left */}
          <div className="absolute bottom-6 left-8 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white/90" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/55" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/35" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
