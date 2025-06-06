import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // ✅ FIXED
import image from '../../../src/imaze/braden-jarvis-77qXmvmLSWs-unsplash.jpg';

const HeroBanner = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.5, ease: 'easeOut' } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  const MotionLink = motion(Link);

  return (
    <div className="relative w-full h-[600px] bg-gray-100 overflow-hidden">
      <motion.img
        src={image}
        alt="Hero Banner"
        className="object-cover w-full h-full"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          className="text-white text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-lg"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          PREMIUM CLOTHING. <br /> AUTHENTIC STYLE.
        </motion.h1>

        <motion.p
          className="text-white text-lg md:text-xl lg:text-2xl mt-4 font-light tracking-wide drop-shadow-md"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          Discover the Finest Collection Tailored for You
        </motion.p>

        <MotionLink
          to="/products"
          className="mt-8 px-8 py-4 bg-yellow-500 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-yellow-600 transition-colors"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
        >
          Shop Now
        </MotionLink>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
};

export default HeroBanner;
