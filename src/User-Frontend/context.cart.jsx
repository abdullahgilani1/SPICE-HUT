import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [usedPoints, setUsedPoints] = useState(0);
  const [instantApplied, setInstantApplied] = useState(false);

  // Load loyalty data from localStorage on mount
  useEffect(() => {
    const savedLoyalty = localStorage.getItem('loyaltyData');
    if (savedLoyalty) {
      const { points, earned, used, instantApplied: instant } = JSON.parse(savedLoyalty);
      setLoyaltyPoints(points);
      setTotalEarned(earned);
      setUsedPoints(used);
      setInstantApplied(instant || false);
    }
  }, []);

  // Save loyalty data to localStorage whenever it changes
  useEffect(() => {
    const loyaltyData = {
      points: loyaltyPoints,
      earned: totalEarned,
      used: usedPoints,
      instantApplied
    };
    localStorage.setItem('loyaltyData', JSON.stringify(loyaltyData));
  }, [loyaltyPoints, totalEarned, usedPoints, instantApplied]);

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
    // 1 point for every $1 spent
    const pointsToAdd = Math.floor(amount);
    setLoyaltyPoints((prev) => prev + pointsToAdd);
    setTotalEarned((prev) => prev + pointsToAdd);
  };

  const useLoyaltyDiscount = () => {
    if (loyaltyPoints >= 100) {
      setLoyaltyPoints((prev) => prev - 100);
      setUsedPoints((prev) => prev + 100);
      return 1; // $1 discount
    }
    return 0;
  };

  const applyInstantRedemption = (subtotal) => {
    const newPoints = Math.floor(subtotal);
    const totalPoints = loyaltyPoints + newPoints;
    if (loyaltyPoints < 100 && subtotal >= 100 && totalPoints >= 100) {
      setLoyaltyPoints((prev) => prev + newPoints - 100);
      setTotalEarned((prev) => prev + newPoints);
      setUsedPoints((prev) => prev + 100);
      setInstantApplied(true);
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
        totalEarned,
        usedPoints,
        instantApplied,
        addLoyaltyPoints,
        useLoyaltyDiscount,
        applyInstantRedemption,
        setLoyaltyPoints,
        setInstantApplied,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
