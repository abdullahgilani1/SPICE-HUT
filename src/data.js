import butterChickenImg from './assets/ButterChicken @ Spice Hut. .jpg';
import kormaImg from './assets/Korma @ Spice Hut. .jpg';
import tandooriImg from './assets/Tandoori Chicken Tikka .jpg';
import biryaniImg from './assets/Biryani.jpg';
import vegetableImg from './assets/Aalo Gobi (Cauliflower).jpg';
import naanImg from './assets/Qeema Naan.jpg';
import samosaImg from './assets/Samosa .jpg';
import curryImg from './assets/Curry..jpg';
import chanaMasalaImg from './assets/Chana Masala.jpg';
import coconutCurryImg from './assets/Cocnut Curry.jpg';
import karahiImg from './assets/Clay Oven (Tandoor).jpg';
import jalfreziImg from './assets/Jalfrezi.jpg';
import palakPaneerImg from './assets/Palak Paneer.jpg';
import garlicNaanImg from './assets/Garlic Naan..jpg';
import saladImg from './assets/SALAD.jpg';
import spiceHutImg from './assets/Spice hut.jpg';
import gulabJamunImg from './assets/Gulab Jamun..jpg';

export const menuCategories = [
    {
      id: 'appetizers',
      name: 'Appetizers',
      image: samosaImg,
      desc: 'Start your meal with our delicious selection of appetizers.'
    },
    {
      id: 'butter-dishes',
      name: 'Butter Dishes',
      image: butterChickenImg,
      desc: 'Curries made with a spiced tomato and butter (makhan) sauce, known for their rich, silky texture.'
    },
    {
      id: 'korma-dishes',
      name: 'Korma Dishes',
      image: kormaImg,
      desc: 'A dish where meat or vegetables are braised with yogurt or cream, spices, and nuts for a mild, aromatic curry.'
    },
    {
      id: 'curry-dishes',
      name: 'Curry Dishes',
      image: curryImg,
      desc: 'Classic Indian curries with a blend of spices, tomatoes, onions, and herbs.'
    },
    {
      id: 'masala-dishes',
      name: 'Masala Dishes',
      image: chanaMasalaImg,
      desc: 'Masala dishes feature a rich, spiced gravy with a variety of proteins or vegetables.'
    },
    {
      id: 'coconut-curry-dishes',
      name: 'Coconut Curry Dishes',
      image: coconutCurryImg,
      desc: 'Creamy coconut-based curries with aromatic spices and herbs.'
    },
    {
      id: 'tandoori-dishes',
      name: 'Tandoori Dishes',
      image: tandooriImg,
      desc: 'Prepared by roasting marinated meat or paneer in a traditional clay oven (tandoor).'
    },
    {
      id: 'biryani-dishes',
      name: 'Biryani Dishes',
      image: biryaniImg,
      desc: 'Fragrant basmati rice cooked with spices, saffron, and your choice of meat or vegetables.'
    },
    {
      id: 'karahi-dishes',
      name: 'Karahi Dishes',
      image: karahiImg,
      desc: 'Karahi dishes are cooked in a wok-like pan with tomatoes, peppers, and spices.'
    },
    {
      id: 'vindaloo-dishes',
      name: 'Vindaloo Dishes',
      image: curryImg, // Re-using image
      desc: 'A spicy Goan curry with vinegar, chili, and aromatic spices.'
    },
    {
      id: 'jalfrezi-dishes',
      name: 'Jalfrezi Dishes',
      image: jalfreziImg,
      desc: 'Jalfrezi is a stir-fried curry with peppers, onions, and a tangy tomato-based sauce.'
    },
    {
      id: 'palak-dishes',
      name: 'Palak Dishes',
      image: palakPaneerImg,
      desc: 'Palak dishes feature spinach cooked with spices and often paneer or meat.'
    },
    {
      id: 'mango-curry-dishes',
      name: 'Mango Curry Dishes',
      image: curryImg, // Re-using image
      desc: 'Sweet and tangy mango-based curries with a blend of spices.'
    },
    {
      id: 'vegetable-dishes',
      name: 'Vegetable Dishes',
      image: vegetableImg,
      desc: 'A variety of vegetarian specialties made with fresh vegetables and spices.'
    },
    {
      id: 'indian-naan-bread',
      name: 'Indian Naan Bread',
      image: garlicNaanImg,
      desc: 'Traditional Indian flatbreads baked in a tandoor, including garlic naan and stuffed naan.'
    },
    {
      id: 'salads-sides',
      name: 'Salads & Sides',
      image: saladImg,
      desc: 'Fresh salads and classic Indian side dishes to complement your meal.'
    },
    {
      id: 'spice-hut-combo-specials',
      name: 'Spice Hut Combo Specials',
      image: spiceHutImg,
      desc: 'Specially curated combo meals for a complete dining experience.'
    },
    {
      id: 'indian-desserts',
      name: 'Indian Desserts',
      image: gulabJamunImg,
      desc: 'Traditional Indian sweets like Gulab Jamun, Ras Malayi, and more.'
    },
];

// Dishes data by category ID
export const dishes = {
  'appetizers': [
    { name: 'Papadums (2 pcs)', price: 5.95, tags: ['LF'] },
    { name: 'Veggie Pakora', price: 9.95, tags: ['LF'] },
    { name: 'Paneer Pakora', price: 11.95, tags: ['LF'] },
  ],
  'butter-dishes': [
    { name: 'Butter Chicken', price: 19.95, tags: ['GF'], desc: 'Butter curry made with spiced tomato & butter (makhani) sauce; rich and creamy texture.', image: butterChickenImg },
    { name: 'Butter Beef', price: 21.95, tags: ['GF'] },
    { name: 'Butter Lamb', price: 23.95, tags: ['GF'] },
  ],
  'korma-dishes': [
    { name: 'Chicken Korma', price: 19.95, tags: ['GF'], desc: 'Korma is braised meat cooked with yogurt and spices for a creamy flavor.', image: kormaImg },
    { name: 'Beef Korma', price: 21.95, tags: ['GF'] },
    { name: 'Lamb Korma', price: 23.95, tags: ['GF'] },
  ],
  'tandoori-dishes': [
      { name: 'Tandoori Chicken Tikka (Boneless)', price: 21.95, tags: ['GF'], desc: 'Tandoori dishes are cooked in a clay oven and served with rice, butter sauce, salad & dressing.', image: tandooriImg },
      { name: 'Tandoori Malai Tikka (Boneless)', price: 21.95, tags: ['GF'] },
  ],
  'biryani-dishes': [
      { name: 'Vegetable Biryani', price: 19.95, tags: ['GF'], image: biryaniImg },
      { name: 'Chicken Biryani', price: 19.95, tags: ['GF'] },
  ],
  'vegetable-dishes': [
      { name: 'Aalo Gobi', price: 17.95, tags: ['GF'], image: vegetableImg },
      { name: 'Daal Makhni', price: 17.95, tags: ['GF', 'LF'] },
  ],
  'indian-naan-bread': [
      { name: 'Traditional Naan', price: 3.95, image: naanImg },
      { name: 'Garlic Naan', price: 4.95 },
  ],
  // ... add all other dishes here, mapping to the category id
};

export const placeholderImage = vegetableImg; // Or a generic placeholder

export function getCategoryById(categoryId) {
    return menuCategories.find(cat => cat.id === categoryId);
}

export function getDishesByCategoryId(categoryId) {
    return dishes[categoryId] || [];
}

export function getDishImage(dish, category) {
    return dish.image || category.image || placeholderImage;
}