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
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), { stiffness: 100, damping: 20 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX - innerWidth / 2);
      mouseY.set(e.clientY - innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center perspective-[1000px] bg-retro-black/40 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="text-[8px] opacity-10 font-mono absolute top-4 left-4 whitespace-pre">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i}>0x{Math.random().toString(16).slice(2, 10).toUpperCase()} 0x00FF 0x1A2B</div>
          ))}
        </div>
      </div>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-48 h-96 transition-all duration-300"
      >
        {/* Phone Body - Front */}
        <div className="absolute inset-0 bg-neutral-800 border-2 border-neon-green/30 rounded-3xl p-1 shadow-[0_0_20px_rgba(0,255,65,0.1)]">
          <div className="w-full h-full bg-black rounded-2xl overflow-hidden relative border border-neon-green/50">
            {/* Screen Content */}
            <div className="absolute inset-0 flex flex-col p-4 font-mono text-[6px] text-neon-green/60 animate-marquee-vertical">
              {Array.from({ length: 50 }).map((_, i) => (
                <div key={i}>[SYSTEM] KERNEL_LOG: {Math.random() > 0.5 ? 'OK' : 'FAIL'} @ 0x{Math.random().toString(16).slice(2, 8)}</div>
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-neon-green/5 to-transparent pointer-events-none" />
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-neutral-900 rounded-full" />
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-neon-green/20" />
          </div>
          {/* Hotspots */}
          {hotspots.map((spot) => (
            <div
              key={spot.id}
              className="absolute group z-50 cursor-crosshair"
              style={{ top: spot.top, left: spot.left }}
              onMouseEnter={() => setActiveHotspot(spot)}
              onMouseLeave={() => setActiveHotspot(null)}
            >
              <div className="size-3 bg-neon-green rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,65,1)]" />
              <div className="hidden group-hover:block absolute left-4 top-0 bg-retro-black border border-neon-green p-2 min-w-[120px] shadow-2xl z-[100]">
                <div className="text-[10px] font-bold text-neon-green uppercase">{spot.name}</div>
                <div className="text-[8px] text-neon-green/60 uppercase">{spot.data}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Side panels (CSS 3D simulation) */}
        <div className="absolute top-0 left-0 h-full w-4 bg-neutral-900 border-l border-r border-neon-green/20 [transform:rotateY(-90deg)_translateX(-50%)]" />
        <div className="absolute top-0 right-0 h-full w-4 bg-neutral-900 border-l border-r border-neon-green/20 [transform:rotateY(90deg)_translateX(50%)]" />
      </motion.div>
      {/* Floating Meta Data UI */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end border-t border-neon-green/20 pt-2 font-mono text-[10px]">
        <div className="space-y-1">
          <div className="text-neon-pink animate-pulse">MODEL: A1633_SINGULARITY_V1</div>
          <div className="opacity-50">ROTATION_X: {rotateX.get().toFixed(2)}</div>
          <div className="opacity-50">ROTATION_Y: {rotateY.get().toFixed(2)}</div>
        </div>
        <div className="text-right">
          {activeHotspot ? (
            <div className="animate-glitch text-neon-pink font-bold uppercase">
              SCANNING_{activeHotspot.id.toUpperCase()}...
            </div>
          ) : (
            <div className="opacity-30">AWAITING_COMPONENT_FOCUS</div>
          )}
        </div>
      </div>
    </div>
  );
}