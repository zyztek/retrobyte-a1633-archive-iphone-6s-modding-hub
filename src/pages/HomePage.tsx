import React, { useState, useEffect } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { Cpu, Smartphone, Database, Zap, Target, Lock, Activity, Wifi, GraduationCap, Share2, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { SecretVault } from '@/components/SecretVault';
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
    addLog("INTEGRITY_CHECK: 0x41633_VERIFIED");
  }, [addLog]);
  const handleBindTerminal = () => {
    addLog("HANDSHAKE_INITIATED: Contacting A9 BootROM...");
    toast.success("TERMINAL_LINKED: Secure handshake complete.", {
      description: "A1633 mainframe is now receiving commands.",
      style: { background: '#0a0a0a', color: '#00ff41', border: '1px solid #00ff41' }
    });
    addLog("CONNECTION_STABLE: Mainframe identity verified.");
  };
  const handleAction = (label: string) => {
    addLog(`CMD_EXEC: ${label.toUpperCase()}...`);
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };
  const handleAsciiClick = () => {
    const newCount = asciiClicks + 1;
    setAsciiClicks(newCount);
    if (newCount >= 3) {
      setVaultOpen(true);
      setAsciiClicks(0);
      toast.error("WARNING: BREACH DETECTED", {
        description: "Accessing Forbidden_Sector...",
        style: { background: '#7f1d1d', color: '#fff' }
      });
    }
  };
  return (
    <TooltipProvider>
      <RetroLayout>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6 min-w-0">
            <RetroCard title="SYSTEM_OVERVIEW" status="READY" className="relative overflow-hidden">
              <div className="absolute inset-0 bg-neon-green/5 animate-pulse pointer-events-none" />
              <div className="relative z-10 space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold retro-glow tracking-tighter uppercase leading-none">RetroByte A1633</h1>
                <p className="text-sm md:text-xl text-neon-green/80 uppercase font-bold tracking-tight">
                  Core mainframe for iPhone 6s modding and legacy preservation. [V1.2.0]
                </p>
                <div
                  className="bg-black/40 p-2 md:p-4 border border-neon-green/10 w-full cursor-help hover:border-neon-pink group transition-colors overflow-hidden"
                  onClick={handleAsciiClick}
                >
                  <div className="flex justify-center relative w-full overflow-hidden">
                    {isVerbose && (
                      <div className="absolute top-0 right-0 p-2 text-[8px] font-mono text-neon-pink opacity-40 flex flex-col items-end pointer-events-none">
                        <span>PULSE_SYNC_ACTIVE</span>
                        <div className="flex gap-0.5 mt-1">
                          {Array.from({ length: 8 }).map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{ height: [4, 12, 4] }}
                              transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                              className="w-0.5 bg-neon-pink"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    <pre className="text-[6px] xs:text-[8px] sm:text-[9px] md:text-[10px] leading-none text-neon-green/40 group-hover:text-neon-pink group-hover:animate-glitch select-none flex justify-center py-4 transition-colors">
{`        .------------------------.
        | [ ................... ] |
        | [ ................... ] |
        | [      A 1 6 3 3      ] |
        | [ ................... ] |
        | [ ................... ] |
        | [_____________________] |
        |           (_)           |
        '-------------------------'`}
                    </pre>
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-neon-green/60">
                    <span>Integrity_Index</span>
                    <span className="flex items-center gap-1"><Wifi className="size-2" /> SNIFFING</span>
                    <span>98.4%</span>
                  </div>
                  <div className="h-1.5 w-full bg-neon-green/10 border border-neon-green/20">
                    <div className="h-full bg-neon-green shadow-[0_0_10px_rgba(0,255,65,0.5)]" style={{ width: '98.4%' }} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  <div className="border border-neon-green/30 p-3 flex gap-3 items-center bg-retro-black/50 hover:bg-neon-green/5 transition-colors">
                    <Cpu className="w-5 h-5 text-neon-green shrink-0" />
                    <div>
                      <div className="text-[10px] uppercase opacity-50 font-bold">Processor</div>
                      <div className="text-sm font-bold tracking-widest">Apple A9 (64-bit)</div>
                    </div>
                  </div>
                  <div className="border border-neon-green/30 p-3 flex gap-3 items-center bg-retro-black/50 hover:bg-neon-green/5 transition-colors">
                    <Database className="w-5 h-5 text-neon-green shrink-0" />
                    <div>
                      <div className="text-[10px] uppercase opacity-50 font-bold">Memory</div>
                      <div className="text-sm font-bold tracking-widest">2GB LPDDR4</div>
                    </div>
                  </div>
                </div>
              </div>
            </RetroCard>
            <RetroCard title="INTEGRITY_REPORT" variant="success" status="VERIFIED">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="size-12 bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center shrink-0">
                  <ShieldCheck className="size-8 text-emerald-500" />
                </div>
                <div className="flex-1 space-y-1 w-full">
                  <div className="flex justify-between items-center border-b border-emerald-500/20 pb-1">
                    <span className="text-[10px] font-bold uppercase">Build_Status:</span>
                    <span className="text-[10px] font-bold text-emerald-400">STABLE</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-emerald-500/20 pb-1">
                    <span className="text-[10px] font-bold uppercase">Unit_Tests:</span>
                    <span className="text-[10px] font-bold text-emerald-400">45/45 PASS</span>
                  </div>
                  <Link to="/test-center" className="text-[9px] uppercase font-black text-neon-pink hover:underline pt-1 block text-right tracking-widest">
                    VIEW_FULL_INTELLIGENCE_LOGS
                  </Link>
                </div>
              </div>
            </RetroCard>
            <RetroCard title="GODMODE_PROFILES" variant="danger">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="size-16 bg-neon-pink/20 flex items-center justify-center border-2 border-neon-pink shadow-[0_0_15px_rgba(210,9,250,0.3)] shrink-0 group">
                  <Target className="size-10 text-neon-pink group-hover:animate-glitch" />
                </div>
                <div className="flex-1 space-y-2 text-center md:text-left">
                  <h3 className="text-xl font-bold uppercase text-neon-pink tracking-tighter">Authority Override Enabled</h3>
                  <p className="text-xs opacity-80 uppercase tracking-tighter font-bold">
                    One-click mission profiles for automation. Access verified paths for Jailbreak, Multiboot, and Pentesting.
                  </p>
                  <Link to="/godmode" className="retro-button border-neon-pink text-neon-pink mt-2 inline-block shadow-[4px_4px_0px_rgba(210,9,250,1)] hover:shadow-none hover:animate-glitch active:translate-y-1">
                    ENTER_GODMODE_HUB
                  </Link>
                </div>
              </div>
            </RetroCard>
          </div>
          <div className="space-y-6">
            <RetroCard title="ACADEMY_RANK" status="PROGRESSING">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={cn("size-10 border-2 flex items-center justify-center bg-black/40", rank.color.replace('text', 'border'))}>
                    <GraduationCap className={cn("size-6", rank.color)} />
                  </div>
                  <div className="flex flex-col">
                    <span className={cn("text-base font-black uppercase tracking-tighter leading-none", rank.color)}>{rank.title}</span>
                    <span className="text-[10px] opacity-50 uppercase font-black tracking-widest mt-1">{xp} TOTAL_XP</span>
                  </div>
                </div>
                <RetroProgress current={xp} max={2500} segments={15} className="mt-2" variant="green" />
                <Link to="/academy" className="retro-button w-full text-center block text-[10px] py-1 active:translate-y-1">
                  CONTINUE_LEARNING_PATH
                </Link>
              </div>
            </RetroCard>
            <RetroCard title="QUICK_ACTIONS">
              <div className="space-y-3">
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={handleBindTerminal}
                        className="retro-button w-full flex items-center justify-center gap-2 group"
                      >
                        <Zap className="w-4 h-4 group-hover:text-white transition-colors" /> BIND_TERMINAL
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="bg-retro-black border-2 border-neon-green text-neon-green uppercase text-[10px] rounded-none z-[100] font-bold">
                      Establish DO-Durable Handshake
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to="/network-arsenal"
                        onClick={() => handleAction('NetArsenal')}
                        className="retro-button w-full flex items-center justify-center gap-2 border-neon-pink text-neon-pink shadow-[4px_4px_0px_rgba(210,9,250,1)] hover:shadow-none group"
                      >
                        <Wifi className="w-4 h-4 group-hover:animate-pulse" /> NETWORK_ARSENAL
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="bg-retro-black border-2 border-neon-pink text-neon-pink uppercase text-[10px] rounded-none z-[100] font-bold">
                      Access RF Scanning Tools
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to="/export-hub"
                        className="retro-button w-full flex items-center justify-center gap-2 border-white text-white shadow-[4px_4px_0px_white] hover:shadow-none"
                      >
                        <Share2 className="w-4 h-4" /> EXPORT_SYSTEM
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="bg-retro-black border-2 border-white text-white uppercase text-[10px] rounded-none z-[100] font-bold">
                      Deploy Archive to Global Grid
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </RetroCard>
            <RetroCard title="DEVICE_STATS" status="LIVE">
              <div className="space-y-4 text-xs font-bold uppercase tracking-tighter">
                <div className="flex justify-between border-b border-neon-green/20 pb-2">
                  <span className="opacity-70 text-[10px]">MAX_OFFICIAL_OS</span>
                  <span className="text-neon-green">iOS 15.8.3</span>
                </div>
                <div className="flex justify-between border-b border-neon-green/20 pb-2">
                  <span className="opacity-70 text-[10px]">JAILBREAK_STATUS</span>
                  <span className="text-neon-pink">COMPATIBLE</span>
                </div>
                <div className="flex justify-between border-b border-neon-green/20 pb-2">
                  <span className="opacity-70 text-[10px]">ARCH_PROFILE</span>
                  <span className="text-neon-green">N71AP (A9)</span>
                </div>
                <div className="flex justify-between items-center text-neon-pink">
                   <span className="text-[10px]">VULNERABILITY</span>
                   <Activity className="size-4 animate-pulse" />
                </div>
              </div>
            </RetroCard>
          </div>
        </div>
        <SecretVault isOpen={vaultOpen} onClose={() => setVaultOpen(false)} />
      </RetroLayout>
    </TooltipProvider>
  );
}