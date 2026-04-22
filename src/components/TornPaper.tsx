import React, { useMemo } from 'react';

interface TornPaperProps {
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'both' | 'none';
  className?: string; // e.g. for z-index, minus margin
  amplitude?: number; // base variance in px
}

// Generates chaotic tearing logic
const getTearPoints = (direction: 'top' | 'bottom', amplitude: number) => {
  const points = [];
  const segments = 300; // very high res tearing
  
  if (direction === 'bottom') {
    for (let i = segments; i >= 0; i--) {
      const pct = (i / segments) * 100;
      // organic perlin-like noise roughly 0 to 1
      const slow = (Math.sin(pct * 0.15) + 1) / 2; // 0 to 1
      const fast = (Math.cos(pct * 1.8) + 1) / 2; // 0 to 1
      const microscopic = Math.random() * 0.3;     // 0 to 0.3
      
      const noise = (slow * 0.5 + fast * 0.3 + microscopic) * amplitude;
      points.push(`${pct}% calc(100% - ${noise}px)`);
    }
  } else {
    for (let i = 0; i <= segments; i++) {
      const pct = (i / segments) * 100;
      const slow = (Math.sin(pct * 0.15) + 1) / 2; 
      const fast = (Math.cos(pct * 1.8) + 1) / 2; 
      const microscopic = Math.random() * 0.3;     
      
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
  const clipPath = useMemo(() => {
    const points = [];
    
    // Top edge
    if (position === 'top' || position === 'both') {
      points.push(...getTearPoints('top', amplitude));
    } else {
      points.push('0% 0%', '100% 0%');
    }

    // Bottom edge
    if (position === 'bottom' || position === 'both') {
      points.push(...getTearPoints('bottom', amplitude));
    } else {
      points.push('100% 100%', '0% 100%');
    }

    return `polygon(${points.join(', ')})`;
  }, [position, amplitude]);

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
