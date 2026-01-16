import React, { useState } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { NANDDoctor } from '@/components/nand-doctor';
import { FlaskConical, Hammer, Terminal, ShieldAlert, Copy, Database, Zap, Cpu, Battery, Activity } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
export function SystemLabPage() {
  const [patches, setPatches] = useState({
    noLimit: true,
    overclock: false,
    kppBypass: true,
    hypervisor: false
  });
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
            <RetroCard title="BATTERY_FORGE" status="LIVE_VOLTAGE">
              <div className="h-64 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={batteryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#00ff4120" />
                    <XAxis dataKey="hour" stroke="#00ff41" fontSize={10} />
                    <YAxis domain={[3, 4.2]} stroke="#00ff41" fontSize={10} />
                    <Tooltip contentStyle={{ background: '#000', border: '1px solid #00ff41', color: '#00ff41' }} />
                    <Area type="monotone" dataKey="volt" stroke="#d209fa" fill="#d209fa20" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="border border-neon-green/30 p-4">
                  <div className="text-[10px] font-black uppercase opacity-60 mb-2">Powercuff Mixer</div>
                  <input type="range" className="w-full accent-neon-pink" />
                </div>
                <div className="border border-neon-green/30 p-4 flex items-center gap-3">
                  <Battery className="size-6 text-neon-pink" />
                  <div>
                    <div className="text-[10px] font-black uppercase">Health: 84%</div>
                    <div className="text-[8px] opacity-50">PROJ_LIFESPAN: 14M</div>
                  </div>
                </div>
              </div>
            </RetroCard>
            <RetroCard title="HARDWARE_MAPPING" status="BGA110_PROBE">
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div key={i} className="aspect-square border border-neon-green/30 flex items-center justify-center text-[8px] hover:bg-neon-green hover:text-black transition-all cursor-crosshair">
                    P{i.toString(16).toUpperCase()}
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-neon-green/5 border border-neon-green/20 text-[9px] uppercase font-bold italic">
                Cross-reference BGA110 pinouts with JC-P7 UART commands for raw NAND interaction.
              </div>
            </RetroCard>
          </div>
          <div className="lg:col-span-4 space-y-8">
            <RetroCard title="ROM_FOUNDRY" variant="warning" status="COMPILING">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-yellow-400">
                  <Hammer className="size-4" /> ISO_BUILDER_v1
                </div>
                <div className="space-y-3">
                  {['PostmarketOS', 'Kali_ARM64', 'Ubuntu_Touch'].map(os => (
                    <div key={os} className="flex items-center justify-between p-2 border border-yellow-400/20">
                      <span className="text-[10px] font-bold uppercase">{os}</span>
                      <button className="p-1 border border-yellow-400 text-yellow-400"><Database className="size-3" /></button>
                    </div>
                  ))}
                </div>
                <button className="retro-button w-full border-yellow-400 text-yellow-400 shadow-none">START_COMPILATION</button>
              </div>
            </RetroCard>
            <RetroCard title="KERNEL_PATCHER" status="MODIFIED">
              <div className="space-y-4">
                {(Object.keys(patches) as Array<keyof typeof patches>).map((key) => (
                  <div key={key} className="flex items-center space-x-3">
                    <Checkbox
                      id={key}
                      checked={patches[key]}
                      onCheckedChange={() => setPatches(p => ({...p, [key]: !patches[key]}))}
                      className="border-neon-green rounded-none"
                    />
                    <Label htmlFor={key} className="text-[10px] uppercase font-black cursor-pointer">
                      {key.toUpperCase()}
                    </Label>
                  </div>
                ))}
              </div>
            </RetroCard>
            <RetroCard title="LIVE_ANALYTICS" variant="danger">
              <div className="space-y-2 text-[10px] font-mono">
                <div className="flex justify-between"><span>CPU_LOAD:</span> <span className="text-neon-pink">12.4%</span></div>
                <div className="flex justify-between"><span>BUS_FREQ:</span> <span className="text-neon-pink">133MHz</span></div>
                <div className="flex justify-between"><span>THROTTLE:</span> <span className="text-neon-pink">NONE</span></div>
              </div>
            </RetroCard>
          </div>
        </div>
      </div>
    </RetroLayout>
  );
}