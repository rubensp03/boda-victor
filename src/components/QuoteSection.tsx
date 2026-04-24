import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export const QuoteSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".quote-line", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.4,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center py-24 bg-[#0a140a] text-center overflow-hidden"
    >
      {/* Background image adapted to site aesthetics */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60 mix-blend-luminosity md:mix-blend-normal"
        style={{ backgroundImage: 'url(/assets/frase_fondo.jpeg)' }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a140a]/80 via-transparent to-[#0a140a]/80" />

      <div className="relative z-10 max-w-2xl mx-auto px-8 py-12 md:py-20 bg-forest-green/40 backdrop-blur-sm border border-subtle-gold/20 shadow-2xl rounded-sm">
        <h2 className="quote-line font-calligraphy text-4xl md:text-6xl text-rich-cream mb-8 md:mb-12 leading-tight">
          Queridos invitados:
        </h2>
        
        <div className="quote-line space-y-6 md:space-y-8">
          <p className="font-sans text-sm md:text-base tracking-[0.2em] leading-relaxed text-ivory-white uppercase opacity-90">
            En nuestra vida tendrá lugar un acontecimiento solemne e importante: <br className="hidden md:block"/>el día de nuestra boda.
          </p>
          
          <div className="w-16 h-px bg-subtle-gold/40 mx-auto" />
          
          <p className="font-sans text-sm md:text-base tracking-[0.2em] leading-relaxed text-ivory-white uppercase opacity-90">
            Queremos unir nuestros destinos y nuestros corazones, y será <br className="hidden md:block"/> un gran placer compartir con ustedes este día feliz para nosotros.
          </p>
        </div>
      </div>
    </section>
  );
};
