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

  // Modern, crisp paper style
  const paperStyle = {
    backgroundColor: '#FDFBF7',
    backgroundImage: 'url(/assets/bg_linen_paper.png)',
    backgroundSize: 'cover',
    backgroundBlendMode: 'multiply' as const,
  };

  const handleOpen = () => {
    if (isOpened) return;
    setIsOpened(true);

    gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: onOpenComplete,
      });

      // 1. Pop seal slower and smoother
      tl.to(sealRef.current, {
        scale: 1.2,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
      });

      // 2. Open flap slower
      tl.to(flapRef.current, {
        rotateX: 180,
        duration: 1.4,
        ease: 'power2.inOut',
      }, "-=0.2");

      // Swap z-index halfway
      tl.set(flapRef.current, { zIndex: 10 }, "-=0.7");
      tl.set(letterRef.current, { zIndex: 50 }, "-=0.7");

      // 3. Envelope zoom in smoother
      tl.to(envelopeRef.current, {
        scale: 1.15,
        y: 40, 
        duration: 1.6,
        ease: 'power2.inOut',
      }, "-=1.2");

      // 4. Letter slides up out of the envelope very naturally
      tl.to(letterRef.current, {
        y: -180,
        rotateX: 3, 
        boxShadow: "0 15px 30px rgba(0,0,0,0.1)", // modern soft shadow
        duration: 1.5,
        ease: 'power2.inOut',
      }, "-=0.8");

      // 5. Letter scales up ethereally
      tl.to(letterRef.current, {
        scale: 4.5, 
        opacity: 0,
        duration: 1.2,
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#FDFBF7]/60 backdrop-blur-xl select-none perspective-[2000px]"
    >
      <div 
        ref={envelopeRef}
        onClick={handleOpen}
        className="relative w-[340px] h-[220px] md:w-[480px] md:h-[300px] cursor-pointer group"
      >
        {/* Layer 1: ENVELOPE BACK */}
        <div 
          className="absolute inset-0 shadow-xl rounded-sm border border-[#e0d9cc]/50 z-0"
          style={{ ...paperStyle, filter: 'brightness(0.96)' }}
        >
           <div className="absolute inset-0 bg-black/5 shadow-[inset_0_10px_30px_rgba(0,0,0,0.05)]" />
        </div>
        
        {/* Layer 2: LETTER INSIDE */}
        <div 
          ref={letterRef}
          className="absolute inset-x-2 top-2 bottom-2 bg-white shadow-sm flex flex-col items-center justify-center border border-[#eae0d2] z-10"
          style={paperStyle}
        >
          <span className="font-calligraphy text-[#5A6351] text-3xl md:text-5xl text-center px-4 leading-normal drop-shadow-sm">
            Nuestra Boda<br/>
            <span className="text-xl md:text-3xl mt-4 block opacity-80">Víctor e Inna</span>
          </span>
          <div className="w-24 h-px bg-[#5A6351] mt-6 opacity-30" />
        </div>

        {/* Layer 3: SIDE WINGS */}
        <div className="absolute inset-0 drop-shadow-sm z-20 pointer-events-none">
          <div className="absolute inset-0 w-full h-full" style={{ ...paperStyle, clipPath: 'polygon(0 0, 50% 50%, 0 100%)', filter: 'brightness(0.98)' }} />
          <div className="absolute inset-0 pointer-events-none drop-shadow-sm">
            <div className="w-full h-full" style={{ ...paperStyle, clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)', filter: 'brightness(0.97)' }} />
          </div>
        </div>

        {/* Layer 4: BOTTOM WING */}
        <div className="absolute inset-0 pointer-events-none drop-shadow-md z-30">
          <div className="w-full h-full" style={{ ...paperStyle, clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)', filter: 'brightness(1.0)' }} />
        </div>

        {/* Layer 5: TOP FLAP */}
        <div 
          ref={flapRef}
          className="absolute top-0 left-0 w-full h-[65%] z-40 drop-shadow-md"
          style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-0" style={{ ...paperStyle, clipPath: 'polygon(0 0, 100% 0, 50% 100%)', backfaceVisibility: 'hidden', filter: 'brightness(1.02)' }} />
          <div className="absolute inset-0" style={{ ...paperStyle, clipPath: 'polygon(0 0, 100% 0, 50% 100%)', backfaceVisibility: 'hidden', transform: 'rotateX(180deg)', filter: 'brightness(0.94)' }} />
          
          <img 
            ref={sealRef}
            src="/assets/wax_seal_trans.png" 
            alt="Sello de Cera Dorado" 
            className="absolute left-1/2 bottom-0 w-20 h-20 md:w-24 md:h-24 object-cover transform -translate-x-1/2 translate-y-[45%] drop-shadow-[0_8px_12px_rgba(0,0,0,0.3)] transition-transform group-hover:scale-105 opacity-90"
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
