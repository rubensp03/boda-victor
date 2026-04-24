import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const CorinthiansSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cor-line', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: 'power3.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[80vh] flex items-center justify-center py-24 overflow-hidden"
    >
      {/* Background photo — blurred & darkened */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/assets/foto_corintios.jpeg)',
          filter: 'blur(1px) brightness(0.45)',
          transform: 'scale(1.1)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-xl mx-auto px-8 text-center">
        <p className="cor-line font-sans text-base md:text-lg tracking-[0.25em] leading-[2.2] text-white uppercase">
          "El amor es paciente, es bondadoso.
        </p>
        <p className="cor-line font-sans text-base md:text-lg tracking-[0.25em] leading-[2.2] text-white uppercase">
          Todo lo disculpa, todo lo cree,
        </p>
        <p className="cor-line font-sans text-base md:text-lg tracking-[0.25em] leading-[2.2] text-white uppercase">
          todo lo espera, todo lo soportado.
        </p>
        <p className="cor-line font-sans text-base md:text-lg tracking-[0.25em] leading-[2.2] text-white uppercase mt-4">
          1 Corintios 13:4-7
        </p>
      </div>
    </section>
  );
};
