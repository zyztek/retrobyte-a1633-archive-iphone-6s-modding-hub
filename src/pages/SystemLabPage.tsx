import React, { useState } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { NANDDoctor } from '@/components/nand-doctor';
import { FlaskConical, Hammer, Terminal, ShieldAlert, Copy } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
export function SystemLabPage() {
  const [patches, setPatches] = useState({
    noLimit: true,
    overclock: false,
    kppBypass: true,
    hypervisor: false
  });
  const handleGenerateManifest = () => {
    const selectedPatches = Object.entries(patches)
      .filter(([_, v]) => v)
      .map(([k]) => k.toUpperCase());
    toast.success("MANIFEST_GENERATED", {
      description: `Build manifest for ${selectedPatches.length} patches created successfully.`,
      style: {
        background: '#0a0a0a',
        color: '#facc15',
        border: '1px solid #facc15'
      }
    });
  };
  const copyAnalytics = () => {
    const text = "CPU: APPLE_A9_N71AP\nMEM: LPDDR4_2GB\nFLASH: SKHYNIX_128GB\nTEMP: 42.8°C";
    navigator.clipboard.writeText(text);
    toast.info("ANALYTICS_COPIED", {
      description: "Hardware telemetry copied to clipboard.",
      style: {
        background: '#0a0a0a',
        color: '#00ff41',
        border: '1px solid #00ff41'
      }
    });
  };
  return (
    <RetroLayout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-12">
          <div className="flex items-center gap-4 mb-8">
            <FlaskConical className="size-10 text-neon-green" />
            <div>
              <h1 className="text-4xl font-bold retro-glow uppercase tracking-tighter">System Lab</h1>
              <p className="text-xs text-neon-green/60 uppercase">Hardware Diagnostics & Kernel Modification</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-6 space-y-8">
          <NANDDoctor />
          <RetroCard title="KERNEL_ANALYTICS" status="ACTIVE">
            <div className="space-y-4 font-mono text-[10px] leading-tight text-neon-green/80">
              <div className="flex justify-between border-b border-neon-green/10 pb-1">
                <span>CPU_IDENT:</span>
                <span className="font-bold">APPLE_A9_N71AP</span>
              </div>
              <div className="flex justify-between border-b border-neon-green/10 pb-1">
                <span>MEM_TYPE:</span>
                <span className="font-bold">LPDDR4_2GB</span>
              </div>
              <div className="flex justify-between border-b border-neon-green/10 pb-1">
                <span>FLASH_ID:</span>
                <span className="font-bold">SKHYNIX_128GB</span>
              </div>
              <div className="flex justify-between border-b border-neon-green/10 pb-1">
                <span>TEMP_CORE:</span>
                <span className="text-neon-pink font-bold">42.8°C</span>
              </div>
              <button 
                onClick={copyAnalytics}
                className="mt-2 text-[9px] uppercase font-bold flex items-center gap-1 hover:text-neon-pink transition-colors"
              >
                <Copy className="size-3" /> COPY_TELEMETRY_LOG
              </button>
            </div>
          </RetroCard>
        </div>
        <div className="lg:col-span-6 space-y-8">
          <RetroCard title="ROM_FORGE" variant="warning" status="DEV">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-sm font-bold uppercase text-yellow-400">
                <Hammer className="size-4" /> Distro Manifest Builder
              </div>
              <div className="space-y-4">
                {(Object.keys(patches) as Array<keyof typeof patches>).map((key) => (
                  <div key={key} className="flex items-center space-x-3">
                    <Checkbox
                      id={key}
                      checked={patches[key]}
                      onCheckedChange={() => setPatches(p => ({...p, [key]: !patches[key]}))}
                      className="border-yellow-400 data-[state=checked]:bg-yellow-400 data-[state=checked]:text-black rounded-none"
                    />
                    <Label htmlFor={key} className="text-[10px] uppercase font-bold cursor-pointer hover:text-yellow-400 transition-colors">
                      Patch: {key.toUpperCase().replace('_', ' ')}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-yellow-400/10 border-2 border-yellow-400/30">
                <div className="flex gap-2 items-start text-[10px] text-yellow-400 uppercase leading-tight font-bold">
                  <ShieldAlert className="size-4 shrink-0" />
                  <span>Experimental patches may lead to permanent bootloops. Verification required before flashing.</span>
                </div>
              </div>
              <button 
                onClick={handleGenerateManifest}
                className="retro-button w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black shadow-[4px_4px_0px_rgba(250,204,21,1)]"
              >
                GENERATE_MANIFEST.JSON
              </button>
            </div>
          </RetroCard>
          <RetroCard title="VIRT_STACK_PROBE">
            <div className="space-y-4">
              <div className="h-20 bg-black/40 border border-neon-green/20 flex items-center justify-center">
                 <Terminal className="size-8 text-neon-green/30 animate-pulse" />
              </div>
              <p className="text-[10px] leading-relaxed opacity-70 italic uppercase tracking-tighter">
                Scanning for JIT-enabled hypervisors... No active virtualization instances detected. Awaiting payload.
              </p>
            </div>
          </RetroCard>
        </div>
      </div>
    </RetroLayout>
  );
}