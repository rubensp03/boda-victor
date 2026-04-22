import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export const GallerySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".polaroid", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        scale: 0.8,
        opacity: 0,
        rotation: gsap.utils.random(-15, 15, true),
        duration: 1.2,
        stagger: 0.3,
        ease: "back.out(1.7)"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-32 bg-deep-grass-green"
    >
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30 mix-blend-overlay"
        style={{ backgroundImage: 'url(/assets/bg_dark_grass.png)' }}
      />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <h3 className="font-calligraphy text-4xl md:text-5xl text-subtle-gold text-center mb-24 drop-shadow-md">
          Nuestro Viaje
        </h3>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
          
          {/* Polaroid 1 */}
          <div className="polaroid relative bg-[#f9f8f4] p-4 pb-16 shadow-2xl rotate-[-6deg] w-72">
             {/* Ripped tape effect at top */}
            <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-24 h-6 bg-[#eed8b2] opacity-60 rotate-2 mix-blend-multiply" style={{ clipPath: 'polygon(0% 10%, 100% 0%, 95% 90%, 5% 100%)' }} />
            <img 
              src="/assets/couple_walking.png" 
              alt="Our Journey" 
              className="w-full h-64 object-cover filter brightness-90 sepia-[0.2]"
            />
            <p className="absolute bottom-6 w-full text-center font-calligraphy text-xl text-gray-700 -ml-4">
              El comienzo...
            </p>
          </div>

          {/* Polaroid 2 */}
          <div className="polaroid relative bg-[#f9f8f4] p-4 pb-16 shadow-2xl rotate-[8deg] w-80 translate-y-12">
            <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-20 h-6 bg-[#eed8b2] opacity-60 -rotate-3 mix-blend-multiply" style={{ clipPath: 'polygon(5% 0%, 95% 10%, 100% 100%, 0% 90%)' }} />
            <img 
              src="/assets/rings_callalily.png" 
              alt="Rings on lily" 
              className="w-full h-72 object-cover filter brightness-95"
            />
             <p className="absolute bottom-6 w-full text-center font-calligraphy text-xl text-gray-700 -ml-4">
              Para siempre.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
