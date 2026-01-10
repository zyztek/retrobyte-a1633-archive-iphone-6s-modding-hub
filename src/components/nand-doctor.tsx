import React, { useState, useEffect, useRef } from 'react';
import { RetroCard } from './ui/retro-card';
import { Activity, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
export function NANDDoctor() {
  const [scanning, setScanning] = useState(false);
  const [sectors, setSectors] = useState<number[]>([]);
  const [health, setHealth] = useState(100);
  const totalSectors = 100;
  const intervalRef = useRef<number | null>(null);
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  const startScan = () => {
    if (scanning) return;
    setScanning(true);
    setSectors([]);
    setHealth(100);
    let current = 0;
    intervalRef.current = window.setInterval(() => {
      setSectors(prev => [...prev, Math.random() > 0.95 ? 2 : 1]); // 1: Healthy, 2: Bad
      current++;
      if (current >= totalSectors) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setScanning(false);
        setHealth(Math.floor(85 + Math.random() * 15));
      }
    }, 30);
  };
  const badSectorsCount = sectors.filter(s => s === 2).length;
  return (
    <RetroCard title="NAND_DOCTOR" status={scanning ? "SCANNING" : "HEALTHY"}>
      <div className="space-y-6">
        <div className="grid grid-cols-10 gap-1 bg-black/50 p-2 border border-neon-green/30 aspect-square md:aspect-auto">
          {Array.from({ length: totalSectors }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-4 w-full transition-colors duration-200",
                sectors[i] === 1 ? "bg-neon-green shadow-[0_0_5px_rgba(0,255,65,0.5)]" :
                sectors[i] === 2 ? "bg-neon-pink animate-pulse shadow-[0_0_5px_rgba(210,9,250,0.8)]" :
                "bg-neon-green/10"
              )}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border-2 border-neon-green/30 p-3 bg-retro-black/50">
            <div className="text-[10px] uppercase opacity-50 font-bold">Health_Score</div>
            <div className={cn("text-2xl font-bold font-mono tracking-tighter", health < 90 ? "text-neon-pink" : "text-neon-green")}>
              {scanning ? "???" : `${health}%`}
            </div>
          </div>
          <div className="border-2 border-neon-green/30 p-3 bg-retro-black/50">
            <div className="text-[10px] uppercase opacity-50 font-bold">Bad_Sectors</div>
            <div className="text-2xl font-bold font-mono tracking-tighter">{scanning ? "..." : badSectorsCount}</div>
          </div>
          <div className="border-2 border-neon-green/30 p-3 bg-retro-black/50">
            <div className="text-[10px] uppercase opacity-50 font-bold">Predicted_Life</div>
            <div className="text-2xl font-bold font-mono tracking-tighter">{scanning ? "..." : "420_DAYS"}</div>
          </div>
        </div>
        {health < 95 && !scanning && (
          <div className="p-3 bg-neon-pink/10 border-2 border-neon-pink/30 flex gap-3 items-center">
            <AlertTriangle className="size-5 text-neon-pink shrink-0" />
            <p className="text-[10px] text-neon-pink font-bold uppercase leading-tight">
              WARNING: High swap activity detected in PostmarketOS partition. NAND wear accelerating.
            </p>
          </div>
        )}
        <button
          onClick={startScan}
          disabled={scanning}
          className={cn(
            "retro-button w-full flex items-center justify-center gap-2",
            scanning && "opacity-50 cursor-wait"
          )}
        >
          <Activity className={cn("size-4", scanning && "animate-spin")} /> {scanning ? "SCANNING_STORAGE..." : "INITIATE_DEEP_SCAN"}
        </button>
      </div>
    </RetroCard>
  );
}