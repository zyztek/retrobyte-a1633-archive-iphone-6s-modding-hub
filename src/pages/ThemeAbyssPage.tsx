import React, { useState } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { IOS18_SKINS } from '@shared/extended-data';
import { LayoutGrid, Palette, Sliders, Smartphone, Check, Zap, RefreshCw, Layers } from 'lucide-react';
import { useUIStore } from '@/store/ui-store';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
export function ThemeAbyssPage() {
  const [selectedSkin, setSelectedSkin] = useState(IOS18_SKINS[0]);
  const [iconSize, setIconSize] = useState(100);
  const [isApplying, setIsApplying] = useState(false);
  const addLog = useUIStore(s => s.addLog);
  const handleApply = () => {
    setIsApplying(true);
    addLog(`SYS_THEME: APPLYING_${selectedSkin.id.toUpperCase()}_SKIN`);
    setTimeout(() => {
      setIsApplying(false);
      toast.success("RESPRING_COMPLETE", { 
        description: `${selectedSkin.name} successfully applied to SpringBoard environment.`,
        className: "border-neon-pink text-neon-pink bg-retro-black"
      });
    }, 3000);
  };
  return (
    <RetroLayout>
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold retro-glow uppercase tracking-tighter flex items-center gap-3">
              <Palette className="size-10 text-neon-green" /> Theme Abyss
            </h1>
            <p className="text-xs text-neon-green/60 uppercase font-bold tracking-[0.2em]">iOS 18 Interface Simulation :: A9 Rendering Engine</p>
          </div>
          <button onClick={handleApply} disabled={isApplying} className="retro-button flex items-center gap-2 border-neon-pink text-neon-pink shadow-[4px_4px_0px_rgba(210,9,250,1)] hover:shadow-none">
            {isApplying ? <RefreshCw className="size-4 animate-spin" /> : <Zap className="size-4" />} APPLY_TO_SPRINGBOARD
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <RetroCard title="SKIN_SELECT" variant="default">
              <div className="space-y-4">
                {IOS18_SKINS.map((skin) => (
                  <button
                    key={skin.id}
                    onClick={() => setSelectedSkin(skin)}
                    className={cn(
                      "w-full text-left p-4 border-2 transition-all group flex items-center justify-between",
                      selectedSkin.id === skin.id 
                        ? "bg-neon-green/10 border-neon-green text-neon-green" 
                        : "border-neon-green/20 text-neon-green/60 hover:border-neon-green/40"
                    )}
                  >
                    <div>
                      <div className="text-xs font-black uppercase tracking-widest">{skin.name}</div>
                      <div className="text-[9px] opacity-60 uppercase font-bold italic">{skin.desc}</div>
                    </div>
                    {selectedSkin.id === skin.id && <Check className="size-4" />}
                  </button>
                ))}
              </div>
            </RetroCard>
            <RetroCard title="RENDER_CONTROLS" status="DYNAMIC">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase">
                    <span className="flex items-center gap-2"><Layers className="size-3" /> Icon_Scale</span>
                    <span className="text-neon-pink">{iconSize}%</span>
                  </div>
                  <input 
                    type="range" min="80" max="120" step="5"
                    value={iconSize} onChange={(e) => setIconSize(parseInt(e.target.value))}
                    className="w-full accent-neon-pink bg-black"
                  />
                </div>
                <div className="space-y-4">
                   <div className="flex items-center gap-2 text-[10px] font-bold uppercase opacity-60">
                     <Sliders className="size-3" /> Advanced_Filters
                   </div>
                   <div className="p-3 border border-neon-green/20 bg-neon-green/5 text-[9px] uppercase font-bold leading-tight">
                     NOTICE: Tinted icons utilize the A9 PowerVR GT7600 hardware matrix for zero-latency color mapping.
                   </div>
                </div>
              </div>
            </RetroCard>
          </div>
          <div className="lg:col-span-8">
            <RetroCard title="DOCK_PREVIEW" className="h-full flex flex-col" status="REAL_TIME_SIM">
              <div className="flex-1 flex items-center justify-center p-8 bg-black/40 border-2 border-dashed border-neon-green/20 rounded-xl relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {isApplying ? (
                    <motion.div 
                      key="respring"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-4"
                    >
                      <div className="size-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
                      <div className="text-[10px] font-black uppercase text-white animate-pulse">Respringing_A1633...</div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="preview"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="grid grid-cols-4 gap-6 md:gap-12"
                    >
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                          <motion.div 
                            style={{ 
                              width: `${(iconSize / 100) * 60}px`, 
                              height: `${(iconSize / 100) * 60}px`,
                              backgroundColor: selectedSkin.id === 'tinted' ? '#00ff41' : (selectedSkin.id === 'dark' ? '#1a1a1a' : '#d209fa'),
                              boxShadow: selectedSkin.id === 'tinted' ? '0 0 15px rgba(0,255,65,0.4)' : (selectedSkin.id === 'abyss' ? '0 0 15px rgba(210,9,250,0.4)' : 'none')
                            }}
                            className="rounded-2xl border-2 border-white/10 flex items-center justify-center transition-all duration-500"
                          >
                            <Smartphone className={cn(
                              "size-6",
                              selectedSkin.id === 'tinted' ? "text-black" : "text-white"
                            )} />
                          </motion.div>
                          <div className="text-[8px] font-bold text-white uppercase opacity-40">App_{i+1}</div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="absolute bottom-4 left-4 flex gap-4 text-[9px] font-black uppercase tracking-widest text-neon-green/40">
                  <div className="flex items-center gap-1"><Smartphone className="size-3" /> N71AP_SCREEN</div>
                  <div className="flex items-center gap-1"><RefreshCw className="size-3" /> 60Hz_SYNC</div>
                </div>
              </div>
            </RetroCard>
          </div>
        </div>
      </div>
    </RetroLayout>
  );
}