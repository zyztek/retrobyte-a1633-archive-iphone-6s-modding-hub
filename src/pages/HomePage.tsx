import React, { useState, useEffect } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { Cpu, Smartphone, Database, Zap, Target, Activity, Wifi, GraduationCap, Share2, Rocket, Brain, ShieldCheck, HardDrive, Lock, Info } from 'lucide-react';
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
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const addLog = useUIStore(s => s.addLog);
  const isSingularityMode = useUIStore(s => s.isSingularityMode);
  const xp = useAcademyStore(s => s.xp);
  const rank = getRankByXp(xp);
  useEffect(() => {
    addLog("SYSTEM_BOOT: A1633 Archive initialized.");
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      addLog("SYS_UPDATE: PWA_INSTALL_PROMPT_CAPTURED");
    });
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
  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      addLog("SYS_UPDATE: PWA_INSTALLED_SUCCESSFULLY");
    }
  };
  const statusBadges = [
    { label: 'NAND_HEALTH', val: '98%', icon: HardDrive, color: isSingularityMode ? 'text-neon-pink' : 'text-neon-green' },
    { label: 'SYNC_STATUS', val: isSingularityMode ? 'SINGULARITY' : 'LOCKED', icon: ShieldCheck, color: isSingularityMode ? 'text-neon-pink' : 'text-neon-green' },
    { label: 'AUTH_LEVEL', val: rank.title.split('_')[0], icon: Lock, color: 'text-neon-pink' },
    { label: 'MOD_LOAD', val: 'ACTIVE', icon: Zap, color: 'text-yellow-400' }
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
              <badge.icon className={cn("size-4", badge.color, isSingularityMode && badge.label === 'SYNC_STATUS' && "animate-pulse")} />
              <div className="flex flex-col">
                <span className="text-[8px] uppercase font-black opacity-40 tracking-widest">{badge.label}</span>
                <span className={cn("text-[10px] font-bold uppercase", badge.color)}>{badge.val}</span>
              </div>
            </div>
          ))}
        </div>
        {deferredPrompt && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-2 border-neon-pink bg-neon-pink/10 p-4 flex flex-col sm:flex-row justify-between items-center gap-4"
          >
            <div className="flex items-center gap-3">
              <Rocket className="size-6 text-neon-pink animate-bounce" />
              <div className="text-xs font-black uppercase tracking-widest text-neon-pink">
                System Upgrade Available: Install Local Archive Node
              </div>
            </div>
            <button onClick={handleInstall} className="retro-button border-neon-pink text-neon-pink text-[10px] whitespace-nowrap">
              INSTALL_A1633_LOCAL
            </button>
          </motion.div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <RetroCard
              title="SYSTEM_OVERVIEW"
              status={isSingularityMode ? "SINGULARITY_LINK_ACTIVE" : "READY"}
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
                      Apocalypse Suite :: {isSingularityMode ? "v4.4_FINAL_SINGULARITY" : "v35.0_SINGULARITY"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div className={cn("size-10 flex items-center justify-center border-2 transition-colors", isSingularityMode ? "border-neon-pink bg-neon-pink/10" : "border-neon-green bg-neon-green/10")}>
                      <Smartphone className={cn("size-6", isSingularityMode ? "text-neon-pink" : "text-neon-green")} />
                    </div>
                    <div className="size-10 bg-neon-pink/10 border-2 border-neon-pink flex items-center justify-center">
                      <Rocket className="size-6 text-neon-pink" />
                    </div>
                  </div>
                </div>
                <div
                  className={cn(
                    "bg-black/40 p-6 border group transition-all",
                    isSingularityMode ? "border-neon-pink/40 hover:border-neon-pink" : "border-neon-green/20 hover:border-neon-pink"
                  )}
                  onClick={(e) => { e.stopPropagation(); handleAsciiClick(); }}
                >
                  <pre className={cn(
                    "text-[7px] md:text-[10px] leading-none flex justify-center transition-all group-hover:animate-glitch",
                    isSingularityMode ? "text-neon-pink pink-glow" : "text-neon-green/40 group-hover:text-neon-pink"
                  )}>
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
                    <div key={stat.label} className={cn(
                      "border p-3 bg-black/40 transition-colors duration-500",
                      isSingularityMode ? "border-neon-pink/20" : "border-neon-green/20"
                    )}>
                      <stat.icon className={cn("size-4 mb-2 opacity-50", isSingularityMode ? "text-neon-pink" : "text-neon-green")} />
                      <div className="text-[8px] uppercase font-black opacity-40">{stat.label}</div>
                      <div className={cn("text-[10px] font-bold truncate", isSingularityMode ? "text-neon-pink" : "text-neon-green")}>{stat.val}</div>
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
              <RetroCard title="UI_FAKEOUT" variant={isSingularityMode ? "danger" : "default"}>
                <div className="space-y-4">
                  <Smartphone className={cn("size-8", isSingularityMode ? "text-neon-pink animate-pulse" : "text-neon-green")} />
                  <p className="text-[10px] uppercase font-bold italic leading-tight">Simulate modern UI features on legacy hardware.</p>
                  <Link to="/island-fakeout" className={cn("retro-button block text-center", isSingularityMode && "border-neon-pink text-neon-pink")}>ACCESS_FAKEOUT</Link>
                </div>
              </RetroCard>
            </div>
          </div>
          <div className="space-y-6">
            <RetroCard title="ACADEMY_RANK" variant={isSingularityMode ? "danger" : "default"}>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "size-12 border-2 flex items-center justify-center bg-black/40 transition-all",
                    isSingularityMode ? "border-neon-pink shadow-[0_0_10px_rgba(210,9,250,0.4)]" : rank.color.replace('text', 'border')
                  )}>
                    <GraduationCap className={cn("size-8", isSingularityMode ? "text-neon-pink" : rank.color)} />
                  </div>
                  <div>
                    <div className={cn(
                      "text-xl font-black uppercase tracking-tighter leading-none transition-colors",
                      isSingularityMode ? "text-neon-pink pink-glow" : rank.color
                    )}>
                      {rank.title}
                    </div>
                    <div className="text-[10px] opacity-50 uppercase font-black mt-1">OPERATOR_ID: #4163</div>
                  </div>
                </div>
                <RetroProgress current={xp} max={2500} label="SYNAPTIC_DEPTH" variant={isSingularityMode ? 'pink' : 'green'} />
                <Link to="/academy" className={cn("retro-button block text-center text-[10px]", isSingularityMode && "border-neon-pink text-neon-pink")}>OPEN_DOSSIER</Link>
              </div>
            </RetroCard>
            {xp >= 2500 && (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <RetroCard title="SINGULARITY_NODE" variant="danger" className="border-neon-pink">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[10px] font-black text-neon-pink animate-pulse uppercase">
                      <Target className="size-4" /> Global_Link_Established
                    </div>
                    <p className="text-[9px] uppercase font-bold italic opacity-70">
                      Operator has reached GodMode. All systems synced to the global modding mainframe.
                    </p>
                  </div>
                </RetroCard>
              </motion.div>
            )}
            <RetroCard title="QUICK_ACCESS">
              <div className="space-y-3">
                <Link to="/exploit-lab" className="retro-button w-full flex items-center justify-center gap-2 border-neon-pink text-neon-pink shadow-[4px_4px_0px_rgba(210,9,250,1)] hover:shadow-none"><Zap className="size-4" /> INJECT_PAYLOAD</Link>
                <Link to="/repo" className="retro-button w-full flex items-center justify-center gap-2"><Target className="size-4" /> REPO_SEARCH</Link>
                <Link to="/export-hub" className="retro-button w-full flex items-center justify-center gap-2 border-white text-white shadow-[4px_4px_0px_white] hover:shadow-none"><Share2 className="size-4" /> CLOUD_TWIN</Link>
              </div>
            </RetroCard>
          </div>
        </div>
      </div>
      <SecretVault isOpen={vaultOpen} onClose={() => setVaultOpen(false)} />
      <Dialog open={specsOpen} onOpenChange={setSpecsOpen}>
        <DialogContent className={cn(
          "bg-retro-black border-4 text-neon-green max-w-2xl transition-colors duration-500",
          isSingularityMode ? "border-neon-pink" : "border-neon-green"
        )}>
          <DialogHeader>
            <DialogTitle className={cn(
              "text-2xl font-black italic uppercase flex items-center gap-3 transition-colors",
              isSingularityMode ? "text-neon-pink pink-glow" : "text-neon-green brand-glow"
            )}>
              <Info className={cn("size-6", isSingularityMode ? "text-neon-pink" : "text-neon-green")} /> HARDWARE_SPEC_SHEET
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className={cn("text-xs font-black uppercase border-b pb-1 transition-colors", isSingularityMode ? "border-neon-pink/30 text-neon-pink" : "border-neon-green/30 text-neon-pink")}>Chipset_Matrix</h3>
                <div className={cn("space-y-2 text-[10px] font-mono", isSingularityMode && "text-neon-pink/80")}>
                  <div className="flex justify-between"><span>MODEL:</span> <span>{A9_HARDWARE_SPECS.model}</span></div>
                  <div className="flex justify-between"><span>CODENAME:</span> <span>{A9_HARDWARE_SPECS.codename}</span></div>
                  <div className="flex justify-between"><span>ARCH:</span> <span>{A9_HARDWARE_SPECS.chipset.architecture}</span></div>
                  <div className="flex justify-between"><span>CLOCK:</span> <span>{A9_HARDWARE_SPECS.chipset.clock}</span></div>
                  <div className="flex justify-between"><span>PROCESS:</span> <span>{A9_HARDWARE_SPECS.chipset.process}</span></div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className={cn("text-xs font-black uppercase border-b pb-1 transition-colors", isSingularityMode ? "border-neon-pink/30 text-neon-pink" : "border-neon-green/30 text-neon-pink")}>Visual_Engine</h3>
                <div className={cn("space-y-2 text-[10px] font-mono", isSingularityMode && "text-neon-pink/80")}>
                  <div className="flex justify-between"><span>GPU:</span> <span>{A9_HARDWARE_SPECS.graphics.gpu}</span></div>
                  <div className="flex justify-between"><span>CORES:</span> <span>{A9_HARDWARE_SPECS.graphics.cores}</span></div>
                  <div className="flex justify-between"><span>DISPLAY:</span> <span>{A9_HARDWARE_SPECS.display.type}</span></div>
                  <div className="flex justify-between"><span>PPI:</span> <span>{A9_HARDWARE_SPECS.display.resolution}</span></div>
                </div>
              </div>
            </div>
            <div className={cn(
              "p-4 border text-[9px] uppercase font-bold italic leading-tight transition-colors",
              isSingularityMode ? "border-neon-pink/20 bg-neon-pink/5 text-neon-pink" : "border-neon-green/20 bg-neon-green/5"
            )}>
              Notice: All parameters verified via N71AP hardware handshake. The Samsung/TSMC variance in the 14nm FinFET process leads to a +/- 5% thermal deviation during high-burst Twister operations.
            </div>
            <button onClick={() => setSpecsOpen(false)} className={cn("retro-button w-full", isSingularityMode && "border-neon-pink text-neon-pink")}>CLOSE_DATA_STREAM</button>
          </div>
        </DialogContent>
      </Dialog>
    </RetroLayout>
  );
}