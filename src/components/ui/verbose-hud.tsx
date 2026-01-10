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
    <div className="fixed bottom-14 right-4 z-[60] w-64 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {actionLogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-retro-black/90 border-2 border-neon-green p-3 shadow-[4px_4px_0px_rgba(0,255,65,1)] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.05)_50%,transparent_50%)] bg-[length:100%_4px] pointer-events-none" />
            <div className="flex items-center gap-2 mb-2 border-b border-neon-green/30 pb-1">
              <Terminal className="size-3 text-neon-green" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-neon-green">System_Output</span>
            </div>
            <div className="space-y-1.5 max-h-40 overflow-hidden">
              {actionLogs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-[8px] font-mono leading-tight flex gap-2"
                >
                  <span className="text-neon-pink shrink-0">[{log.timestamp}]</span>
                  <span className="text-neon-green/90 break-words">{log.message}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}