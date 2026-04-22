import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export const DressCodeSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".dress-text", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[50vh] py-24 flex items-center justify-center bg-[#152C16] text-rich-cream overflow-hidden"
    >
      <div className="absolute inset-0 z-0 bg-cover bg-center opacity-20 mix-blend-overlay" style={{ backgroundImage: 'url(/assets/bg_dark_grass.png)' }} />
      
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <h3 className="dress-text font-calligraphy text-4xl md:text-5xl text-subtle-gold mb-8 drop-shadow-md">
          Código de Vestimenta
        </h3>
        
        <div className="dress-text inline-block border border-subtle-gold/30 bg-black/20 p-10 backdrop-blur-sm shadow-xl">
          <p className="font-sans text-sm md:text-base tracking-widest uppercase text-subtle-gold mb-4">Etiqueta Formal</p>
          <p className="font-body text-lg md:text-xl text-ivory-white/90">
            Rogamos a nuestros invitados asistir con vestimenta de etiqueta para celebrar esta ocasión tan especial.
          </p>
          <div className="w-16 h-px bg-subtle-gold/50 mx-auto mt-8" />
        </div>
      </div>
    </section>
  );
};
