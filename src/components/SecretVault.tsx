import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Zap, Skull, Ghost, X } from 'lucide-react';
import { cn } from '@/lib/utils';
interface SecretVaultProps {
  isOpen: boolean;
  onClose: () => void;
}
export function SecretVault({ isOpen, onClose }: SecretVaultProps) {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => setGlitch(prev => !prev), 200);
    return () => clearInterval(interval);
  }, [isOpen]);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[10000] bg-red-950/95 backdrop-blur-md flex items-center justify-center p-4 overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="h-full w-full bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)_1px,transparent_1px,transparent_2px)] bg-[length:100%_3px]" />
          </div>
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-2xl border-4 border-white bg-black p-8 relative shadow-[0_0_50px_rgba(255,0,0,0.3)]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors z-50"
            >
              <X className="size-8" />
            </button>
            <div className="space-y-8">
              <div className="flex items-center gap-4 text-white">
                <Skull className={cn("size-12 animate-bounce", glitch && "text-red-500")} />
                <div>
                  <h1 className="text-5xl font-bold tracking-tighter leading-none italic uppercase">Forbidden_Sector</h1>
                  <p className="text-sm font-bold text-red-500 animate-pulse uppercase">Authorized personnel only :: Entry #4163</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { name: "VOLTAGE_OVERDRIVE", desc: "Bypass thermal limiters for 30% speed boost (Hardware damage likely)", icon: Zap },
                  { name: "GPS_GHOST", desc: "Hardcoded location injection at the kernel level", icon: Ghost },
                  { name: "BASEBAND_EXPLOIT", desc: "Direct access to cellular radio firmware", icon: ShieldAlert },
                ].map((item) => (
                  <div key={item.name} className="border-2 border-white p-4 hover:bg-white hover:text-black transition-all cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <item.icon className="size-6 group-hover:animate-spin" />
                      <h3 className="text-xl font-bold italic">{item.name}</h3>
                    </div>
                    <p className="text-xs mt-1 opacity-70 italic">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 border-2 border-red-500 text-red-500 font-bold text-center text-xs uppercase animate-pulse">
                DANGER: SYSTEM INSTABILITY IMMINENT. PROCEED AT OWN RISK.
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}