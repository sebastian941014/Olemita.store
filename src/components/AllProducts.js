import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import FlavorCard from './FlavorCard';
import ProductFormModal from './ProductFormModal';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const AllProducts = ({ isEditMode = false, categorias = [], productos, setProductos }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [productoActual, setProductoActual] = useState(null);

  const handleGuardarProducto = (nuevoProducto) => {
    setProductos(prev => {
      const existe = prev.some(p => p.id === nuevoProducto.id);
      if (existe) {
        return prev.map(p => p.id === nuevoProducto.id ? nuevoProducto : p);
      } else {
        return [...prev, nuevoProducto];
      }
    });
    setProductoActual(null);
  };

  const handleEditar = (producto) => {
    setProductoActual(producto);
    setShowModal(true);
  };

  const handleEliminar = async (id) => {
    try {
      await deleteDoc(doc(db, 'productos', id)); // 🔥 elimina de Firestore
      setProductos(prev => prev.filter(p => p.id !== id)); // ✅ actualiza el estado local
      alert('Producto eliminado correctamente ✅');
    } catch (error) {
      console.error('❌ Error al eliminar el producto de Firestore:', error);
      alert('Error al eliminar el producto. Revisa la consola.');
    }
  };

  // 🔍 Filtro por búsqueda y categoría
  const productosFiltrados = productos.filter(producto => {
    const coincideBusqueda =
      producto.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.description.toLowerCase().includes(searchTerm.toLowerCase());

    const coincideCategoria =
      categoriaSeleccionada === '' || producto.categoria === categoriaSeleccionada;

    return coincideBusqueda && coincideCategoria;
  });

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 font-serif">TODOS NUESTROS PRODUCTOS</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre la variedad de sabores que tenemos para ti
          </p>
        </div>
<div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
  {/* Buscador con ícono */}
  <div className="relative w-full md:w-1/3">
    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
      🔍
    </span>
    <input
      type="text"
      placeholder="Buscar producto..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="pl-10 pr-4 py-2 border rounded w-full shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow duration-300"
    />
  </div>

  {/* Filtro por categoría */}
  <select
    value={categoriaSeleccionada}
    onChange={(e) => setCategoriaSeleccionada(e.target.value)}
    className="w-full md:w-1/4 px-4 py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-green-500"
  >
    <option value="">Todas las categorías</option>
    {categorias.map(cat => (
      <option key={cat.id} value={cat.name}>{cat.nombre}</option>
    ))}
  </select>
</div>

        {/* 🧃 Productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
<AnimatePresence>
  {productosFiltrados.map((product) => (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.3 }}
    >
<FlavorCard
  id={product.id}
  title={product.title}
  description={product.description}
  price={product.price}
  color={product.color}
  imageUrl={product.imageUrl}
  createdAt={product.createdAt} // 👈 esto es importante
  popular={product.popular}     // 👈 también importante
  isEditMode={isEditMode}
  onEdit={handleEditar}
  onDelete={handleEliminar}
/>
    </motion.div>
  ))}
</AnimatePresence>
        </div>

        {isEditMode && (
          <button
            onClick={() => setShowModal(true)}
            className="fixed bottom-40 right-8 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-700 z-40"
          >
            + Producto
          </button>
        )}

        <ProductFormModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setProductoActual(null);
          }}
          onSave={handleGuardarProducto}
          categorias={categorias}
          producto={productoActual}
        />
      </div>
    </section>
  );
};

export default AllProducts;
