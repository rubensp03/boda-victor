import React, { useLayoutEffect, useRef } from 'react';
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

      gsap.from('.color-dot', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'back.out(1.7)',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[60vh] py-24 flex items-center justify-center bg-[#f5f0e8] overflow-hidden"
    >
      {/* Paper texture bg */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: 'url(/assets/bg_linen_paper.png)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Title */}
        <h3 className="dress-text font-calligraphy text-4xl md:text-5xl text-[#5A6351] mb-4">
          Código de Vestimenta
        </h3>
        <p className="dress-text font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#b09070] font-semibold mb-12">
          Etiqueta Formal
        </p>

        {/* Color Palette Dots — single line, no wrap */}
        <div className="dress-text flex justify-center items-center gap-4 md:gap-6 mb-16 overflow-x-auto pb-4">
          {PALETTE.map((swatch, i) => (
            <div key={i} className="color-dot group flex flex-col items-center gap-2 shrink-0">
              <div
                className="w-12 h-12 md:w-16 md:h-16 rounded-full shadow-lg border-2 border-white/60 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: swatch.color }}
              />
              <span className="font-sans text-[8px] md:text-[10px] tracking-widest uppercase text-[#858078] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {swatch.name}
              </span>
            </div>
          ))}
        </div>

        {/* Info text card */}
        <div className="dress-text max-w-md mx-auto">
          <div className="bg-white/60 backdrop-blur-sm p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.05)] border border-white/80">
            <p className="font-body text-base md:text-lg text-[#2c2c2c] leading-relaxed">
              Rogamos a nuestros invitados asistir con vestimenta en la paleta
              de colores indicada, para celebrar esta ocasión tan especial.
            </p>
            <div className="w-12 h-px bg-[#C5A880]/50 mx-auto mt-8" />
          </div>
        </div>
      </div>
    </section>
  );
};
