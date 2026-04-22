import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface EnvelopeOverlayProps {
  onOpenComplete: () => void;
}

export const EnvelopeOverlay: React.FC<EnvelopeOverlayProps> = ({ onOpenComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
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

      // 1. Open flap extremely slowly and majestically exactly halfway (around 60 degrees)
      tl.to(flapRef.current, {
        rotateX: 65,
        duration: 2.5,
        ease: 'power2.out',
      });

      // 2. Envelope zooms massively inwards, moving down, giving the sensation of passing through the opening
      tl.to(envelopeRef.current, {
        scale: 2.0,
        y: 120,
        duration: 3.5,
        ease: 'power2.inOut',
      }, "-=2.2");

      // 3. Fade the whole wrapper out seamlessly into the Hero Section
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 2.0,
      }, "-=1.8");

    }, containerRef);
  };

  // Hover breath effect
  useLayoutEffect(() => {
    if (isOpened) return;
    const ctx = gsap.context(() => {
      gsap.to(envelopeRef.current, {
        scale: 1.02,
        y: -5,
        duration: 2.5,
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
      className="fixed inset-0 z-[100] bg-[#FDFBF7] select-none overflow-hidden"
      style={{ perspective: '2000px', '--flap-y': 'clamp(250px, 75vw, 50%)' } as React.CSSProperties}
    >
      <div 
        ref={envelopeRef}
        onClick={handleOpen}
        // Envelope occupies exactly 100% of the viewport seamlessly
        className="relative w-full h-full cursor-pointer group"
      >
        {/* Layer 1: ENVELOPE BACK */}
        <div 
          className="absolute inset-0 shadow-xl border border-[#e0d9cc]/50 z-0"
          style={{ ...paperStyle, filter: 'brightness(0.96)' }}
        >
           {/* Interior oscuro simulando el fondo vacío */}
           <div className="absolute inset-0 bg-black/15 shadow-[inset_0_10px_40px_rgba(0,0,0,0.15)]" />
        </div>

        {/* Layer 2: SIDE WINGS */}
        <div className="absolute inset-0 drop-shadow-sm z-20 pointer-events-none">
          <div className="absolute inset-0 w-full h-full" style={{ ...paperStyle, clipPath: 'polygon(0 0, 50% var(--flap-y), 0 100%)', filter: 'brightness(0.98)' }} />
          <div className="absolute inset-0 pointer-events-none drop-shadow-sm">
            <div className="w-full h-full" style={{ ...paperStyle, clipPath: 'polygon(100% 0, 50% var(--flap-y), 100% 100%)', filter: 'brightness(0.97)' }} />
          </div>
        </div>

        {/* Layer 3: BOTTOM WING */}
        <div className="absolute inset-0 pointer-events-none drop-shadow-md z-30">
          <div className="w-full h-full" style={{ ...paperStyle, clipPath: 'polygon(0 100%, 50% var(--flap-y), 100% 100%)', filter: 'brightness(1.0)' }} />
        </div>

        {/* Layer 4: TOP FLAP */}
        <div 
          ref={flapRef}
          className="absolute top-0 left-0 w-full z-40 drop-shadow-md"
          style={{ height: 'var(--flap-y)', transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-0" style={{ ...paperStyle, clipPath: 'polygon(0 0, 100% 0, 50% 100%)', backfaceVisibility: 'hidden', filter: 'brightness(1.02)' }} />
          <div className="absolute inset-0" style={{ ...paperStyle, clipPath: 'polygon(0 0, 100% 0, 50% 100%)', backfaceVisibility: 'hidden', transform: 'rotateX(180deg)', filter: 'brightness(0.94)' }} />
          
          {/* WAX SEAL responsive scaling mapping against the parent's width */}
          <img 
            ref={sealRef}
            src="/assets/wax_seal_trans.png" 
            alt="Sello de Cera Dorado" 
            className="absolute left-1/2 bottom-0 w-[20%] min-w-[70px] max-w-[110px] object-cover transform -translate-x-1/2 translate-y-[45%] transition-transform group-hover:scale-105"
            style={{ 
               aspectRatio: '1/1',
               mixBlendMode: 'multiply',
               filter: 'contrast(1.2)'
            }}
          />
        </div>

      </div>
      
      {!isOpened && (
        <p className="absolute bottom-16 text-[#5A6351] font-sans tracking-[0.3em] uppercase text-xs md:text-sm animate-pulse opacity-80 pointer-events-none drop-shadow-sm">
          Click para abrir
        </p>
      )}
    </div>
  );
};
