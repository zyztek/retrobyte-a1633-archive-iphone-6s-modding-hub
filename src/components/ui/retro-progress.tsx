import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
interface RetroProgressProps {
  current: number;
  max: number;
  label?: string;
  segments?: number;
  className?: string;
  isIndeterminate?: boolean;
  variant?: 'green' | 'pink' | 'yellow';
}
export function RetroProgress({
  current,
  max,
  label,
  segments = 20,
  className,
  isIndeterminate = false,
  variant = 'green'
}: RetroProgressProps) {
  // Ensure percentage is between 0-100 and handle division by zero
  const percentage = max > 0 ? Math.min(Math.max((current / max) * 100, 0), 100) : 0;
  const filledSegments = Math.floor((percentage / 100) * segments);
  const colors = {
    green: 'bg-[#00ff41] shadow-[0_0_10px_rgba(0,255,65,0.5)]',
    pink: 'bg-[#d209fa] shadow-[0_0_10px_rgba(210,9,250,0.5)]',
    yellow: 'bg-[#facc15] shadow-[0_0_10px_rgba(250,204,21,0.5)]'
  };
  const targetColor = variant === 'green' ? '#00ff41' : variant === 'pink' ? '#d209fa' : '#facc15';
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-end">
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">
          {label || 'XP_PROGRESSION'}
        </span>
        <span className="text-[10px] font-mono font-bold tabular-nums">
          {isIndeterminate ? 'SCANNING...' : `${Math.floor(current)} / ${max}`}
        </span>
      </div>
      <div className="flex gap-1 h-5 w-full bg-black/40 border-2 border-neon-green/20 p-1 relative overflow-hidden">
        {Array.from({ length: segments }).map((_, i) => (
          <motion.div
            key={i}
            layout
            animate={isIndeterminate ? {
              opacity: [0.1, 0.8, 0.1],
              backgroundColor: [
                'rgba(255,255,255,0.05)',
                targetColor,
                'rgba(255,255,255,0.05)'
              ]
            } : {}}
            transition={isIndeterminate ? {
              duration: 1.5,
              repeat: Infinity,
              delay: (i / segments) * 1,
              ease: "linear"
            } : {}}
            className={cn(
              "flex-1 transition-all duration-300 h-full",
              !isIndeterminate && (i < filledSegments ? colors[variant] : "bg-white/5"),
              isIndeterminate && "bg-white/5 shadow-none"
            )}
          />
        ))}
        {/* Subtle scanline overlay just for the progress bar */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      </div>
    </div>
  );
}