import React from 'react';

export const FooterSection: React.FC = () => {
  return (
    <footer className="relative bg-[#1a2d17] text-ivory-white py-16 text-center">
      <div className="max-w-4xl mx-auto px-6">

        
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 font-sans tracking-widest text-xs uppercase opacity-70 mb-12">
          <a href="#" className="hover:text-subtle-gold transition-colors">Registro de Regalos</a>
          <span className="hidden md:inline">•</span>
          <a href="#" className="hover:text-subtle-gold transition-colors">Alojamiento</a>
          <span className="hidden md:inline">•</span>
          <a href="#" className="hover:text-subtle-gold transition-colors">Código de Vestimenta</a>
        </div>
        
        <p className="font-sans text-[10px] uppercase tracking-widest opacity-40">
          Víctor e Inna © 2026
        </p>
      </div>
    </footer>
  );
};
