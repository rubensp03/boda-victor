import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PALETTE = [
  { color: '#3D2B1F', name: 'Chocolate' },
  { color: '#5C4A37', name: 'Marrón' },
  { color: '#9E8E7E', name: 'Arena' },
  { color: '#D5C8B8', name: 'Champán' },
  { color: '#C8BFA8', name: 'Beige' },
  { color: '#B5C4A3', name: 'Salvia' },
  { color: '#5A6B4A', name: 'Verde oliva' },
];

// Repetimos varias veces para que parezca infinito al deslizar manualmente
const REPEATED_PALETTE = [...PALETTE, ...PALETTE, ...PALETTE, ...PALETTE];

export const DressCodeSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeColor, setActiveColor] = useState<string | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.dress-text', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
      });

      gsap.from('.color-dot-anim', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'back.out(1.7)',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Efecto de loop sencillo para scroll manual
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (el.scrollLeft > el.scrollWidth / 2) {
      el.scrollLeft = 1;
    } else if (el.scrollLeft <= 0) {
      el.scrollLeft = el.scrollWidth / 2 - 1;
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[70vh] py-24 flex flex-col items-center justify-center bg-[#f5f0e8] overflow-hidden"
    >
      {/* Paper texture bg */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: 'url(/assets/bg_linen_paper.png)' }}
      />

      <div className="relative z-10 w-full text-center">
        {/* Title */}
        <h3 className="dress-text font-calligraphy text-4xl md:text-6xl text-[#5A6351] mb-4">
          Código de Vestimenta
        </h3>
        <p className="dress-text font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase text-[#b09070] font-bold mb-12 px-6">
          Etiqueta Formal
        </p>

        {/* Name display */}
        <div className="h-10 mb-6 px-4">
           {activeColor ? (
             <p className="font-sans text-[11px] md:text-sm tracking-[0.3em] uppercase text-[#858078] font-bold animate-in fade-in duration-300">
               {activeColor}
             </p>
           ) : (
             <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#b09070]/60 italic">
               Toca un color para ver su nombre
             </p>
           )}
        </div>

        {/* Scrollable Container with Custom Carousel behavior */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="relative w-full flex overflow-x-auto snap-x snap-mandatory scrollbar-hide py-10 px-[33%] md:px-[40%]"
          style={{ 
            msOverflowStyle: 'none', 
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch' 
          }}
        >
          {REPEATED_PALETTE.map((swatch, i) => (
            <div 
              key={i} 
              className="color-dot-anim flex flex-col items-center shrink-0 snap-center px-6"
              onMouseEnter={() => setActiveColor(swatch.name)}
              onMouseLeave={() => setActiveColor(null)}
              onClick={() => setActiveColor(swatch.name)}
              onTouchStart={() => setActiveColor(swatch.name)}
            >
              <div
                className={`w-20 h-20 md:w-28 md:h-28 rounded-full shadow-2xl border-4 border-white transition-all duration-300 ${activeColor === swatch.name ? 'scale-110 shadow-3xl ring-4 ring-[#b09070]/30 -translate-y-2' : 'scale-100 translate-y-0'}`}
                style={{ backgroundColor: swatch.color }}
              />
            </div>
          ))}
        </div>

        {/* Info text card */}
        <div className="dress-text max-w-lg mx-auto px-6 mt-12">
          <div className="bg-white/40 backdrop-blur-md p-8 md:p-12 shadow-[0_15px_40px_rgba(0,0,0,0.03)] border border-white/60 rounded-sm">
            <p className="font-body text-base md:text-xl text-[#3a3a3a] leading-relaxed">
              Rogamos a nuestros invitados asistir con vestimenta en la paleta
              de colores indicada, para celebrar esta ocasión tan especial.
            </p>
            <div className="w-16 h-px bg-[#C5A880]/30 mx-auto mt-10" />
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
};
