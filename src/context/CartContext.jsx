import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage
  const [cart, setCart] = useState(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add product to cart (store only productImage, productname, type)
  const addToCart = (product) => {
    const { productImage, productname, type } = product;

    // Prevent duplicate entries
    const exists = cart.find(
      (p) =>
        p.productImage === productImage &&
        p.productname === productname &&
        p.type === type
    );

    if (!exists) {
      setCart((prev) => [...prev, { productImage, productname, type }]);
    }
  };

  // Remove product (match by exact combination of 3 fields)
  const removeFromCart = (product) => {
    const { productImage, productname, type } = product;
    setCart((prev) =>
      prev.filter(
        (p) =>
          !(
            p.productImage === productImage &&
            p.productname === productname &&
            p.type === type
          )
      )
    );
  };

  // Clear cart completely
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
