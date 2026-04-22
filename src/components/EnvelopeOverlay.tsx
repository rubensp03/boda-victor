import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface EnvelopeOverlayProps {
  onOpenComplete: () => void;
}

export const EnvelopeOverlay: React.FC<EnvelopeOverlayProps> = ({ onOpenComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLImageElement>(null);
  const [isOpened, setIsOpened] = useState(false);

  const paperStyle = {
    backgroundImage: 'url(/assets/bg_linen_paper.png)',
    backgroundSize: 'cover',
  };

  const handleOpen = () => {
    if (isOpened) return;
    setIsOpened(true);

    gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: onOpenComplete,
      });

      // 1. Pop seal
      tl.to(sealRef.current, {
        scale: 1.5,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(2)',
      });

      // 2. Open flap (using rotation, but dropping complex 3D translation)
      tl.to(flapRef.current, {
        rotateX: 180,
        duration: 0.8,
        ease: 'power3.inOut',
      }, "-=0.1");

      // Safely swap z-index structurally so letter is natively in front when pulled up
      tl.set(flapRef.current, { zIndex: 10 }, "-=0.5");
      tl.set(letterRef.current, { zIndex: 50 }, "-=0.5");

      // 3. Envelope zoom in to camera and slight move down
      tl.to(envelopeRef.current, {
        scale: 1.4,
        y: 80, 
        duration: 1,
        ease: 'power2.inOut',
      }, "-=0.6");

      // 4. Letter slides up out of the envelope
      tl.to(letterRef.current, {
        y: -180,
        rotateX: 5, // subtle tilt
        // Adding massive shadow when pulled out for realism
        boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
        duration: 1,
        ease: 'power3.out',
      }, "-=0.3");

      // 5. Letter scales up to fill the whole screen, dissolving
      tl.to(letterRef.current, {
        scale: 5, // make sure it eclipses any side wings
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
      }, "+=0.1");

      // 6. Fade the whole wrapper out
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
      }, "-=0.6");

    }, containerRef);
  };

  // Hover breath effect
  useLayoutEffect(() => {
    if (isOpened) return;
    const ctx = gsap.context(() => {
      gsap.to(envelopeRef.current, {
        scale: 1.02,
        y: -5,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });
    }, containerRef);
    return () => ctx.revert();
  }, [isOpened]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a140a]/95 backdrop-blur-md select-none perspective-[2000px]"
    >
      <div 
        ref={envelopeRef}
        onClick={handleOpen}
        className="relative w-[340px] h-[220px] md:w-[480px] md:h-[300px] cursor-pointer group"
      >
        {/* Layer 1: ENVELOPE BACK */}
        <div 
          className="absolute inset-0 shadow-2xl rounded-sm border border-[#5A6351]/20 z-0"
          style={{ ...paperStyle, filter: 'brightness(0.7)' }}
        >
           <div className="absolute inset-0 bg-black/40 shadow-[inset_0_20px_60px_rgba(0,0,0,0.6)]" />
        </div>
        
        {/* Layer 2: LETTER INSIDE */}
        <div 
          ref={letterRef}
          className="absolute inset-x-2 top-2 bottom-2 bg-[#FDFBF7] shadow-lg flex flex-col items-center justify-center border border-[#e0d9cc] z-10"
          style={paperStyle}
        >
          <span className="font-calligraphy text-subtle-gold text-3xl md:text-5xl text-center px-4 leading-normal drop-shadow-sm">
            Nuestra Boda<br/>
            <span className="text-xl md:text-3xl mt-4 block text-[#5A6351] opacity-90">Víctor e Inna</span>
          </span>
          <div className="w-24 h-px bg-subtle-gold mt-6 opacity-40" />
        </div>

        {/* Layer 3: SIDE WINGS */}
        <div className="absolute inset-0 drop-shadow-lg z-20 pointer-events-none">
          <div className="absolute inset-0 w-full h-full" style={{ ...paperStyle, clipPath: 'polygon(0 0, 50% 50%, 0 100%)', filter: 'brightness(0.95)' }} />
          <div className="absolute inset-0 pointer-events-none drop-shadow-lg">
            <div className="w-full h-full" style={{ ...paperStyle, clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)', filter: 'brightness(0.90)' }} />
          </div>
        </div>

        {/* Layer 4: BOTTOM WING */}
        <div className="absolute inset-0 pointer-events-none drop-shadow-2xl z-30">
          <div className="w-full h-full" style={{ ...paperStyle, clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)', filter: 'brightness(1.0)' }} />
        </div>

        {/* Layer 5: TOP FLAP */}
        <div 
          ref={flapRef}
          className="absolute top-0 left-0 w-full h-[65%] z-40 drop-shadow-2xl"
          style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-0" style={{ ...paperStyle, clipPath: 'polygon(0 0, 100% 0, 50% 100%)', backfaceVisibility: 'hidden', filter: 'brightness(1.05)' }} />
          <div className="absolute inset-0" style={{ ...paperStyle, clipPath: 'polygon(0 0, 100% 0, 50% 100%)', backfaceVisibility: 'hidden', transform: 'rotateX(180deg)', filter: 'brightness(0.85)' }} />
          
          <img 
            ref={sealRef}
            src="/assets/wax_seal_trans.png" 
            alt="Sello de Cera Dorado" 
            className="absolute left-1/2 bottom-0 w-24 h-24 md:w-28 md:h-28 object-cover transform -translate-x-1/2 translate-y-[45%] drop-shadow-[0_15px_15px_rgba(0,0,0,0.8)] transition-transform group-hover:scale-105"
            style={{ backfaceVisibility: 'hidden' }}
          />
        </div>

      </div>
      
      {!isOpened && (
        <p className="absolute bottom-16 text-ivory-white font-sans tracking-[0.3em] uppercase text-xs md:text-sm animate-pulse opacity-80 pointer-events-none">
          Click para abrir
        </p>
      )}
    </div>
  );
};
