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
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-overlay"
        style={{ backgroundImage: 'url(/assets/bg_dark_grass.png)', filter: 'blur(4px)' }}
      />
      <div className="absolute inset-0 z-0 bg-forest-green opacity-60" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column: Typography */}
        <div className="text-center md:text-left">
          <h2 className="hero-elem font-sans tracking-[0.2em] text-subtle-gold text-sm uppercase mb-6">Estáis invitados a</h2>
          <h1 className="hero-elem font-calligraphy text-6xl md:text-8xl text-rich-cream leading-tight mb-4 drop-shadow-lg">
            Nuestra Boda
          </h1>
          <p className="hero-elem font-body text-xl md:text-2xl text-ivory-white italic opacity-90 mt-8">
            Víctor e Inna
          </p>
        </div>

        {/* Right Column: Collage Images */}
        <div className="relative h-[500px] md:h-[600px] w-full mt-8 md:mt-0 flex justify-center items-center">
          {/* Main Photo */}
          <div className="hero-elem absolute z-20 shadow-2xl rotate-[-3deg] transform hover:rotate-[-1deg] transition-transform duration-500">
            <div className="bg-white p-3 pb-12 shadow-xl border border-[#ece8de]">
              <img 
                src="/assets/bride_peonies.png" 
                alt="Bride holding peonies" 
                className="w-64 h-80 object-cover"
              />
            </div>
          </div>
          
          {/* Secondary Photo offset */}
          <div className="hero-elem absolute z-10 translate-x-24 translate-y-32 rotate-[4deg] shadow-xl transform hover:rotate-[2deg] transition-transform duration-500">
            <div className="bg-white p-2 shadow-lg border border-[#ece8de]">
              <img 
                src="/assets/couple_walking.png" 
                alt="Couple walking" 
                className="w-48 h-60 object-cover opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
