import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export const RsvpSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".rsvp-elem", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 40,
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
      className="py-32 bg-rich-cream relative"
    >
      <div className="max-w-2xl mx-auto px-6">
        <div className="rsvp-elem bg-white p-12 border border-[#eae0d2] shadow-sm relative">
          
          {/* Subtle folded paper crease line in CSS */}
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(90deg,transparent_49%,#d1c8b8_50%,transparent_51%)]" />
          <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(0deg,transparent_49%,#d1c8b8_50%,transparent_51%)]" />

          <div className="text-center relative z-10">
             <div className="flex justify-center mb-6">
               <img src="/assets/rings_callalily.png" alt="Calla lily accent" className="w-16 h-16 object-cover rounded-full filter sepia-[0.3]" />
             </div>
            
            <h3 className="font-calligraphy text-4xl text-forest-green mb-6">RSVP</h3>
            
            <p className="font-body text-gray-700 text-lg mb-8">
              Por favor, confirmad vuestra asistencia antes del <br/>
              <strong className="text-subtle-gold font-normal italic">20 de Julio de 2026</strong>
            </p>
            
            <button className="bg-forest-green text-rich-cream font-sans tracking-widest text-sm uppercase px-10 py-4 hover:bg-[#152C16] transition-colors border border-transparent hover:border-subtle-gold/50 duration-300">
              Confirmar Asistencia
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
