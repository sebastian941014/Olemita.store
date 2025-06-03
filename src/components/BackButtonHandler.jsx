// src/components/BackButtonHandler.jsx
import { useEffect } from 'react';
import { useCart } from './CartContext';

const BackButtonHandler = ({ vistaActual, setVistaActual }) => {
  const { isCartOpen, setIsCartOpen } = useCart();

  useEffect(() => {
    const handlePopState = (e) => {
      e.preventDefault();

      if (isCartOpen) {
        setIsCartOpen(false);
        window.history.pushState(null, null, window.location.pathname);
        return;
      }

      if (vistaActual !== 'home') {
        setVistaActual('home');
        window.history.pushState(null, null, window.location.pathname);
      }
    };

    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [vistaActual, isCartOpen]);

  return null;
};

export default BackButtonHandler;
