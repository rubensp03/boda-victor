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
      className="relative min-h-[70vh] flex items-center justify-center py-32 bg-[#FDFBF7] text-center overflow-hidden"
      style={{ backgroundImage: 'url(/assets/bg_linen_paper.png)', backgroundSize: 'cover' }}
    >
      {/* Decorative large quotation marks */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] text-[25rem] md:text-[35rem] font-body text-[#5A6351] opacity-[0.04] pointer-events-none leading-none select-none">
        "
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <h2 className="quote-line font-calligraphy text-4xl md:text-6xl lg:text-7xl text-[#5A6351] mb-6 md:mb-10 leading-relaxed md:leading-normal">
          "El amor es paciente,<br className="block md:hidden"/> es bondadoso.
        </h2>
        <h2 className="quote-line font-calligraphy text-4xl md:text-6xl lg:text-7xl text-[#5A6351] mb-6 md:mb-10 leading-relaxed md:leading-normal">
          Todo lo disculpa,<br className="block md:hidden"/> todo lo cree,
        </h2>
        <h2 className="quote-line font-calligraphy text-4xl md:text-6xl lg:text-7xl text-[#5A6351] mb-12 leading-relaxed md:leading-normal">
          todo lo espera,<br className="block md:hidden"/> todo lo soporta."
        </h2>
        
        <div className="quote-line flex items-center justify-center gap-4 md:gap-8 mt-12">
          <div className="w-12 md:w-24 h-px bg-[#C5A880]/60" />
          <span className="font-sans text-[10px] md:text-sm tracking-[0.3em] uppercase text-[#737A6A] font-bold">1 Corintios 13:4-7</span>
          <div className="w-12 md:w-24 h-px bg-[#C5A880]/60" />
        </div>
      </div>
    </section>
  );
};
