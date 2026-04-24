import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Countdown } from './Countdown';

gsap.registerPlugin(ScrollTrigger);

export const RsvpSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".rsvp-anim", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#0a140a] py-24 md:py-32"
    >
      {/* Background: Subtle noise or very dark green gradient */}
      <div className="absolute inset-0 z-0 bg-[#0a140a]" />
      <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-linen.png')]" />

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center px-6">
        
        {/* 1. Countdown — Minimalist on dark background */}
        <div className="rsvp-anim w-full max-w-2xl bg-white/[0.03] backdrop-blur-sm rounded-lg py-12 px-8 mb-20 border border-white/[0.05] shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
          <Countdown targetDate="2026-08-23T17:30:00" />
        </div>

        {/* 2. Calligraphy Quote — The "History" quote should be here */}
        <div className="rsvp-anim text-center mb-20 max-w-2xl px-4">
          <h2 className="font-calligraphy text-4xl md:text-5xl lg:text-7xl text-[#f3e5d0] leading-snug drop-shadow-lg">
            "Gracias por formar parte de nuestra historia"
          </h2>
        </div>

        {/* 3. The Car Sketch — Floating elegantly */}
        <div className="rsvp-anim relative w-full mb-16 px-2 md:px-0 max-w-3xl">
          <div className="relative rounded-sm overflow-hidden border border-white/5 shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
            <img 
              src="/assets/WhatsApp Image 2026-04-23 at 15.24.23.jpeg" 
              alt="Pareja en coche clásico" 
              className="w-full h-auto brightness-110 sepia-[0.1]"
            />
          </div>

          {/* 4. The Overlaying RSVP Card — offset slightly for organic feel */}
          <div className="absolute left-1/2 -bottom-24 md:-bottom-32 -translate-x-1/2 w-full max-w-[340px] md:max-w-[420px] px-4 md:px-0">
            <div className="bg-[#fdfbf7] p-8 md:p-14 shadow-[0_25px_60px_rgba(0,0,0,0.4)] border border-[#eae0d2] text-center relative group">
              
              {/* Subtle decorative internal border */}
              <div className="absolute inset-4 pointer-events-none border border-[#f0e6d6] opacity-40 transition-opacity group-hover:opacity-70" />
              
              <h3 className="relative z-10 font-sans tracking-[0.4em] text-[10px] md:text-xs text-[#b09070] uppercase mb-8 font-bold">
                Confirmación
              </h3>

              <button 
                className="relative z-10 w-full bg-[#1b301b] text-rich-cream font-sans tracking-[0.3em] text-[10px] md:text-xs uppercase px-6 py-5 hover:bg-[#122412] transition-all duration-500 shadow-lg hover:shadow-xl active:scale-95"
              >
                Confirmar Asistencia
              </button>

              <p className="font-body italic text-[11px] md:text-xs text-[#7c756c] mt-8 opacity-80 leading-relaxed">
                Rogamos confirmar antes del <br/> 20 de Julio de 2026
              </p>
            </div>
          </div>
        </div>

        {/* Spacer for the overlapping card */}
        <div className="h-24 md:h-32" />
      </div>
    </section>
  );
};
