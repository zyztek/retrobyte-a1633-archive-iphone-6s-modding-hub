import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
interface Hotspot {
  id: string;
  top: string;
  left: string;
  name: string;
  data: string;
}
const hotspots: Hotspot[] = [
  { id: 'cpu', top: '40%', left: '50%', name: 'A9 Chip', data: '64-bit Dual-Core 1.85GHz' },
  { id: 'nand', top: '60%', left: '45%', name: 'NAND Flash', data: 'eMMC Interface 64/128GB' },
  { id: 'bb', top: '75%', left: '55%', name: 'Baseband', data: 'Qualcomm MDM9635M' },
];
export function Retro3DPhone() {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [12, -12]), {
    stiffness: 80,
    damping: 20
  });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-12, 12]), {
    stiffness: 80,
    damping: 20
  });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX - innerWidth / 2);
      mouseY.set(e.clientY - innerHeight / 2);
    };
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const { innerWidth, innerHeight } = window;
      mouseX.set(touch.clientX - innerWidth / 2);
      mouseY.set(touch.clientY - innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [mouseX, mouseY]);
  return (
    <div className="relative w-full h-full min-h-[450px] md:min-h-[500px] flex items-center justify-center [perspective:1200px] bg-retro-black/40 overflow-hidden select-none">
      {/* Background Matrix Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10 overflow-hidden">
        <div className="text-[7px] md:text-[8px] font-mono absolute top-4 left-4 whitespace-pre leading-none">
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} className="mb-1">
              0x{Math.random().toString(16).slice(2, 10).toUpperCase()} 0x00FF 0x{Math.random().toString(16).slice(2, 6).toUpperCase()} 0x1A2B
            </div>
          ))}
        </div>
      </div>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-40 h-80 md:w-48 md:h-96 transition-all duration-300"
      >
        {/* Phone Body - Front */}
        <div className="absolute inset-0 bg-neutral-800 border-2 border-neon-green/30 rounded-[30px] md:rounded-[32px] p-1 shadow-[0_0_30px_rgba(0,255,65,0.1)]">
          <div className="w-full h-full bg-black rounded-[26px] md:rounded-[28px] overflow-hidden relative border border-neon-green/40">
            {/* Screen Content */}
            <div className="absolute inset-0 flex flex-col p-4 font-mono text-[6px] md:text-[7px] text-neon-green/60 animate-marquee-vertical select-none will-change-transform">
              <div className="space-y-1">
                {Array.from({ length: 50 }).map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <span>[SYS] LOG_{i}</span>
                    <span className={cn(Math.random() > 0.9 ? 'text-neon-pink font-bold' : 'text-neon-green/40')}>
                      0x{Math.random().toString(16).slice(2, 8).toUpperCase()}
                    </span>
                  </div>
                ))}
                {/* Seamless loop repeat */}
                {Array.from({ length: 50 }).map((_, i) => (
                  <div key={`dup-${i}`} className="flex justify-between">
                    <span>[SYS] LOG_{i}</span>
                    <span className={cn(Math.random() > 0.9 ? 'text-neon-pink font-bold' : 'text-neon-green/40')}>
                      0x{Math.random().toString(16).slice(2, 8).toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Screen Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-neon-green/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-10 md:w-12 h-1 bg-neutral-900 rounded-full" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full border border-neon-green/30 shadow-[inset_0_0_5px_rgba(0,255,65,0.15)]" />
          </div>
          {/* Hotspots - Enhanced for Touch */}
          {hotspots.map((spot) => (
            <div
              key={spot.id}
              className="absolute group z-50 flex items-center justify-center p-3 -translate-x-1/2 -translate-y-1/2 cursor-crosshair"
              style={{ top: spot.top, left: spot.left }}
              onMouseEnter={() => setActiveHotspot(spot)}
              onMouseLeave={() => setActiveHotspot(null)}
              onClick={() => setActiveHotspot(activeHotspot?.id === spot.id ? null : spot)}
            >
              <div className="size-4 md:size-5 bg-neon-green rounded-full animate-pulse shadow-[0_0_15px_rgba(0,255,65,0.8)] flex items-center justify-center border-2 border-white/20">
                 <div className="size-1.5 md:size-2 bg-white rounded-full" />
              </div>
              {/* Tooltip with edge-clipping prevention */}
              <div className={cn(
                "absolute left-8 top-0 bg-retro-black border-2 border-neon-green p-3 min-w-[140px] md:min-w-[160px] shadow-[6px_6px_0px_rgba(0,255,65,1)] z-[100] transition-all duration-200 origin-left",
                activeHotspot?.id === spot.id ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-90 -translate-x-2 pointer-events-none"
              )}>
                <div className="text-[10px] md:text-[11px] font-bold text-neon-green uppercase border-b border-neon-green/30 mb-1 pb-1 flex justify-between">
                  <span>{spot.name}</span>
                  <span className="text-neon-pink animate-pulse">!</span>
                </div>
                <div className="text-[8px] md:text-[9px] text-neon-green/80 uppercase font-mono leading-tight tracking-tight">
                  {spot.data}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* 3D Side panels (z-depth simulation) */}
        <div className="absolute top-4 left-0 h-[calc(100%-32px)] w-3 md:w-4 bg-neutral-900 border-l border-r border-neon-green/10 [transform:rotateY(-90deg)_translateX(-50%)]" />
        <div className="absolute top-4 right-0 h-[calc(100%-32px)] w-3 md:w-4 bg-neutral-900 border-l border-r border-neon-green/10 [transform:rotateY(90deg)_translateX(50%)]" />
      </motion.div>
      {/* Floating Meta Data UI */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end border-t border-neon-green/20 pt-2 font-mono text-[9px] md:text-[10px]">
        <div className="space-y-1">
          <div className="text-neon-pink font-bold retro-glow animate-pulse uppercase tracking-widest text-[8px] md:text-[10px]">
            A1633_HARDWARE_HUD_V1.1
          </div>
          <div className="opacity-40 uppercase hidden sm:block">PERSPECTIVE_LOCK: ACTIVE</div>
          <div className="opacity-40 uppercase">SENS_X: {rotateX.get().toFixed(1)}°</div>
        </div>
        <div className="text-right">
          {activeHotspot ? (
            <div className="animate-glitch text-neon-pink font-bold uppercase tracking-tighter">
              TARGETING: {activeHotspot.id.toUpperCase()}...
            </div>
          ) : (
            <div className="opacity-20 uppercase tracking-tighter italic">Awaiting_Neural_Sync...</div>
          )}
        </div>
      </div>
    </div>
  );
}