import React from 'react';
import FlavorCard from './FlavorCard';

const FlavorsSection = () => {
  const maracumangoImage = 'https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc06Fy0hiVFtni9pklCcebwvoumN4D1UEQ3aHWZ';
  const chamoyadaImage = 'https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0VUlDFgrJrFC0J7K5LhXEI2tlBemYwSTjsNOp';
  const mixFrutasImage = 'https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0eCaoCpxsicFdrwVl0um9SLMDTC5XGH4U3f8P';

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 font-serif">NUESTROS PRODUCTOS</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explosión de sabores tropicales en cada presentación
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FlavorCard
            title="Maracumango Grande"
            description="La clásica combinación en presentación familiar"
            price={18000}
            color="yellow"
            imageUrl={maracumangoImage}
          />
          <FlavorCard
            title="Maracumango Pequeño"
            description="Para disfrutar del sabor tropical en porción individual"
            price={5000}
            color="orange"
            imageUrl={maracumangoImage}
          />
          <FlavorCard
            title="Maracumango Mix Frutas"
            description="Maracuyá y mango con toque de manzana, fresa y kiwi"
            price={10000}
            color="green"
            imageUrl={mixFrutasImage}
          />
          <FlavorCard
            title="Maracumango Uva"
            description="La exquisita combinación tropical con uva jugosa"
            price={12000}
            color="purple"
          />
          <FlavorCard
            title="Chamoyada Especial"
            description="El balance perfecto entre dulce, ácido y picante"
            price={18000}
            color="red"
            imageUrl={chamoyadaImage}
          />
          <FlavorCard
            title="Maracumango Paletada"
            description="Delicioso helado de maracumango con paleta"
            price={10000}
            color="pink"
          />
          <FlavorCard
            title="Maracumango Tamarindo"
            description="La explosión tropical con toque de tamarindo"
            price={10000}
            color="orange"
          />
        </div>
      </div>
    </section>
  );
};

export default FlavorsSection;

// DONE