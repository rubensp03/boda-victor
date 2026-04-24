import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Cascade entrance effect for hero elements
      gsap.from(".hero-elem", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.5 // wait for envelope to finish slightly
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-20 pb-32"
    >
      {/* Background with blur and dark grass */}
      <div className="absolute inset-0 z-0 bg-[#0a140a]" />
      <div className="absolute inset-0 z-0 bg-forest-green opacity-90" />
      <div 
        className="absolute -inset-10 z-0 bg-cover bg-center bg-no-repeat opacity-50 mix-blend-overlay"
        style={{ backgroundImage: 'url(/assets/bg_dark_grass.png)', filter: 'blur(6px)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column: Typography */}
        <div className="text-center md:text-left">
          <h2 className="hero-elem font-sans tracking-[0.3em] text-subtle-gold text-base uppercase mb-10 drop-shadow-sm">Estáis invitados a la boda de</h2>
          <h1 className="hero-elem font-calligraphy text-6xl md:text-[10rem] text-rich-cream leading-tight md:leading-[1.1] mb-12 drop-shadow-2xl">
            <span className="block md:inline">Víctor</span>
            <span className="text-subtle-gold text-4xl md:text-[0.8em] my-2 md:my-0 md:mx-4">&</span>
            <span className="block md:inline">Inna</span>
          </h1>
          <div className="hero-elem w-24 h-px bg-subtle-gold/40 mx-auto md:mx-0 mb-8" />
          <p className="hero-elem font-body text-2xl md:text-3xl text-ivory-white italic opacity-90 tracking-widest">
            23 de Agosto de 2026
          </p>
        </div>

        {/* Right Column: Collage Images */}
        <div className="relative h-[600px] md:h-[700px] w-full mt-8 md:mt-0 flex justify-center items-center">
          {/* Main Photo */}
          <div className="hero-elem absolute z-20 shadow-2xl rotate-[-3deg] transform hover:rotate-[-1deg] transition-transform duration-500">
            <div className="bg-white p-4 pb-16 shadow-2xl border border-[#ece8de]">
              <img 
                src="/assets/foto_1.jpg" 
                alt="Víctor e Inna" 
                className="w-80 h-[480px] object-cover"
              />
              <div className="absolute bottom-6 left-0 right-0 text-center font-calligraphy text-2xl text-matte-black opacity-80">
                V & I
              </div>
            </div>
          </div>
          
          {/* Secondary Photo offset */}
          <div className="hero-elem absolute z-10 translate-x-32 translate-y-40 rotate-[4deg] shadow-xl transform hover:rotate-[2deg] transition-transform duration-500">
            <div className="bg-white p-2 shadow-lg border border-[#ece8de]">
              <img 
                src="/assets/couple_walking.png" 
                alt="Couple walking" 
                className="w-56 h-72 object-cover opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
