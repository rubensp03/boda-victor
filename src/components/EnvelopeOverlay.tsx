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

  // Background style to match the linen paper
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

      // 1. Seal pop/fade
      tl.to(sealRef.current, {
        scale: 1.5,
        opacity: 0,
        duration: 0.4,
        ease: 'back.in(2)',
      });

      // 2. Open flap (3D rotate)
      tl.to(flapRef.current, {
        rotateX: -180,
        duration: 0.8,
        ease: 'power3.inOut',
      }, "-=0.1");

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
        duration: 1,
        ease: 'power3.out',
        zIndex: 50,
      }, "-=0.3");

      // 5. Letter scales up to fill the whole screen, dissolving into the actual Hero Section
      tl.to(letterRef.current, {
        scale: 4,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
      }, "+=0.2");

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
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* ENVELOPE BACK (Inside wall) */}
        <div 
          className="absolute inset-0 shadow-2xl rounded-sm border border-[#5A6351]/20"
          style={{ ...paperStyle, filter: 'brightness(0.7)' }}
        >
           {/* Dark inner shadow simulator */}
           <div className="absolute inset-0 bg-black/40 shadow-[inset_0_20px_60px_rgba(0,0,0,0.6)]" />
        </div>
        
        {/* LETTER INSIDE */}
        <div 
          ref={letterRef}
          className="absolute inset-x-2 top-2 bottom-2 bg-[#FDFBF7] shadow-lg flex flex-col items-center justify-center border border-[#e0d9cc]"
          style={{ ...paperStyle, transform: 'translateZ(1px)' }}
        >
          <span className="font-calligraphy text-subtle-gold text-3xl md:text-5xl text-center px-4 leading-normal drop-shadow-sm">
            Nuestra Boda<br/>
            <span className="text-xl md:text-3xl mt-4 block text-[#5A6351] opacity-90">Víctor e Inna</span>
          </span>
          <div className="w-24 h-px bg-subtle-gold mt-6 opacity-40" />
        </div>

        {/* ENVELOPE FRONT LEFT WING */}
        <div 
          className="absolute inset-0 pointer-events-none drop-shadow-lg"
          style={{ transform: 'translateZ(2px)' }}
        >
          <div 
            className="w-full h-full"
            style={{ 
              ...paperStyle,
              clipPath: 'polygon(0 0, 50% 50%, 0 100%)',
              filter: 'brightness(0.95)'
            }} 
          />
        </div>

        {/* ENVELOPE FRONT RIGHT WING */}
        <div 
          className="absolute inset-0 pointer-events-none drop-shadow-lg"
          style={{ transform: 'translateZ(2px)' }}
        >
          <div 
            className="w-full h-full"
            style={{ 
              ...paperStyle,
              clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)',
              filter: 'brightness(0.90)'
            }} 
          />
        </div>

        {/* ENVELOPE BOTTOM WING */}
        <div 
          className="absolute inset-0 pointer-events-none drop-shadow-2xl"
          style={{ transform: 'translateZ(3px)' }}
        >
          <div 
            className="w-full h-full"
            style={{ 
              ...paperStyle,
              clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)',
              filter: 'brightness(1.0)'
            }} 
          />
        </div>

        {/* ENVELOPE TOP FLAP */}
        <div 
          ref={flapRef}
          className="absolute top-0 left-0 w-full h-[65%] z-30 drop-shadow-2xl"
          style={{ 
            transformOrigin: 'top center',
            transformStyle: 'preserve-3d',
            transform: 'translateZ(4px)'
          }}
        >
          {/* Front side of the flap */}
          <div 
            className="absolute inset-0"
            style={{ 
              ...paperStyle,
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              backfaceVisibility: 'hidden',
              filter: 'brightness(1.05)'
            }} 
          />
          {/* Back side of the flap */}
          <div 
            className="absolute inset-0"
            style={{ 
              ...paperStyle,
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              backfaceVisibility: 'hidden',
              transform: 'rotateX(180deg)',
              filter: 'brightness(0.85)'
            }} 
          />
          
          {/* WAX SEAL */}
          <img 
            ref={sealRef}
            src="/assets/wax_seal.png" 
            alt="Sello de Cera Dorado" 
            className="absolute left-1/2 bottom-0 w-24 h-24 md:w-28 md:h-28 object-cover transform -translate-x-1/2 translate-y-[45%] drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] transition-transform group-hover:scale-105"
            style={{ 
              backfaceVisibility: 'hidden',
              clipPath: 'circle(46% at 50% 50%)',
              mixBlendMode: 'multiply'
            }}
          />
        </div>

      </div>
      
      {/* Click Hint */}
      {!isOpened && (
        <p className="absolute bottom-16 text-ivory-white font-sans tracking-[0.3em] uppercase text-xs md:text-sm animate-pulse opacity-80 pointer-events-none">
          Click para abrir
        </p>
      )}
    </div>
  );
};
