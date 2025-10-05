import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed with ${email}`);
    setEmail("");
  };

  return (
    <footer className="bg-black text-white pt-10 pb-6 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        {/* Brand Info */}
        <div>
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <span className="bg-red-900 rounded-full w-6 h-6 flex justify-center items-center">s</span> Savory
          </h2>
          <p className="mb-4">
            Experience the finest culinary journey with our premium dishes crafted from authentic recipes and served with passion.
          </p>
          <div className="flex gap-4 text-lg">
            <a href="#" aria-label="Facebook" className="hover:text-red-900"><FaFacebookF /></a>
            <a href="#" aria-label="Instagram" className="hover:text-red-900"><FaInstagram /></a>
            <a href="#" aria-label="Twitter" className="hover:text-red-900"><FaTwitter /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="/menu" className="hover:text-red-900">Our Menu</a></li>
            <li><a href="/about" className="hover:text-red-900">About Us</a></li>
            <li><a href="/reservations" className="hover:text-red-900">Reservations</a></li>
            <li><a href="/catering" className="hover:text-red-900">Catering</a></li>
            <li><a href="/support" className="hover:text-red-900">Support</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-3">Contact Info</h3>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt /> 123 Culinary Street, Food District, City 12345
            </li>
            <li className="flex items-center gap-2">
              <FaPhone /> +1 (555) 123-4567
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope /> hello@savory.com
            </li>
            <li className="flex items-center gap-2">
              Mon-Sun: 11AM - 11PM
            </li>
          </ul>
        </div>

        {/* Stay Updated */}
        <div>
          <h3 className="font-semibold mb-3">Stay Updated</h3>
          <p className="mb-3 text-xs">
            Subscribe to our newsletter for special offers and new menu updates.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-[#2a1f0f] rounded px-3 py-2 text-white text-sm placeholder:text-[#7a5a3a]"
            />
            <button
              type="submit"
              className="bg-red-900 py-2 rounded text-sm hover:bg-red-800"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-xs text-gray-400">
        © 2025 Savory Restaurant. All rights reserved. |{" "}
        <a href="/privacy" className="hover:text-red-900">Privacy Policy</a> |{" "}
        <a href="/terms" className="hover:text-red-900">Terms of Service</a>
      </div>
    </footer>
  );
};

export default Footer;
