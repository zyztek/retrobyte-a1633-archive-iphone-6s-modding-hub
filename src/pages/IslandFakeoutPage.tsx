import React, { useState } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Zap, ShieldCheck, Rocket, Download, Terminal, Package, Info, Layers, Maximize } from 'lucide-react';
import { RetroProgress } from '@/components/ui/retro-progress';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
export function IslandFakeoutPage() {
  const [islandOpen, setIslandOpen] = useState(false);
  const [gestures, setGestures] = useState(true);
  const [isSigning, setIsSigning] = useState(false);
  const [notchStyle, setNotchStyle] = useState<'island' | 'notch' | 'classic'>('island');
  const [retinaOverride, setRetinaOverride] = useState(false);
  const startTurboSign = () => {
    setIsSigning(true);
    toast.info("TROLL_TURBO_BATCH_SIGN: Initializing Singularity...");
    setTimeout(() => {
      setIsSigning(false);
      setIslandOpen(true);
      toast.success("BATCH_IPA_SIGNED", { description: "3 items permanently signed for A1633." });
      setTimeout(() => setIslandOpen(false), 3000);
    }, 2500);
  };
  return (
    <RetroLayout>
      <div className="space-y-12">
        {/* Dynamic Island Preview Area */}
        <div className="relative flex justify-center pt-8 h-24">
          <AnimatePresence mode="wait">
            <motion.div
              layout
              initial={{ width: 120, height: 30 }}
              animate={{
                width: islandOpen ? 280 : (notchStyle === 'classic' ? 0 : 120),
                height: islandOpen ? 60 : (notchStyle === 'classic' ? 0 : 30),
                borderRadius: notchStyle === 'notch' ? '0 0 15px 15px' : '30px'
              }}
              className={cn(
                "bg-black border-2 border-white/20 flex items-center justify-center overflow-hidden z-50 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)]",
                notchStyle === 'classic' && "opacity-0"
              )}
            >
              {islandOpen ? (
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
            <RetroCard title="GEOMETRY_LAB" variant="default">
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase opacity-60">Notch_Architecture</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {['island', 'notch', 'classic'].map(style => (
                      <button
                        key={style}
                        onClick={() => setNotchStyle(style as any)}
                        className={cn(
                          "py-2 border-2 text-[9px] font-bold uppercase transition-all",
                          notchStyle === style ? "bg-neon-green text-black border-neon-green" : "border-neon-green/20 text-neon-green/40 hover:border-neon-green/50"
                        )}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-bold uppercase">Gestures_15</Label>
                  <Switch checked={gestures} onCheckedChange={setGestures} className="data-[state=checked]:bg-neon-green" />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-bold uppercase">Pixel_Density_OVR</Label>
                  <Switch checked={retinaOverride} onCheckedChange={setRetinaOverride} className="data-[state=checked]:bg-neon-green" />
                </div>
              </div>
            </RetroCard>
            <RetroCard title="TROLL_BATCH_SIGN" variant="danger">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Layers className="size-8 text-neon-pink" />
                  <div className="text-xs font-bold uppercase leading-tight">Batch_Sign_Sector</div>
                </div>
                <div className="space-y-1">
                  {['Instagram_NoAds.ipa', 'YouTube_Enhancer.ipa', 'MTerminal_P7.ipa'].map(app => (
                    <div key={app} className="text-[9px] font-mono p-1 border border-neon-pink/20 bg-neon-pink/5 flex justify-between">
                      <span className="text-neon-pink truncate">{app}</span>
                      <ShieldCheck className="size-3 text-neon-pink" />
                    </div>
                  ))}
                </div>
                <button onClick={startTurboSign} disabled={isSigning} className="retro-button w-full border-neon-pink text-neon-pink">
                  {isSigning ? "BATCH_SIGNING..." : "INITIALIZE_SINGULARITY"}
                </button>
              </div>
            </RetroCard>
          </div>
          <div className="lg:col-span-8 space-y-8">
            <RetroCard title="FRAMEBUFFER_SIMULATOR" status="N71AP_EMU">
              <div className="flex flex-col md:flex-row items-center justify-center gap-12 py-6">
                <div className="relative aspect-[9/16] w-[260px] border-8 border-neutral-900 rounded-[40px] bg-black overflow-hidden shadow-[0_0_50px_rgba(0,255,65,0.1)]">
                  <div className="absolute inset-0 bg-gradient-to-b from-neutral-800 to-black p-4">
                    {/* Simulated OS Interface */}
                    <div className="h-full flex flex-col gap-4">
                      <div className="h-20 w-full bg-white/5 rounded-2xl flex items-center justify-center">
                        <Smartphone className="size-8 text-white/10" />
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {Array.from({ length: 16 }).map((_, i) => (
                          <div key={i} className="aspect-square bg-white/5 rounded-lg" />
                        ))}
                      </div>
                      <div className="flex-1 flex items-end justify-center pb-2">
                        <div className="w-20 h-1 bg-white/20 rounded-full" />
                      </div>
                    </div>
                  </div>
                  {/* Notch Layer */}
                  {notchStyle !== 'classic' && (
                    <div 
                      className={cn(
                        "absolute top-0 left-1/2 -translate-x-1/2 bg-black z-30",
                        notchStyle === 'island' ? "top-2 w-24 h-6 rounded-full border border-white/5" : "w-32 h-6 rounded-b-2xl border-x border-b border-white/5"
                      )}
                    />
                  )}
                  {retinaOverride && <div className="absolute inset-0 z-40 bg-neon-green/5 pointer-events-none mix-blend-overlay" />}
                </div>
                <div className="flex-1 space-y-6">
                  <div className="p-4 border border-neon-green/30 bg-black/40 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-black uppercase text-neon-green">
                      <Maximize className="size-4" /> Rendering_Intel
                    </div>
                    <div className="space-y-2 font-mono text-[10px]">
                      <div className="flex justify-between"><span>Density:</span> <span className={retinaOverride ? "text-neon-pink" : "text-neon-green"}>{retinaOverride ? '458_PPI' : '326_PPI'}</span></div>
                      <div className="flex justify-between"><span>Frame_Lock:</span> <span className="text-neon-green">60_FPS</span></div>
                      <div className="flex justify-between"><span>Geometry:</span> <span className="text-neon-green uppercase">{notchStyle}</span></div>
                    </div>
                  </div>
                  <div className="p-4 border-2 border-neon-pink/20 bg-neon-pink/5 text-[9px] uppercase font-bold italic text-neon-pink leading-relaxed">
                    "Injecting custom UI headers into the SpringBoard process allows the A9 hardware to simulate modern interface anchors without full OS replacement."
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