import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const updateTime = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    updateTime(); // initial call
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-4 sm:gap-8 justify-center items-center text-rich-cream">
      <div className="flex flex-col items-center">
        <span className="font-body text-4xl sm:text-5xl tracking-widest">{timeLeft.days}</span>
        <span className="font-sans text-[8px] sm:text-[10px] tracking-[0.3em] uppercase mt-3 opacity-60">Días</span>
      </div>
      
      <span className="text-2xl opacity-30 mt-[-1rem]">:</span>
      
      <div className="flex flex-col items-center">
        <span className="font-body text-4xl sm:text-5xl tracking-widest">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="font-sans text-[8px] sm:text-[10px] tracking-[0.3em] uppercase mt-3 opacity-60">Horas</span>
      </div>

      <span className="text-2xl opacity-30 mt-[-1rem]">:</span>

      <div className="flex flex-col items-center">
        <span className="font-body text-4xl sm:text-5xl tracking-widest">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="font-sans text-[8px] sm:text-[10px] tracking-[0.3em] uppercase mt-3 opacity-60">Min</span>
      </div>

      <span className="text-2xl opacity-30 mt-[-1rem]">:</span>

      <div className="flex flex-col items-center">
        <span className="font-body text-4xl sm:text-5xl tracking-widest">{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="font-sans text-[8px] sm:text-[10px] tracking-[0.3em] uppercase mt-3 opacity-60">Seg</span>
      </div>
    </div>
  );
};
