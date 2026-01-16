import React, { useState, useEffect } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Zap, ShieldCheck, Rocket, Download, Terminal, Package, Info, Layers, Maximize } from 'lucide-react';
import { useUIStore } from '@/store/ui-store';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
export function IslandFakeoutPage() {
  const isSingularityMode = useUIStore(s => s.isSingularityMode);
  const [islandOpen, setIslandOpen] = useState(false);
  const [isVortexActive, setIsVortexActive] = useState(false);
  const [vortexProgress, setVortexProgress] = useState(0);
  const [gestures, setGestures] = useState(true);
  const [isSigning, setIsSigning] = useState(false);
  const [notchStyle, setNotchStyle] = useState<'island' | 'notch' | 'classic'>('island');
  const [retinaOverride, setRetinaOverride] = useState(false);
  useEffect(() => {
    if (isSingularityMode && notchStyle !== 'island') {
      setNotchStyle('island');
    }
  }, [isSingularityMode]);
  const startTurboSign = () => {
    setIsSigning(true);
    setIsVortexActive(true);
    setVortexProgress(0);
    toast.info("TROLL_VORTEX_INITIATED");
    const interval = setInterval(() => {
      setVortexProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
    setTimeout(() => {
      setIsSigning(false);
      setIslandOpen(true);
      toast.success("VORTEX_SIGN_COMPLETE");
      setTimeout(() => {
        setIslandOpen(false);
        setIsVortexActive(false);
      }, 3000);
    }, 2500);
  };
  return (
    <RetroLayout>
      <div className="space-y-12">
        <div className="relative flex justify-center pt-8 h-32">
          <AnimatePresence mode="wait">
            <motion.div
              layout
              initial={{ width: 120, height: 30 }}
              animate={{
                width: islandOpen || isVortexActive ? 320 : (notchStyle === 'classic' ? 0 : 120),
                height: islandOpen || isVortexActive ? 80 : (notchStyle === 'classic' ? 0 : 30),
                borderRadius: notchStyle === 'notch' ? '0 0 15px 15px' : '30px'
              }}
              className={cn(
                "bg-black border-2 border-white/20 flex items-center justify-center overflow-hidden z-50 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative",
                isVortexActive && "border-neon-pink shadow-[0_0_40px_rgba(210,9,250,0.4)]",
                notchStyle === 'classic' && "opacity-0"
              )}
            >
              {isVortexActive && (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(210,9,250,0.3)_0%,transparent_70%)] animate-pulse" />
              )}
              {isVortexActive ? (
                <div className="flex flex-col items-center justify-center text-neon-pink w-full px-8 relative z-10">
                   <div className="text-[10px] font-black uppercase mb-1">VORTEX_SIGNING_BLOCK_4163</div>
                   <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${vortexProgress}%` }} 
                        className="h-full bg-neon-pink shadow-[0_0_10px_rgba(210,9,250,1)]" 
                      />
                   </div>
                   <div className="text-[8px] font-mono mt-1">{vortexProgress}%_SYNC</div>
                </div>
              ) : islandOpen ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4 px-6 text-white w-full">
                  <div className="size-8 bg-neon-pink flex items-center justify-center rounded-lg">
                    <Rocket className="size-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[9px] font-black uppercase leading-none">Troll_Turbo_v2</div>
                    <div className="text-[8px] opacity-70 uppercase">Batch_Injection_Link</div>
                  </div>
                  <div className="text-neon-green font-mono text-[9px] animate-pulse">ACTIVE</div>
                </motion.div>
              ) : (
                <div className="flex gap-2">
                  <div className="size-2 bg-white/20 rounded-full" />
                  {notchStyle === 'island' && <div className="w-8 h-1 bg-white/10 rounded-full" />}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <RetroCard title="ISLAND_SINGULARITY" variant={isSingularityMode ? "danger" : "default"}>
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase opacity-60">Architecture_Mode</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {['island', 'notch', 'classic'].map(style => (
                      <button
                        key={style}
                        onClick={() => setNotchStyle(style as any)}
                        className={cn(
                          "py-2 border-2 text-[9px] font-bold uppercase transition-all",
                          notchStyle === style ? "bg-neon-green text-black border-neon-green" : "border-neon-green/20 text-neon-green/40"
                        )}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-bold uppercase">Gestures_v15</Label>
                  <Switch checked={gestures} onCheckedChange={setGestures} className="data-[state=checked]:bg-neon-green" />
                </div>
              </div>
            </RetroCard>
            <RetroCard title="TROLL_VORTEX" variant="danger">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Layers className="size-8 text-neon-pink" />
                  <div className="text-xs font-bold uppercase leading-tight">Batch_Sign_Vortex</div>
                </div>
                <button onClick={startTurboSign} disabled={isSigning} className="retro-button w-full border-neon-pink text-neon-pink shadow-[4px_4px_0px_rgba(210,9,250,1)] hover:shadow-none">
                  {isSigning ? "VORTEX_ACTIVE..." : "INITIALIZE_VORTEX"}
                </button>
              </div>
            </RetroCard>
          </div>
          <div className="lg:col-span-8">
            <RetroCard title="FRAMEBUFFER_SIMULATOR" status="N71AP_EMU">
               <div className="flex flex-col md:flex-row items-center justify-center gap-12 py-6">
                 <div className="relative aspect-[9/16] w-[260px] border-8 border-neutral-900 rounded-[40px] bg-black overflow-hidden">
                    <div className="absolute inset-0 bg-white/5" />
                    {notchStyle !== 'classic' && (
                      <div className={cn(
                        "absolute left-1/2 -translate-x-1/2 bg-black z-30",
                        notchStyle === 'island' ? "top-2 w-24 h-6 rounded-full" : "top-0 w-32 h-6 rounded-b-2xl"
                      )} />
                    )}
                 </div>
                 <div className="flex-1 space-y-4">
                   <div className="p-4 border border-neon-green/30 bg-black/40 font-mono text-[10px] space-y-2">
                     <div className="flex justify-between"><span>Model:</span> <span className="text-neon-green">A1633_Singularity</span></div>
                     <div className="flex justify-between"><span>PPI:</span> <span className="text-neon-green">326</span></div>
                   </div>
                 </div>
               </div>
            </RetroCard>
          </div>
        </div>
      </div>
    </RetroLayout>
  );
}