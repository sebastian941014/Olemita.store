import React from 'react';

const OleMitaHeader = ({ onNavigate }) => {
  return (
    <header className="bg-gradient-to-r from-yellow-400 to-pink-500 py-6 px-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 
          className="text-4xl font-bold text-white font-serif cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          OLÉ MITA
        </h1>
        <nav className="hidden md:flex space-x-8">
          <a 
            href="#" 
            className="text-white hover:text-yellow-200 font-medium transition"
            onClick={() => onNavigate('home')}
          >
            Inicio
          </a>
          <a 
            href="#" 
            className="text-white hover:text-yellow-200 font-medium transition"
            onClick={() => onNavigate('products')}
          >
            Productos
          </a>
          <a 
            href="#" 
            className="text-white hover:text-yellow-200 font-medium transition"
            onClick={() => onNavigate('about')}
          >
            Nosotros
          </a>
          <a 
            href="#" 
            className="text-white hover:text-yellow-200 font-medium transition"
            onClick={() => onNavigate('contact')}
          >
            Contacto
          </a>
        </nav>
        <button className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default OleMitaHeader;

// DONE