import React, { useState } from 'react';
import CategoryCard from './CategoryCard';
import { db } from '../firebaseConfig'; // ajusta el path si es diferente
import { collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';


const CategoriesSection = ({
  categorias,
  setCategorias,
  isAdmin,
  onSelectCategory
}) => {
  const [editingId, setEditingId] = useState(null);
  const [editingValues, setEditingValues] = useState({ name: '', description: '' });
  const [newCategory, setNewCategory] = useState({
    title: '',
    description: '',
 imageUrl: '', // 👈 este es el importante    color: 'yellow'
  });
  const [usarArchivo, setUsarArchivo] = useState(false);
  const [subiendoImagen, setSubiendoImagen] = useState(false);


const handleEdit = (id) => {
  const cat = categorias.find(c => c.id === id);
  setEditingId(id);
  setEditingValues({ name: cat?.title || '', description: cat?.description || '' });
};

const handleSave = async (id) => {
  const cat = categorias.find(c => c.id === id);
  const categoriaActualizada = {
    ...cat,
    title: editingValues.name,
    nombre: editingValues.name,
    name: cat.name, // no cambiar el slug
    description: editingValues.description,
  };

  try {
    const ref = doc(db, 'categorias', id);
    await updateDoc(ref, {
      title: categoriaActualizada.title,
      nombre: categoriaActualizada.nombre,
      description: categoriaActualizada.description,
    });

    setCategorias(prev =>
      prev.map(c => c.id === id ? categoriaActualizada : c)
    );

    setEditingId(null);
    alert('Categoría actualizada en Firestore ✅');
  } catch (error) {
    console.error('❌ Error al actualizar categoría en Firestore:', error);
  }
};
const handleDelete = async (id) => {
  try {
    await deleteDoc(doc(db, 'categorias', id));
    setCategorias(prev => prev.filter(cat => cat.id !== id));
  } catch (error) {
    console.error('Error al eliminar la categoría:', error);
  }
};

const handleAddCategory = async () => {
  if (subiendoImagen) {
    alert("Espera a que termine de subir la imagen...");
    return;
  }

  const newId = newCategory.title.toLowerCase().replace(/\s+/g, '-');

  const yaExiste = categorias.some(c => c.name === newId);
  if (yaExiste) {
    alert("Ya existe una categoría con ese nombre.");
    return;
  }

  const nueva = {
    name: newId,
    nombre: newCategory.title || '',
    title: newCategory.title || '',
    description: newCategory.description || '',
    imageUrl: newCategory.imageUrl || '',
    color: newCategory.color || 'yellow'
  };

  try {
    const docRef = await addDoc(collection(db, 'categorias'), nueva);
    setCategorias(prev => [...prev, { id: docRef.id, ...nueva }]);
    setNewCategory({ title: '', description: '', imageUrl: '', color: 'yellow' });
    setUsarArchivo(false);
setSubiendoImagen(false);

    setUsarArchivo(false);
  } catch (error) {
    console.error("Error al guardar categoría en Firebase:", error);
  }
};

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 font-serif">NUESTRAS CATEGORÍAS</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explora nuestros deliciosos productos por categoría
          </p>
        </div>

        {isAdmin && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-bold mb-4">Agregar Nueva Categoría</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  value={newCategory.title}
                  onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Color</label>
                <select
                  value={newCategory.color}
                  onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="yellow">Amarillo</option>
                  <option value="red">Rojo</option>
                  <option value="pink">Rosa</option>
                  <option value="green">Verde</option>
                  <option value="purple">Morado</option>
                  <option value="orange">Naranja</option>
                  <option value="blue">Azul</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-1">Descripción</label>
                <input
                  type="text"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-1">Imagen desde:</label>
                <button
                  type="button"
                  onClick={() => setUsarArchivo(!usarArchivo)}
                  className="text-blue-600 underline text-sm mb-2"
                >
                  {usarArchivo ? 'Usar URL' : 'Subir Archivo'}
                </button>
{usarArchivo ? (
  <>
    <input
      type="file"
      accept="image/*"
      key="file"
      onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
          setSubiendoImagen(true);

          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "olemita");
          formData.append("cloud_name", "dbxgpws0g");

          fetch("https://api.cloudinary.com/v1_1/dbxgpws0g/image/upload", {
            method: "POST",
            body: formData
          })
            .then((res) => res.json())
            .then((data) => {
              setNewCategory((prev) => ({
                ...prev,
                imageUrl: data.secure_url || ""
              }));
              setSubiendoImagen(false);
            })
            .catch((err) => {
              console.error("Error subiendo imagen a Cloudinary:", err);
              setSubiendoImagen(false);
            });
        }
      }}
      className="w-full px-4 py-2 border rounded-lg"
    />

    {subiendoImagen && (
      <p className="text-sm text-blue-600 mt-2">Subiendo imagen a Cloudinary...</p>
    )}

    {newCategory.imageUrl && !subiendoImagen && (
      <img
        src={newCategory.imageUrl}
        alt="Vista previa"
        className="mt-2 rounded-lg w-40 h-auto"
      />
    )}
  </>
) : (
  <input
    type="text"
    key="url"
    value={newCategory.imageUrl || ''}
    onChange={(e) =>
      setNewCategory((prev) => ({
        ...prev,
        imageUrl: e.target.value
      }))
    }
    className="w-full px-4 py-2 border rounded-lg"
  />
)}
              </div>
<button
  onClick={handleAddCategory}
  disabled={subiendoImagen}
  className={`py-2 px-4 rounded-lg text-white transition ${
    subiendoImagen
      ? 'bg-gray-400 cursor-not-allowed'
      : 'bg-green-500 hover:bg-green-600'
  }`}
>
  {subiendoImagen ? 'Subiendo imagen...' : 'Agregar Categoría'}
</button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categorias.map((category) => (
            <div key={category.id} className="relative">
              {isAdmin && (
                <div className="absolute top-2 right-2 flex space-x-2 z-10">
                  {editingId === category.id ? (
                    <button
                      onClick={() => handleSave(category.id)}
                      className="bg-green-500 text-white p-1 rounded-full"
                    >
                      ✅
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(category.id)}
                      className="bg-blue-500 text-white p-1 rounded-full"
                    >
                      ✏️
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="bg-red-500 text-white p-1 rounded-full"
                  >
                    🗑️
                  </button>
                </div>
              )}
<CategoryCard
  title={category.title}
  description={category.description}
  imageUrl={category.imageUrl}
  onClick={() => onSelectCategory(category.name)}
  isEditing={editingId === category.id}
  editingContent={
    editingId === category.id && (
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          value={editingValues.name}
          onChange={(e) =>
            setEditingValues({ ...editingValues, name: e.target.value })
          }
          className="w-full px-2 py-1 border rounded mb-2"
          placeholder="Nombre"
        />
        <input
          type="text"
          value={editingValues.description}
          onChange={(e) =>
            setEditingValues({ ...editingValues, description: e.target.value })
          }
          className="w-full px-2 py-1 border rounded"
          placeholder="Descripción"
        />
      </form>
    )
  }
/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
