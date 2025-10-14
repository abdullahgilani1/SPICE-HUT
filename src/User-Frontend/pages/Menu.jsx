import React from 'react';
import { useNavigate } from 'react-router-dom';
import { menuCategories } from '../../data';

const Menu = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#FF6A00] flex flex-col">
      <main className="flex-1 py-12 px-4">
        <h1 className="text-5xl font-bold text-center text-white mb-2">Explore Our Menu</h1>
        <p className="text-center text-white text-lg mb-10">Select a category to discover our delicious offerings</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {menuCategories.map((cat, idx) => (
            <div
              key={cat.name}
              className="bg-black bg-opacity-70 rounded-2xl p-8 w-full max-w-[480px] min-h-[520px] mx-auto flex flex-col items-center justify-between cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
            onClick={() => navigate(`/user/menu/${encodeURIComponent(cat.name)}`)}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="rounded-2xl mb-4 object-contain w-full h-56"
              />
              <h3 className="font-bold text-2xl mb-2 text-white text-center">{cat.name}</h3>
              {cat.desc && (
                <p className="text-base mb-4 text-white/80 font-normal text-center">{cat.desc}</p>
              )}
              <div className="flex-1 flex flex-col justify-end w-full">
                <button className="mx-auto w-3/4 block bg-[#4B0B0B] text-white text-lg px-6 py-2 rounded hover:bg-[#FFB366] hover:text-black transition-all">Explore Menu</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Menu;
