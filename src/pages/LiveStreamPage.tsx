import React, { useState, useEffect } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { Radio, Map, Activity, Terminal, Users, Globe, ChevronRight, Lock } from 'lucide-react';
import { SPECTATOR_SESSIONS } from '@shared/extended-data';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/ui-store';
import { cn } from '@/lib/utils';
export function LiveStreamPage() {
  const isSingularityMode = useUIStore(s => s.isSingularityMode);
  const [logs, setLogs] = useState<string[]>([]);
  useEffect(() => {
    const interval = setInterval(() => {
      const phrases = [
        "OP_4163 INJECTED_PALERA1N_V2",
        "GLOBAL_SYNC: EU_WEST_STATION_ACTIVE",
        "KERNEL_HANDSHAKE: SUCCESS_BY_OP_0042",
        "CLOUD_CLONE_SYNC: 192.168.1.41",
        "SINGULARITY_LOCK_BROADCAST: OK"
      ];
      setLogs(prev => [phrases[Math.floor(Math.random() * phrases.length)], ...prev].slice(0, 10));
    }, 2500);
    return () => clearInterval(interval);
  }, []);
  return (
    <RetroLayout>
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className={cn("text-4xl font-bold uppercase tracking-tighter flex items-center gap-3", isSingularityMode ? "text-neon-pink pink-glow" : "text-neon-green retro-glow")}>
              <Radio className={cn("size-10", isSingularityMode && "animate-pulse")} /> Live Spectator
            </h1>
            <p className={cn("text-xs uppercase font-bold tracking-[0.2em]", isSingularityMode ? "text-neon-pink/60" : "text-neon-green/60")}>
              {isSingularityMode ? "Global_Abyss_Grid :: Singularity_Sync" : "Global Modding Network :: Real-Time Telemetry"}
            </p>
          </div>
          <div className={cn("flex items-center gap-4 border-2 px-4 py-1 text-[10px] font-black uppercase transition-all", isSingularityMode ? "bg-neon-pink/10 border-neon-pink text-neon-pink shadow-[4px_4px_0px_rgba(210,9,250,0.3)]" : "bg-neon-green/10 border-neon-green text-neon-green")}>
            <Users className="size-4" /> 1,240_OPERATORS_ONLINE
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <RetroCard title="GLOBAL_GRID_VISUALIZER" status={isSingularityMode ? "MIRROR_LOCK_ACTIVE" : "LIVE"} variant={isSingularityMode ? "danger" : "default"}>
              <div className="relative aspect-video bg-black/40 border-2 border-neon-green/20 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className={cn("h-full w-full", isSingularityMode ? "bg-[radial-gradient(circle_at_center,rgba(210,9,250,0.2)_0%,transparent_70%)]" : "bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.1)_0%,transparent_70%)]")} />
                </div>
                {/* User's central node */}
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }} className="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                   <div className="size-6 bg-white rounded-full border-4 border-neon-pink shadow-[0_0_30px_rgba(210,9,250,1)] flex items-center justify-center">
                      <Lock className="size-3 text-neon-pink" />
                   </div>
                   <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[8px] font-black text-white bg-neon-pink px-2 py-0.5 whitespace-nowrap">LOCAL_ARCHIVE_SYNC</div>
                </motion.div>
                {SPECTATOR_SESSIONS.map((session, i) => (
                  <motion.div
                    key={session.id}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
                    style={{ top: `${session.lat}%`, left: `${session.lng}%` }}
                    className="absolute z-20"
                  >
                    <div className={cn("size-3 rounded-full border relative", isSingularityMode ? "bg-neon-pink border-white shadow-[0_0_15px_rgba(210,9,250,1)]" : "bg-neon-green border-white shadow-[0_0_10px_rgba(0,255,65,1)]")} />
                    {isSingularityMode && (
                      <svg className="absolute top-1/2 left-1/2 size-[1000px] pointer-events-none -translate-x-1/2 -translate-y-1/2">
                        <line x1="500" y1="500" x2="500 + (50% - x)" y2="500 + (50% - y)" className="stroke-neon-pink opacity-10 stroke-1" />
                      </svg>
                    )}
                  </motion.div>
                ))}
                <div className={cn("absolute bottom-4 left-4 flex items-center gap-4 text-[9px] font-black uppercase tracking-widest", isSingularityMode ? "text-neon-pink" : "text-neon-green/60")}>
                  <div className="flex items-center gap-1"><Globe className="size-3" /> GRID_STATUS: {isSingularityMode ? "SINGULARITY" : "SYNCED"}</div>
                </div>
              </div>
            </RetroCard>
            <RetroCard title="LIVE_COMMAND_STREAM" status="DYNAMIC" variant={isSingularityMode ? "danger" : "default"}>
              <div className={cn("bg-black/60 p-4 border h-48 overflow-hidden font-mono text-[10px] space-y-2 relative", isSingularityMode ? "border-neon-pink/30 text-neon-pink/80" : "border-neon-green/30 text-neon-green/80")}>
                <AnimatePresence mode="popLayout">
                  {logs.map((log, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="border-l-2 border-white/10 pl-3 flex justify-between">
                      <span>{`> [${new Date().toLocaleTimeString()}] ${log}`}</span>
                      <span className="opacity-40 italic">#GLOBAL_SYNC</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div className="absolute bottom-2 right-4 animate-pulse">_</div>
              </div>
            </RetroCard>
          </div>
          <div className="lg:col-span-4 space-y-8">
            <RetroCard title="REMOTE_HUB_DIRECT" variant="danger">
              <div className="space-y-4">
                <p className="text-[10px] uppercase font-bold italic opacity-80 leading-relaxed">Join active sessions to coordinate complex multi-device exploits or share NAND logs.</p>
                <div className="space-y-2">
                  {SPECTATOR_SESSIONS.map(session => (
                    <div key={session.id} className="p-3 border border-neon-pink/30 bg-neon-pink/5 hover:bg-neon-pink/10 transition-all flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[11px] font-black text-neon-pink">{session.id}</span>
                        <span className="text-[8px] opacity-60 font-bold uppercase">{session.region}</span>
                      </div>
                      <Link to="/remote-ops" className="p-1 border border-neon-pink text-neon-pink">
                        <ChevronRight className="size-4" />
                      </Link>
                    </div>
                  ))}
                </div>
                <button className="retro-button w-full border-neon-pink text-neon-pink py-3 flex items-center justify-center gap-2">
                  <Users className="size-4" /> BROADCAST_MY_SESSION
                </button>
              </div>
            </RetroCard>
          </div>
        </div>
      </div>
    </RetroLayout>
  );
}