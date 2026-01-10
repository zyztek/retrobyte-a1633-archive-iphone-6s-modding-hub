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
  // Implement rotation clamping to prevent visual distortion on wide screens
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [12, -12], { clamp: true }), {
    stiffness: 150,
    damping: 40
  });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-12, 12], { clamp: true }), {
    stiffness: 150,
    damping: 40
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
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [mouseX, mouseY]);
  return (
    <div className="relative w-full h-full min-h-[450px] md:min-h-[550px] flex items-center justify-center [perspective:2000px] bg-retro-black/40 overflow-hidden select-none">
      {/* Background Code Stream - Pointer events disabled to allow hotspot interaction */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] overflow-hidden">
        <div className="text-[7px] md:text-[8px] font-mono absolute top-4 left-4 whitespace-pre leading-tight">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="mb-0.5">
              0x{Math.random().toString(16).slice(2, 10).toUpperCase()} 0x00FF 0x{Math.random().toString(16).slice(2, 6).toUpperCase()} 0x1A2B
            </div>
          ))}
        </div>
      </div>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-40 h-80 md:w-56 md:h-[420px] will-change-transform"
      >
        {/* Phone Body */}
        <div className="absolute inset-0 bg-neutral-800 border-2 border-neon-green/30 rounded-[35px] p-1.5 shadow-[0_40px_100px_rgba(0,0,0,0.8),0_0_50px_rgba(0,255,65,0.05)] translate-z-[10px]">
          <div className="w-full h-full bg-black rounded-[30px] overflow-hidden relative border border-neon-green/50">
            <div className="absolute inset-0 z-10 pointer-events-none opacity-20 bg-[repeating-linear-gradient(0deg,rgba(0,255,65,0.1),rgba(0,255,65,0.1)_1px,transparent_1px,transparent_2px)] bg-[length:100%_4px]" />
            <div className="absolute inset-0 flex flex-col p-4 font-mono text-[6px] md:text-[8px] text-neon-green/40 animate-marquee-vertical select-none will-change-transform duration-[12s]">
              <div className="space-y-1.5">
                {Array.from({ length: 60 }).map((_, i) => (
                  <div key={i} className="flex justify-between border-b border-neon-green/5">
                    <span>[SYS] AUDIT_{i}</span>
                    <span className={cn(Math.random() > 0.85 ? 'text-neon-pink font-bold' : 'text-neon-green/30')}>
                      0x{Math.random().toString(16).slice(2, 8).toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-neon-green/10 via-transparent to-transparent pointer-events-none z-20" />
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-12 h-1 bg-neutral-900 rounded-full z-30" />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border border-neon-green/40 shadow-[inset_0_0_10px_rgba(0,255,65,0.2)] z-30" />
          </div>
          {hotspots.map((spot) => (
            <div
              key={spot.id}
              className="absolute group z-[100] flex items-center justify-center p-3 -translate-x-1/2 -translate-y-1/2 cursor-crosshair"
              style={{ top: spot.top, left: spot.left, transform: 'translateZ(30px)' }}
              onMouseEnter={() => setActiveHotspot(spot)}
              onMouseLeave={() => setActiveHotspot(null)}
              onClick={() => setActiveHotspot(activeHotspot?.id === spot.id ? null : spot)}
            >
              <div className="size-5 bg-neon-green rounded-full animate-pulse shadow-[0_0_20px_rgba(0,255,65,1)] flex items-center justify-center border-2 border-white/40">
                 <div className="size-2 bg-white rounded-full" />
              </div>
              <div className={cn(
                "absolute left-10 top-0 bg-retro-black border-2 border-neon-green p-4 min-w-[160px] md:min-w-[200px] shadow-[8px_8px_0px_rgba(0,255,65,1)] z-[200] transition-all duration-300 origin-left",
                activeHotspot?.id === spot.id ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-90 -translate-x-4 pointer-events-none"
              )}>
                <div className="text-[11px] md:text-xs font-black text-neon-green uppercase border-b-2 border-neon-green/30 mb-2 pb-1 flex justify-between items-center">
                  <span>{spot.name}</span>
                  <span className="text-neon-pink animate-pulse">!_ACT</span>
                </div>
                <div className="text-[9px] md:text-[10px] text-neon-green font-bold font-mono leading-tight tracking-widest uppercase italic">
                  {spot.data}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute top-6 left-0 h-[calc(100%-48px)] w-4 bg-neutral-900 border-l border-r border-neon-green/20 [transform:rotateY(-90deg)_translateX(-50%)]" />
        <div className="absolute top-6 right-0 h-[calc(100%-48px)] w-4 bg-neutral-900 border-l border-r border-neon-green/20 [transform:rotateY(90deg)_translateX(50%)]" />
      </motion.div>
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end border-t-2 border-neon-green/30 pt-4 font-mono text-[10px] md:text-xs">
        <div className="space-y-1">
          <div className="text-neon-pink font-black retro-glow animate-pulse uppercase tracking-widest text-sm italic">
            A1633_HARDWARE_HUD_V1.3
          </div>
          <div className="opacity-40 uppercase tracking-tight font-bold">RECON_STATE: VERIFIED</div>
          <div className="opacity-60 text-neon-green uppercase font-black text-[9px]">
            ROT_X: {rotateX.get().toFixed(1)}° | ROT_Y: {rotateY.get().toFixed(1)}°
          </div>
        </div>
        <div className="text-right">
          {activeHotspot ? (
            <div className="animate-glitch text-neon-pink font-black uppercase tracking-tighter text-sm">
              TARGETING: {activeHotspot.id.toUpperCase()}...
            </div>
          ) : (
            <div className="opacity-30 uppercase tracking-widest italic font-bold">Awaiting_Neural_Sync...</div>
          )}
        </div>
      </div>
    </div>
  );
}