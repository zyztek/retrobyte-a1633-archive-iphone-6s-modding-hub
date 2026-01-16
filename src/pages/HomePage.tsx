import React, { useState, useEffect } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { Cpu, Smartphone, Database, Zap, Target, Activity, Wifi, GraduationCap, Share2, Rocket, Brain, ShieldCheck, HardDrive, Lock, Info, Skull } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { SecretVault } from '@/components/SecretVault';
import { VoiceShell } from '@/components/VoiceShell';
import { useAcademyStore, getRankByXp } from '@/store/academy-store';
import { useUIStore } from '@/store/ui-store';
import { RetroProgress } from '@/components/ui/retro-progress';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { A9_HARDWARE_SPECS } from '@shared/extended-data';
export function HomePage() {
  const [vaultOpen, setVaultOpen] = useState(false);
  const [specsOpen, setSpecsOpen] = useState(false);
  const [asciiClicks, setAsciiClicks] = useState(0);
  const addLog = useUIStore(s => s.addLog);
  const isSingularityMode = useUIStore(s => s.isSingularityMode);
  const isEternityMode = useUIStore(s => s.isEternityMode);
  const xp = useAcademyStore(s => s.xp);
  const rank = getRankByXp(xp);
  useEffect(() => {
    addLog("SYSTEM_BOOT: A1633 Archive initialized.");
  }, [addLog]);
  const handleAsciiClick = () => {
    const newCount = asciiClicks + 1;
    setAsciiClicks(newCount);
    if (newCount >= 5) {
      setVaultOpen(true);
      setAsciiClicks(0);
      toast.error("FORBIDDEN_SECTOR_ACCESSED");
    }
  };
  const statusBadges = [
    { label: 'NAND_HEALTH', val: isEternityMode ? 'ETERNAL' : '98%', icon: HardDrive, color: isSingularityMode ? 'text-neon-pink' : 'text-neon-green' },
    { label: 'BATT_LINK', val: isEternityMode ? 'ETERNAL' : 'STABLE', icon: Zap, color: isEternityMode ? 'text-yellow-400' : 'text-neon-green' },
    { label: 'SYNC_STATUS', val: isSingularityMode ? 'SINGULARITY' : 'LOCKED', icon: ShieldCheck, color: isSingularityMode ? 'text-neon-pink' : 'text-neon-green' },
    { label: 'AUTH_LEVEL', val: xp >= 1500 ? 'APOCALYPSE' : rank.title.split('_')[0], icon: Lock, color: 'text-neon-pink' },
  ];
  return (
    <RetroLayout>
      <div className="space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statusBadges.map((badge) => (
            <div key={badge.label} className={cn(
              "border-2 bg-black/60 p-2 flex items-center gap-3 transition-colors duration-500",
              isSingularityMode ? "border-neon-pink/30" : "border-neon-green/30"
            )}>
              <badge.icon className={cn("size-4", badge.color, isSingularityMode && "animate-pulse")} />
              <div className="flex flex-col">
                <span className="text-[8px] uppercase font-black opacity-40 tracking-widest">{badge.label}</span>
                <span className={cn("text-[10px] font-bold uppercase", badge.color)}>{badge.val}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <RetroCard
              title="SYSTEM_OVERVIEW"
              status={isSingularityMode ? "SINGULARITY_LOCK_ACTIVE" : "READY"}
              onClick={() => setSpecsOpen(true)}
              variant={isSingularityMode ? "danger" : "default"}
              className="cursor-pointer hover:border-white transition-all"
            >
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h1 className={cn(
                      "text-5xl font-bold tracking-tighter uppercase leading-none transition-all",
                      isSingularityMode ? "text-neon-pink pink-glow animate-glitch" : "text-neon-green retro-glow"
                    )}>RetroByte A1633</h1>
                    <p className={cn(
                      "text-xs uppercase font-black tracking-widest mt-2",
                      isSingularityMode ? "text-neon-pink/80" : "text-neon-green/60"
                    )}>
                      {isSingularityMode ? "APOCALYPSE_SUITE_v4.5" : "Soluciones_646_Singularity_v1.2"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div className={cn("size-10 flex items-center justify-center border-2 transition-colors", isSingularityMode ? "border-neon-pink bg-neon-pink/10" : "border-neon-green bg-neon-green/10")}>
                      <Smartphone className={cn("size-6", isSingularityMode ? "text-neon-pink" : "text-neon-green")} />
                    </div>
                  </div>
                </div>
                <div
                  className={cn("bg-black/40 p-6 border group transition-all", isSingularityMode ? "border-neon-pink/40" : "border-neon-green/20")}
                  onClick={(e) => { e.stopPropagation(); handleAsciiClick(); }}
                >
                  <pre className={cn("text-[7px] md:text-[10px] leading-none flex justify-center transition-all", isSingularityMode ? "text-neon-pink pink-glow" : "text-neon-green/40")}>
{isSingularityMode ? `
        .------------------------.
          | [      A P O C      ] |
          | [      A L Y P      ] |
          | [      S E _ N      ] |
          | [ ................... ] |
          | [_____________________] |
          '-------------------------'` : `
        .------------------------.
          | [ ................... ] |
          | [      S I N G U      ] |
          | [      L A R I T Y    ] |
          | [_____________________] |
          '-------------------------'`}
                  </pre>
                </div>
                <VoiceShell />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'CPU', val: 'A9_TWISTER', icon: Cpu },
                    { label: 'RAM', val: '2GB_LPDDR4', icon: Database },
                    { label: 'METRIC', val: isSingularityMode ? 'SINGULAR_0x0' : 'STABLE', icon: Activity },
                    { label: 'LINK', val: 'ACTIVE', icon: Wifi }
                  ].map(stat => (
                    <div key={stat.label} className="border p-3 bg-black/40 border-white/5">
                      <stat.icon className={cn("size-4 mb-2 opacity-50", isSingularityMode ? "text-neon-pink" : "text-neon-green")} />
                      <div className="text-[8px] uppercase font-black opacity-40">{stat.label}</div>
                      <div className={cn("text-[10px] font-bold", isSingularityMode ? "text-neon-pink" : "text-neon-green")}>{stat.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </RetroCard>
          </div>
          <div className="space-y-6">
            <RetroCard title="ACADEMY_RANK" variant={xp >= 1500 ? "danger" : "default"}>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className={cn("size-12 border-2 flex items-center justify-center bg-black/40 relative", xp >= 1500 ? "border-neon-pink" : "border-neon-green")}>
                    {xp >= 1500 ? <Skull className="size-8 text-neon-pink animate-pulse" /> : <GraduationCap className="size-8 text-neon-green" />}
                  </div>
                  <div>
                    <div className={cn("text-xl font-black uppercase tracking-tighter", xp >= 1500 ? "text-neon-pink pink-glow" : "text-neon-green")}>
                      {xp >= 1500 ? "RANK: APOCALYPSE" : rank.title}
                    </div>
                    <div className="text-[10px] opacity-50 uppercase font-black">Operator_ID: #4163</div>
                  </div>
                </div>
                <RetroProgress current={xp} max={2500} label="SYNAPTIC_DEPTH" variant={xp >= 1500 ? 'pink' : 'green'} />
                <Link to="/academy" className="retro-button block text-center text-[10px]">OPEN_DOSSIER</Link>
              </div>
            </RetroCard>
            <RetroCard title="SINGULARITY_LOCK" variant="danger">
               <div className="space-y-3">
                  <div className="text-[10px] font-black text-neon-pink animate-pulse flex items-center gap-2">
                     <Lock className="size-3" /> GRID_SYNCHRONIZED
                  </div>
                  <p className="text-[9px] uppercase font-bold italic opacity-70">SYSTEM_WIDE_RESTRICTIONS_BYPASSED. COMMAND_CENTRAL_LINKED.</p>
               </div>
            </RetroCard>
          </div>
        </div>
      </div>
      <SecretVault isOpen={vaultOpen} onClose={() => setVaultOpen(false)} />
      <Dialog open={specsOpen} onOpenChange={setSpecsOpen}>
        <DialogContent className="bg-retro-black border-4 border-neon-green text-neon-green rounded-none">
          <DialogHeader><DialogTitle className="uppercase italic tracking-widest">HARDWARE_SPEC_SHEET</DialogTitle></DialogHeader>
          <div className="space-y-4 pt-4 font-mono text-[10px]">
             <div className="flex justify-between border-b border-neon-green/20 pb-1"><span>MODEL:</span> <span>{A9_HARDWARE_SPECS.model}</span></div>
             <div className="flex justify-between border-b border-neon-green/20 pb-1"><span>CODENAME:</span> <span>{A9_HARDWARE_SPECS.codename}</span></div>
             <div className="flex justify-between border-b border-neon-green/20 pb-1"><span>CPU:</span> <span>{A9_HARDWARE_SPECS.chipset.clock}</span></div>
             <button onClick={() => setSpecsOpen(false)} className="retro-button w-full mt-4">CLOSE_DATA_STREAM</button>
          </div>
        </DialogContent>
      </Dialog>
    </RetroLayout>
  );
}