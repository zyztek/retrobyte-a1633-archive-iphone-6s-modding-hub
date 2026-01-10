import React from 'react';
import { cn } from '@/lib/utils';
interface RetroProgressProps {
  current: number;
  max: number;
  label?: string;
  segments?: number;
  className?: string;
  variant?: 'green' | 'pink' | 'yellow';
}
export function RetroProgress({
  current,
  max,
  label,
  segments = 20,
  className,
  variant = 'green'
}: RetroProgressProps) {
  const percentage = Math.min(Math.max((current / max) * 100, 0), 100);
  const filledSegments = Math.floor((percentage / 100) * segments);
  const colors = {
    green: 'bg-neon-green shadow-[0_0_10px_rgba(0,255,65,0.5)]',
    pink: 'bg-neon-pink shadow-[0_0_10px_rgba(210,9,250,0.5)]',
    yellow: 'bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]'
  };
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-end">
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">
          {label || 'XP_PROGRESSION'}
        </span>
        <span className="text-[10px] font-mono font-bold">
          {current} / {max}
        </span>
      </div>
      <div className="flex gap-1 h-5 w-full bg-black/40 border-2 border-neon-green/20 p-1">
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex-1 transition-all duration-300",
              i < filledSegments 
                ? colors[variant]
                : "bg-white/5"
            )}
          />
        ))}
      </div>
    </div>
  );
}