import React, { useEffect } from 'react';
import { useCart } from './CartContext';
import { FiTrash2, FiMinusCircle, FiPlusCircle } from 'react-icons/fi';

const CartSidebar = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity,
    clearCart,
    total, 
    isCartOpen, 
    closeCart,
    setKeepCartOpen,
    setIsCheckoutOpen 
  } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => {
      setKeepCartOpen(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [cart, setKeepCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
      onClick={closeCart}
    >
      <div 
        className="w-full max-w-md bg-white h-full p-6 overflow-y-auto shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Tu Carrito</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">El carrito está vacío.</p>
        ) : (
          cart.map((item, index) => (
            <div key={index} className="mb-4 border-b pb-2">
              <div className="flex items-center gap-3">
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={item.title} className="w-16 h-16 object-cover rounded" />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-black font-medium">${item.price}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                      className="text-yellow-600 hover:text-yellow-800 disabled:opacity-40"
                    >
                      <FiMinusCircle size={20} />
                    </button>
                    <span className="font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <FiPlusCircle size={20} />
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>
          ))
        )}

        {cart.length > 0 && (
          <div className="mt-6 border-t pt-4">
<p className="text-lg font-bold">
  Total: ${total.toLocaleString('es-CO')}
</p>
    <button
      onClick={() => {
        setIsCheckoutOpen(true);
        closeCart();
      }}
      className="mt-4 bg-gradient-to-r from-green-400 to-lime-500 hover:from-green-500 hover:to-lime-600 text-white font-bold px-6 py-3 rounded-lg shadow-md hover:shadow-xl transform transition-transform duration-300 hover:scale-105 w-full"
    >
      🛒 Finalizar pedido
    </button>

            <button
              onClick={clearCart}
              className="mt-2 bg-red-100 hover:bg-red-200 text-red-600 font-semibold px-4 py-2 rounded w-full flex items-center justify-center gap-2"
            >
              <FiTrash2 size={18} /> Vaciar carrito
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
