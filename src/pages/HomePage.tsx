import React, { useState, useEffect } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { Cpu, Smartphone, Database, Zap, Target, Lock, Activity, Wifi, GraduationCap, Share2, ShieldCheck, Rocket, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { SecretVault } from '@/components/SecretVault';
import { VoiceShell } from '@/components/VoiceShell';
import { useAcademyStore, getRankByXp } from '@/store/academy-store';
import { useUIStore } from '@/store/ui-store';
import { RetroProgress } from '@/components/ui/retro-progress';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { motion } from 'framer-motion';
export function HomePage() {
  const [vaultOpen, setVaultOpen] = useState(false);
  const [asciiClicks, setAsciiClicks] = useState(0);
  const addLog = useUIStore(s => s.addLog);
  const setLoading = useUIStore(s => s.setLoading);
  const isVerbose = useUIStore(s => s.isVerbose);
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
  return (
    <TooltipProvider>
      <RetroLayout>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <RetroCard title="SYSTEM_OVERVIEW" status="READY">
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h1 className="text-5xl font-bold retro-glow tracking-tighter uppercase leading-none">RetroByte A1633</h1>
                    <p className="text-xs text-neon-green/60 uppercase font-black tracking-widest mt-2">Apocalypse Suite :: v30.0_ALL_IN</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="size-10 bg-neon-green/10 border-2 border-neon-green flex items-center justify-center"><Smartphone className="size-6" /></div>
                    <div className="size-10 bg-neon-pink/10 border-2 border-neon-pink flex items-center justify-center"><Rocket className="size-6 text-neon-pink" /></div>
                  </div>
                </div>
                <div 
                  className="bg-black/40 p-6 border border-neon-green/20 cursor-pointer group hover:border-neon-pink"
                  onClick={handleAsciiClick}
                >
                  <pre className="text-[7px] md:text-[10px] leading-none text-neon-green/40 group-hover:text-neon-pink flex justify-center transition-all group-hover:animate-glitch">
{`        .------------------------.
        | [ ................... ] |
        | [      S I N G U      ] |
        | [      L A R I T Y    ] |
        | [ ................... ] |
        | [_____________________] |
        |           (_)           |
        '-------------------------'`}
                  </pre>
                </div>
                <VoiceShell />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'CPU', val: 'A9_TWISTER', icon: Cpu },
                    { label: 'RAM', val: '2GB_LPDDR4', icon: Database },
                    { label: 'LINK', val: '0x41633', icon: Activity },
                    { label: 'ZONE', val: 'LOCAL_GRID', icon: Wifi }
                  ].map(stat => (
                    <div key={stat.label} className="border border-neon-green/20 p-3 bg-black/40">
                      <stat.icon className="size-4 mb-2 text-neon-green/50" />
                      <div className="text-[8px] uppercase font-black opacity-40">{stat.label}</div>
                      <div className="text-[10px] font-bold text-neon-green truncate">{stat.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </RetroCard>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RetroCard title="ML_ORACLE" variant="danger">
                <div className="space-y-4">
                  <Brain className="size-8 text-neon-pink animate-pulse" />
                  <p className="text-[10px] uppercase font-bold italic leading-tight">Neural matching for A1633 tweaks. 98% accuracy.</p>
                  <Link to="/tweak-ai" className="retro-button block text-center border-neon-pink text-neon-pink">CONSULT_ORACLE</Link>
                </div>
              </RetroCard>
              <RetroCard title="UI_FAKEOUT" variant="default">
                <div className="space-y-4">
                  <Smartphone className="size-8 text-neon-green" />
                  <p className="text-[10px] uppercase font-bold italic leading-tight">Simulate modern UI features on legacy hardware.</p>
                  <Link to="/island-fakeout" className="retro-button block text-center">ACCESS_FAKEOUT</Link>
                </div>
              </RetroCard>
            </div>
          </div>
          <div className="space-y-6">
            <RetroCard title="ACADEMY_RANK" variant="default">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className={cn("size-12 border-2 flex items-center justify-center bg-black/40", rank.color.replace('text', 'border'))}>
                    <GraduationCap className={cn("size-8", rank.color)} />
                  </div>
                  <div>
                    <div className={cn("text-xl font-black uppercase tracking-tighter leading-none", rank.color)}>{rank.title}</div>
                    <div className="text-[10px] opacity-50 uppercase font-black mt-1">OPERATOR_ID: #4163</div>
                  </div>
                </div>
                <RetroProgress current={xp} max={2500} label="SYNAPTIC_DEPTH" variant={xp >= 1500 ? 'pink' : 'green'} />
                <Link to="/academy" className="retro-button block text-center text-[10px]">OPEN_DOSSIER</Link>
              </div>
            </RetroCard>
            <RetroCard title="QUICK_ACCESS">
              <div className="space-y-3">
                <Link to="/exploit-lab" className="retro-button w-full flex items-center justify-center gap-2 border-neon-pink text-neon-pink shadow-[4px_4px_0px_rgba(210,9,250,1)] hover:shadow-none"><Zap className="size-4" /> INJECT_PAYLOAD</Link>
                <Link to="/repo" className="retro-button w-full flex items-center justify-center gap-2"><Target className="size-4" /> REPO_SEARCH</Link>
                <Link to="/export-hub" className="retro-button w-full flex items-center justify-center gap-2 border-white text-white shadow-[4px_4px_0px_white] hover:shadow-none"><Share2 className="size-4" /> CLOUD_TWIN</Link>
              </div>
            </RetroCard>
          </div>
        </div>
        <SecretVault isOpen={vaultOpen} onClose={() => setVaultOpen(false)} />
      </RetroLayout>
    </TooltipProvider>
  );
}