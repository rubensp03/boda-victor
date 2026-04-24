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

// Triplicamos la paleta para el efecto de scroll infinito
const INFINITE_PALETTE = [...PALETTE, ...PALETTE, ...PALETTE];

export const DressCodeSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
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

  return (
    <section
      ref={containerRef}
      className="relative min-h-[70vh] py-24 flex flex-col items-center justify-center bg-[#f5f0e8] overflow-hidden"
    >
      {/* Paper texture bg */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-40 shadow-inner"
        style={{ backgroundImage: 'url(/assets/bg_linen_paper.png)' }}
      />

      <div className="relative z-10 w-full text-center">
        {/* Title */}
        <h3 className="dress-text font-calligraphy text-4xl md:text-6xl text-[#5A6351] mb-4">
          Código de Vestimenta
        </h3>
        <p className="dress-text font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase text-[#b09070] font-bold mb-16 px-6">
          Etiqueta Formal
        </p>

        {/* Name display (Persistent on mobile when touched) */}
        <div className="h-8 mb-4">
           {activeColor && (
             <p className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#858078] animate-in fade-in slide-in-from-bottom-1 duration-300">
               {activeColor}
             </p>
           )}
        </div>

        {/* Infinite Scroll Container */}
        <div className="relative w-full mb-16 py-4">
          <div className="flex animate-infinite-scroll hover:pause whitespace-nowrap">
            {INFINITE_PALETTE.map((swatch, i) => (
              <div 
                key={i} 
                className="color-dot-anim mx-4 md:mx-6 flex flex-col items-center shrink-0"
                onMouseEnter={() => setActiveColor(swatch.name)}
                onMouseLeave={() => setActiveColor(null)}
                onTouchStart={() => setActiveColor(swatch.name)}
              >
                <div
                  className={`w-16 h-16 md:w-24 md:h-24 rounded-full shadow-xl border-4 border-white transition-all duration-300 ${activeColor === swatch.name ? 'scale-110 shadow-2xl ring-4 ring-[#b09070]/20' : 'scale-100'}`}
                  style={{ backgroundColor: swatch.color }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info text card */}
        <div className="dress-text max-w-lg mx-auto px-6">
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
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 25s linear infinite;
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
};
