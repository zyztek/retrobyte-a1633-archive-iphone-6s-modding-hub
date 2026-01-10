import React, { useState, useMemo } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { Retro3DPhone } from '@/components/Retro3DPhone';
import { ShieldCheck, Target, Zap, CheckCircle2, Circle, Activity, Hammer, Share2, Rocket, Radio, Battery, Volume2, ShieldAlert, Download, RefreshCcw, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { SINGULARITY_LOGIC, SYSTEM_AUDIT_METRICS, A9_HARDWARE_SPECS } from '@shared/extended-data';
import { useAcademyStore } from '@/store/academy-store';
import { useUIStore } from '@/store/ui-store';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
interface MissionTask {
  id: string;
  title: string;
  completed: boolean;
}
interface MissionProfile {
  id: string;
  name: string;
  icon: any;
  tasks: MissionTask[];
}
export function GodModePage() {
  const [activeProfile, setActiveProfile] = useState<string>("overclock");
  const [sysLogs, setSysLogs] = useState<string[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const navigate = useNavigate();
  const xp = useAcademyStore(s => s.xp);
  const resetProgress = useAcademyStore(s => s.resetProgress);
  const isSingularityMode = useUIStore(s => s.isSingularityMode);
  const isEternityMode = useUIStore(s => s.isEternityMode);
  const setEternityMode = useUIStore(s => s.setEternityMode);
  const isOCAbyss = useUIStore(s => s.isOCAbyss);
  const setOCAbyss = useUIStore(s => s.setOCAbyss);
  const resetUI = useUIStore(s => s.resetUI);
  const setLoading = useUIStore(s => s.setLoading);
  const addLog = useUIStore(s => s.addLog);
  const [profiles, setProfiles] = useState<MissionProfile[]>([
    {
      id: "ghost",
      name: "PROFILE: GHOST",
      icon: ShieldCheck,
      tasks: [
        { id: "g1", title: "Establish Chroot (Kali)", completed: false },
        { id: "g2", title: "Enable MAC Spoofing", completed: false },
        { id: "g3", title: "Wipe System Logs", completed: false },
      ]
    },
    {
      id: "overclock",
      name: "PROFILE: OVERCLOCK",
      icon: Zap,
      tasks: [
        { id: "o1", title: "Install Powercuff", completed: true },
        { id: "o2", title: "Audit System Integrity", completed: false },
        { id: "o3", title: "Disable CPU Throttling", completed: false },
      ]
    },
    {
      id: "hw-recon",
      name: "PROFILE: RECONSTRUCTION",
      icon: Hammer,
      tasks: [
        { id: "h1", title: "eMMC 512GB Swap", completed: false },
        { id: "h2", title: "BGA Re-balling", completed: false },
        { id: "h3", title: "Voltage Rail Calibration", completed: false },
      ]
    }
  ]);
  const handleEternityProtocol = () => {
    if (isEternityMode) {
      setEternityMode(false);
      addLog("ETERNITY_LINK: SEVERED");
      return;
    }
    const sequence = ["Nulling Battery Voltage...", "Bypassing BMS Limits...", "ETERNITY_LINK: ENGAGED"];
    sequence.forEach((step, i) => {
      setTimeout(() => {
        setSysLogs(prev => [`[${new Date().toLocaleTimeString()}] ${step}`, ...prev]);
        if (i === sequence.length - 1) {
          setEternityMode(true);
          toast.success("BATTERY_ETERNITY_ACTIVE");
        }
      }, i * 500);
    });
  };
  const handleOCAbyss = () => {
    if (isOCAbyss) {
      setOCAbyss(false);
      addLog("ABYSS_OC: REVERTED_TO_STOCK");
      return;
    }
    const sequence = ["Unlocking Twister Core V-Rail...", "Synchronizing at 2.4GHz...", "ABYSS_THERMAL_LOCK: BYPASSED"];
    sequence.forEach((step, i) => {
      setTimeout(() => {
        setSysLogs(prev => [`[${new Date().toLocaleTimeString()}] ${step}`, ...prev]);
        if (i === sequence.length - 1) {
          setOCAbyss(true);
          toast.error("OC_ABYSS_UNSTABLE_ULTRA");
        }
      }, i * 500);
    });
  };
  const toggleTask = (profileId: string, taskId: string) => {
    setProfiles(prev => prev.map(p => {
      if (p.id !== profileId) return p;
      return {
        ...p,
        tasks: p.tasks.map(t => {
          if (t.id === taskId) {
            const newStatus = !t.completed;
            setSysLogs(prevLogs => [`[${new Date().toLocaleTimeString()}] TASK_${t.id} -> ${newStatus ? 'ACK' : 'RESET'}`, ...prevLogs].slice(0, 10));
            return { ...t, completed: newStatus };
          }
          return t;
        })
      };
    }));
  };
  const handleAudit = () => {
    setIsAuditing(true);
    const auditSteps = [
      "INITIATING_DEEP_SYSTEM_AUDIT...",
      "SAMPLING_BMS_DRIFT: " + (SYSTEM_AUDIT_METRICS.find(m => m.id === 'battery-bms')?.value || "3.8V_NOMINAL"),
      "CALIBRATING_I2S_BUS: " + (SYSTEM_AUDIT_METRICS.find(m => m.id === 'audio-i2s')?.value || "0x12_ACTIVE"),
      "SNIFFING_LTE_ATTENUATION...",
      "COMPARING_N71AP_SIGNATURES...",
      "AUDIT_SUCCESSFUL: HARDWARE_SECURE"
    ];
    auditSteps.forEach((step, i) => {
      setTimeout(() => {
        setSysLogs(prev => [`[${new Date().toLocaleTimeString()}] ${step}`, ...prev].slice(0, 10));
        if (i === auditSteps.length - 1) {
          setProfiles(current => current.map(p => {
            if (p.id !== 'overclock') return p;
            return {
              ...p,
              tasks: p.tasks.map(t => t.id === 'o2' ? { ...t, completed: true } : t)
            };
          }));
          setIsAuditing(false);
          toast.success("AUDIT_COMPLETE");
        }
      }, i * 400);
    });
  };
  const handleResetProtocol = () => {
    setIsResetting(true);
    const resetSteps = ["INITIATING_FACTORY_PURGE...", "ERASING_NAND_BLOCKS...", "PURGING_ACADEMY_RECORDS...", "NULLING_SINGULARITY_VECTORS...", "REBOOTING_KERNEL_0x00..."];
    resetSteps.forEach((step, i) => {
      setTimeout(() => {
        setSysLogs(prev => [`[${new Date().toLocaleTimeString()}] ${step}`, ...prev].slice(0, 10));
        if (i === resetSteps.length - 1) {
          setLoading(true);
          setTimeout(() => {
            resetProgress();
            resetUI();
            setLoading(false);
            navigate('/');
            toast.error("SINGULARITY_PURGED");
          }, 1500);
        }
      }, i * 600);
    });
  };
  const handleDownloadReport = () => {
    const report = `A1633 ARCHIVE - TECHNICAL AUDIT REPORT\n======================================\nGENERATED: ${new Date().toISOString()}\nXP LEVEL: ${xp}\nMISSION PROGRESS:\n${profiles.map(p => `[${p.name}]\n${p.tasks.map(t => `  - ${t.title}: ${t.completed ? 'COMPLETED' : 'PENDING'}`).join('\n')}`).join('\n\n')}\nEOF: SYSTEM_REPORT_VALIDATED`;
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `A1633_Report_${new Date().getTime()}.txt`;
    a.click();
    toast.success("TECHNICAL_REPORT_EXPORTED");
  };
  const aiInsights = useMemo(() => {
    const key = activeProfile === 'hw-recon' ? 'gaming' : activeProfile === 'ghost' ? 'stable' : 'gaming';
    return SINGULARITY_LOGIC[key] || [];
  }, [activeProfile]);
  return (
    <RetroLayout>
      <motion.div animate={isResetting ? { x: [-2, 2, -2, 2, 0] } : {}} className="space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className={cn("p-3 text-white transition-all", isSingularityMode ? "bg-neon-pink shadow-[0_0_20px_rgba(210,9,250,0.6)] animate-pulse" : "bg-neon-pink/80")}>
              <Target className="size-8 md:size-10" />
            </div>
            <div>
              <h1 className={cn("text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-none transition-colors", isSingularityMode ? "text-neon-pink pink-glow" : "text-neon-pink")}>GodMode Hub</h1>
              <p className="text-[10px] md:text-xs text-neon-pink uppercase font-bold tracking-[0.2em] opacity-80">Singularity :: Command_Center</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
             <button onClick={handleEternityProtocol} className={cn("flex-1 md:flex-none retro-button border-yellow-400 text-yellow-400 text-[10px]", isEternityMode && "bg-yellow-400 text-black")}>
               {isEternityMode ? "ETERNITY_ACTIVE" : "INIT_ETERNITY"}
             </button>
             <button onClick={handleOCAbyss} className={cn("flex-1 md:flex-none retro-button border-neon-pink text-neon-pink text-[10px]", isOCAbyss && "bg-neon-pink text-white animate-pulse")}>
               {isOCAbyss ? "ABYSS_ULTRA" : "INIT_ABYSS_OC"}
             </button>
             <button onClick={handleResetProtocol} className="flex-1 md:flex-none retro-button border-red-500 text-red-500 text-[10px]">RESET_GRID</button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <RetroCard title="HARDWARE_VISUALIZER" status={isSingularityMode ? "SINGULARITY_LOCKED" : "A1633_LOCAL"} className="min-h-[450px] relative">
              {xp >= 2500 && (
                <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center">
                   <div className="border-4 border-neon-pink p-8 bg-black/80 backdrop-blur-md animate-pulse">
                      <Lock className="size-16 text-neon-pink mb-4 mx-auto" />
                      <div className="text-2xl font-black text-neon-pink uppercase">Singularity_Lock_Active</div>
                   </div>
                </div>
              )}
              <Retro3DPhone />
            </RetroCard>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <RetroCard title="AUDIO_AUDIT" variant={isSingularityMode ? "danger" : "default"} className="text-center">
                <Volume2 className="size-8 mx-auto mb-2" />
                <div className="text-[10px] font-black uppercase">MAPPED_0x12</div>
              </RetroCard>
              <RetroCard title="BATTERY_ETERNITY" variant="warning" className="text-center">
                <Battery className={cn("size-8 mx-auto mb-2", isEternityMode ? "text-yellow-400 animate-pulse" : "text-white/20")} />
                <div className="text-[10px] font-black uppercase">{isEternityMode ? "ETERNAL_VOLT" : "3.82V_NOMINAL"}</div>
              </RetroCard>
              <RetroCard title="ABYSS_PERF" variant={isSingularityMode ? "danger" : "default"} className="text-center">
                <Zap className={cn("size-8 mx-auto mb-2", isOCAbyss ? "text-neon-pink animate-pulse" : "text-white/20")} />
                <div className="text-[10px] font-black uppercase">{isOCAbyss ? "UNSTABLE_ULTRA" : "1.85GHZ_STOCK"}</div>
              </RetroCard>
            </div>
          </div>
          <div className="lg:col-span-4 space-y-8">
            <RetroCard title="SINGULARITY_AI" status="PREDICTING" variant="danger">
               <div className="space-y-4">
                 <div className="flex items-center gap-4">
                    <div className="size-12 border-2 border-neon-pink flex items-center justify-center text-neon-pink font-black text-xs">
                       {Math.floor((xp / 2500) * 100)}%
                    </div>
                    <span className="text-xs font-black text-neon-pink uppercase">Sync_Depth</span>
                 </div>
                 <div className="space-y-2 font-mono text-[9px]">
                   {aiInsights.map((log, i) => (
                     <div key={i} className="p-2 border border-neon-pink/30 bg-neon-pink/5">{log}</div>
                   ))}
                 </div>
               </div>
            </RetroCard>
            <RetroCard title="SYSLOG_STREAM" status="LIVE">
              <div className="bg-black/80 border border-neon-green/30 p-3 h-48 overflow-y-auto font-mono text-[9px] space-y-1.5">
                {sysLogs.map((log, i) => (
                  <div key={i} className="border-l border-neon-green/20 pl-2">{log}</div>
                ))}
              </div>
            </RetroCard>
            <button onClick={handleDownloadReport} className="retro-button w-full flex items-center justify-center gap-2">
              <Download className="size-4" /> EXPORT_REPORT
            </button>
          </div>
        </div>
      </motion.div>
    </RetroLayout>
  );
}