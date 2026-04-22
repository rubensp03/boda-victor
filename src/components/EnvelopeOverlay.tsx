import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

interface EnvelopeOverlayProps {
  onOpenComplete: () => void;
}

export const EnvelopeOverlay: React.FC<EnvelopeOverlayProps> = ({ onOpenComplete }) => {
  const envelopeRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      // 1. Open flap
      tl.to(flapRef.current, {
        rotateX: 180,
        duration: 1,
        ease: 'power2.inOut',
        transformOrigin: "top center",
      })
      // 2. Slide letter up from inside envelope
      .to(letterRef.current, {
        y: -150,
        duration: 1,
        ease: 'power2.out',
      }, "-=0.2")
      // 3. Fade out the whole overlay
      .to(envelopeRef.current, {
        opacity: 0,
        scale: 1.1,
        duration: 1,
        ease: 'power2.inOut',
        onComplete: onOpenComplete,
      });
    }, envelopeRef);

    return () => ctx.revert();
  }, [onOpenComplete]);

  return (
    <div 
      ref={envelopeRef} 
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1a1a] select-none"
    >
      <div className="relative w-80 h-56 bg-rich-cream shadow-2xl perspective-1000">
        {/* Envelope Back */}
        <div className="absolute inset-0 bg-[#e0d9cc] border border-[#d1c8b8]" />
        
        {/* Letter Inside */}
        <div 
          ref={letterRef}
          className="absolute inset-x-4 top-4 h-48 bg-white shadow-inner flex flex-col items-center justify-center pt-8 z-10 border border-[#eee]"
        >
          <span className="font-calligraphy text-subtle-gold text-2xl">You're Invited</span>
          <div className="w-12 h-px bg-subtle-gold mt-2 opacity-50" />
        </div>

        {/* Envelope Front Left/Right/Bottom Flaps */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[160px] border-l-transparent border-r-[160px] border-r-transparent border-b-[112px] border-b-[#FDFBF7]" />
          <div className="absolute bottom-0 left-0 w-0 h-0 border-t-[112px] border-t-transparent border-b-[112px] border-b-transparent border-l-[160px] border-l-[#f4eee4]" />
          <div className="absolute bottom-0 right-0 w-0 h-0 border-t-[112px] border-t-transparent border-b-[112px] border-b-transparent border-r-[160px] border-r-[#f4eee4]" />
        </div>

        {/* Envelope Top Flap */}
        <div 
          ref={flapRef}
          className="absolute top-0 left-0 w-full z-30 origin-top backface-hidden"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="w-0 h-0 border-l-[160px] border-l-transparent border-r-[160px] border-r-transparent border-t-[140px] border-t-[#FDFBF7]" />
        </div>
      </div>
    </div>
  );
};
