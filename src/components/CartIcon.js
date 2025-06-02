import React from 'react';
import { useCart } from './CartContext';

const CartIcon = () => {
  const { cart, setIsCartOpen } = useCart();

  return (
    <div 
      className="fixed bottom-8 right-8 bg-yellow-500 text-white p-4 rounded-full shadow-xl cursor-pointer z-50"
      onClick={() => setIsCartOpen(true)}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      {cart.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
          {cart.length}
        </span>
      )}
    </div>
  );
};

export default CartIcon;