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

  // Soft cream paper
  const paperStyle = { backgroundColor: '#FAF7F4' };

  const handleOpen = () => {
    if (isOpened) return;
    setIsOpened(true);

    gsap.context(() => {
      const tl = gsap.timeline({ onComplete: onOpenComplete });

      // 1. Open flap slowly and majestically (65 degrees)
      tl.to(flapRef.current, {
        rotateX: 65,
        duration: 2.5,
        ease: 'power2.out',
      });

      // 2. Envelope zooms inward — sensation of stepping through the opening
      tl.to(envelopeRef.current, {
        scale: 2.2,
        y: 100,
        duration: 3.5,
        ease: 'power2.inOut',
      }, '-=2.0');

      // 3. Fade out seamlessly into the hero section
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 2.0,
      }, '-=1.8');

    }, containerRef);
  };

  // Ambient breathe effect while waiting
  useLayoutEffect(() => {
    if (isOpened) return;
    const ctx = gsap.context(() => {
      gsap.to(envelopeRef.current, {
        scale: 1.015,
        y: -4,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
    }, containerRef);
    return () => ctx.revert();
  }, [isOpened]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] select-none overflow-hidden"
      style={{
        backgroundColor: '#F5F0EB',
        perspective: '1800px',
      }}
    >
      {/* SVG envelope shape — fills full viewport */}
      <div
        ref={envelopeRef}
        onClick={handleOpen}
        className="relative w-full h-full cursor-pointer group"
      >

        {/* ─── ENVELOPE BACK (full background) ─── */}
        <div
          className="absolute inset-0 z-0"
          style={{
            ...paperStyle,
            boxShadow: 'inset 0 0 80px rgba(180,160,140,0.12)',
            borderRadius: '12px',
          }}
        />

        {/* ─── SVG SEAMS / FOLD LINES ─── */}
        {/* Using an absolutely-positioned SVG that draws the fold triangles with clipping */}
        <svg
          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Subtle inner shadow for fold lines */}
            <filter id="foldShadow">
              <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#C4B0A0" floodOpacity="0.35"/>
            </filter>
          </defs>

          {/* Left wing */}
          <polygon
            points="0,0 50,50 0,100"
            fill="#F0EBE5"
            filter="url(#foldShadow)"
            opacity="0.85"
          />
          {/* Right wing */}
          <polygon
            points="100,0 50,50 100,100"
            fill="#EDE7E1"
            filter="url(#foldShadow)"
            opacity="0.85"
          />
          {/* Bottom wing */}
          <polygon
            points="0,100 50,50 100,100"
            fill="#F3EFE9"
            opacity="0.7"
          />

          {/* Subtle fold line between panels */}
          <line x1="0" y1="0" x2="50" y2="50" stroke="#D4C4B8" strokeWidth="0.15" opacity="0.5"/>
          <line x1="100" y1="0" x2="50" y2="50" stroke="#D4C4B8" strokeWidth="0.15" opacity="0.5"/>
          <line x1="0" y1="100" x2="50" y2="50" stroke="#D4C4B8" strokeWidth="0.15" opacity="0.5"/>
          <line x1="100" y1="100" x2="50" y2="50" stroke="#D4C4B8" strokeWidth="0.15" opacity="0.5"/>
        </svg>

        {/* ─── TOP FLAP (3D rotating) ─── */}
        {/*
          The flap is a full-width div covering the top half.
          Its clip-path makes it a triangle pointing downward.
          We use a soft curved clip via SVG clipPath rendered inline.
        */}
        <div
          ref={flapRef}
          className="absolute inset-x-0 top-0 z-40"
          style={{
            height: '55%',
            transformOrigin: 'top center',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Flap face (visible side) */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: 'drop-shadow(0 6px 18px rgba(160,130,110,0.18))' }}
          >
            <defs>
              <radialGradient id="flapGrad" cx="50%" cy="0%" r="100%">
                <stop offset="0%"   stopColor="#FFFFFF"/>
                <stop offset="100%" stopColor="#EDE5DC"/>
              </radialGradient>
            </defs>
            {/* Rounded-tip triangle: slightly curved bottom vertex */}
            <path
              d="M 0,0 L 100,0 Q 100,0 50,91 Q 0,0 0,0 Z"
              fill="url(#flapGrad)"
            />
            {/* Subtle sheen line */}
            <line x1="0" y1="0" x2="50" y2="91" stroke="#FFFFFF" strokeWidth="0.3" opacity="0.4"/>
            <line x1="100" y1="0" x2="50" y2="91" stroke="#FFFFFF" strokeWidth="0.3" opacity="0.4"/>
          </svg>

          {/* Flap back face (shown when flap rotates open) */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: 'rotateX(180deg)', backfaceVisibility: 'hidden' }}
          >
            <path d="M 0,0 L 100,0 Q 100,0 50,91 Q 0,0 0,0 Z" fill="#EDE5DC"/>
          </svg>

          {/* ─── WAX SEAL — centered on flap fold point ─── */}
          <img
            ref={sealRef}
            src="/assets/sello.png"
            alt="Sello de Cera"
            className="absolute left-1/2 group-hover:scale-105 transition-transform duration-500"
            style={{
              width: 'clamp(80px, 12vw, 140px)',
              aspectRatio: '1/1',
              bottom: '9%',
              transform: 'translateX(-50%) translateY(50%)',
              filter: 'drop-shadow(0 4px 14px rgba(160,130,110,0.45))',
            }}
          />
        </div>

      </div>

      {/* ─── CLICK HINT — perfectly centered ─── */}
      {!isOpened && (
        <div className="absolute inset-x-0 bottom-10 flex justify-center pointer-events-none">
          <p className="text-[#8A7A6E] font-sans tracking-[0.35em] uppercase text-xs md:text-sm animate-pulse opacity-75">
            Toca para abrir
          </p>
        </div>
      )}
    </div>
  );
};
