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
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#1a2b16]"
    >
      {/* Background: Dark green grass texture for consistency */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: 'url(/assets/bg_dark_grass.png)' }}
      />

      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center pt-20 pb-32 px-6">
        
        {/* 1. Countdown Box */}
        <div className="rsvp-anim w-full bg-black/30 backdrop-blur-md rounded-sm py-10 px-6 mb-12 border border-white/5 shadow-2xl">
          <Countdown targetDate="2026-08-23T17:30:00" />
        </div>

        {/* 2. Calligraphy Quote */}
        <div className="rsvp-anim text-center mb-16">
          <h2 className="font-calligraphy text-4xl md:text-5xl lg:text-6xl text-rich-cream leading-tight">
            "Gracias por formar parte de nuestra historia"
          </h2>
        </div>

        {/* 3. The Car Sketch Image */}
        <div className="rsvp-anim relative w-full mb-12 shadow-2xl rounded-sm overflow-hidden border border-white/10">
          <img 
            src="/assets/WhatsApp Image 2026-04-23 at 15.24.23.jpeg" 
            alt="Ilustración pareja coche" 
            className="w-full h-auto grayscale-[0.2] brightness-110"
          />
        </div>

        {/* 4. Confirm Button on White Card */}
        <div className="rsvp-anim relative w-full max-w-md mx-auto -mt-24 md:-mt-32">
          <div className="bg-white p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-[#eae0d2] text-center">
            
            {/* Fine line details on paper */}
            <div className="absolute inset-4 pointer-events-none border border-[#f0e6d6] opacity-50" />
            
            <button 
              className="relative z-10 w-full bg-[#1e2f1e] text-rich-cream font-sans tracking-[0.25em] text-xs uppercase px-8 py-5 hover:bg-[#152415] transition-all duration-300 border border-transparent active:scale-95"
            >
              Confirmar Asistencia
            </button>
            <p className="font-body text-[10px] tracking-widest text-[#858078] uppercase mt-6 opacity-60">
              Rogamos confirmar antes del 20 de Julio
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
