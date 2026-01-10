import React, { useRef, useEffect, useState } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { Camera, ShieldAlert, Target, Database, Terminal, Cpu, Info, Zap, Activity } from 'lucide-react';
import { toast } from 'sonner';
import { AR_HARDWARE_MARKERS } from '@shared/extended-data';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
export function HackCamPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);
  const [metronomeTime, setMetronomeTime] = useState(0);
  const [dfuReady, setDfuReady] = useState(false);
  useEffect(() => {
    let currentStream: MediaStream | null = null;
    async function startCamera() {
      try {
        const s = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        currentStream = s;
        if (videoRef.current) videoRef.current.srcObject = s;
      } catch (err) {
        toast.error("HARDWARE_ERROR", { description: "Camera access denied." });
      }
    }
    startCamera();
    return () => {
      if (currentStream) currentStream.getTracks().forEach(t => t.stop());
    };
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setMetronomeTime(t => {
        const next = (t + 0.1) % 13;
        // DFU Window: usually 10s power+home, then 3s home only
        if (next >= 9.8 && next <= 10.5) setDfuReady(true);
        else setDfuReady(false);
        return next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);
  return (
    <RetroLayout>
      <div className="relative h-[calc(100vh-180px)] w-full overflow-hidden border-2 border-neon-green bg-black">
        {/* Metronome Bar */}
        <div className="absolute top-0 left-0 w-full h-8 bg-black/80 border-b border-neon-green z-40 flex items-center px-4 gap-4">
          <span className="text-[9px] font-black text-neon-green uppercase whitespace-nowrap">DFU_Metronome</span>
          <div className="flex-1 h-2 bg-neon-green/10 border border-neon-green/30 relative">
            <motion.div 
              className="absolute top-0 h-full w-1 bg-neon-pink shadow-[0_0_10px_rgba(210,9,250,1)]"
              style={{ left: `${(metronomeTime / 13) * 100}%` }}
            />
            <div className="absolute left-[76.9%] h-full w-1 bg-yellow-400 opacity-50" title="DFU_WINDOW" />
          </div>
          <span className="text-[10px] font-mono text-neon-pink w-12">{metronomeTime.toFixed(1)}s</span>
        </div>
        {/* Live Feed */}
        <div className="absolute inset-0 z-0">
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover grayscale brightness-50 contrast-150" />
          <div className="absolute inset-0 bg-neon-green/10 mix-blend-overlay" />
        </div>
        {/* Flash Effect */}
        <AnimatePresence>
          {dfuReady && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 0.3 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-white z-30 pointer-events-none"
            />
          )}
        </AnimatePresence>
        {/* AR Markers */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {AR_HARDWARE_MARKERS.map((marker) => (
            <div key={marker.id} style={{ top: marker.top, left: marker.left }} className="absolute pointer-events-auto">
              <div 
                className={cn("size-6 border-2 flex items-center justify-center transition-all cursor-help", hoveredMarker === marker.id ? "border-neon-pink bg-neon-pink/20 scale-125" : "border-neon-green bg-neon-green/10")}
                onMouseEnter={() => setHoveredMarker(marker.id)}
                onMouseLeave={() => setHoveredMarker(null)}
              >
                <div className={cn("size-2 rounded-full", hoveredMarker === marker.id ? "bg-neon-pink animate-pulse" : "bg-neon-green")} />
              </div>
              {hoveredMarker === marker.id && (
                <div className="absolute top-8 left-0 min-w-[200px] bg-retro-black border-2 border-neon-pink p-3 z-50 shadow-[4px_4px_0px_#d209fa]">
                  <div className="text-[10px] font-bold text-neon-pink uppercase mb-1 border-b border-neon-pink/30 flex justify-between">
                    <span>{marker.name}</span>
                    <span className="text-[8px] text-white">N71AP_ARCH</span>
                  </div>
                  <div className="text-[9px] text-white/80 font-mono">{marker.specs}</div>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* HUD UI */}
        <div className="absolute inset-0 z-10 p-8 flex flex-col justify-between pointer-events-none">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-neon-green font-bold text-xl uppercase">
                <Camera className="size-6" /> HackCam_Singularity
              </div>
              <div className="text-[9px] text-neon-green/60 uppercase font-mono tracking-tighter">Handshake_Precision: {dfuReady ? 'OPTIMAL' : 'CALIBRATING'}</div>
            </div>
            {dfuReady && (
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity }} className="bg-neon-pink px-4 py-1 text-white text-xs font-black uppercase">
                DFU_WINDOW_OPEN
              </motion.div>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pointer-events-auto">
            <div className="bg-black/90 border border-neon-green p-3">
              <div className="text-[10px] text-neon-green font-bold uppercase mb-1 flex gap-2"><Zap className="size-3" /> exploit_Ready</div>
              <div className="text-xl font-bold text-neon-pink font-mono">{dfuReady ? 'YES' : 'WAIT'}</div>
            </div>
            <div className="bg-black/90 border border-neon-green p-3">
              <div className="text-[10px] text-neon-green font-bold uppercase mb-1 flex gap-2"><Activity className="size-3" /> jitter</div>
              <div className="text-xl font-bold text-neon-green font-mono">0.02ms</div>
            </div>
            <div className="bg-black/90 border border-neon-green p-3 hidden md:block">
              <div className="text-[10px] text-neon-green font-bold uppercase mb-1 flex gap-2"><Database className="size-3" /> block_id</div>
              <div className="text-xl font-bold text-neon-green font-mono">0x41633</div>
            </div>
            <div className="bg-black/90 border border-neon-pink p-3 hidden md:block animate-pulse">
              <div className="text-[10px] text-neon-pink font-bold uppercase mb-1 flex gap-2"><ShieldAlert className="size-3" /> secure_rom</div>
              <div className="text-xl font-bold text-white font-mono uppercase italic">UNLOCKED</div>
            </div>
          </div>
        </div>
      </div>
    </RetroLayout>
  );
}