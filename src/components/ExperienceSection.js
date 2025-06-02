import React from 'react';

const ExperienceSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 font-serif leading-tight">
              EXPLOSIÓN <span className="text-yellow-500">DE SABOR</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              En Olé Mita no solo creamos bebidas, sino <strong>experiencias sensoriales únicas</strong>. 
              Cada producto es una celebración de sabores auténticos y presentaciones que despiertan 
              todos tus sentidos.
            </p>
            <ul className="space-y-4 text-lg">
              <li className="flex items-start">
                <div className="bg-yellow-100 p-2 rounded-full mr-4">
                  <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Ingredientes <strong>100% naturales</strong> y frescos</span>
              </li>
              <li className="flex items-start">
                <div className="bg-yellow-100 p-2 rounded-full mr-4">
                  <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Procesos <strong>artesanales</strong> y cuidadosos</span>
              </li>
              <li className="flex items-start">
                <div className="bg-yellow-100 p-2 rounded-full mr-4">
                  <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Diseño de empaque <strong>sostenible</strong> y atractivo</span>
              </li>
            </ul>
          </div>
          <div className="lg:w-1/2">
            <div className="bg-gradient-to-br from-yellow-300 to-pink-400 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0HWYEBcRcSojWGwvDPb4hl1EOXpnTeqzCZR0g" 
                alt="Experiencia Olé Mita" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;