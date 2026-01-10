import React, { useState } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { NANDDoctor } from '@/components/nand-doctor';
import { FlaskConical, Hammer, Layers, Terminal, ShieldAlert } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
export function SystemLabPage() {
  const [patches, setPatches] = useState({
    noLimit: true,
    overclock: false,
    kppBypass: true,
    hypervisor: false
  });
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
              <div className="flex justify-between">
                <span>CPU_IDENT:</span>
                <span>APPLE_A9_N71AP</span>
              </div>
              <div className="flex justify-between">
                <span>MEM_TYPE:</span>
                <span>LPDDR4_2GB</span>
              </div>
              <div className="flex justify-between">
                <span>FLASH_ID:</span>
                <span>SKHYNIX_128GB</span>
              </div>
              <div className="flex justify-between">
                <span>TEMP_CORE:</span>
                <span className="text-neon-pink">42.8°C</span>
              </div>
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
                {Object.entries(patches).map(([key, val]) => (
                  <div key={key} className="flex items-center space-x-3">
                    <Checkbox 
                      id={key} 
                      checked={val} 
                      onCheckedChange={() => setPatches(p => ({...p, [key]: !val}))}
                      className="border-yellow-400 data-[state=checked]:bg-yellow-400 data-[state=checked]:text-black"
                    />
                    <Label htmlFor={key} className="text-[10px] uppercase font-bold cursor-pointer hover:text-yellow-400 transition-colors">
                      Patch: {key.toUpperCase().replace('_', ' ')}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-yellow-400/10 border border-yellow-400/30">
                <div className="flex gap-2 items-start text-[10px] text-yellow-400 uppercase leading-tight">
                  <ShieldAlert className="size-4 shrink-0" />
                  <span>Experimental patches may lead to permanent bootloops. Verification required before flashing.</span>
                </div>
              </div>
              <button className="retro-button w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black">
                GENERATE_MANIFEST.JSON
              </button>
            </div>
          </RetroCard>
          <RetroCard title="VIRT_STACK_PROBE">
            <div className="space-y-4">
              <div className="h-20 bg-black/40 border border-neon-green/20 flex items-center justify-center">
                 <Terminal className="size-8 text-neon-green/30 animate-pulse" />
              </div>
              <p className="text-[10px] leading-relaxed opacity-70 italic">
                Scanning for JIT-enabled hypervisors... No active virtualization instances detected. Awaiting payload.
              </p>
            </div>
          </RetroCard>
        </div>
      </div>
    </RetroLayout>
  );
}