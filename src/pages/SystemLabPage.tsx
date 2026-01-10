import React, { useState } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { NANDDoctor } from '@/components/nand-doctor';
import { FlaskConical, Hammer, Terminal, ShieldAlert, Copy, Database, Zap, Cpu, Battery, Activity, HardDrive, Package } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';
export function SystemLabPage() {
  const [patches, setPatches] = useState({ noLimit: true, overclock: false, kppBypass: true, hypervisor: false });
  const [foundryItems, setFoundryItems] = useState<string[]>([]);
  const [voltage, setVoltage] = useState(3800); // in mV
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const item = e.dataTransfer.getData("text/plain");
    if (item && !foundryItems.includes(item)) {
      setFoundryItems(prev => [...prev, item]);
      toast.success("MODULE_FUSED", { description: `${item} added to ISO manifest.` });
    }
  };
  const batteryData = [
    { hour: '00:00', volt: 3.8 }, { hour: '04:00', volt: 3.7 }, { hour: '08:00', volt: 3.9 },
    { hour: '12:00', volt: 3.6 }, { hour: '16:00', volt: 3.4 }, { hour: '20:00', volt: 3.5 }
  ];
  return (
    <RetroLayout>
      <div className="space-y-12">
        <div className="flex items-center gap-4">
          <FlaskConical className="size-10 text-neon-green" />
          <h1 className="text-4xl font-bold retro-glow uppercase tracking-tighter">System Lab</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <NANDDoctor />
            <RetroCard title="FOUNDRY_DROP_ZONE" status={foundryItems.length > 0 ? "MANIFEST_OPEN" : "AWAITING_DROP"}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="text-[10px] font-black uppercase text-neon-green/60">Source_Modules</div>
                  <div className="flex flex-wrap gap-2">
                    {['Kernel_15.8.3', 'A9_Hypervisor', 'Kali_Chroot', 'Sileo_Core', 'Troll_Daemon'].map(module => (
                      <div
                        key={module}
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData("text/plain", module)}
                        className="px-3 py-1 border border-neon-green/40 bg-neon-green/5 text-[9px] font-bold uppercase cursor-grab active:cursor-grabbing hover:bg-neon-green hover:text-black transition-all"
                      >
                        {module}
                      </div>
                    ))}
                  </div>
                </div>
                <div 
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className={cn(
                    "border-2 border-dashed h-48 flex flex-col items-center justify-center p-4 transition-all",
                    foundryItems.length > 0 ? "border-neon-pink bg-neon-pink/5" : "border-neon-green/20"
                  )}
                >
                  {foundryItems.length === 0 ? (
                    <>
                      <Package className="size-8 text-neon-green/20 mb-2" />
                      <span className="text-[10px] font-bold opacity-30 uppercase">Drop_Modules_Here</span>
                    </>
                  ) : (
                    <div className="w-full space-y-2 overflow-y-auto max-h-full scrollbar-thin">
                      {foundryItems.map(item => (
                        <div key={item} className="flex justify-between items-center text-[9px] font-mono p-1 border-b border-neon-pink/20">
                          <span className="text-neon-pink">:: {item.toUpperCase()}</span>
                          <button onClick={() => setFoundryItems(prev => prev.filter(i => i !== item))}><Terminal className="size-3" /></button>
                        </div>
                      ))}
                      <button className="retro-button w-full text-[10px] border-neon-pink text-neon-pink py-1 shadow-none mt-2">COMPILE_ISO</button>
                    </div>
                  )}
                </div>
              </div>
            </RetroCard>
            <RetroCard title="BATTERY_FORGE" status={`${voltage}mV_STABLE`}>
              <div className="h-48 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={batteryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#00ff4120" />
                    <XAxis dataKey="hour" stroke="#00ff41" fontSize={10} />
                    <YAxis domain={[3, 4.2]} stroke="#00ff41" fontSize={10} />
                    <Area type="monotone" dataKey="volt" stroke="#d209fa" fill="#d209fa20" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="border border-neon-green/30 p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-[10px] font-black uppercase opacity-60">V_Core_Mixer</Label>
                    <span className="text-xs font-mono text-neon-pink">{voltage}mV</span>
                  </div>
                  <input 
                    type="range" min="3000" max="4200" step="10"
                    value={voltage} onChange={(e) => setVoltage(parseInt(e.target.value))}
                    className="w-full accent-neon-pink" 
                  />
                </div>
                <div className="border border-neon-green/30 p-4 flex items-center gap-3">
                  <Battery className="size-6 text-neon-pink" />
                  <div>
                    <div className="text-[10px] font-black uppercase">Charge_Rate: 1.2A</div>
                    <div className="text-[8px] opacity-50 uppercase tracking-widest">A9_Rail_Lock: STABLE</div>
                  </div>
                </div>
              </div>
            </RetroCard>
          </div>
          <div className="lg:col-span-4 space-y-8">
            <RetroCard title="ROM_FOUNDRY" variant="warning" status="COMPILING">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-yellow-400 uppercase">
                  <Hammer className="size-4" /> Iso_Build_Chain
                </div>
                <div className="space-y-2 font-mono text-[9px] text-yellow-400">
                  <div className="flex justify-between"><span>BASE:</span> <span>IOS_15.8.3</span></div>
                  <div className="flex justify-between"><span>SIZE:</span> <span>{foundryItems.length * 420}MB</span></div>
                  <div className="flex justify-between"><span>HASH:</span> <span>SHA256_SYNC</span></div>
                </div>
                <button className="retro-button w-full border-yellow-400 text-yellow-400 shadow-none">START_COMPILATION</button>
              </div>
            </RetroCard>
            <RetroCard title="KERNEL_PATCHER" status="MODIFIED">
              <div className="space-y-4">
                {(Object.keys(patches) as Array<keyof typeof patches>).map((key) => (
                  <div key={key} className="flex items-center space-x-3">
                    <Checkbox id={key} checked={patches[key]} onCheckedChange={() => setPatches(p => ({...p, [key]: !patches[key]}))} className="border-neon-green rounded-none" />
                    <Label htmlFor={key} className="text-[10px] uppercase font-black cursor-pointer">{key.toUpperCase()}</Label>
                  </div>
                ))}
              </div>
            </RetroCard>
            <RetroCard title="V_RAIL_MONITOR" variant="danger">
              <div className="space-y-2 text-[10px] font-mono">
                <div className="flex justify-between"><span>CPU_V:</span> <span className="text-neon-pink">1.12V</span></div>
                <div className="flex justify-between"><span>MEM_V:</span> <span className="text-neon-pink">1.20V</span></div>
                <div className="flex justify-between"><span>BUS_FREQ:</span> <span className="text-neon-pink">133MHz</span></div>
              </div>
            </RetroCard>
          </div>
        </div>
      </div>
    </RetroLayout>
  );
}