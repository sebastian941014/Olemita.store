import React, { useState, useEffect } from 'react';

const HeroBanner = () => {
  const images = [
    'https://i.imgur.com/dz2IUZ8.png',
    'https://i.imgur.com/0VgtNQ1.png',
    'https://i.imgur.com/FAtv7O4.png',
    'https://i.imgur.com/VCpFXD0.png'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImageIndex(prev => (prev + 1) % images.length);
        setFade(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
<section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {/* 🔶 Sombra oscura encima de la imagen */}
<div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30 z-10"></div>

      {/* 🔶 Texto centrado encima del banner */}
      <div className="absolute inset-0 flex items-center justify-center z-20 text-white text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold drop-shadow-md leading-tight">
          ¡Tu momento más dulce <br className="hidden md:block" /> es con <span className="text-yellow-400">Olé Mita</span>!
        </h1>
      </div>

      {/* 🔶 Imagen con transición suave */}
<img
  key={currentImageIndex}
  src={images[currentImageIndex]}
  alt="Olé Mita Banner"
className={`w-full h-full object-cover object-[center_top] absolute inset-0 transition-opacity duration-700 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'}`}
/>
    </section>
  );
};

export default HeroBanner;
