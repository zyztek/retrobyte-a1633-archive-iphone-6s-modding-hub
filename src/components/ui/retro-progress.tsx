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
  // Ensure segments is at least 1 and max is handled correctly
  const safeSegments = Math.max(1, segments);
  const safeMax = Math.max(0.01, max);
  const percentage = Math.min(Math.max((current / safeMax) * 100, 0), 100);
  const filledSegments = Math.floor((percentage / 100) * safeSegments);
  const colors = {
    green: 'bg-[#00ff41] shadow-[0_0_12px_rgba(0,255,65,0.6)]',
    pink: 'bg-[#d209fa] shadow-[0_0_12px_rgba(210,9,250,0.6)]',
    yellow: 'bg-[#facc15] shadow-[0_0_12px_rgba(250,204,21,0.6)]'
  };
  const targetHex = variant === 'green' ? '#00ff41' : variant === 'pink' ? '#d209fa' : '#facc15';
  return (
    <div className={cn("space-y-2 select-none", className)}>
      <div className="flex justify-between items-end">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neon-green/70">
          {label || 'XP_PROGRESSION'}
        </span>
        <span className="text-[10px] font-mono font-black tabular-nums tracking-widest">
          {isIndeterminate ? 'SYNCING...' : `${Math.floor(current)} / ${Math.floor(max)}`}
        </span>
      </div>
      <div className="flex gap-1 h-6 w-full bg-black/60 border-2 border-neon-green/30 p-1 relative overflow-hidden">
        {Array.from({ length: safeSegments }).map((_, i) => (
          <motion.div
            key={i}
            layout
            animate={isIndeterminate ? {
              opacity: [0.1, 1, 0.1],
              backgroundColor: [
                'rgba(255,255,255,0.02)',
                targetHex,
                'rgba(255,255,255,0.02)'
              ]
            } : {
              scale: i < filledSegments ? [0.95, 1] : 1
            }}
            transition={isIndeterminate ? {
              duration: 2,
              repeat: Infinity,
              delay: (i / safeSegments) * 1,
              ease: "easeInOut"
            } : {
              duration: 0.2
            }}
            className={cn(
              "flex-1 transition-all h-full",
              !isIndeterminate && (i < filledSegments ? colors[variant] : "bg-white/5 border border-white/5"),
              isIndeterminate && "bg-white/5 shadow-none"
            )}
          />
        ))}
        {/* CRT Scanline Overlay specifically for the progress bar */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%),linear-gradient(90deg,rgba(255,0,0,0.04),rgba(0,255,0,0.01),rgba(0,0,255,0.04))] bg-[length:100%_2px,4px_100%] z-20" />
      </div>
    </div>
  );
}