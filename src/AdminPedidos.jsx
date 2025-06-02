import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebaseConfig'; // ya corregiste esto


const AdminPedidos = ({ currentUser }) => {
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [pedidos, setPedidos] = useState([]);
  const [busqueda, setBusqueda] = useState('');


  useEffect(() => {
    const obtenerPedidos = async () => {
      const snapshot = await getDocs(collection(db, 'pedidos'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPedidos(data);
    };

    obtenerPedidos();
  }, []);


  const cambiarEstado = async (id, nuevoEstado) => {
    await updateDoc(doc(db, 'pedidos', id), { estado: nuevoEstado });
    setPedidos(prev => prev.map(p => p.id === id ? { ...p, estado: nuevoEstado } : p));
  };

  const eliminarPedido = async (id) => {
    await deleteDoc(doc(db, 'pedidos', id));
    setPedidos(prev => prev.filter(p => p.id !== id));
  };

if (currentUser?.toLowerCase() !== 'ti') return null;

  return (
<section className="p-6 bg-gray-50">
  <h2 className="text-2xl font-bold mb-4">📦 Pedidos Recibidos</h2>
  <div className="mb-4">
  <input
    type="text"
    placeholder="🔍 Buscar por nombre, teléfono o fecha..."
    value={busqueda}
    onChange={(e) => setBusqueda(e.target.value)}
    className="w-full max-w-md px-4 py-2 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
  />
</div>

<div className="flex flex-wrap gap-2 mb-4">
  {['todos', 'pendiente', 'entregado', 'devuelto'].map(estado => (
    <button
      key={estado}
      onClick={() => setFiltroEstado(estado)}
      className={`px-4 py-1 rounded-full font-semibold ${
        filtroEstado === estado ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
      }`}
    >
      {estado.charAt(0).toUpperCase() + estado.slice(1)}
    </button>
  ))}
</div>

  {pedidos.length === 0 ? (
    <p className="text-gray-500">No hay pedidos por ahora.</p>
  ) : (
pedidos
  .filter(p => {
    const estadoCoincide =
      filtroEstado === 'todos' || (p.estado || '').toLowerCase().trim() === filtroEstado;

    const texto = `${p.nombre} ${p.telefono} ${p.direccion} ${
      p.fecha?.toDate?.().toLocaleString('es-CO', {
        dateStyle: 'long',
        timeStyle: 'short'
      }) || ''
    }`.toLowerCase();

    const busquedaCoincide = texto.includes(busqueda.toLowerCase().trim());

    return estadoCoincide && busquedaCoincide;
  })
  .map(pedido => {
const estado = (pedido.estado || '').toLowerCase().trim();
const fechaObj = pedido.fecha?.toDate?.() || new Date();
const fechaFormateada = fechaObj.toLocaleString('es-CO', {
  dateStyle: 'long',
  timeStyle: 'short'
});

let colorEstado = 'text-gray-600';
if (estado === 'entregado') colorEstado = 'text-green-600';
else if (estado === 'devuelto') colorEstado = 'text-yellow-600';
else if (estado === 'pendiente') colorEstado = 'text-red-600';

return (
  <div key={pedido.id} className="border rounded p-4 mb-4 bg-white shadow-sm">
    <p><strong>Cliente:</strong> {pedido.nombre || 'Sin nombre'}</p>
    <p><strong>Teléfono:</strong> {pedido.telefono || 'Sin número'}</p>
    <p><strong>Dirección:</strong> {pedido.direccion || 'No especificada'}</p>
    <p><strong>Estado:</strong> <span className={colorEstado}>{estado}</span></p>
    <p><strong>📅 Fecha:</strong> {fechaFormateada}</p>
    <p><strong>Total:</strong> ${Number(pedido.total || 0).toLocaleString('es-CO')}</p>
    <p><strong>Notas:</strong> {pedido.notas || 'Ninguna'}</p>

    {pedido.productos?.length > 0 && (
      <div className="mt-2">
        <strong>🧾 Productos:</strong>
        <ul className="list-disc list-inside text-sm text-gray-700">
          {pedido.productos.map((prod, idx) => (
            <li key={idx}>
              {prod.quantity} x {prod.title || prod.description} – ${Number(prod.price || 0).toLocaleString('es-CO')}
            </li>
          ))}
        </ul>
      </div>
    )}

    <div className="mt-2 flex gap-2">
      <button
        onClick={() => cambiarEstado(pedido.id, 'entregado')}
        disabled={estado === 'entregado'}
        className={`px-3 py-1 rounded text-white ${
          estado === 'entregado' ? 'bg-green-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
        }`}
      >
        Marcar como Entregado
      </button>

      <button
        onClick={() => cambiarEstado(pedido.id, 'devuelto')}
        disabled={estado === 'devuelto'}
        className={`px-3 py-1 rounded text-white ${
          estado === 'devuelto' ? 'bg-yellow-300 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600'
        }`}
      >
        Marcar como Devuelto
      </button>

      <button
        onClick={() => eliminarPedido(pedido.id)}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Eliminar
      </button>
    </div>
  </div>
);
    })
  )}
</section>
  );
};

export default AdminPedidos;
