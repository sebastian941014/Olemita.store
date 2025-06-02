import React, { createContext, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [keepCartOpen, setKeepCartOpen] = useState(false);

  // ✅ FUNCIONES CORRECTAS

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => 
        item.title === product.title && 
        item.description === product.description
      );

      if (existingItem) {
        toast.success('✅ Cantidad aumentada');
        return prevCart.map(item =>
          item.title === product.title && 
          item.description === product.description
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      toast.success('🛒 Producto agregado');
      return [...prevCart, { ...product, quantity: 1 }];
    });

    // Si quieres evitar abrir el carrito cada vez, comenta esto:
    // setIsCartOpen(true);
    // setKeepCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    toast.info('🗑️ Producto eliminado');
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.warn('🧹 Carrito vaciado');
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const closeCart = () => {
    if (!keepCartOpen) {
      setIsCartOpen(false);
    }
    setKeepCartOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        closeCart,
        setKeepCartOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
