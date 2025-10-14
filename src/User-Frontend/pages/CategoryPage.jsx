import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context.cart.jsx';
import { dishImages, placeholderImage } from '../dishImages';

// Dishes data by category
const DISHES = {
  'Appetizers': [
    { name: 'Papadums (2 pcs)', price: 5.95, tags: ['LF'] },
    { name: 'Veggie Pakora', price: 9.95, tags: ['LF'] },
    { name: 'Paneer Pakora', price: 11.95, tags: ['LF'] },
    { name: 'Chicken Pakora', price: 13.95, tags: ['LF'] },
    { name: 'Fish Pakora', price: 13.95, tags: ['LF'] },
    { name: 'Prawn Pakora', price: 14.95, tags: ['LF'] },
    { name: 'Vegetable Samosa (2 pcs)', price: 9.95, tags: ['LF'] },
    { name: 'Chicken Samosa (2 pcs)', price: 9.95, tags: ['LF'] },
    { name: 'Beef Samosa (2 pcs)', price: 10.95, tags: ['LF'] },
  ],
  'Butter Dishes': [
    { name: 'Butter Chicken', price: 19.95, tags: ['GF'], desc: 'Butter curry made with spiced tomato & butter (makhani) sauce; rich and creamy texture.' },
    { name: 'Butter Beef', price: 21.95, tags: ['GF'] },
    { name: 'Butter Lamb', price: 23.95, tags: ['GF'] },
    { name: 'Butter Prawns', price: 24.95, tags: ['GF'] },
  ],
  'Korma Dishes': [
    { name: 'Chicken Korma', price: 19.95, tags: ['GF'], desc: 'Korma is braised meat cooked with yogurt and spices for a creamy flavor.' },
    { name: 'Beef Korma', price: 21.95, tags: ['GF'] },
    { name: 'Lamb Korma', price: 23.95, tags: ['GF'] },
    { name: 'Prawn Korma', price: 24.95, tags: ['GF'] },
  ],
  'Curry Dishes': [
    { name: 'Chicken Curry', price: 19.95, tags: ['GF'] },
    { name: 'Beef Curry', price: 21.95, tags: ['GF'] },
    { name: 'Lamb Curry', price: 23.95, tags: ['GF'] },
    { name: 'Prawn Curry', price: 24.95, tags: ['GF'] },
    { name: 'Fish Curry', price: 24.95, tags: ['GF'] },
  ],
  'Masala Dishes': [
    { name: 'Chicken Masala', price: 19.95 },
    { name: 'Beef Masala', price: 21.95 },
    { name: 'Lamb Masala', price: 23.95 },
    { name: 'Prawn Masala', price: 24.95 },
  ],
  'Coconut Curry Dishes': [
    { name: 'Coconut Chicken Curry', price: 19.95, tags: ['GF'] },
    { name: 'Coconut Beef Curry', price: 21.95, tags: ['GF'] },
    { name: 'Coconut Lamb Curry', price: 23.95, tags: ['GF'] },
    { name: 'Coconut Prawn Curry', price: 24.95, tags: ['GF'] },
  ],
  'Tandoori Dishes': [
    { name: 'Tandoori Chicken Tikka (Boneless)', price: 21.95, tags: ['GF'], desc: 'Tandoori dishes are cooked in a clay oven and served with rice, butter sauce, salad & dressing.' },
    { name: 'Tandoori Malai Tikka (Boneless)', price: 21.95, tags: ['GF'] },
    { name: 'Tandoori Mint Chicken Tikka (Boneless)', price: 21.95, tags: ['GF'] },
    { name: 'Tandoori Chicken (Bone-In)', price: 21.95, tags: ['GF'] },
    { name: 'Tandoori Beef Kebab', price: 21.95, tags: ['GF'] },
    { name: 'Tandoori Fish Tikka', price: 24.95, tags: ['GF'] },
    { name: 'Tandoori Prawn Tikka', price: 24.95, tags: ['GF'] },
    { name: 'Tandoori Mixed Platter', price: 29.95, tags: ['GF'], desc: 'Includes Chicken Tikka, Malai Tikka, Beef Kebab & Prawn Tikka' },
  ],
  'Biryani Dishes': [
    { name: 'Saffron Basmati Rice', price: 5.95, tags: ['GF'] },
    { name: 'Vegetable Biryani', price: 19.95, tags: ['GF'] },
    { name: 'Chicken Biryani', price: 19.95, tags: ['GF'] },
    { name: 'Beef Biryani', price: 21.95, tags: ['GF'] },
    { name: 'Lamb Biryani', price: 23.95, tags: ['GF'] },
    { name: 'Prawn Biryani', price: 24.95, tags: ['GF'] },
  ],
  'Karahi Dishes': [
    { name: 'Chicken Karahi', price: 19.95, tags: ['GF'] },
    { name: 'Beef Karahi', price: 21.95, tags: ['GF'] },
    { name: 'Lamb Karahi', price: 23.95, tags: ['GF'] },
    { name: 'Prawn Karahi', price: 24.95, tags: ['GF'] },
  ],
  'Vindaloo Dishes': [
    { name: 'Chicken Vindaloo', price: 19.95 },
    { name: 'Beef Vindaloo', price: 21.95 },
    { name: 'Lamb Vindaloo', price: 23.95 },
    { name: 'Prawn Vindaloo', price: 24.95 },
  ],
  'Jalfrezi Dishes': [
    { name: 'Chicken Jalfrezi', price: 19.95, tags: ['GF'] },
    { name: 'Beef Jalfrezi', price: 21.95, tags: ['GF'] },
    { name: 'Lamb Jalfrezi', price: 23.95, tags: ['GF'] },
    { name: 'Prawn Jalfrezi', price: 24.95, tags: ['GF'] },
  ],
  'Palak Dishes': [
    { name: 'Palak Chicken', price: 19.95, tags: ['GF'] },
    { name: 'Palak Beef', price: 21.95, tags: ['GF'] },
    { name: 'Palak Lamb', price: 23.95, tags: ['GF'] },
    { name: 'Palak Prawn', price: 24.95, tags: ['GF'] },
  ],
  'Mango Curry Dishes': [
    { name: 'Mango Chicken Curry', price: 19.95, tags: ['GF'] },
    { name: 'Mango Beef Curry', price: 21.95, tags: ['GF'] },
    { name: 'Mango Lamb Curry', price: 23.95, tags: ['GF'] },
    { name: 'Mango Fish Curry', price: 24.95, tags: ['GF'] },
    { name: 'Mango Prawn Curry', price: 24.95, tags: ['GF'] },
  ],
  'Vegetable Dishes': [
    { name: 'Daal Makhni', price: 17.95, tags: ['GF', 'LF'] },
    { name: 'Veggie Korma', price: 17.95, tags: ['GF'] },
    { name: 'Chana Masala', price: 17.95, tags: ['GF'] },
    { name: 'Daal', price: 17.95, tags: ['GF'] },
    { name: 'Aalo Gobi', price: 17.95, tags: ['GF'] },
    { name: 'Vegetable Jalfrezi', price: 17.95, tags: ['GF'] },
    { name: 'Shahi Paneer', price: 19.95, tags: ['GF'] },
    { name: 'Palak Paneer', price: 19.95, tags: ['GF'] },
    { name: 'Muttar Paneer', price: 19.95, tags: ['GF'] },
    { name: 'Karahi Paneer', price: 19.95, tags: ['GF'] },
    { name: 'Bhindi Masala', price: 17.95, tags: ['GF'] },
    { name: 'Eggplant Bharta', price: 17.95, tags: ['GF'] },
    { name: 'Butter Veggie', price: 17.95, tags: ['GF'] },
    { name: 'Butter Sauce', price: 13.95, tags: ['GF'] },
  ],
  'Indian Naan Bread': [
    { name: 'Traditional Naan', price: 3.95 },
    { name: 'Roti', price: 3.95 },
    { name: 'Garlic Naan', price: 4.95 },
    { name: 'Veggie Stuffed Naan', price: 7.95 },
    { name: 'Coconut Naan', price: 8.95, desc: 'with shredded coconut & honey' },
    { name: 'Chicken Keema Naan', price: 9.95, desc: 'spiced chicken cooked in tandoor' },
    { name: 'Beef Keema Naan', price: 10.95, desc: 'spiced beef cooked in tandoor' },
  ],
  'Salads & Sides': [
    { name: 'Mango Chutney', price: 4.95, tags: ['GF', 'LF'] },
    { name: 'Achar Mixed (Pickles)', price: 4.95, tags: ['GF', 'LF'] },
    { name: 'Raita', price: 6.95, tags: ['GF', 'LF'] },
    { name: 'Spice Hut Salad', price: 9.95, tags: ['GF', 'LF'] },
  ],
  'Spice Hut Combo Specials': [
    { name: 'Butter Chicken Combo', price: 34.95, desc: 'includes pakora, naan/rice, drink & dessert' },
    { name: 'Biryani Combo', price: 34.95 },
    { name: 'Beef Combo', price: 36.95 },
    { name: 'Lamb Combo', price: 38.95 },
    { name: 'Prawn Combo', price: 39.95 },
  ],
  'Indian Desserts': [
    { name: 'Gulab Jaman', price: 7.95, desc: 'Indian milk balls in honey syrup' },
    { name: 'Kheer', price: 7.95, desc: 'rice pudding with cardamom & pistachios' },
    { name: 'Kulfi', price: 7.95, desc: 'traditional Indian ice cream' },
    { name: 'Ras Malai (2 pcs)', price: 7.95, desc: 'sweet cottage cheese dessert served chilled' },
  ],
};

