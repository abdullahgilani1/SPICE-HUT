import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white text-center py-6">
      <p>&copy; 2025 Spice Hut. All rights reserved.</p>
      <br />
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-4">
          <br />
          <Link to="/user/about-us" className="hover:text-[#FF6A00] transition-colors">About Us</Link>
          <Link to="/user/contact" className="hover:text-[#FF6A00] transition-colors">Contact</Link>
          <Link to="/user/policies" className="hover:text-[#FF6A00] transition-colors">Policies</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
