import React from 'react';
import { useUIStore } from '@/store/ui-store';
import { AnimatePresence, motion } from 'framer-motion';
import { RetroProgress } from './retro-progress';
export function LoadingOverlay() {
  const isLoading = useUIStore((s) => s.isLoading);
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] bg-retro-black/95 flex flex-col items-center justify-center p-6"
        >
          <div className="crt-overlay opacity-40" />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md space-y-8 text-center"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-neon-green/10 blur-xl animate-pulse" />
              <h2 className="text-3xl font-black text-neon-green italic tracking-tighter uppercase animate-glitch relative">
                System_Initialization
              </h2>
            </div>
            <div className="space-y-2">
              <RetroProgress 
                current={50} 
                max={100} 
                isIndeterminate 
                segments={15} 
                className="w-full h-8"
              />
              <div className="flex justify-between text-[10px] font-bold uppercase text-neon-green/60 tracking-widest">
                <span className="animate-pulse">DECRYPTING_SECTORS...</span>
                <span>STATUS: 0x41633</span>
              </div>
            </div>
            <div className="text-[9px] font-mono text-neon-pink/80 uppercase tracking-tighter max-w-[200px] mx-auto leading-tight">
              CAUTION: MEMORY HANDSHAKE IN PROGRESS. DO NOT INTERRUPT POWER SUPPLY.
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}