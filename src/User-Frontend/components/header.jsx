import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiShoppingCart } from 'react-icons/fi';

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-black shadow-md py-6 px-8 flex flex-col md:flex-row items-center justify-between">
      {/* Left: Restaurant Name */}
      <div className="text-2xl font-bold text-white mb-4 md:mb-0">
        Spice Hut
      </div>

      {/* Center: Navigation Links */}
      <nav className="flex space-x-10 mb-4 md:mb-0">
        <Link to="/user/intro" className="text-white hover:text-[#FF6A00] transition">Intro</Link>
        <Link to="/user/home" className="text-white hover:text-[#FF6A00] transition">Home</Link>
        <Link to="/user/menu" className="text-white hover:text-[#FF6A00] transition">Menu</Link>
        <Link to="/user/support" className="text-white hover:text-[#FF6A00] transition">Support</Link>
      </nav>

      {/* Right: Icons */}
      <div className="flex items-center space-x-4">
        <button onClick={() => setShowSearch(!showSearch)} className="text-white hover:text-[#FF6A00]">
          <FiSearch size={24} />
        </button>
        <button onClick={() => navigate('/user/profile')} className="text-white hover:text-[#FF6A00]">
          <FiUser size={24} />
        </button>
        <button onClick={() => navigate('/user/cart')} className="text-white hover:text-[#FF6A00]">
          <FiShoppingCart size={24} />
        </button>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="mt-4 md:mt-0 md:ml-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search..."
            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      )}
    </header>
  );
};

export default Header;
