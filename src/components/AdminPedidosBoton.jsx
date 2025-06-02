import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useEffect, useState } from 'react';


const AdminPedidosBoton = ({ currentUser, setVistaActual }) => {
  const [pendientes, setPendientes] = useState(0);

  useEffect(() => {
    const obtenerCantidad = async () => {
      const snapshot = await getDocs(collection(db, 'pedidos'));
      const pendientesFiltrados = snapshot.docs.filter(doc => doc.data().estado === 'pendiente');
      setPendientes(pendientesFiltrados.length);
    };

    if (currentUser.toLowerCase() === 'ti') {
      obtenerCantidad();
    }
  }, [currentUser]);

  if (currentUser.toLowerCase() !== 'ti') return null;

  return (
    <button
      onClick={() => setVistaActual('pedidos')}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm shadow-sm"
    >
      📦 Ver Pedidos ({pendientes})
    </button>
  );
};

export default AdminPedidosBoton;
