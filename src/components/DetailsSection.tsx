import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export const DetailsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".detail-text", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
      });
      
      gsap.from(".mansion-bg", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        y: 100,
        opacity: 0.3,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-24 flex items-center bg-rich-cream overflow-hidden"
      style={{ backgroundImage: 'url(/assets/bg_linen_paper.png)', backgroundSize: 'cover' }}
    >
      {/* Background Mansion Sketch */}
      <div 
        className="mansion-bg absolute right-0 bottom-10 w-[60vw] md:w-[40vw] opacity-40 mix-blend-multiply pointer-events-none"
      >
        <img src="/assets/mansion_sketch.png" alt="Mansion sketch" className="w-full h-auto object-contain" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 w-full text-matte-black text-center md:text-left">
        <h3 className="detail-text font-calligraphy text-4xl md:text-5xl text-[#5A6351] mb-12">
          Los Detalles
        </h3>
        
        <div className="space-y-8 pl-4 border-l bg-white/40 p-8 shadow-sm backdrop-blur-sm shadow-[#e0d9cc]/50 inline-block border-[#5A6351]/30">
          <div className="detail-text">
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-gray-500 mb-1">Fecha</p>
            <p className="font-body text-xl md:text-2xl">Domingo, 23 de Agosto de 2026</p>
          </div>
          
          <div className="detail-text">
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-gray-500 mb-1">Hora</p>
            <p className="font-body text-xl md:text-2xl">17:30</p>
          </div>
          
          <div className="detail-text">
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-gray-500 mb-1">Lugar</p>
            <p className="font-body text-xl md:text-2xl">La Huerta de Cubas</p>
            <p className="font-sans text-sm text-gray-600 mt-1">Cubas, Cantabria</p>
          </div>
        </div>
      </div>
    </section>
  );
};
