import React, { useState } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Zap, ShieldCheck, Rocket, Download, Terminal, Package, Info } from 'lucide-react';
import { RetroProgress } from '@/components/ui/retro-progress';
import { toast } from 'sonner';
export function IslandFakeoutPage() {
  const [islandOpen, setIslandOpen] = useState(false);
  const [gestures, setGestures] = useState(true);
  const [isSigning, setIsSigning] = useState(false);
  const startTurboSign = () => {
    setIsSigning(true);
    toast.info("TROLL_TURBO_INITIATED: Bypassing CoreTrust...");
    setTimeout(() => {
      setIsSigning(false);
      setIslandOpen(true);
      toast.success("IPA_PERMA_SIGNED", { description: "Certificate injected via TrollStore helper." });
      setTimeout(() => setIslandOpen(false), 4000);
    }, 3000);
  };
  return (
    <RetroLayout>
      <div className="space-y-12">
        <div className="relative flex justify-center pt-8">
          <AnimatePresence>
            <motion.div
              layout
              initial={{ width: 120, height: 30 }}
              animate={{ 
                width: islandOpen ? 300 : 120, 
                height: islandOpen ? 80 : 30 
              }}
              className="bg-black rounded-[30px] border-2 border-white/20 flex items-center justify-center overflow-hidden z-50 shadow-xl"
            >
              {!islandOpen ? (
                <div className="size-2 bg-white/20 rounded-full" />
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4 px-6 text-white w-full">
                  <div className="size-10 bg-neon-pink flex items-center justify-center rounded-xl">
                    <Rocket className="size-6 text-white" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase">Troll_Turbo</div>
                    <div className="text-[9px] opacity-70">PAYLOAD_SUCCESS_N71AP</div>
                  </div>
                  <div className="ml-auto text-neon-green font-mono text-[10px] animate-pulse">LIVE</div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <RetroCard title="UI_MODERNIZATION" variant="default">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-bold uppercase">iPhone 15 Gestures</Label>
                  <Switch checked={gestures} onCheckedChange={setGestures} />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-bold uppercase">Dynamic Island Mock</Label>
                  <Switch checked={islandOpen} onCheckedChange={setIslandOpen} />
                </div>
                <div className="p-3 bg-neon-green/5 border border-neon-green/20 text-[10px] uppercase italic">
                  Note: These are UI-only simulations for the A1633 framebuffer. Permanent injection requires Neptune or Little12.
                </div>
              </div>
            </RetroCard>
            <RetroCard title="TROLL_TURBO" variant="danger">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Package className="size-8 text-neon-pink" />
                  <div className="text-xs font-bold uppercase">IPA Perma-Signer</div>
                </div>
                <p className="text-[10px] opacity-70 leading-tight">Fastest certificate bypass for iOS 15.8.3. Uses CoreTrust Singularity.</p>
                <button 
                  onClick={startTurboSign}
                  disabled={isSigning}
                  className="retro-button w-full border-neon-pink text-neon-pink"
                >
                  {isSigning ? "TURBO_SIGNING..." : "INITIALIZE_TURBO"}
                </button>
              </div>
            </RetroCard>
          </div>
          <div className="lg:col-span-8 space-y-8">
            <RetroCard title="VISUAL_SIMULATOR" status="A1633_OVERRIDE">
              <div className="aspect-[9/16] max-w-[320px] mx-auto border-8 border-neutral-900 rounded-[40px] bg-black relative overflow-hidden p-4">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20 border border-white/10" />
                <div className="h-full w-full bg-gradient-to-b from-neutral-900 to-black rounded-[30px] flex flex-col p-6 space-y-4">
                  <div className="h-32 w-full bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
                    <Smartphone className="size-12 text-white/20" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-3/4 bg-white/10 rounded" />
                    <div className="h-2 w-1/2 bg-white/10 rounded" />
                  </div>
                  <div className="flex-1 flex items-end justify-center pb-4">
                    <div className="h-1 w-24 bg-white/40 rounded-full" />
                  </div>
                </div>
              </div>
            </RetroCard>
            {isSigning && (
              <RetroCard title="SIGNING_MANIFEST" status="BUSY">
                <div className="space-y-4">
                  <RetroProgress current={50} max={100} isIndeterminate />
                  <div className="font-mono text-[9px] text-neon-pink space-y-1">
                    <div>{">"} EXTRACTING_IPA_HEADER...</div>
                    <div>{">"} INJECTING_CORETRUST_FAKE_CERT...</div>
                    <div>{">"} SYNCING_LDID_ENTITLEMENTS...</div>
                  </div>
                </div>
              </RetroCard>
            )}
          </div>
        </div>
      </div>
    </RetroLayout>
  );
}