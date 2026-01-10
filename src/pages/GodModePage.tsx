import React, { useState, useMemo, useEffect } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { Retro3DPhone } from '@/components/Retro3DPhone';
import { ShieldCheck, Target, Zap, CheckCircle2, Circle, AlertCircle, Brain, Camera, Activity, Hammer, Share2, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { SINGULARITY_LOGIC, HARDWARE_MODS } from '@shared/extended-data';
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
        { id: "o2", title: "Enable KVM Support", completed: false },
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
  const aiInsights = useMemo(() => {
    const key = activeProfile === 'hw-recon' ? 'gaming' : activeProfile === 'ghost' ? 'stable' : 'gaming';
    return SINGULARITY_LOGIC[key] || [];
  }, [activeProfile]);
  const handleExport = () => {
    setIsExporting(true);
    setSysLogs(prev => [`[${new Date().toLocaleTimeString()}] COMPILING_RESOURCES...`, ...prev].slice(0, 10));
    setTimeout(() => {
      setIsExporting(false);
      toast.success("RESOURCES_COMPILED", {
        description: "Redirecting to external master-archive on GitHub.",
        style: { background: '#0a0a0a', color: '#d209fa', border: '1px solid #d209fa' }
      });
      window.open('https://github.com/topics/iphone-6s-modding', '_blank');
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
            <Link to="/exploit-lab" className="flex-1 md:flex-none retro-button border-neon-pink text-neon-pink flex items-center justify-center gap-2 text-[10px] shadow-[4px_4px_0px_rgba(210,9,250,1)] hover:shadow-none active:translate-y-1">
              <Activity className="size-3" /> EXPLOIT_LAB
            </Link>
            <Link to="/hack-cam" className="flex-1 md:flex-none retro-button border-neon-pink text-neon-pink flex items-center justify-center gap-2 text-[10px] shadow-[4px_4px_0px_rgba(210,9,250,1)] hover:shadow-none active:translate-y-1">
              <Camera className="size-3" /> HACK_CAM
            </Link>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="flex-1 md:flex-none retro-button border-white text-white flex items-center justify-center gap-2 text-[10px] shadow-[4px_4px_0px_white] hover:shadow-none disabled:opacity-50 active:translate-y-1"
            >
              {isExporting ? <Share2 className="size-3 animate-spin" /> : <ExternalLink className="size-3" />} EXPORT_HUB
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
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {profiles.map((profile) => (
                <RetroCard
                  key={profile.id}
                  title={profile.name}
                  variant={activeProfile === profile.id ? 'danger' : 'default'}
                  status={`${profile.tasks.filter(t => t.completed).length}/${profile.tasks.length}`}
                  onClick={() => setActiveProfile(profile.id)}
                  className={cn(
                    "cursor-pointer transition-all duration-300 transform",
                    activeProfile === profile.id 
                      ? "scale-[1.02] border-neon-pink shadow-[0_0_30px_rgba(210,9,250,0.15)] z-10" 
                      : "opacity-60 hover:opacity-100 hover:scale-[1.01]"
                  )}
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-neon-pink">
                      <profile.icon className={cn("size-5", activeProfile === profile.id && "animate-pulse")} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Mission Status</span>
                    </div>
                    <div className="space-y-2">
                      {profile.tasks.map((task) => (
                        <button
                          key={task.id}
                          onClick={(e) => { e.stopPropagation(); toggleTask(profile.id, task.id); }}
                          className={cn(
                            "w-full flex items-center justify-between p-2.5 border transition-all text-[9px] font-bold uppercase tracking-tighter",
                            task.completed
                              ? "bg-neon-pink/20 border-neon-pink text-neon-pink"
                              : "bg-retro-black border-neon-pink/20 text-neon-pink/40 hover:border-neon-pink/60"
                          )}
                        >
                          <span className="truncate mr-2">{task.title}</span>
                          {task.completed ? <CheckCircle2 className="size-3 shrink-0" /> : <Circle className="size-3 shrink-0" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </RetroCard>
              ))}
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
                <div className="flex items-center gap-3 border-y border-neon-pink/10 py-4">
                  <Brain className="size-10 text-neon-pink animate-pulse shrink-0" />
                  <div className="text-[10px] uppercase font-bold text-neon-pink/80 leading-tight">
                    Neural Analytics Engine<br/><span className="text-white opacity-40">Loadout Analysis Active</span>
                  </div>
                </div>
                <div className="space-y-3 font-mono text-[9px]">
                  {aiInsights.map((log, i) => (
                    <div key={i} className="p-2.5 border border-neon-pink/30 bg-neon-pink/5 leading-tight animate-in fade-in slide-in-from-left-2 duration-300 italic">
                      {log}
                    </div>
                  ))}
                </div>
                <button className="retro-button w-full border-neon-pink text-neon-pink shadow-none text-[10px] hover:bg-neon-pink hover:text-white transition-all uppercase font-black">
                  REFRESH_NEURAL_MAP
                </button>
              </div>
            </RetroCard>
            <RetroCard title="SYSLOG_STREAM" status="VITAL">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-bold text-neon-green/60 uppercase mb-1">
                  <div className="size-1.5 bg-neon-green animate-ping rounded-full" />
                  Realtime_Telemetery
                </div>
                <div className="bg-black/80 border border-neon-green/30 p-3 h-48 overflow-y-auto font-mono text-[9px] text-neon-green/80 space-y-1.5 scrollbar-thin">
                  {sysLogs.length === 0 ? (
                    <div className="opacity-30 italic p-2 text-center">AWAITING_INPUT_SEQUENCE...</div>
                  ) : (
                    sysLogs.map((log, i) => (
                      <div key={i} className="animate-in fade-in slide-in-from-bottom-1 duration-200 border-l border-neon-green/20 pl-2">
                        {log}
                      </div>
                    ))
                  )}
                </div>
                <div className="p-2.5 bg-neon-pink/10 border border-neon-pink/30 text-[9px] text-neon-pink uppercase italic text-center font-bold tracking-tighter">
                  DIRECTIVE_OVERRIDE_ENABLED
                </div>
              </div>
            </RetroCard>
            <RetroCard title="MOD_SPECIFICATIONS" status="VITAL" variant="warning">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-yellow-400 border-b border-yellow-400/20 pb-2">
                  <Hammer className="size-3" /> Target: eMMC_512GB_SWAP
                </div>
                <ul className="space-y-3 text-[9px] uppercase leading-tight font-bold">
                  {HARDWARE_MODS[0].steps.slice(0, 4).map((step, i) => (
                    <li key={i} className="flex gap-3 items-start group">
                      <span className="text-yellow-400 font-black shrink-0">0{i+1}_</span>
                      <span className="opacity-80 group-hover:opacity-100 transition-opacity">{step}</span>
                    </li>
                  ))}
                </ul>
                <div className="p-3 border-2 border-red-600 bg-red-600/10 flex gap-3 items-center">
                  <AlertCircle className="size-5 text-red-600 shrink-0 animate-pulse" />
                  <p className="text-[9px] font-bold text-red-600 uppercase leading-tight">
                    VOLTAGE_WARNING: ANTI-TAMPER ACTIVE
                  </p>
                </div>
              </div>
            </RetroCard>
          </div>
        </div>
      </div>
    </RetroLayout>
  );
}