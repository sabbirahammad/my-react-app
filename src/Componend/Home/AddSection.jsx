import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Truck, BadgePercent, ThumbsUp } from "lucide-react";

const features = [
  {
    title: "Exclusive Designs",
    desc: "Curated styles that perfectly match your vibe and uniqueness.",
    icon: <Sparkles className="w-10 h-10 text-cyan-400" />,
  },
  {
    title: "Secure Checkout",
    desc: "We ensure complete safety with advanced data encryption.",
    icon: <ShieldCheck className="w-10 h-10 text-green-400" />,
  },
  {
    title: "Fast Delivery",
    desc: "Get your favorite items delivered swiftly to your doorstep.",
    icon: <Truck className="w-10 h-10 text-orange-400" />,
  },
  {
    title: "Member Discounts",
    desc: "Join our loyalty program to unlock exclusive savings.",
    icon: <BadgePercent className="w-10 h-10 text-pink-400" />,
  },
  {
    title: "Loved by All",
    desc: "Our community’s love and trust drive us to grow.",
    icon: <ThumbsUp className="w-10 h-10 text-yellow-400" />,
  },
];

const AdFeatureSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto text-center mb-16"
      >
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">
          Why Shop With Us?
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mt-4 text-lg">
          Experience premium quality, fast service, and exclusive offers built just for you.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            viewport={{ once: true }}
            className="group bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/10 hover:border-cyan-400 transition-all duration-300 rounded-2xl shadow-lg hover:shadow-cyan-600/30 p-6 text-center transform hover:-translate-y-1"
          >
            <div className="flex justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-300">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AdFeatureSection;
