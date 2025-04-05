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
  }, [])

 useEffect(() => {
   localStorage.setItem("cart", JSON.stringify(cart));
  
 }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      return updatedCart;
    });
  };


   const removeFromCart = (productId) => {
    setCart((prevCart) => {
      // Find the index of the first occurrence of the product
      const indexToRemove = prevCart.findIndex((item) => item.id === productId);
      if (indexToRemove === -1) return prevCart;

      // Create a new array without that specific item
      return [
        ...prevCart.slice(0, indexToRemove),
        ...prevCart.slice(indexToRemove + 1),
      ];
    });
   };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
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
