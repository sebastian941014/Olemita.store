import React, { useState } from 'react';
import { useCart } from './CartContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';


const CheckoutModal = () => {
  const { 
    cart, 
    total, 
    isCheckoutOpen, 
    setIsCheckoutOpen,
    clearCart 
  } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const formattedTotal = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(total);

  const message = `¡Hola Olé Mita! 👋

🧾 *DATOS DEL PEDIDO*

👤 *Nombre:* ${formData.name}
📞 *Teléfono:* ${formData.phone}
📍 *Dirección:* ${formData.address}

🛒 *Pedido:*
${cart.map(item => `• ${item.title} - ${new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0
}).format(item.price)} x${item.quantity}`).join('\n')}

💰 *Total a pagar:* ${formattedTotal}
📝 *Notas adicionales:* ${formData.notes || 'Ninguna'}
`;

  try {
    await addDoc(collection(db, 'pedidos'), {
      nombre: formData.name,
      telefono: formData.phone,
      direccion: formData.address,
      notas: formData.notes,
      productos: cart,
      total: total,
      estado: 'pendiente',
      fecha: serverTimestamp()
    });
  } catch (error) {
    alert('Error al guardar el pedido: ' + error.message);
    return;
  }

  const whatsappUrl = `https://web.whatsapp.com/send?phone=573103384560&text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');

  setIsCheckoutOpen(false);
  clearCart();
};

  return (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center transition-opacity ${isCheckoutOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={() => setIsCheckoutOpen(false)}
    >
      <div 
        className="bg-white rounded-lg w-full max-w-md mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Finalizar Compra</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Nombre completo *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Teléfono *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Dirección de entrega *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Notas adicionales</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => setIsCheckoutOpen(false)}
              className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Enviar por WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;