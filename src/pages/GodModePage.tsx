import React, { useState, useMemo, useEffect } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { Retro3DPhone } from '@/components/Retro3DPhone';
import { ShieldCheck, Target, Zap, CheckCircle2, Circle, AlertCircle, Brain, Camera, Activity, Hammer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { SINGULARITY_LOGIC, HARDWARE_MODS } from '@shared/extended-data';
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
            setSysLogs(prevLogs => [`[${new Date().toLocaleTimeString()}] TASK_${t.id} -> ${newStatus ? 'ACK' : 'RESET'}`, ...prevLogs].slice(0, 8));
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
  return (
    <RetroLayout>
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-neon-pink p-3 text-white shadow-[0_0_20px_rgba(210,9,250,0.4)]">
              <Target className="size-10" />
            </div>
            <div>
              <h1 className="text-4xl font-bold retro-glow uppercase tracking-tighter leading-none text-neon-pink">GodMode Hub</h1>
              <p className="text-[10px] md:text-xs text-neon-pink uppercase font-bold tracking-[0.2em]">Project Singularity :: Command Center</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/exploit-lab" className="retro-button border-neon-pink text-neon-pink flex items-center gap-2 text-[10px] shadow-[4px_4px_0px_rgba(210,9,250,1)] hover:shadow-none">
              <Activity className="size-3" /> EXPLOIT_LAB
            </Link>
            <Link to="/hack-cam" className="retro-button border-neon-pink text-neon-pink flex items-center gap-2 text-[10px] shadow-[4px_4px_0px_rgba(210,9,250,1)] hover:shadow-none">
              <Camera className="size-3" /> HACK_CAM
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <RetroCard title="HARDWARE_VISUALIZER" status="A1633_SINGULARITY" className="min-h-[500px] flex flex-col">
              <div className="flex-1 w-full h-full min-h-[400px]">
                <Retro3DPhone />
              </div>
            </RetroCard>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profiles.map((profile) => (
                <RetroCard
                  key={profile.id}
                  title={profile.name}
                  variant={activeProfile === profile.id ? 'danger' : 'default'}
                  status={`${profile.tasks.filter(t => t.completed).length}/${profile.tasks.length}_SEQ`}
                  onClick={() => setActiveProfile(profile.id)}
                  className={cn(
                    "cursor-pointer transition-all duration-300", 
                    activeProfile === profile.id ? "scale-[1.02] border-neon-pink shadow-[0_0_30px_rgba(210,9,250,0.2)]" : "opacity-70 hover:opacity-100"
                  )}
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-neon-pink">
                      <profile.icon className="size-5" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Loadout Integrity</span>
                    </div>
                    <div className="space-y-2">
                      {profile.tasks.map((task) => (
                        <button
                          key={task.id}
                          onClick={(e) => { e.stopPropagation(); toggleTask(profile.id, task.id); }}
                          className={cn(
                            "w-full flex items-center justify-between p-2 border transition-all",
                            task.completed
                              ? "bg-neon-pink/20 border-neon-pink text-neon-pink"
                              : "bg-retro-black border-neon-pink/30 text-neon-pink/60 hover:border-neon-pink/60"
                          )}
                        >
                          <span className="text-[9px] font-bold uppercase tracking-tighter">{task.title}</span>
                          {task.completed ? <CheckCircle2 className="size-3" /> : <Circle className="size-3" />}
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
                <div className="flex items-center gap-3">
                  <Brain className="size-10 text-neon-pink animate-pulse" />
                  <div className="text-[10px] uppercase font-bold text-neon-pink leading-tight">
                    Neural Analytics Engine<br/>v4.0_LATEST
                  </div>
                </div>
                <div className="space-y-3 font-mono text-[9px]">
                  {aiInsights.map((log, i) => (
                    <div key={i} className="p-2 border border-neon-pink/30 bg-neon-pink/5 leading-tight animate-in fade-in slide-in-from-left-2 duration-300">
                      {log}
                    </div>
                  ))}
                </div>
                <button className="retro-button w-full border-neon-pink text-neon-pink shadow-none text-[10px] hover:bg-neon-pink hover:text-white transition-colors">
                  REFRESH_NEURAL_MAP
                </button>
              </div>
            </RetroCard>
            <RetroCard title="SYSLOG_STREAM" status="VITAL">
              <div className="space-y-4">
                <div className="bg-black/60 border border-neon-green/30 p-3 h-40 overflow-y-auto font-mono text-[9px] text-neon-green/80 space-y-1">
                  {sysLogs.length === 0 ? (
                    <div className="opacity-30 italic">AWAITING_INPUT_SEQUENCE...</div>
                  ) : (
                    sysLogs.map((log, i) => (
                      <div key={i} className="animate-in fade-in slide-in-from-bottom-1 duration-200">{log}</div>
                    ))
                  )}
                </div>
                <div className="p-2 bg-neon-pink/10 border border-neon-pink/30 text-[9px] text-neon-pink uppercase italic text-center">
                  DIRECTIVE_OVERRIDE_ENABLED
                </div>
              </div>
            </RetroCard>
            <RetroCard title="HARDWARE_MOD_SPEC" status="VITAL">
              <div className="space-y-4">
                <div className="text-[10px] uppercase font-bold text-neon-green/60 border-b border-neon-green/20 pb-1">
                  Active Checklist: eMMC_512GB
                </div>
                <ul className="space-y-2 text-[9px] uppercase leading-snug">
                  {HARDWARE_MODS[0].steps.map((step, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <span className="text-neon-green font-bold">[{i+1}]</span>
                      <span className="opacity-80">{step}</span>
                    </li>
                  ))}
                </ul>
                <div className="p-3 border-2 border-red-600 bg-red-600/10 flex gap-3 items-center">
                  <AlertCircle className="size-5 text-red-600 shrink-0" />
                  <p className="text-[9px] font-bold text-red-600 uppercase leading-tight">
                    CRITICAL: Anti-tamper protocols may engage if voltage spike is detected.
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