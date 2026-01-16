import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { EMU_VAULT } from '@shared/extended-data';
import { Cpu, Zap, Activity, Info, BarChart3, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
export function EmuVaultPage() {
  const [showPredictor, setShowPredictor] = useState(true);
  return (
    <RetroLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold retro-glow uppercase tracking-tighter">EmuVault</h1>
            <p className="text-xs text-neon-green/60 uppercase">Hardware-Accelerated A9_Singularity environment</p>
          </div>
          <div className="flex items-center gap-3 bg-neon-green/5 border border-neon-green/20 p-2">
            <Label className="text-[10px] font-black uppercase tracking-widest">Perf_Predictor</Label>
            <Switch checked={showPredictor} onCheckedChange={setShowPredictor} className="data-[state=checked]:bg-neon-green" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8">
          {EMU_VAULT.map((emu) => (
            <RetroCard 
              key={emu.name} 
              title={`${emu.platform} :: ${emu.name.toUpperCase()}`}
              variant={emu.compatibility === 'EXPERIMENTAL' ? 'warning' : 'default'}
              status={emu.compatibility}
            >
              <div className="flex flex-col lg:flex-row gap-10">
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-neon-green/10 p-3 border-2 border-neon-green/30 relative">
                      <Cpu className="size-8 text-neon-green" />
                      {(emu.name === 'PPSSPP' || emu.name === 'Delta') && (
                        <div className="absolute -top-2 -right-2 bg-neon-pink text-white text-[7px] px-1 font-black">A9_TUNED</div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold uppercase tracking-tight">{emu.name}</h3>
                      <div className="text-[10px] font-mono text-neon-pink uppercase">Cache_Alignment: 64B :: JIT_V: 4.2</div>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed opacity-80 font-bold uppercase">{emu.notes}</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="p-3 border border-neon-green/30 bg-black/40">
                      <div className="text-[8px] font-black opacity-40 uppercase mb-1">Backend_Engine</div>
                      <div className="text-[10px] font-bold text-neon-green">VULKAN_WRAP_PVR</div>
                    </div>
                    <div className="p-3 border border-neon-green/30 bg-black/40">
                      <div className="text-[8px] font-black opacity-40 uppercase mb-1">JIT_State</div>
                      <div className="text-[10px] font-bold text-neon-pink">RECOMPILER_ACTIVE</div>
                    </div>
                    <div className="p-3 border border-neon-green/30 bg-black/40">
                      <div className="text-[8px] font-black opacity-40 uppercase mb-1">Resolution</div>
                      <div className="text-[10px] font-bold text-neon-green">2X_NATIVE_UPSCALED</div>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-72 space-y-6">
                  {showPredictor && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                        <span className="flex gap-1 items-center"><BarChart3 className="size-3" /> Projected_FPS</span>
                        <span className="text-neon-pink">{(emu.performanceScore * 0.6).toFixed(0)} FPS</span>
                      </div>
                      <div className="h-4 w-full bg-black border border-neon-green/30 p-0.5">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${emu.performanceScore}%` }}
                          className="h-full bg-neon-green shadow-[0_0_10px_rgba(0,255,65,1)]"
                        />
                      </div>
                    </div>
                  )}
                  <div className="space-y-2">
                    <div className="text-[10px] font-black uppercase text-neon-pink/60">A9_Backend_Forge</div>
                    <div className="flex flex-col gap-2">
                      <button className="text-left px-3 py-1.5 border border-neon-pink/30 text-[9px] font-bold uppercase hover:bg-neon-pink hover:text-white transition-all">Prefer_Vulkan_Experimental</button>
                      <button className="text-left px-3 py-1.5 border border-white/20 text-[9px] font-bold uppercase bg-white/5">OpenGL_ES_3.0_Stable</button>
                    </div>
                  </div>
                  <button className="retro-button w-full flex items-center justify-center gap-2 py-3">
                    <Settings className="size-4" /> RE_OPTIMIZE_CORE
                  </button>
                </div>
              </div>
            </RetroCard>
          ))}
        </div>
      </div>
    </RetroLayout>
  );
}