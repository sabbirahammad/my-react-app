import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-[#121318] text-white min-h-screen px-6 py-12 md:px-20">
      {/* Heading */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About ELITEPASS</h1>
        <p className="text-gray-300 text-lg">
          Discover our story, mission, and what makes us different in the world of fashion.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto space-y-12 text-gray-300 leading-relaxed text-base md:text-lg">
        <section>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-2">Who We Are</h2>
          <p>
            ELITEPASS is a premium fashion brand dedicated to delivering high-quality, authentic
            clothing that blends modern style with timeless confidence. We're more than just a brand — 
            we’re a movement of individuality and expression.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-2">Our Mission</h2>
          <p>
            Our mission is simple: to empower individuals through style. We believe in sustainability,
            transparency, and creating clothing that makes you feel confident, comfortable, and proud.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-2">What We Offer</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Authentic, high-quality clothing</li>
            <li>Custom print & premium collections</li>
            <li>Ethical production & eco-friendly packaging</li>
            <li>Exceptional customer service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-2">Why Choose ELITEPASS?</h2>
          <p>
            Because we don't just sell clothes — we deliver confidence. With every piece you wear,
            you're joining a community that values quality, creativity, and expression.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
