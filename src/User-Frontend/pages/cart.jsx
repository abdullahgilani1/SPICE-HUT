import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { FaTrashAlt, FaGift, FaStar, FaRegStar } from "react-icons/fa";

const DarkCard = ({ children, className = "" }) => (
  <div
    className={`bg-[#3a2618] text-white rounded-lg p-6 shadow-md ${className}`}
  >
    {children}
  </div>
);

const initialCartItems = [
  {
    id: 1,
    name: "Mutton Karahi",
    description: "Tender mutton pieces in a spicy karahi sauce with fresh herbs",
    price: 24.99,
    quantity: 1,
    glutenFree: true,
  },
  {
    id: 2,
    name: "Chicken Karahi",
    description: "Sizzling chicken cooked with tomatoes, ginger, and green chilies",
    price: 19.99,
    quantity: 1,
    glutenFree: true,
  },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const incrementQuantity = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const deliveryFee = 5.99;
  const total = subtotal + tax + deliveryFee;

  const loyaltyPoints = 150;
  const pointsToEarn = 44;

  return (
    <div className="bg-orange-500 min-h-screen px-8 py-12 text-white">
      <h1 className="text-3xl font-bold mb-1">Your Cart</h1>
      <p className="text-sm mb-8">Review your order and proceed to checkout</p>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <DarkCard key={item.id} className="flex flex-col md:flex-row justify-between">
              <div>
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-300">{item.description}</p>
                {item.glutenFree && (
                  <div className="mt-2">
                    <Badge>gluten-free</Badge>
                  </div>
                )}
                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => decrementQuantity(item.id)}
                    className="bg-[#6b4a1d] px-2 rounded"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => incrementQuantity(item.id)}
                    className="bg-[#f97316] px-2 rounded"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <span className="text-sm text-[#5a1a3a] font-semibold">${item.price.toFixed(2)}</span>
                <span className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                <button
                  onClick={() => removeItem(item.id)}
                  aria-label="Remove item"
                  className="text-gray-400 hover:text-red-600"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </DarkCard>
          ))}

          <div className="flex gap-4 mt-4">
            <Button className="flex-1 border border-white bg-transparent text-white hover:bg-[#600227]">
              Empty Cart
            </Button>
            <Button className="flex-1">Continue Shopping</Button>
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
              <p className="font-bold">Earn 1 point per $1 spent!</p>
              <p>Use points for discounts on future orders</p>
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
            <div className="flex justify-between font-bold text-[#5a1a3a] mb-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Button className="w-full flex justify-center items-center gap-2">
              Proceed to Checkout <span>→</span>
            </Button>
            <p className="text-xs text-center mt-2 text-gray-400">
              Secure checkout powered by industry-leading encryption
            </p>
          </DarkCard>
        </div>
      </div>
    </div>
  );
}
