import React from 'react';
import { useCart } from './CartContext';

const FlavorCard = ({
  id,
  title,
  description,
  price,
  color,
  imageUrl,
  createdAt, // 👈 AÑADE ESTO
  popular = false,
  isEditMode = false,
  onEdit,
  onDelete
}) => {

  const esNuevoAutomatico = createdAt && 
  (Date.now() - new Date(createdAt.seconds * 1000).getTime()) < 1000 * 60 * 60 * 24 * 5; // 5 días

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: id || `${title}-${description}`,
      title,
      description,
      price,
      imageUrl,
      quantity: 1
    });
  };

  const colorClasses = {
    red: 'bg-red-100',
    green: 'bg-green-100',
    yellow: 'bg-yellow-100',
    orange: 'bg-orange-100',
    purple: 'bg-purple-100',
    pink: 'bg-pink-100',
    blue: 'bg-blue-100',
    white: 'bg-white',
    gray: 'bg-gray-100'
  };

  const safeColor = color || 'gray';
  const bgColorClass = colorClasses[color] || 'bg-gray-100';

return (
  <div className={`relative rounded-2xl overflow-hidden shadow-xl transition transform hover:scale-105 p-4 ${bgColorClass}`}>
{(esNuevoAutomatico || popular) && (
  <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full shadow">
    {esNuevoAutomatico ? '🆕 Nuevo' : '🔥 Popular'}
  </div>
)}
      
      {isEditMode && (
        <div className="flex justify-end mb-2 gap-2">
          <button
            onClick={() => onEdit && onEdit({ id, title, description, price, color, imageUrl })}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            ✏️ Editar
          </button>
          <button
            onClick={() => onDelete && onDelete(id)}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            🗑️ Eliminar
          </button>
        </div>
      )}

      <img src={imageUrl} alt={title} className="w-full h-40 object-cover rounded-lg mb-3" />
      <h2 className="text-lg font-bold text-gray-800">{title}</h2>
      <p className="text-sm text-gray-600">{description}</p>
<p className="text-md font-semibold text-gray-900 mb-2">
  ${Number(price).toLocaleString('es-CO')}
</p>
<button 
  onClick={handleAddToCart}
  className={`bg-${safeColor}-500 hover:bg-${safeColor}-600 text-white py-2 px-6 rounded-full transition w-full`}
>
  Ordenar
</button>
    </div>
  );
};

export default FlavorCard;