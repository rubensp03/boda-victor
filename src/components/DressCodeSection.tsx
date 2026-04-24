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


export const DressCodeSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;
  const next = () => {
    setStartIndex((prev) => Math.min(prev + 1, PALETTE.length - visibleCount));
  };
  const prev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

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
      className="relative min-h-[60vh] py-24 flex flex-col items-center justify-center bg-[#f5f0e8] overflow-hidden"
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: 'url(/assets/bg_linen_paper.png)' }}
      />

      <div className="relative z-10 w-full text-center">
        <h3 className="dress-text font-calligraphy text-4xl md:text-6xl text-[#5A6351] mb-4 px-6 leading-tight">
          Código de Vestimenta
        </h3>
        <p className="dress-text font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase text-[#b09070] font-bold mb-12">
          Etiqueta Formal
        </p>

        {/* Display name */}
        <div className="h-10 mb-4 px-4">
           {activeColor && (
             <p className="font-sans text-[11px] md:text-sm tracking-[0.3em] uppercase text-[#858078] font-bold animate-in fade-in duration-300">
               {activeColor}
             </p>
           )}
        </div>

        {/* Carousel Container */}
        <div className="relative flex items-center justify-center max-w-2xl mx-auto mb-16 px-4">
          {/* Left Button */}
          <button 
            onClick={prev}
            disabled={startIndex === 0}
            className="p-2 text-[#b09070] disabled:opacity-20 transition-all hover:scale-110 active:scale-95"
            aria-label="Previous colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Carousel Window */}
          <div className="flex gap-4 md:gap-8 overflow-hidden px-2">
            {PALETTE.slice(startIndex, startIndex + visibleCount).map((swatch, i) => (
              <div 
                key={startIndex + i} 
                className="color-dot-anim flex flex-col items-center group cursor-pointer transition-all duration-500 animate-in zoom-in-50 fade-in"
                onMouseEnter={() => setActiveColor(swatch.name)}
                onMouseLeave={() => setActiveColor(null)}
                onClick={() => setActiveColor(swatch.name)}
              >
                <div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-xl border-4 border-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl"
                  style={{ backgroundColor: swatch.color }}
                />
                <span className="font-sans text-[9px] tracking-widest uppercase text-[#858078] opacity-60 mt-4 font-semibold md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                  {swatch.name}
                </span>
              </div>
            ))}
          </div>

          {/* Right Button */}
          <button 
            onClick={next}
            disabled={startIndex >= PALETTE.length - visibleCount}
            className="p-2 text-[#b09070] disabled:opacity-20 transition-all hover:scale-110 active:scale-95"
            aria-label="Next colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

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
    </section>
  );
};
