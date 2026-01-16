import React from 'react';
import { useUIStore } from '@/store/ui-store';
import { AnimatePresence, motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';
export function VerboseHUD() {
  const isVerbose = useUIStore((s) => s.isVerbose);
  const actionLogs = useUIStore((s) => s.actionLogs);
  if (!isVerbose) return null;
  return (
    <div className="fixed bottom-14 right-4 z-[60] w-72 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {actionLogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="bg-retro-black/95 border-2 border-neon-green p-3 shadow-[8px_8px_0px_rgba(0,255,65,0.4)] relative overflow-hidden backdrop-blur-md"
          >
            {/* Embedded HUD Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_50%,transparent_50%)] bg-[length:100%_2px] pointer-events-none z-10" />
            <motion.div 
              key={actionLogs.length}
              animate={{ x: [0, -1, 1, 0] }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 mb-2 border-b-2 border-neon-green/30 pb-1.5 relative z-20"
            >
              <Terminal className="size-3 text-neon-green brand-glow" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neon-green retro-glow">
                System_Link_v4.4
              </span>
            </motion.div>
            <div className="space-y-2 max-h-56 overflow-hidden relative z-20">
              {actionLogs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-[9px] font-mono leading-tight flex gap-2 items-start"
                >
                  <span className="text-neon-pink italic shrink-0 opacity-80 font-bold">
                    [{log.timestamp}]
                  </span>
                  <span className="text-neon-green/90 break-words terminal-text lowercase">
                    {log.message}
                  </span>
                </motion.div>
              ))}
            </div>
            {/* Corner Decorative Element */}
            <div className="absolute bottom-1 right-1 size-2 border-r-2 border-b-2 border-neon-pink/40 pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}