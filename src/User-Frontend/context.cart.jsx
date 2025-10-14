/* eslint-disable react-refresh/only-export-components */

import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);

  // Add item to cart
  const addToCart = (dish) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.name === dish.name && item.category === dish.category
      );
      if (existing) {
        return prev.map((item) =>
          item.name === dish.name && item.category === dish.category
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
  };

  // Remove item from cart
  const removeFromCart = (name, category) => {
    setCartItems((prev) => prev.filter((item) => !(item.name === name && item.category === category)));
  };

  // Update quantity
  const updateQuantity = (name, category, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.name === name && item.category === category
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Empty cart
  const emptyCart = () => setCartItems([]);

  // Loyalty points logic
  const addLoyaltyPoints = (amount) => {
    // 5 points for every $10 spent
    setLoyaltyPoints((prev) => prev + Math.floor(amount / 10) * 5);
  };

  const useLoyaltyDiscount = () => {
    if (loyaltyPoints >= 100) {
      setLoyaltyPoints((prev) => prev - 100);
      return 1; // $1 discount
    }
    return 0;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        emptyCart,
        loyaltyPoints,
        addLoyaltyPoints,
        useLoyaltyDiscount,
        setLoyaltyPoints,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
