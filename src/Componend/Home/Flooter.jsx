import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter a valid email address.");
      return;
    }
    setIsLoading(true);
    setError("");
    
    // Simulate API call
    setTimeout(() => {
      setSubscribed(true);
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <footer className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-16 px-6 overflow-hidden">
      {/* Background Parallax Layer */}
      <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/10 to-transparent opacity-30 pointer-events-none animate-pulse"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand & Contact Info */}
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold text-yellow-400 mb-4 cursor-pointer select-none tracking-tight">
              YourBrand
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering your style and lifestyle with premium products. Join our community to stay inspired.
            </p>
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-yellow-400" />
                <a href="mailto:support@yourbrand.com" className="hover:text-yellow-300 transition">
                  support@yourbrand.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <FaPhone className="text-yellow-400" />
                <a href="tel:+1234567890" className="hover:text-yellow-300 transition">
                  +1 (234) 567-890
                </a>
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-yellow-400" />
                <span>123 Tech Avenue, San Francisco, CA</span>
              </p>
            </div>
            <div className="flex space-x-4 mt-6 text-yellow-400 text-lg">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="hover:text-yellow-300 hover:scale-110 transition-all duration-300"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="hover:text-yellow-300 hover:scale-110 transition-all duration-300"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="hover:text-yellow-300 hover:scale-110 transition-all duration-300"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="hover:text-yellow-300 hover:scale-110 transition-all duration-300"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-5 border-b-2 border-yellow-400 pb-2">
              Quick Links
            </h2>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="/"
                  className="relative text-gray-300 hover:text-yellow-400 transition duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="relative text-gray-300 hover:text-yellow-400 transition duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full"
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="relative text-gray-300 hover:text-yellow-400 transition duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/brandpage"
                  className="relative text-gray-300 hover:text-yellow-400 transition duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full"
                >
                  Catagories
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="relative text-gray-300 hover:text-yellow-400 transition duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-5 border-b-2 border-yellow-400 pb-2">
              Support
            </h2>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="/helpdesk"
                  className="relative text-gray-300 hover:text-yellow-400 transition duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full"
                >
                  Help Desk
                </a>
              </li>
              <li>
                <a
                  href="/returns"
                  className="relative text-gray-300 hover:text-yellow-400 transition duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full"
                >
                  Returns
                </a>
              </li>
              <li>
                <a
                  href="/orders"
                  className="relative text-gray-300 hover:text-yellow-400 transition duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full"
                >
                  Order Status
                </a>
              </li>
              <li>
                <a
                  href="/payment"
                  className="relative text-gray-300 hover:text-yellow-400 transition duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full"
                >
                  Payment Options
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-5 border-b-2 border-yellow-400 pb-2">
              Newsletter
            </h2>
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all ${error ? "ring-2 ring-red-500" : ""}`}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    required
                    aria-label="Email for newsletter"
                  />
                  {error && (
                    <p className="absolute -bottom-6 left-0 text-red-500 text-xs">{error}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-yellow-400 text-black font-semibold py-3 rounded hover:bg-yellow-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"></path>
                      </svg>
                      Subscribing...
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </form>
            ) : (
              <p className="text-green-400 font-semibold flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Thank you for subscribing!
              </p>
            )}
            <p className="mt-4 text-gray-500 text-sm leading-relaxed">
              Stay ahead with exclusive offers and updates delivered to your inbox.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p className="select-none">© {new Date().getFullYear()} YourBrand. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="#privacy" className="hover:text-yellow-400 transition">Privacy Policy</a>
            <a href="#terms" className="hover:text-yellow-400 transition">Terms of Service</a>
            <a
              href="https://twitter.com/intent/tweet?text=Check%20out%20YourBrand!&url=https://yourbrand.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-yellow-400 transition"
            >
              Share on Twitter
            </a>
          </div>
        </div>
      </div>
      <style>
        {`
          .animate-pulse {
            animation: pulse 8s infinite ease-in-out;
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.5; }
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;