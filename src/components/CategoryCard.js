const CategoryCard = ({
  title,
  description,
  imageUrl,
  onClick,
  isEditing = false,
  editingContent = null
}) => {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-xl transition transform hover:scale-105 cursor-pointer"
      onClick={(e) => {
        if (!isEditing) {
          onClick(); // Solo ejecuta si no estás editando
        }
      }}
    >
      {/* Imagen o ícono */}
      <div className="h-48 bg-gradient-to-br from-yellow-400 to-pink-500 flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
            <span className="text-5xl">🍹</span>
          </div>
        )}
      </div>

      {/* Contenido: título y descripción o formulario */}
      <div
        className="p-6"
        onClick={(e) => isEditing && e.stopPropagation()} // evita propagación si estás editando
      >
        {isEditing && editingContent ? (
          editingContent
        ) : (
          <>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
