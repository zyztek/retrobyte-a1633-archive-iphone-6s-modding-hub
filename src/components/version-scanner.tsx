import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RetroCard } from './ui/retro-card';
import { Search, Terminal, Cpu, ShieldCheck, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
export function VersionScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [detectedVer, setDetectedVer] = useState<string | null>(null);
  const timeoutRefs = useRef<number[]>([]);
  const scanSteps = [
    "INITIALIZING_N71AP_PROBE...",
    "ACCESSING_NAND_BLOCK_0...",
    "IDENTIFYING_KERN_VERSION...",
    "DETECTING_SILEO_RESIDUE...",
    "DETECTING_KALI_CHROOT_VIABILITY...",
    "DETECTING_EMU_VIABILITY...",
    "SCAN_COMPLETE"
  ];
  // Cleanup effect
  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timeoutRefs.current.forEach(id => clearTimeout(id));
      timeoutRefs.current = [];
    };
  }, []);
  const triggerScan = () => {
    setIsScanning(true);
    setLogs([]);
    setDetectedVer(null);
    // Clear any existing timeouts before starting new ones
    timeoutRefs.current.forEach(id => clearTimeout(id));
    timeoutRefs.current = [];
    scanSteps.forEach((step, i) => {
      const timeoutId = window.setTimeout(() => {
        setLogs(prev => [...prev, `> ${step}`]);
        if (i === scanSteps.length - 1) {
          setIsScanning(false);
          setDetectedVer(Math.random() > 0.5 ? "15.4.1" : "15.8.3");
        }
      }, i * 600);
      timeoutRefs.current.push(timeoutId);
    });
  };
  return (
    <RetroCard title="FIRMWARE_SCANNER" status={isScanning ? "BUSY" : "IDLE"}>
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1 space-y-4">
          <div className="bg-black/40 border border-neon-green/20 p-4 font-mono text-[10px] h-32 overflow-y-auto scrollbar-none">
            {logs.map((log, i) => (
              <motion.div
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                key={i}
                className="text-neon-green/80"
              >
                {log}
              </motion.div>
            ))}
            {isScanning && <span className="animate-pulse">_</span>}
            {logs.length === 0 && <span className="opacity-30 italic">WAITING_FOR_COMMAND...</span>}
          </div>
          <button
            onClick={triggerScan}
            disabled={isScanning}
            className={cn(
              "retro-button w-full flex items-center justify-center gap-2",
              isScanning && "opacity-50 cursor-not-allowed"
            )}
          >
            <Search className="size-4" />
            {isScanning ? "PROBING_SYSTEM..." : "INITIATE_PROBE"}
          </button>
        </div>
        <AnimatePresence>
          {detectedVer && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full md:w-64 border-2 border-neon-pink p-4 bg-neon-pink/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-neon-pink text-white text-[8px] px-1 font-bold">MATCH</div>
              <div className="flex items-center gap-3 mb-2">
                <Cpu className="size-5 text-neon-pink" />
                <span className="text-xs font-bold uppercase tracking-widest">Target Detected</span>
              </div>
              <div className="text-4xl font-bold text-neon-pink mb-1">iOS {detectedVer}</div>
              <div className="text-[10px] uppercase opacity-70">Model: iPhone 6s (A1633)</div>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs font-bold text-neon-green">
                  <ShieldCheck className="size-4" /> SYSTEM_VULNERABLE
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-neon-pink animate-pulse">
                  <Zap className="size-3" /> EMU_READY
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-neon-pink animate-pulse">
                  <Zap className="size-3" /> KALI_READY
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </RetroCard>
  );
}