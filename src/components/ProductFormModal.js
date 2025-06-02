import React, { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const ProductFormModal = ({ isOpen, onClose, onSave, categorias, producto }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState('');
const [categoria, setCategoria] = useState(categorias?.[0]?.name || '');
  const [color, setColor] = useState('yellow'); // valor por defecto
  const [isNuevo, setIsNuevo] = useState(true);
const [popular, setPopular] = useState(false);
  const [usarArchivo, setUsarArchivo] = useState(false);
  const [subiendoImagen, setSubiendoImagen] = useState(false);


  useEffect(() => {
    if (producto) {
      setNombre(producto.title || '');
      setDescripcion(producto.description || '');
      setPrecio(producto.price || '');
      setImagen(producto.imageUrl || '');
setCategoria(producto.categoria || categorias?.[0]?.title || '');
      setColor(producto.color || 'yellow');
      setIsNuevo(producto.isNuevo ?? true);
setPopular(producto.popular ?? false);
    } else {
      setIsNuevo(true);
setPopular(false);
      setNombre('');
      setDescripcion('');
      setPrecio('');
      setImagen('');
setCategoria(categorias?.[0]?.name || '');
      setColor('yellow');
    }
  }, [producto, categorias]);

const handleSubmit = async (e) => {
  e.preventDefault();
if (!nombre || !precio || !categoria || !imagen) {
  alert('⚠️ Por favor completa los campos obligatorios: Nombre, Precio, Categoría e Imagen');
  return;
}

const productoData = {
  title: nombre,
  description: descripcion,
  price: parseInt(precio),
  imageUrl: imagen,
  categoria,
  color,
  isNuevo,
  popular,
  disponible: true,
  updatedAt: new Date()
};

  try {
    if (producto && producto.id) {
      // EDITAR producto existente
      const ref = doc(db, 'productos', producto.id);
      await updateDoc(ref, productoData);
      onSave({ ...producto, ...productoData }); // actualiza en el estado
      alert('Producto actualizado con éxito ✅');
    } else {
      // CREAR nuevo producto
      const docRef = await addDoc(collection(db, 'productos'), {
        ...productoData,
        createdAt: new Date()
      });
      onSave({ id: docRef.id, ...productoData });
      alert('Producto creado con éxito ✅');
    }

    onClose(); // cerrar modal
  } catch (error) {
    console.error('Error al guardar producto en Firestore:', error);
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
<div
  className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg transform transition-all duration-300 scale-95 animate-fadeIn"
  onClick={(e) => e.stopPropagation()}
>
        <h2 className="text-xl font-bold mb-4">{producto ? 'Editar Producto' : 'Agregar Producto'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full border rounded px-3 py-2" />
          <input type="text" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="w-full border rounded px-3 py-2" />
          <input type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} className="w-full border rounded px-3 py-2" />

          <div className="flex gap-2 items-center">
            <label className="text-sm">Imagen desde:</label>
            <button
              type="button"
              onClick={() => setUsarArchivo(!usarArchivo)}
              className="text-blue-600 underline text-sm"
            >
              {usarArchivo ? 'Usar URL' : 'Subir Archivo'}
            </button>
          </div>

{usarArchivo ? (
  <>
    <input
      type="file"
      accept="image/*"
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
            body: formData,
          })
            .then((res) => res.json())
            .then((data) => {
              setImagen(data.secure_url || "");
              setSubiendoImagen(false);
            })
            .catch((err) => {
              console.error("Error subiendo imagen a Cloudinary:", err);
              setSubiendoImagen(false);
            });
        }
      }}
      className="w-full border rounded px-3 py-2"
    />
    {subiendoImagen && <p className="text-sm text-blue-600">Subiendo imagen...</p>}
  </>
) : (
  <input
    type="text"
    placeholder="URL de imagen"
    value={imagen}
    onChange={(e) => setImagen(e.target.value)}
    className="w-full border rounded px-3 py-2"
  />
)}

<select
  value={categoria}
  onChange={(e) => setCategoria(e.target.value)}
  className="w-full border rounded px-3 py-2"
>
  {categorias.map((cat) => (
    <option key={cat.id} value={cat.title}>{cat.title}</option>
  ))}
</select>

          <select value={color} onChange={(e) => setColor(e.target.value)} className="w-full border rounded px-3 py-2">
            <option value="yellow">Amarillo</option>
            <option value="orange">Naranja</option>
            <option value="green">Verde</option>
            <option value="purple">Morado</option>
            <option value="pink">Rosado</option>
            <option value="red">Rojo</option>
            <option value="blue">Azul</option>
          </select>
 <div className="flex items-center gap-6 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isNuevo}
                onChange={(e) => setIsNuevo(e.target.checked)}
              />
              Es nuevo
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={popular}
                onChange={(e) => setPopular(e.target.checked)}
              />
              Popular
            </label>
          </div>
          <div className="flex justify-end">
<button
  type="submit"
  disabled={subiendoImagen}
  className={`px-4 py-2 rounded text-white ${
    subiendoImagen ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
  }`}
>
  {producto ? 'Actualizar' : subiendoImagen ? 'Subiendo imagen...' : 'Guardar Producto'}
</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;