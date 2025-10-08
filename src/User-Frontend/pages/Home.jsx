import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUtensils, FaTruck, FaStar } from 'react-icons/fa';
import butterChickenImg from '../../assets/ButterChicken @ Spice Hut. .jpg';
import kormaImg from '../../assets/Korma @ Spice Hut. .jpg';
import tandooriImg from '../../assets/Tandoori Chicken Tikka .jpg';
import biryaniImg from '../../assets/Biryani.jpg';
import vegetableImg from '../../assets/Aalo Gobi (Cauliflower).jpg';
import naanImg from '../../assets/Qeema Naan.jpg';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#FF6A00] flex flex-col">
      <main className="flex flex-col flex-1">
        {/* Picture section with overlaid text */}
        <div className="relative">
          <img src="/home.jpg" alt="Spice Hut" className="w-full h-180 object-cover brightness-70" />
          <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 text-white">
            <div className="text-center">
              <h1 className="text-6xl font-bold mb-4">Spice Hut</h1>
              <p className="text-lg">Most of our dishes are gluten free & lactose free</p>
            </div>
          </div>
        </div>

        {/* Expert chefs, fast delivery, premium quality section */}
        <section className="bg-[#B35B00] text-white py-14 flex justify-around text-center">
          <div>
            <FaUtensils className="text-4xl mx-auto mb-2" />
            <h3 className="font-bold mb-1">Expert Chefs</h3>
            <p className="text-sm">Authentic recipes prepared by master chefs</p>
          </div>
          <div>
            <FaTruck className="text-4xl mx-auto mb-2" />
            <h3 className="font-bold mb-1">Fast Delivery</h3>
            <p className="text-sm">Hot and fresh meals delivered in 30 minutes</p>
          </div>
          <div>
            <FaStar className="text-4xl mx-auto mb-2" />
            <h3 className="font-bold mb-1">Premium Quality</h3>
            <p className="text-sm">Only the finest ingredients in every dish</p>
          </div>
        </section>

        {/* Our Menu Categories */}
        <section className="bg-[#FF7F00] text-white py-14 px-1">
          <h2 className="text-6xl font-bold mb-4 text-center">Our Menu Categories</h2>
          <p className="text-center text-xl mb-16">Discover our carefully curated selection of authentic dishes, each prepared with passion and tradition</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Only show 6 categories */}
            <div className="bg-black bg-opacity-70 rounded-2xl p-8 w-full max-w-[500px] min-h-[520px] mx-auto flex flex-col items-center justify-between cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg" onClick={() => navigate(`/user/menu/${encodeURIComponent('Butter Dishes')}`)}>
              <img src={butterChickenImg} alt="Butter Dishes" className="rounded-2xl mb-4 object-contain w-full h-56" />
              <h3 className="font-bold text-2xl mb-2">Butter Dishes</h3>
              <div className="flex-1 flex flex-col justify-end w-full">
                <button className="mx-auto w-3/4 block bg-[#4B0B0B] text-white text-lg px-6 py-2 rounded hover:bg-[#FFB366] hover:text-black transition-all">Explore Menu</button>
              </div>
            </div>
            <div className="bg-black bg-opacity-70 rounded-2xl p-8 w-full max-w-[500px] min-h-[520px] mx-auto flex flex-col items-center justify-between cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg" onClick={() => navigate(`/user/menu/${encodeURIComponent('Korma Dishes')}`)}>
              <img src={kormaImg} alt="Korma" className="rounded-2xl mb-4 object-contain w-full h-56" />
              <h3 className="font-bold text-2xl mb-2">Korma Dishes</h3>
              <div className="flex-1 flex flex-col justify-end w-full">
                <button className="mx-auto w-3/4 block bg-[#4B0B0B] text-white text-lg px-6 py-2 rounded hover:bg-[#FFB366] hover:text-black transition-all">Explore Menu</button>
              </div>
            </div>
            <div className="bg-black bg-opacity-70 rounded-2xl p-8 w-full max-w-[500px] min-h-[520px] mx-auto flex flex-col items-center justify-between cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg" onClick={() => navigate(`/user/menu/${encodeURIComponent('Tandoori Dishes')}`)}>
              <img src={tandooriImg} alt="Tandoori Chicken Tikka" className="rounded-2xl mb-4 object-contain w-full h-56" />
              <h3 className="font-bold text-2xl mb-2">Tandoori Dishes</h3>
              <div className="flex-1 flex flex-col justify-end w-full">
                <button className="mx-auto w-3/4 block bg-[#4B0B0B] text-white text-lg px-6 py-2 rounded hover:bg-[#FFB366] hover:text-black transition-all">Explore Menu</button>
              </div>
            </div>
            <div className="bg-black bg-opacity-70 rounded-2xl p-8 w-full max-w-[500px] min-h-[520px] mx-auto flex flex-col items-center justify-between cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg" onClick={() => navigate(`/user/menu/${encodeURIComponent('Biryani Dishes')}`)}>
              <img src={biryaniImg} alt="Biryani" className="rounded-2xl mb-4 object-contain w-full h-56" />
              <h3 className="font-bold text-2xl mb-2">Biryani Dishes</h3>
              <div className="flex-1 flex flex-col justify-end w-full">
                <button className="mx-auto w-3/4 block bg-[#4B0B0B] text-white text-lg px-6 py-2 rounded hover:bg-[#FFB366] hover:text-black transition-all">Explore Menu</button>
              </div>
            </div>
            <div className="bg-black bg-opacity-70 rounded-2xl p-8 w-full max-w-[500px] min-h-[520px] mx-auto flex flex-col items-center justify-between cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg" onClick={() => navigate(`/user/menu/${encodeURIComponent('Vegetable Dishes')}`)}>
              <img src={vegetableImg} alt="Aalo Gobi (Cauliflower)" className="rounded-2xl mb-4 object-contain w-full h-56" />
              <h3 className="font-bold text-2xl mb-2">Vegetable Dishes</h3>
              <div className="flex-1 flex flex-col justify-end w-full">
                <button className="mx-auto w-3/4 block bg-[#4B0B0B] text-white text-lg px-6 py-2 rounded hover:bg-[#FFB366] hover:text-black transition-all">Explore Menu</button>
              </div>
            </div>
            <div className="bg-black bg-opacity-70 rounded-2xl p-8 w-full max-w-[500px] min-h-[520px] mx-auto flex flex-col items-center justify-between cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg" onClick={() => navigate(`/user/menu/${encodeURIComponent('Indian Naan Bread')}`)}>
              <img src={naanImg} alt="Qeema Naan" className="rounded-2xl mb-4 object-contain w-full h-56" />
              <h3 className="font-bold text-2xl mb-2">Indian Naan Bread</h3>
              <div className="flex-1 flex flex-col justify-end w-full">
                <button className="mx-auto w-3/4 block bg-[#4B0B0B] text-white text-lg px-6 py-2 rounded hover:bg-[#FFB366] hover:text-black transition-all">Explore Menu</button>
              </div>
            </div>
          </div>
        </section>

        {/* Ready to Order Section */}
        <section className="bg-[#4B0B0B] text-white py-8 text-center">
          <h2 className="text-3xl font-bold mb-2">Ready to Order?</h2>
          <p className="mb-4">Join thousands of satisfied customers who trust us for their dining experience</p>
          <div className="flex justify-center space-x-4">
            <button className="border border-white px-6 py-2 rounded text-white font-semibold">Start Ordering</button>
            <button className="border border-white px-6 py-2 rounded text-white font-semibold">View Full Menu</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
