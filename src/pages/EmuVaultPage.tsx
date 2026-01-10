import React from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { EMU_VAULT } from '@shared/extended-data';
import { Cpu, Zap, Activity, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
export function EmuVaultPage() {
  return (
    <RetroLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold retro-glow uppercase tracking-tighter">EmuVault</h1>
          <p className="text-xs text-neon-green/60 uppercase">Hardware-Accelerated Virtualization Environment</p>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {EMU_VAULT.map((emu) => (
            <RetroCard 
              key={emu.name} 
              title={`${emu.platform} :: ${emu.name.toUpperCase()}`}
              variant={emu.compatibility === 'EXPERIMENTAL' ? 'warning' : 'default'}
              status={emu.compatibility}
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-neon-green/10 p-3 border-2 border-neon-green/30">
                      <Cpu className="size-8 text-neon-green" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold uppercase">{emu.name}</h3>
                      <div className="text-[10px] font-bold text-neon-pink uppercase">Architecture: ARM64_A9</div>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed opacity-80">{emu.notes}</p>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <div className="flex items-center gap-2">
                      <Zap className={cn("size-4", emu.jitRequired ? "text-neon-pink" : "text-neon-green")} />
                      <span className="text-[10px] font-bold uppercase">JIT_{emu.jitRequired ? 'REQUIRED' : 'NOT_REQ'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="size-4 text-neon-green" />
                      <span className="text-[10px] font-bold uppercase">HV_SUPPORT: KVM_NATIVE</span>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-64 space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold uppercase">
                      <span>Performance_Index</span>
                      <span>{emu.performanceScore}%</span>
                    </div>
                    <div className="h-2 w-full bg-retro-black border border-neon-green/30">
                      <div 
                        className="h-full bg-neon-green" 
                        style={{ width: `${emu.performanceScore}%` }} 
                      />
                    </div>
                  </div>
                  <div className="bg-black/40 p-3 border border-neon-green/20 text-[10px] space-y-2 italic">
                    <div className="flex gap-2">
                      <Info className="size-3 shrink-0" />
                      <span>Recommended firmware: iOS 15.4.1 for Fugu15/Dopamine stability.</span>
                    </div>
                  </div>
                  <button className="retro-button w-full text-xs">INITIALIZE_LOADER</button>
                </div>
              </div>
            </RetroCard>
          ))}
        </div>
      </div>
    </RetroLayout>
  );
}