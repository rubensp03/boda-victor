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

  const handleConfirm = () => {
    const phoneNumber = "34722866265"; 
    const message = encodeURIComponent("¡Hola! Confirmo mi asistencia a vuestra boda. ¡Qué ganas!");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#1a2d17] py-24 md:py-32 flex flex-col items-center justify-center min-h-[120vh]"
    >
      {/* Background Image: The car sketch as the full-section backdrop */}
      <div 
        className="absolute inset-0 z-0 bg-no-repeat bg-center opacity-40 md:opacity-60"
        style={{ 
          backgroundImage: 'url("/assets/WhatsApp Image 2026-04-23 at 15.24.23.jpeg")',
          backgroundSize: 'cover',
          maskImage: 'radial-gradient(circle, black 50%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 100%)'
        }}
      />
      
      {/* Subtle bottom fade to blend with footer */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-[#1a2d17]/80" />

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center px-6">
        
        {/* 1. Countdown — Minimalist on slightly blurred background */}
        <div className="rsvp-anim w-full max-w-2xl bg-black/10 backdrop-blur-[2px] rounded-sm py-12 px-8 mb-20 border border-white/5">
          <Countdown targetDate="2026-08-23T17:30:00" />
        </div>



        {/* 3. The RSVP Card — Fixed at bottom of section */}
        <div className="rsvp-anim w-full max-w-[340px] md:max-w-[420px] mt-12 md:mt-24 items-center flex justify-center">
          <div className="bg-[#fdfbf7] p-8 md:p-14 shadow-[0_30px_70px_rgba(0,0,0,0.5)] border border-[#eae0d2] text-center relative group w-full">
            
            {/* Subtle decorative internal border */}
            <div className="absolute inset-4 pointer-events-none border border-[#f0e6d6] opacity-40 transition-opacity group-hover:opacity-70" />
            
            <h3 className="relative z-10 font-sans tracking-[0.4em] text-[10px] md:text-xs text-[#b09070] uppercase mb-8 font-bold">
              Confirmación
            </h3>

            <button 
              onClick={handleConfirm}
              className="relative z-10 w-full bg-[#1b301b] text-rich-cream font-sans tracking-[0.3em] text-[10px] md:text-xs uppercase px-6 py-5 hover:bg-[#122412] transition-all duration-500 shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-3"
            >
              Confirmar Asistencia
            </button>

            <p className="font-body italic text-[11px] md:text-xs text-[#7c756c] mt-8 opacity-80 leading-relaxed">
              Rogamos confirmar antes del <br/> 20.07.2026
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
