import React from 'react';
import { useNavigate } from 'react-router-dom';


// Only categories from the provided list, with best-matching images from public folder
const menuCategories = [
  {
    name: 'Appetizers',
    image: 'Samosa .jpg',
  },
  {
    name: 'Butter Dishes',
    image: 'butter chicken.jpg',
    desc: 'Butter dishes are curries made from chicken or paneer with a spiced tomato and butter (makhan) sauce, known for their rich, silky texture.'
  },
  {
    name: 'Korma Dishes',
    image: 'korma.jpg',
    desc: 'Korma is a dish where meat or vegetables are braised with yogurt or cream, spices, and nuts for a mild, aromatic curry.'
  },
  {
    name: 'Curry Dishes',
    image: 'Curry..jpg',
    desc: 'Classic Indian curries with a blend of spices, tomatoes, onions, and herbs.'
  },
  {
    name: 'Masala Dishes',
    image: 'Chana Masala.jpg',
    desc: 'Masala dishes feature a rich, spiced gravy with a variety of proteins or vegetables.'
  },
  {
    name: 'Coconut Curry Dishes',
    image: 'Cocnut Curry.jpg',
    desc: 'Creamy coconut-based curries with aromatic spices and herbs.'
  },
  {
    name: 'Tandoori Dishes',
    image: 'Tandoori Chicken Tikka .jpg',
    desc: 'Prepared by roasting marinated meat or paneer in a traditional clay oven (tandoor).'
  },
  {
    name: 'Biryani Dishes',
    image: 'Biryani.jpg',
    desc: 'Fragrant basmati rice cooked with spices, saffron, and your choice of meat or vegetables.'
  },
  {
    name: 'Karahi Dishes',
    image: 'Clay Oven (Tandoor).jpg',
    desc: 'Karahi dishes are cooked in a wok-like pan with tomatoes, peppers, and spices.'
  },
  {
    name: 'Vindaloo Dishes',
    image: 'Curry..jpg',
    desc: 'A spicy Goan curry with vinegar, chili, and aromatic spices.'
  },
  {
    name: 'Jalfrezi Dishes',
    image: 'Jalfrezi.jpg',
    desc: 'Jalfrezi is a stir-fried curry with peppers, onions, and a tangy tomato-based sauce.'
  },
  {
    name: 'Palak Dishes',
    image: 'Palak Paneer.jpg',
    desc: 'Palak dishes feature spinach cooked with spices and often paneer or meat.'
  },
  {
    name: 'Mango Curry Dishes',
    image: 'Curry..jpg',
    desc: 'Sweet and tangy mango-based curries with a blend of spices.'
  },
  {
    name: 'Vegetable Dishes',
    image: 'Aalo Gobi (Cauliflower).jpg',
    desc: 'A variety of vegetarian specialties made with fresh vegetables and spices.'
  },
  {
    name: 'Indian Naan Bread',
    image: 'Garlic Naan..jpg',
    desc: 'Traditional Indian flatbreads baked in a tandoor, including garlic naan and stuffed naan.'
  },
  {
    name: 'Salads & Sides',
    image: 'SALAD.jpg',
    desc: 'Fresh salads and classic Indian side dishes to complement your meal.'
  },
  {
    name: 'Spice Hut Combo Specials',
    image: 'Spice hut.jpg',
    desc: 'Specially curated combo meals for a complete dining experience.'
  },
  {
    name: 'Indian Desserts',
    image: 'Gulab Jamun..jpg',
    desc: 'Traditional Indian sweets like Gulab Jamun, Ras Malayi, and more.'
  },
];


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
            onClick={() => navigate(`${encodeURIComponent(cat.name)}`)}
            >
              <img
                src={`/${cat.image}`}
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
