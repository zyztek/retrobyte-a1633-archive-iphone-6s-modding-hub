import React, { useState, useMemo, useEffect } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { Retro3DPhone } from '@/components/Retro3DPhone';
import { ShieldCheck, Target, Zap, CheckCircle2, Circle, AlertCircle, Brain, Camera, Activity, Hammer, Share2, Rocket, Radio, Battery, Volume2, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { SINGULARITY_LOGIC, HARDWARE_MODS, SYSTEM_AUDIT_METRICS } from '@shared/extended-data';
import { useAcademyStore } from '@/store/academy-store';
import { toast } from 'sonner';
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
  const navigate = useNavigate();
  const xp = useAcademyStore(s => s.xp);
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
    setSysLogs(prev => [`[${new Date().toLocaleTimeString()}] INITIATING_DEEP_SYSTEM_AUDIT...`, ...prev]);
    setTimeout(() => {
      setIsAuditing(false);
      toast.success("AUDIT_COMPLETE", { description: "Hardware subsystems verified." });
    }, 2500);
  };
  const aiInsights = useMemo(() => {
    const key = activeProfile === 'hw-recon' ? 'gaming' : activeProfile === 'ghost' ? 'stable' : 'gaming';
    return SINGULARITY_LOGIC[key] || [];
  }, [activeProfile]);
  const handleExport = () => {
    setIsExporting(true);
    setSysLogs(prev => [`[${new Date().toLocaleTimeString()}] NAVIGATING_TO_EXPORT_HUB...`, ...prev].slice(0, 10));
    setTimeout(() => {
      setIsExporting(false);
      navigate('/export-hub');
    }, 1500);
  };
  const syncIntegrity = xp >= 1500 ? 'STABLE' : xp >= 500 ? 'SYNCING' : 'UNSYNCED';
  const syncColor = xp >= 1500 ? 'text-neon-pink' : xp >= 500 ? 'text-yellow-400' : 'text-neon-pink/40';
  return (
    <RetroLayout>
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-neon-pink p-3 text-white shadow-[0_0_20px_rgba(210,9,250,0.4)] animate-pulse">
              <Target className="size-8 md:size-10" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold retro-glow uppercase tracking-tighter leading-none text-neon-pink">GodMode Hub</h1>
              <p className="text-[10px] md:text-xs text-neon-pink uppercase font-bold tracking-[0.2em] opacity-80">Singularity :: Command_Center</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <button
              onClick={handleAudit}
              disabled={isAuditing}
              className="flex-1 md:flex-none retro-button border-neon-pink text-neon-pink flex items-center justify-center gap-2 text-[10px] shadow-[4px_4px_0px_rgba(210,9,250,1)] hover:shadow-none active:translate-y-1"
            >
              {isAuditing ? <Activity className="size-3 animate-spin" /> : <ShieldAlert className="size-3" />} FULL_AUDIT
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="flex-1 md:flex-none retro-button border-white text-white flex items-center justify-center gap-2 text-[10px] shadow-[4px_4px_0px_white] hover:shadow-none disabled:opacity-50 active:translate-y-1"
            >
              {isExporting ? <Share2 className="size-3 animate-spin" /> : <Rocket className="size-3" />} EXPORT_HUB
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <RetroCard title="HARDWARE_VISUALIZER" status="A1633_SINGULARITY" className="min-h-[400px] md:min-h-[550px] flex flex-col p-0 overflow-hidden">
              <div className="flex-1 w-full relative">
                <Retro3DPhone />
              </div>
            </RetroCard>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <RetroCard title="AUDIO_AUDIT (I2S)" variant="default" className="text-center">
                <Volume2 className="size-8 mx-auto mb-2 text-neon-green" />
                <div className="text-[10px] font-black">JITTER: 1.2ns</div>
                <div className="text-[8px] opacity-40">DAC_SYNC: LOCKED</div>
              </RetroCard>
              <RetroCard title="BATTERY_AUDIT (BMS)" variant="warning" className="text-center">
                <Battery className="size-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-[10px] font-black">DRIFT: -4.2%</div>
                <div className="text-[8px] opacity-40">CYCLES: 842</div>
              </RetroCard>
              <RetroCard title="LTE_AUDIT (BB)" variant="default" className="text-center">
                <Radio className="size-8 mx-auto mb-2 text-neon-green" />
                <div className="text-[10px] font-black">-82dBm</div>
                <div className="text-[8px] opacity-40">BAND: 12 (700MHz)</div>
              </RetroCard>
            </div>
          </div>
          <div className="lg:col-span-4 space-y-8">
            <RetroCard title="SINGULARITY_AI" status="PREDICTING" variant="danger">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="relative shrink-0">
                    <div className={cn("absolute inset-0 blur-xl animate-pulse opacity-40", syncIntegrity === 'STABLE' ? 'bg-neon-pink' : 'bg-yellow-400')} />
                    <div className={cn("size-12 border-2 flex items-center justify-center font-bold text-[10px]", syncIntegrity === 'STABLE' ? 'border-neon-pink text-neon-pink' : 'border-yellow-400 text-yellow-400')}>
                      {Math.floor((xp / 2500) * 100)}%
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-bold text-neon-pink/60 leading-none">Docs_Sync Integrity</span>
                    <span className={cn("text-xs font-black uppercase tracking-widest", syncColor)}>{syncIntegrity}</span>
                  </div>
                </div>
                <div className="space-y-3 font-mono text-[9px]">
                  {aiInsights.map((log, i) => (
                    <div key={i} className="p-2.5 border border-neon-pink/30 bg-neon-pink/5 leading-tight animate-in fade-in slide-in-from-left-2 duration-300 italic">
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </RetroCard>
            <RetroCard title="MISSION_PROFILES" status="VITAL" variant="danger">
              <div className="space-y-4">
                {profiles.map((profile) => (
                  <div key={profile.id} className={cn(
                    "p-3 border-2 cursor-pointer transition-all",
                    activeProfile === profile.id ? "border-neon-pink bg-neon-pink/10" : "border-neon-pink/20"
                  )} onClick={() => setActiveProfile(profile.id)}>
                    <div className="flex items-center gap-2 mb-3">
                      <profile.icon className="size-4 text-neon-pink" />
                      <span className="text-[10px] font-black text-neon-pink uppercase">{profile.name}</span>
                    </div>
                    <div className="space-y-2">
                      {profile.tasks.map((task) => (
                        <div key={task.id} className="flex justify-between items-center text-[8px] font-bold uppercase" onClick={(e) => { e.stopPropagation(); toggleTask(profile.id, task.id); }}>
                          <span className={task.completed ? "text-neon-pink" : "opacity-30"}>{task.title}</span>
                          {task.completed ? <CheckCircle2 className="size-3" /> : <Circle className="size-3" />}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </RetroCard>
            <RetroCard title="SYSLOG_STREAM" status="LIVE">
              <div className="bg-black/80 border border-neon-green/30 p-3 h-48 overflow-y-auto font-mono text-[9px] text-neon-green/80 space-y-1.5 scrollbar-thin">
                {sysLogs.map((log, i) => (
                  <div key={i} className="animate-in fade-in slide-in-from-bottom-1 duration-200 border-l border-neon-green/20 pl-2">
                    {log}
                  </div>
                ))}
                {isAuditing && <div className="animate-pulse">_</div>}
              </div>
            </RetroCard>
          </div>
        </div>
      </div>
    </RetroLayout>
  );
}