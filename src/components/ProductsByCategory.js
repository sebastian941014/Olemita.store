import React, { useEffect, useRef } from 'react';
import FlavorCard from './FlavorCard';

const ProductsByCategory = ({ category, onBack, productos }) => {
  const containerRef = useRef(null);

  // Guardar posición de scroll al montar
  useEffect(() => {
    const savedPosition = sessionStorage.getItem('scrollPosition');
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition));
    }

    return () => {
      // Guardar posición de scroll al desmontar
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    };
  }, []);

  const handleBackClick = () => {
    // Guardar posición actual antes de navegar
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
onBack();
setTimeout(() => {
  const seccionCategorias = document.getElementById('categorias');
  if (seccionCategorias) {
    seccionCategorias.scrollIntoView({ behavior: 'smooth' });
  }
}, 100); // espera un momento a que se renderice
  };


const products = productos.filter(p => p.categoria === category);

  return (
    <section className="py-20 bg-gray-50" ref={containerRef}>
      <div className="container mx-auto px-4">
        <button 
          onClick={handleBackClick}
          className="mb-8 flex items-center text-yellow-600 hover:text-yellow-800 transition"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver a categorías
        </button>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {products.length > 0 ? (
    products.map((product) => (
      <FlavorCard
        key={product.id}
        id={product.id}
        title={product.title}
        description={product.description}
        price={product.price}
        color={product.color}
        imageUrl={product.imageUrl}
      />
    ))
  ) : (
    <p className="text-center text-gray-500 col-span-3">No hay productos en esta categoría.</p>
  )}
</div>

        {/* ... resto del componente ... */}
      </div>
    </section>
  );
};

export default ProductsByCategory;

// DONE