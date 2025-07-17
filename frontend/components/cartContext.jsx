"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add to cart: increment quantity if exists, else add new
  // Accepts optional onNotify callback for notification
  const addToCart = (product, onNotify) => {
    const id = product._id || product.id;
    const existingIndex = cart.findIndex(
      (item) => (item._id || item.id) === id
    );
    if (existingIndex !== -1) {
      // If already in cart, do not increment, just notify
      if (onNotify) {
        onNotify({
          type: "duplicate",
          product,
        });
      }
      return;
    } else {
      // Add new item with quantity
      setCart((prevCart) => [
        ...prevCart,
        { ...product, quantity: product.quantity || 1 },
      ]);
      if (onNotify) {
        onNotify({
          type: "added",
          product,
        });
      }
    }
  };

  // Remove from cart by id
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const indexToRemove = prevCart.findIndex(
        (item) => (item._id || item.id) === productId
      );
      if (indexToRemove === -1) return prevCart;
      return [
        ...prevCart.slice(0, indexToRemove),
        ...prevCart.slice(indexToRemove + 1),
      ];
    });
  };

  // Update quantity for a cart item
  const updateQuantity = (productId, newQuantity) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if ((item._id || item.id) === productId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
