import React, { useMemo, useState, useEffect } from 'react';

interface TornPaperProps {
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'both' | 'none';
  className?: string; // e.g. for z-index, minus margin
  amplitude?: number; // base variance in px
}

// Generates chaotic tearing logic
const getTearPoints = (direction: 'top' | 'bottom', amplitude: number, isMobile: boolean) => {
  const points = [];
  const segments = isMobile ? 150 : 300;

  // On mobile, use slower waves with fewer sharp peaks
  const slowFreq = isMobile ? 0.1 : 0.15;
  const fastFreq = isMobile ? 0.8 : 1.8;
  const microNoise = isMobile ? 0.15 : 0.3;
  
  if (direction === 'bottom') {
    for (let i = segments; i >= 0; i--) {
      const pct = (i / segments) * 100;
      const slow = (Math.sin(pct * slowFreq) + 1) / 2;
      const fast = (Math.cos(pct * fastFreq) + 1) / 2;
      const microscopic = Math.random() * microNoise;
      
      const noise = (slow * 0.5 + fast * 0.3 + microscopic) * amplitude;
      points.push(`${pct}% calc(100% - ${noise}px)`);
    }
  } else {
    for (let i = 0; i <= segments; i++) {
      const pct = (i / segments) * 100;
      const slow = (Math.sin(pct * slowFreq) + 1) / 2; 
      const fast = (Math.cos(pct * fastFreq) + 1) / 2; 
      const microscopic = Math.random() * microNoise;     
      
      const noise = (slow * 0.5 + fast * 0.3 + microscopic) * amplitude;
      points.push(`${pct}% ${noise}px`);
    }
  }
  return points;
}

export const TornPaper: React.FC<TornPaperProps> = ({ 
  children, 
  position = 'bottom',
  className = '',
  amplitude = 25
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const clipPath = useMemo(() => {
    const points = [];
    
    // Top edge
    if (position === 'top' || position === 'both') {
      points.push(...getTearPoints('top', amplitude, isMobile));
    } else {
      points.push('0% 0%', '100% 0%');
    }

    // Bottom edge
    if (position === 'bottom' || position === 'both') {
      points.push(...getTearPoints('bottom', amplitude, isMobile));
    } else {
      points.push('100% 100%', '0% 100%');
    }

    return `polygon(${points.join(', ')})`;
  }, [position, amplitude, isMobile]);

  return (
    <div 
      className={`relative ${className}`} 
      style={{ filter: 'drop-shadow(0px 15px 20px rgba(0,0,0,0.35))' }}
    >
      <div style={{ clipPath, WebkitClipPath: clipPath }} className="h-full">
        {children}
      </div>
    </div>
  );
};
