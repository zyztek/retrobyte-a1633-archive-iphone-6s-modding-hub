import React, { useRef, useEffect, useState } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { Camera, ShieldAlert, Target, Database, Terminal, Cpu } from 'lucide-react';
import { toast } from 'sonner';
export function HackCamPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [scanning, setScanning] = useState(true);
  useEffect(() => {
    async function startCamera() {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setStream(s);
        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }
      } catch (err) {
        console.error("Camera access denied:", err);
        toast.error("HARDWARE_ERROR", { description: "Camera permission denied or not found." });
      }
    }
    startCamera();
    return () => {
      stream?.getTracks().forEach(t => t.stop());
    };
  }, []);
  return (
    <RetroLayout>
      <div className="relative h-[calc(100vh-160px)] w-full overflow-hidden border-2 border-neon-green shadow-[0_0_30px_rgba(0,255,65,0.2)]">
        {/* Live Feed with Filter */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover grayscale brightness-50 contrast-150"
          />
          <div className="absolute inset-0 bg-neon-green/20 mix-blend-overlay pointer-events-none" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.1),rgba(0,0,0,0.1)_2px,transparent_2px,transparent_4px)] pointer-events-none" />
        </div>
        {/* HUD Overlay */}
        <div className="absolute inset-0 z-10 p-4 md:p-8 flex flex-col justify-between pointer-events-none">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-neon-green font-bold text-xl retro-glow uppercase">
                <Camera className="size-6" /> HackCam_v2.1
              </div>
              <div className="text-[10px] text-neon-green/60 uppercase font-mono">
                COORD_X: 42.122 | COORD_Y: -87.121 | ELV: 220m
              </div>
            </div>
            <div className="text-right space-y-1">
              <div className="text-neon-pink font-bold text-xs uppercase animate-pulse">
                Target_Acquisition: ACTIVE
              </div>
              <div className="flex justify-end gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className={`h-4 w-1 bg-neon-green/80 ${i > 3 ? 'opacity-30' : ''}`} />
                ))}
              </div>
            </div>
          </div>
          {/* Center Reticle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 border-2 border-neon-green/30 border-dashed rounded-full flex items-center justify-center animate-spin-slow">
            <Target className="size-12 text-neon-green/50" />
            <div className="absolute inset-0 border-t-2 border-neon-pink/40 rounded-full" />
          </div>
          {/* Bottom Diagnostics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pointer-events-auto">
            <div className="bg-black/80 border border-neon-green p-2 flex flex-col gap-1 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-[10px] text-neon-green font-bold uppercase">
                <Cpu className="size-3" /> Core_Temp
              </div>
              <div className="text-xl font-bold text-neon-pink font-mono">42.8°C</div>
            </div>
            <div className="bg-black/80 border border-neon-green p-2 flex flex-col gap-1 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-[10px] text-neon-green font-bold uppercase">
                <Database className="size-3" /> NAND_BLOCK
              </div>
              <div className="text-xl font-bold text-neon-green font-mono">0x1A2B</div>
            </div>
            <div className="bg-black/80 border border-neon-green p-2 flex flex-col gap-1 backdrop-blur-sm hidden md:flex">
              <div className="flex items-center gap-2 text-[10px] text-neon-green font-bold uppercase">
                <Terminal className="size-3" /> BUFFER_OVR
              </div>
              <div className="text-xl font-bold text-neon-green font-mono">NONE</div>
            </div>
            <div className="bg-black/80 border border-neon-green p-2 flex flex-col gap-1 backdrop-blur-sm hidden md:flex">
              <div className="flex items-center gap-2 text-[10px] text-neon-green font-bold uppercase">
                <ShieldAlert className="size-3" /> SEC_LEVEL
              </div>
              <div className="text-xl font-bold text-neon-pink font-mono animate-glitch">LOW</div>
            </div>
          </div>
        </div>
        {/* Floating Technical Log */}
        <div className="absolute right-4 top-24 w-32 md:w-48 bg-black/60 border border-neon-green/30 p-2 text-[8px] font-mono text-neon-green/40 pointer-events-none hidden sm:block">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="truncate">SCANNING_SURFACE_{i}... OK</div>
          ))}
        </div>
      </div>
    </RetroLayout>
  );
}