const tagColors = {
  GF: 'bg-green-600',
  LF: 'bg-blue-600',
};

const CategoryPage = () => {
  const { category } = useParams();
  const { addToCart } = useCart();
  const decodedCategory = decodeURIComponent(category);
  const dishes = DISHES[decodedCategory] || [];

  // Find category image from Menu.jsx mapping
  const categoryImages = {
    'Appetizers': 'Samosa .jpg',
    'Butter Dishes': 'butter chicken.jpg',
    'Korma Dishes': 'korma.jpg',
    'Curry Dishes': 'Curry..jpg',
    'Masala Dishes': 'Chana Masala.jpg',
    'Coconut Curry Dishes': 'Cocnut Curry.jpg',
    'Tandoori Dishes': 'Tandoori Chicken Tikka .jpg',
    'Biryani Dishes': 'Biryani.jpg',
    'Karahi Dishes': 'Clay Oven (Tandoor).jpg',
    'Vindaloo Dishes': 'Curry..jpg',
    'Jalfrezi Dishes': 'Jalfrezi.jpg',
    'Palak Dishes': 'Palak Paneer.jpg',
    'Mango Curry Dishes': 'Curry..jpg',
    'Vegetable Dishes': 'Aalo Gobi (Cauliflower).jpg',
    'Indian Naan Bread': 'Garlic Naan..jpg',
    'Salads & Sides': 'SALAD.jpg',
    'Spice Hut Combo Specials': 'Spice hut.jpg',
    'Indian Desserts': 'Gulab Jamun..jpg',
  };

  // Helper to get dish image
  function getDishImage(dishName, categoryName) {
    // Try dish-specific image
    const key = dishName.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (dishImages[key]) return `/${dishImages[key]}`;
    // Fallback to category image
    if (categoryImages[categoryName]) return `/${categoryImages[categoryName]}`;
    // Fallback to placeholder
    return `/${placeholderImage}`;
  }

  return (
    <div className="min-h-screen bg-[#FF6A00] flex flex-col">
      <main className="flex-1 py-12 px-4">
        <h1 className="text-4xl font-bold text-center text-white mb-8">{decodedCategory}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {dishes.map((dish) => (
            <div
              key={dish.name}
              className="bg-black bg-opacity-70 rounded-2xl p-8 w-full max-w-[480px] min-h-[520px] mx-auto flex flex-col items-center justify-between cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
            >
              <img
                src={getDishImage(dish.name, decodedCategory)}
                alt={dish.name}
                className="rounded-2xl mb-4 object-contain w-full h-56"
              />
              <h3 className="font-bold text-2xl mb-2 text-white text-center">{dish.name}</h3>
              <span className="text-[#FFB366] font-bold text-lg mb-2">${dish.price.toFixed(2)}</span>
              <div className="flex gap-2 mb-2">
                {dish.tags && dish.tags.map((tag) => (
                  <span key={tag} className={`text-xs text-white px-2 py-1 rounded ${tagColors[tag]}`}>{tag}</span>
                ))}
              </div>
              {dish.desc && (
                <p className="text-base mb-4 text-white/80 font-normal text-center">{dish.desc}</p>
              )}
              <div className="flex-1 flex flex-col justify-end w-full">
                <button
                  className="mx-auto w-3/4 block bg-[#4B0B0B] text-white text-lg px-6 py-2 rounded hover:bg-[#FFB366] hover:text-black transition-all"
                  onClick={() => addToCart({
                    name: dish.name,
                    price: dish.price,
                    category: decodedCategory,
                    tags: dish.tags,
                    desc: dish.desc,
                  })}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default CategoryPage;
