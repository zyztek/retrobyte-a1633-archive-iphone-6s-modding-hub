import React, { useState, useEffect } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { Radio, Map, Activity, Terminal, Users, Globe, ChevronRight } from 'lucide-react';
import { SPECTATOR_SESSIONS } from '@shared/extended-data';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
export function LiveStreamPage() {
  const [activeFeeds, setActiveFeeds] = useState(SPECTATOR_SESSIONS);
  const [logs, setLogs] = useState<string[]>([]);
  useEffect(() => {
    const interval = setInterval(() => {
      const phrases = [
        "OP_4163 INJECTED_PALERA1N_V2",
        "GLOBAL_SYNC: EU_WEST_STATION_ACTIVE",
        "KERNEL_HANDSHAKE: SUCCESS_BY_OP_0042",
        "NEW_SPECTATOR_JOINED: #8812",
        "RF_JAMMING_DETECTED: ASIA_SOUTH"
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
            <h1 className="text-4xl font-bold retro-glow uppercase tracking-tighter flex items-center gap-3">
              <Radio className="size-10 text-neon-pink animate-pulse" /> Live Spectator
            </h1>
            <p className="text-xs text-neon-pink/60 uppercase font-bold tracking-[0.2em]">Global Modding Network :: Real-Time Telemetry</p>
          </div>
          <div className="flex items-center gap-4 bg-neon-pink/10 border-2 border-neon-pink px-4 py-1 text-[10px] font-black uppercase text-neon-pink shadow-[4px_4px_0px_rgba(210,9,250,0.3)]">
            <Users className="size-4" /> 1,240_OPERATORS_ONLINE
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <RetroCard title="GLOBAL_GRID_VISUALIZER" status="LIVE">
              <div className="relative aspect-video bg-black/40 border-2 border-neon-pink/30 flex items-center justify-center overflow-hidden">
                {/* Simulated World Map SVG/ASCII */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(210,9,250,0.1)_0%,transparent_70%)]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] font-mono leading-none whitespace-pre opacity-40">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div key={i}>{".".repeat(100)}</div>
                    ))}
                  </div>
                </div>
                {activeFeeds.map((session, i) => (
                  <motion.div
                    key={session.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
                    style={{ top: `${session.lat}%`, left: `${session.lng}%` }}
                    className="absolute z-20"
                  >
                    <div className="size-4 bg-neon-pink rounded-full border-2 border-white shadow-[0_0_15px_rgba(210,9,250,1)] relative">
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-retro-black border border-neon-pink px-2 py-1 whitespace-nowrap text-[8px] font-black text-neon-pink">
                        {session.id} :: {session.action}
                      </div>
                    </div>
                  </motion.div>
                ))}
                <div className="absolute bottom-4 left-4 flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-neon-pink/60">
                  <div className="flex items-center gap-1"><Globe className="size-3" /> MAP_SYNC_ESTABLISHED</div>
                  <div className="flex items-center gap-1"><Activity className="size-3" /> LATENCY: 12ms</div>
                </div>
              </div>
            </RetroCard>
            <RetroCard title="LIVE_COMMAND_STREAM" status="DYNAMIC">
              <div className="bg-black/60 p-4 border border-neon-pink/30 h-48 overflow-hidden font-mono text-[10px] text-neon-pink/80 space-y-2 relative">
                <AnimatePresence mode="popLayout">
                  {logs.map((log, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="border-l-2 border-neon-pink/20 pl-3 flex justify-between"
                    >
                      <span>{`> [${new Date().toLocaleTimeString()}] ${log}`}</span>
                      <span className="opacity-40 italic">#VALIDATED</span>
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
                <p className="text-[10px] uppercase font-bold italic opacity-80 leading-relaxed">
                  Join active sessions to coordinate complex multi-device exploits or share NAND logs.
                </p>
                <div className="space-y-2">
                  {activeFeeds.map(session => (
                    <div key={session.id} className="p-3 border border-neon-pink/30 bg-neon-pink/5 hover:bg-neon-pink/10 transition-all group flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[11px] font-black text-neon-pink">{session.id}</span>
                        <span className="text-[8px] opacity-60 font-bold uppercase">{session.region}</span>
                      </div>
                      <Link to="/remote-ops" className="p-1 border border-neon-pink text-neon-pink group-hover:bg-neon-pink group-hover:text-white transition-all">
                        <ChevronRight className="size-4" />
                      </Link>
                    </div>
                  ))}
                </div>
                <button className="retro-button w-full border-neon-pink text-neon-pink shadow-none py-3 flex items-center justify-center gap-2">
                  <Users className="size-4" /> BROADCAST_MY_SESSION
                </button>
              </div>
            </RetroCard>
            <RetroCard title="TRAFFIC_INTEL">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 border-2 border-neon-pink bg-neon-pink/10">
                    <Terminal className="size-6 text-neon-pink" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase text-neon-pink">Grid_Health</div>
                    <div className="text-[11px] font-mono">NOMINAL_98%</div>
                  </div>
                </div>
                <p className="text-[9px] font-bold uppercase opacity-60 leading-tight">
                  Global data streams are monitored by the Singularity Oracle to detect zero-day patterns.
                </p>
              </div>
            </RetroCard>
          </div>
        </div>
      </div>
    </RetroLayout>
  );
}