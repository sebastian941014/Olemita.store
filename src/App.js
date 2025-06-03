import React, { useState, useEffect } from 'react'; // ✅ incluye useEffect desde aquí
import { useCart } from './components/CartContext';
import { db } from './firebaseConfig'; // ✅ tu configuración de Firebase
import { collection, getDocs, addDoc } from 'firebase/firestore'; // ✅ funciones de Firestore
import { CartProvider } from './components/CartContext'; // ✅ ESTA LÍNEA FALTABA

import BackButtonHandler from './components/BackButtonHandler';
import useLogin from './components/useLogin';
import LoginModal from './components/LoginModal';
import AdminBar from './components/AdminBar';
import OleMitaHeader from './components/OleMitaHeader';
import HeroBanner from './components/HeroBanner';
import CategoriesSection from './components/CategoriesSection';
import ProductsByCategory from './components/ProductsByCategory';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import AllProducts from './components/AllProducts';
import OleMitaFooter from './components/OleMitaFooter';
import CartIcon from './components/CartIcon';
import CartSidebar from './components/CartSidebar';
import CheckoutModal from './components/CheckoutModal';
import AdminPedidos from './AdminPedidos';
import AdminPedidosBoton from './components/AdminPedidosBoton';


const App = () => {
  const {
    isLoginOpen,
    setIsLoginOpen,
    currentUser,
    handleLogin,
    handleLogout
  } = useLogin();

const isAdmin = currentUser?.toLowerCase() === 'ti';
  const [vistaActual, setVistaActual] = useState('home');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [productos, setProductos] = useState([]);
const [categorias, setCategorias] = useState([]);
useEffect(() => {
  const cargarCategorias = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'categorias'));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCategorias(data);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  };

  cargarCategorias();
}, []); // ✅ PRIMER useEffect

// 🔹 1. Cargar productos
useEffect(() => {
  const cargarProductos = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'productos'));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProductos(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  cargarProductos();
}, []);

// 🔹 2. Botón físico "atrás" en celular (manejo del historial y carrito)

  const handleNavigate = (vista) => {
    setVistaActual(vista);
  };

  const handleSelectCategory = (categoriaId) => {
    setCategoriaSeleccionada(categoriaId);
    setVistaActual('categoria');
  };

  const handleAgregarCategoria = (nuevaCategoria) => {
    setCategorias(prev => [...prev, nuevaCategoria]);
  };

return (
  <CartProvider>
    <BackButtonHandler 
      vistaActual={vistaActual} 
      setVistaActual={setVistaActual} 
    />
    <div className="font-sans">

{currentUser && (
<AdminBar
  currentUser={currentUser}
  onLogout={handleLogout}
  onToggleEdit={() => setIsEditMode(!isEditMode)}
  isEditMode={isEditMode}
>
  <AdminPedidosBoton 
    currentUser={currentUser} 
    setVistaActual={setVistaActual} 
  />
</AdminBar>
)}
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onLogin={handleLogin}
        />

        <OleMitaHeader onNavigate={handleNavigate} />

        <main>
          {vistaActual === 'home' && (
            <>
              <HeroBanner />
              <ExperienceSection />
<div id="categorias">
  <CategoriesSection 
    isAdmin={isEditMode}
    onSelectCategory={handleSelectCategory}
    categorias={categorias}
    setCategorias={setCategorias}
    onAddCategory={handleAgregarCategoria}
  />
</div>
              <AllProducts 
                isEditMode={isEditMode} 
                categorias={categorias} 
                productos={productos}
                setProductos={setProductos}
              />
              <OleMitaFooter />
            </>
          )}

{vistaActual === 'pedidos' && isAdmin && (
  <section className="min-h-screen bg-gray-100 py-10 px-4">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">📦 Pedidos Recibidos</h2>
    <AdminPedidos currentUser={currentUser} />
    <div className="text-center mt-6">
      <button
        onClick={() => setVistaActual('home')}
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-full shadow"
      >
        Volver al inicio
      </button>
    </div>
  </section>
)}

          {vistaActual === 'about' && (
            <section className="min-h-screen bg-gray-100 py-10 px-4 flex flex-col items-center justify-center text-center">
              <div className="max-w-3xl mb-8">
                <AboutSection />
              </div>
              <button
                onClick={() => setVistaActual('home')}
                className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-full shadow"
              >
                Volver al inicio
              </button>
            </section>
          )}

          {vistaActual === 'contact' && (
            <section className="min-h-screen bg-gray-100 py-10 px-4 flex flex-col items-center justify-center text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Contáctanos</h2>
              <p className="text-lg text-gray-600 mb-10 max-w-xl">
                ¿Tienes preguntas o quieres saber más sobre nuestros productos? No dudes en contactarnos.
              </p>
              <div className="w-full max-w-4xl">
                <OleMitaFooter />
              </div>
              <button
                onClick={() => setVistaActual('home')}
                className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-full shadow"
              >
                Volver al inicio
              </button>
            </section>
          )}

          {vistaActual === 'products' && (
            <section className="min-h-screen bg-gray-100 py-10 px-4 flex flex-col items-center justify-center text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Nuestros Productos</h2>
              <AllProducts 
                isEditMode={isEditMode} 
                categorias={categorias} 
                productos={productos}
                setProductos={setProductos}
              />
              <button
                onClick={() => setVistaActual('home')}
                className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-full shadow"
              >
                Volver al inicio
              </button>
            </section>
          )}

          {vistaActual === 'categoria' && categoriaSeleccionada && (
            <ProductsByCategory 
              category={categoriaSeleccionada} 
              onBack={() => setVistaActual('home')}
              productos={productos}
            />
          )}
        </main>

        <CartIcon />
        <CartSidebar />
        <CheckoutModal />
      </div>
    </CartProvider>
  );
};

export default App;
