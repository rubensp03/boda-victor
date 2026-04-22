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
    <div className="hero-elem flex gap-2 sm:gap-6 justify-center md:justify-start mt-16 items-baseline text-ivory-white">
      <div className="flex flex-col items-center min-w-[4rem]">
        <span className="font-body text-4xl sm:text-5xl text-subtle-gold/90">{timeLeft.days}</span>
        <span className="font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase mt-2 opacity-70">Días</span>
      </div>
      <span className="font-body text-2xl text-subtle-gold/40 mb-6">:</span>
      <div className="flex flex-col items-center min-w-[4rem]">
        <span className="font-body text-4xl sm:text-5xl text-subtle-gold/90">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase mt-2 opacity-70">Hrs</span>
      </div>
      <span className="font-body text-2xl text-subtle-gold/40 mb-6">:</span>
      <div className="flex flex-col items-center min-w-[4rem]">
        <span className="font-body text-4xl sm:text-5xl text-subtle-gold/90">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase mt-2 opacity-70">Min</span>
      </div>
      <span className="font-body text-2xl text-subtle-gold/40 mb-6">:</span>
      <div className="flex flex-col items-center min-w-[4rem]">
        <span className="font-body text-4xl sm:text-5xl text-subtle-gold/90">{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase mt-2 opacity-70">Seg</span>
      </div>
    </div>
  );
};
