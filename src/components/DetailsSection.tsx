import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const DetailsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.detail-item', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-24"
    >
      {/* High-res full-frame botanical background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(/assets/fondo_cala.jpeg)',
        }}
      />

      {/* Main Container for Details */}
      <div className="relative z-10 w-full max-w-2xl px-6 flex items-center justify-center">
        
        {/* The Frame Wrapper */}
        <div className="relative p-12 md:p-16 lg:p-20 flex items-center justify-center">
          


          {/* Details Card — The actual "recuadro" paper */}
          <div className="relative z-10 bg-[#fdfaf5]/85 backdrop-blur-[2px] px-8 py-12 md:px-12 md:py-16 shadow-[0_10px_50px_rgba(0,0,0,0.05)] border border-[#e8dcc4]/20 text-center min-w-[280px] md:min-w-[360px]">
            
            <div className="detail-item mb-10">
              <p className="font-sans text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-[#b09070] font-bold mb-3">
                Fecha
              </p>
              <p className="font-body text-xl md:text-2xl text-[#2c2c2c] leading-[1.1]">
                Domingo, 23.08.2026
              </p>
            </div>

            <div className="w-10 h-px bg-[#C5A880]/30 mx-auto mb-10" />

            <div className="detail-item mb-10">
              <p className="font-sans text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-[#b09070] font-bold mb-3">
                Hora
              </p>
              <p className="font-body text-2xl md:text-4xl text-[#2c2c2c]">17:30</p>
            </div>

            <div className="w-10 h-px bg-[#C5A880]/30 mx-auto mb-10" />

            <div className="detail-item">
              <p className="font-sans text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-[#b09070] font-bold mb-3">
                Lugar
              </p>
              <p className="font-calligraphy text-2xl md:text-3xl text-[#3a3530] leading-tight mb-2">
                La Huerta de Cubas
              </p>
              <p className="font-sans text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-[#858078]">
                Cubas, Cantabria
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
