import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ads = [
  {
    title: "🔥 Hot Deal: 50% OFF on Men's T-Shirts!",
    subtitle: "Upgrade your style today.",
    bgGradient: 'bg-gradient-to-r from-red-700 via-red-600 to-red-500',
  },
  {
    title: "🌿 Fresh New Arrivals for Women",
    subtitle: "Discover your new favorite outfit.",
    bgGradient: 'bg-gradient-to-r from-green-700 via-green-600 to-green-500',
  },
  {
    title: "🚚 Free Shipping on Orders Over $50",
    subtitle: "Shop more, save more!",
    bgGradient: 'bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500',
  },
  {
    title: "🎉 Limited Offer: Buy 1 Get 1 Free",
    subtitle: "Hurry, don't miss this deal!",
    bgGradient: 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 text-black',
  },
];

const variants = {
  enter: {
    opacity: 0,
    y: 50,
    scale: 0.85,
  },
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    y: -50,
    scale: 0.85,
  },
};

const AdSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % ads.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const ad = ads[index];

  return (
    <div
      className="relative mx-auto my-6 rounded-2xl overflow-hidden shadow-2xl"
      style={{ width: '1650px', height: '400px' }}
      aria-label="Advertisement banner"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1, ease: "easeInOut" }}
          className={`${ad.bgGradient} w-full h-full flex flex-col justify-center items-center px-16 text-center`}
        >
          <h1 className="text-6xl font-extrabold drop-shadow-lg mb-4">
            {ad.title}
          </h1>
          <p className="text-2xl font-semibold drop-shadow-md">
            {ad.subtitle}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-5">
        {ads.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-5 h-5 rounded-full focus:outline-none transition-colors ${
              i === index ? 'bg-white' : 'bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to ad ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AdSection;
