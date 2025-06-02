import React from 'react';

const AboutSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 font-serif">Sobre Nosotros</h2>
          
          <div className="bg-yellow-50 rounded-2xl p-8 md:p-12 shadow-lg">
            <p className="text-lg text-gray-700 mb-6">
              Olé Mita es una marca vibrante y refrescante dedicada a crear experiencias únicas a través de bebidas artesanales como sodas frutales, maracumangos, chamoyadas y más.
            </p>
            
            <p className="text-lg text-gray-700 mb-6">
              Nuestro objetivo es ofrecer más que un producto: buscamos provocar una explosión de sabor, frescura y felicidad en cada sorbo.
            </p>
            
            <p className="text-lg text-gray-700">
              ¡Descubre el sabor de lo diferente, celebra cada instante con Olé Mita! 🍓🥤
            </p>
          </div>
          
          <div className="mt-12">
            <img 
              src="https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0nlTEj8FSYFAWVsNg0r5XxoMDOKtbiU2j83eC" 
              alt="Equipo Olé Mita"
              className="rounded-xl shadow-xl mx-auto max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;