import React, { useState } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { ShieldCheck, Target, Zap, CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
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
    }
  ]);
  const toggleTask = (profileId: string, taskId: string) => {
    setProfiles(prev => prev.map(p => {
      if (p.id !== profileId) return p;
      return {
        ...p,
        tasks: p.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
      };
    }));
  };
  return (
    <RetroLayout>
      <div className="space-y-12">
        <div className="flex items-center gap-4">
          <div className="bg-neon-pink p-3 text-white">
            <Target className="size-10" />
          </div>
          <div>
            <h1 className="text-4xl font-bold retro-glow uppercase tracking-tighter">GodMode Hub</h1>
            <p className="text-xs text-neon-pink uppercase font-bold">Absolute Authority Command Center</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {profiles.map((profile) => (
            <RetroCard 
              key={profile.id} 
              title={profile.name} 
              variant="danger" 
              status={`${profile.tasks.filter(t => t.completed).length}/${profile.tasks.length}_COMPLETE`}
            >
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-neon-pink">
                  <profile.icon className="size-6" />
                  <span className="text-sm font-bold uppercase tracking-widest">Loadout Status</span>
                </div>
                <div className="space-y-2">
                  {profile.tasks.map((task) => (
                    <button
                      key={task.id}
                      onClick={() => toggleTask(profile.id, task.id)}
                      className={cn(
                        "w-full flex items-center justify-between p-3 border-2 transition-all",
                        task.completed 
                          ? "bg-neon-pink/20 border-neon-pink text-neon-pink" 
                          : "bg-retro-black border-neon-pink/30 text-neon-pink/60 hover:border-neon-pink/60"
                      )}
                    >
                      <span className="text-xs font-bold uppercase tracking-tighter">{task.title}</span>
                      {task.completed ? <CheckCircle2 className="size-4" /> : <Circle className="size-4" />}
                    </button>
                  ))}
                </div>
                {profile.tasks.every(t => t.completed) && (
                  <div className="p-3 bg-neon-pink border-2 border-white/20 text-white text-[10px] font-bold text-center uppercase animate-glitch">
                    MISSION_ACCOMPLISHED :: SYSTEM_DOMINANCE_ACHIEVED
                  </div>
                )}
              </div>
            </RetroCard>
          ))}
        </div>
        <RetroCard title="GLOBAL_CONTROL_NOTICE" variant="warning">
          <div className="flex gap-4 items-start">
            <AlertCircle className="size-8 text-yellow-400 shrink-0" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold uppercase text-yellow-400">Authority Level 5 Required</h4>
              <p className="text-xs opacity-80 leading-snug">
                The GodMode Hub provides unchecked access to kernel-level overrides. 
                Any modification made here is persistent and bypasses standard safety protocols.
              </p>
            </div>
          </div>
        </RetroCard>
      </div>
    </RetroLayout>
  );
}