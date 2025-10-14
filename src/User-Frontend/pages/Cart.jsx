
import React from "react";
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaGift, FaStar, FaRegStar } from "react-icons/fa";
import { useCart } from '../context.cart.jsx';

const DarkCard = ({ children, className = "" }) => (
  <div
    className={`bg-[#3a2618] text-white rounded-lg p-6 shadow-md ${className}`}
  >
    {children}
  </div>
);


export default function Cart() {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    emptyCart,
    loyaltyPoints,
    setLoyaltyPoints,
  } = useCart();

  const incrementQuantity = (item) => {
    updateQuantity(item.name, item.category, item.quantity + 1);
  };
  const decrementQuantity = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.name, item.category, item.quantity - 1);
    }
  };

  const continueShopping = () => {
    navigate('menu');
  };

  // Loyalty points: 5 points for every $10 spent
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const deliveryFee = 5.99;
  const total = subtotal + tax + deliveryFee;
  const pointsToEarn = Math.floor(subtotal / 10) * 5;

  // Optionally, update points after purchase (simulate checkout)
  const proceedToCheckout = () => {
    setLoyaltyPoints((prev) => prev + pointsToEarn);
    alert('Checkout successful! Loyalty points updated.');
    emptyCart();
  };

  return (
    <div className="min-h-screen bg-[#FF6A00] flex flex-col">
      <main className="flex-1 px-8 py-12 text-white">
        <h1 className="text-3xl font-bold mb-1">Your Cart</h1>
        <p className="text-sm mb-8">Review your order and proceed to checkout</p>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.length === 0 && (
              <DarkCard className="text-center">Your cart is empty.</DarkCard>
            )}
            {cartItems.map((item) => (
              <DarkCard key={item.name + item.category} className="flex flex-col md:flex-row justify-between">
                <div>
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-300">{item.category}</p>
                  <div className="flex gap-2 mt-2">
                    {item.tags && item.tags.includes('GF') && (
                      <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">GF</span>
                    )}
                    {item.tags && item.tags.includes('LF') && (
                      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">LF</span>
                    )}
                  </div>
                  {item.desc && (
                    <div className="text-xs text-gray-400 mt-1">{item.desc}</div>
                  )}
                  <div className="mt-4 flex items-center gap-2">
                    <button
                      onClick={() => decrementQuantity(item)}
                      className="bg-[#6b4a1d] px-2 rounded"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => incrementQuantity(item)}
                      className="bg-[#f97316] px-2 rounded"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <span className="text-sm text-[#ffffff] font-semibold">${item.price.toFixed(2)}</span>
                  <span className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                  <button
                    onClick={() => removeFromCart(item.name, item.category)}
                    aria-label="Remove item"
                    className="text-gray-400 hover:text-red-600"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </DarkCard>
            ))}

            <div className="flex gap-4 mt-4">
              <button onClick={emptyCart} className="flex-1 border border-white bg-transparent text-white hover:bg-[#600227] px-4 py-2 rounded">
                Empty Cart
              </button>
              <button onClick={continueShopping} className="flex-1 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
                Continue Shopping
              </button>
            </div>
          </div>

          {/* Right Column: Loyalty Points and Order Summary */}
          <div className="space-y-6">
            <DarkCard>
              <div className="flex items-center gap-2 mb-4">
                <FaGift className="text-[#e64a19]" />
                <h3 className="font-semibold">Loyalty Points</h3>
              </div>
              <p className="text-sm mb-2">Current Points <span className="font-bold text-yellow-400 flex items-center gap-1"><FaStar /> {loyaltyPoints}</span></p>
              <p className="text-sm mb-2">Points to Earn <span className="font-bold text-green-400 flex items-center gap-1"><FaRegStar /> +{pointsToEarn}</span></p>
              <div className="bg-[#2a1f0f] p-2 rounded text-xs mt-4 text-center">
                <p className="font-bold">Earn 5 points for every $10 spent!</p>
                <p>100 points = $1 discount on future orders</p>
              </div>
            </DarkCard>

            <DarkCard>
              <h3 className="font-semibold mb-4">Order Summary</h3>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <input
                type="text"
                readOnly
                value={`Add $${(10 - subtotal).toFixed(2)} more for free delivery!`}
                className="w-full bg-[#2a1f0f] rounded px-2 py-1 text-xs mb-4"
              />
              <div className="flex justify-between font-bold text-[#fffdfe] mb-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button onClick={proceedToCheckout} className="w-full bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 flex justify-center items-center gap-2">
                Proceed to Checkout <span>→</span>
              </button>
              <p className="text-xs text-center mt-2 text-gray-400">
                Secure checkout powered by industry-leading encryption
              </p>
            </DarkCard>
          </div>
        </div>
      </main>
    </div>
  );
}
