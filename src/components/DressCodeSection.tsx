import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);
  const visibleCount = 3;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

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

        {/* Carousel / Grid Container */}
        {!isMobile ? (
          /* Desktop: Show all static */
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-10 mb-16 px-6 max-w-6xl mx-auto">
            {PALETTE.map((swatch, i) => (
              <div 
                key={i} 
                className="flex flex-col items-center group cursor-pointer"
                onMouseEnter={() => setActiveColor(swatch.name)}
                onMouseLeave={() => setActiveColor(null)}
              >
                <div
                  className="w-16 h-16 md:w-24 md:h-24 rounded-full shadow-xl border-4 border-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl"
                  style={{ backgroundColor: swatch.color }}
                />
                <span className="font-sans text-[9px] tracking-widest uppercase text-[#858078] opacity-0 group-hover:opacity-100 transition-opacity mt-4 font-semibold">
                  {swatch.name}
                </span>
              </div>
            ))}
          </div>
        ) : (
          /* Mobile: Carousel */
          <div className="relative flex items-center justify-center w-full mx-auto mb-16">
            <button 
              onClick={prev}
              disabled={startIndex === 0}
              className="absolute left-2 z-20 p-2 text-[#b09070] disabled:opacity-10 transition-all bg-white/80 rounded-full shadow-md"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="overflow-hidden w-full max-w-[280px]">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${startIndex * (100 / visibleCount)}%)` }}
              >
                {PALETTE.map((swatch, i) => (
                  <div key={i} className="flex-shrink-0 w-1/3 flex flex-col items-center px-1">
                    <div 
                      className="w-16 h-16 rounded-full shadow-xl border-4 border-white"
                      style={{ backgroundColor: swatch.color }}
                      onClick={() => setActiveColor(swatch.name)}
                    />
                    <span className="font-sans text-[8px] tracking-tighter uppercase text-[#858078] mt-2 font-semibold">
                      {swatch.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={next}
              disabled={startIndex >= PALETTE.length - visibleCount}
              className="absolute right-2 z-20 p-2 text-[#b09070] disabled:opacity-10 transition-all bg-white/80 rounded-full shadow-md"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        )}

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
