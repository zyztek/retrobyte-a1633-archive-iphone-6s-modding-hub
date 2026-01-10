import React, { useState } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { RetroProgress } from '@/components/ui/retro-progress';
import { Usb, HardDrive, Cpu, Terminal, CheckCircle2, AlertTriangle, Play, RefreshCw, Zap, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
export function USBForgePage() {
  const [probing, setProbing] = useState(false);
  const [probeResult, setProbeResult] = useState<null | 'VALID' | 'INVALID'>(null);
  const [activeStep, setActiveStep] = useState(0);
  const handleProbe = () => {
    setProbing(true);
    setProbeResult(null);
    setTimeout(() => {
      setProbing(false);
      const success = Math.random() > 0.3;
      setProbeResult(success ? 'VALID' : 'INVALID');
      if (success) {
        toast.success("CABLE_INTEGRITY_VERIFIED", { description: "High-speed DFU data lines active." });
      } else {
        toast.error("PROBE_FAILURE", { description: "Charging only cable detected. Data sync pins unresponsive." });
      }
    }, 2000);
  };
  const forgeSteps = [
    { title: "SOURCE_ISO", cmd: "fetch --target palen1x-v1.1.0-amd64.iso" },
    { title: "MOUNT_DRIVE", cmd: "rufus-cmd --device D: --burn --persistent" },
    { title: "VERIFY_BOOT", cmd: "check-integrity --file palen1x.iso --sha256" }
  ];
  return (
    <RetroLayout>
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold retro-glow uppercase tracking-tighter flex items-center gap-3">
              <Usb className="size-10 text-neon-green" /> USB Forge
            </h1>
            <p className="text-xs text-neon-green/60 uppercase font-bold tracking-[0.2em]">Hardware Interfacing & Media Creation Hub</p>
          </div>
          <div className="bg-neon-green/10 border-2 border-neon-green px-4 py-1 text-[10px] font-bold uppercase animate-pulse">
            Hardware_Bridge: ACTIVE
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-8">
            <RetroCard title="PALEN1X_CREATOR" status={`${activeStep + 1}/3`}>
              <div className="space-y-6">
                <div className="flex justify-between relative mb-8">
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-neon-green/20 -translate-y-1/2" />
                  {forgeSteps.map((step, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveStep(i)}
                      className={cn(
                        "relative z-10 size-10 rounded-none border-2 flex items-center justify-center cursor-pointer transition-all",
                        activeStep >= i ? "border-neon-green bg-retro-black text-neon-green" : "border-neon-green/20 bg-retro-black text-neon-green/40",
                        activeStep === i && "shadow-[0_0_15px_rgba(0,255,65,0.5)] scale-110"
                      )}
                    >
                      <HardDrive className="size-5" />
                    </div>
                  ))}
                </div>
                <div className="bg-black/40 border border-neon-green/30 p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold uppercase text-neon-green">{forgeSteps[activeStep].title}</h3>
                    <span className="text-[10px] font-mono opacity-40">STEP_ID: 0x0{activeStep + 1}</span>
                  </div>
                  <div className="bg-black p-4 border-l-4 border-neon-green font-mono text-xs text-neon-green/80 flex justify-between items-center group">
                    <code>$ {forgeSteps[activeStep].cmd}</code>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity"><Play className="size-3" /></button>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setActiveStep(prev => Math.min(prev + 1, 2))}
                      className="retro-button flex-1 text-xs"
                    >
                      EXECUTE_PHASE
                    </button>
                    <button className="retro-button flex-1 border-neon-pink text-neon-pink shadow-none text-xs">
                      RESET_DRIVE
                    </button>
                  </div>
                </div>
              </div>
            </RetroCard>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RetroCard title="JC-P7_PROGRAMMER" variant="warning">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Cpu className="size-8 text-yellow-400" />
                    <div className="text-[10px] font-bold uppercase">BGA110 Protocol Layer</div>
                  </div>
                  <div className="text-[9px] uppercase leading-relaxed opacity-80">
                    Interfacing with P7 Programmer for A9 (N71AP) NAND expansion. Supports SYSCFG editing.
                  </div>
                  <div className="p-2 bg-yellow-400/10 border border-yellow-400/30 font-mono text-[8px] text-yellow-400 space-y-1">
                    <div>{">"} AT_CMD_SYNC: VERIFIED</div>
                    <div>{">"} BAUD_RATE: 115200</div>
                  </div>
                  <button className="retro-button w-full border-yellow-400 text-yellow-400 shadow-none text-[10px]">
                    INITIALIZE_JC_P7
                  </button>
                </div>
              </RetroCard>
              <RetroCard title="KALI_OTG_PROTOCOL" variant="danger">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-neon-pink">
                    <Zap className="size-8" />
                    <div className="text-[10px] font-bold uppercase">External_RF_Suite</div>
                  </div>
                  <ul className="text-[9px] space-y-2 uppercase font-bold opacity-70">
                    <li className="flex items-center gap-2"><CheckCircle2 className="size-3" /> MT7601U: DRIVER_READY</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="size-3" /> RT5370: DRIVER_READY</li>
                    <li className="flex items-center gap-2 text-neon-pink"><AlertTriangle className="size-3" /> OTG_PWR: 450mA_LIMIT</li>
                  </ul>
                  <button className="retro-button w-full border-neon-pink text-neon-pink shadow-none text-[10px]">
                    CONFIGURE_RADIO
                  </button>
                </div>
              </RetroCard>
            </div>
          </div>
          <div className="lg:col-span-5 space-y-8">
            <RetroCard title="DFU_CABLE_CHECK" status={probing ? "PROBING" : "IDLE"}>
              <div className="space-y-6">
                <div className="relative h-24 bg-black/60 border-2 border-neon-green/20 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.05)_50%,transparent_50%)] bg-[length:100%_4px]" />
                  {probing ? (
                    <div className="flex gap-2">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-1.5 h-8 bg-neon-green animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                      ))}
                    </div>
                  ) : probeResult === 'VALID' ? (
                    <ShieldCheck className="size-12 text-neon-green animate-bounce" />
                  ) : probeResult === 'INVALID' ? (
                    <AlertTriangle className="size-12 text-neon-pink animate-pulse" />
                  ) : (
                    <Usb className="size-12 text-white/20" />
                  )}
                </div>
                <div className="space-y-2">
                  <RetroProgress current={probing ? 50 : 0} max={100} isIndeterminate={probing} label="SIGNAL_CONTINUITY" />
                  <div className="flex justify-between text-[9px] font-bold uppercase">
                    <span className="opacity-40">Status:</span>
                    <span className={cn(
                      probeResult === 'VALID' ? "text-neon-green" : 
                      probeResult === 'INVALID' ? "text-neon-pink" : ""
                    )}>
                      {probeResult || "AWAITING_INPUT"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleProbe}
                  disabled={probing}
                  className="retro-button w-full flex items-center justify-center gap-2"
                >
                  {probing ? <RefreshCw className="size-4 animate-spin" /> : <Terminal className="size-4" />}
                  PROBE_LIGHTNING_IO
                </button>
              </div>
            </RetroCard>
            <RetroCard title="RISK_CHECKLIST" variant="danger">
              <div className="space-y-3">
                <div className="p-3 border-l-2 border-neon-pink bg-neon-pink/5 text-[10px] uppercase font-bold space-y-2">
                  <div className="text-neon-pink flex items-center gap-2">
                    <AlertTriangle className="size-3" /> ESD_WARNING
                  </div>
                  <p className="opacity-70 leading-tight">Always use anti-static equipment when handling the JC-P7 or open NAND modules. A1633 boards are highly sensitive.</p>
                </div>
                <div className="p-3 border-l-2 border-neon-pink bg-neon-pink/5 text-[10px] uppercase font-bold space-y-2">
                  <div className="text-neon-pink flex items-center gap-2">
                    <AlertTriangle className="size-3" /> POWER_OVERDRAW
                  </div>
                  <p className="opacity-70 leading-tight">OTG WiFi adapters can exceed the Lightning port current draw. Use powered hubs for long packet capture sessions.</p>
                </div>
              </div>
            </RetroCard>
          </div>
        </div>
      </div>
    </RetroLayout>
  );
}