import React, { useState } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { Wifi, Activity, ShieldCheck, Lock, Signal, Globe, Copy, ShieldAlert, Search, Usb, Map } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { NETWORK_TOOLS, ETHICAL_DISCLAIMER, MOCK_WIFI_NETWORKS, MOCK_DATA_USAGE } from '@shared/extended-data';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
export function NetworkArsenalPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [isProbingUSB, setIsProbingUSB] = useState(false);
  const [scanResults, setScanResults] = useState<typeof MOCK_WIFI_NETWORKS>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const handleScan = () => {
    setIsScanning(true);
    setLogs(prev => [...prev, "> INITIALIZING WIFI_PROBE_GRID..."]);
    setTimeout(() => {
      setScanResults(MOCK_WIFI_NETWORKS);
      setIsScanning(false);
      setLogs(prev => [...prev, "> SCAN_COMPLETE. SURFACE_MAPPED."]);
      toast.success("WIFI_SCAN_COMPLETE");
    }, 2500);
  };
  const handleUSBProbe = () => {
    setIsProbingUSB(true);
    setTimeout(() => {
      setIsProbingUSB(false);
      toast.info("EXTERNAL_CHIPSET_DETECTED", { description: "MT7601U (High Gain) found on OTG link." });
    }, 1500);
  };
  return (
    <RetroLayout>
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold retro-glow uppercase tracking-tighter">Network Arsenal</h1>
            <p className="text-xs text-neon-green/60 uppercase tracking-widest">RF_Warfare & Onion_Sim operations</p>
          </div>
          <button onClick={handleUSBProbe} disabled={isProbingUSB} className="retro-button flex gap-2 items-center text-[10px]">
            <Usb className={cn("size-3", isProbingUSB && "animate-spin")} /> WEBUSB_PROBE_OTG
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-8">
            <RetroCard title="DATAMONITOR_LIVE" status="ENCRYPTED">
              <div className="h-64 w-full mt-4 bg-black/20">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MOCK_DATA_USAGE}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#00ff4115" vertical={false} />
                    <XAxis dataKey="time" stroke="#00ff4180" fontSize={9} />
                    <YAxis stroke="#00ff4180" fontSize={9} unit="MB" />
                    <Tooltip contentStyle={{ backgroundColor: '#0a0a0a', border: '2px solid #00ff41', color: '#00ff41', fontSize: '10px' }} />
                    <Area type="stepAfter" dataKey="download" stroke="#00ff41" fill="#00ff4120" name="DOWNLOAD" />
                    <Area type="stepAfter" dataKey="upload" stroke="#d209fa" fill="#d209fa10" name="UPLOAD" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="p-3 border border-neon-green/30 bg-black/60">
                  <div className="text-[8px] uppercase opacity-50 mb-1">Session_Total</div>
                  <div className="text-sm font-bold text-neon-green">240.4 MB</div>
                </div>
                <div className="p-3 border border-neon-green/30 bg-black/60">
                  <div className="text-[8px] uppercase opacity-50 mb-1">Peak_Rate</div>
                  <div className="text-sm font-bold text-neon-green">89.2 MB/s</div>
                </div>
                <div className="p-3 border border-neon-pink/30 bg-neon-pink/5">
                  <div className="text-[8px] uppercase font-bold text-neon-pink/60 mb-1">Onion_Mirror</div>
                  <div className="text-sm font-bold text-neon-pink">CONNECTED</div>
                </div>
              </div>
            </RetroCard>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RetroCard title="VPNFORGE_ONION" variant="success" status="TUNNEL_ACTIVE">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-neon-green">
                    <Globe className="size-6" />
                    <div className="text-[10px] font-black uppercase tracking-widest">Tor_Bridge_A1633</div>
                  </div>
                  <div className="text-[9px] font-mono text-neon-green/60 p-2 border border-neon-green/20 bg-black/50">
                    ADDR: n71ap_archive.onion<br/>
                    ENTRY: 45.12.8.99:9050<br/>
                    RELAYS: 3_ACTIVE
                  </div>
                  <button className="retro-button w-full text-[10px]">ROT_ONION_CIRCUIT</button>
                </div>
              </RetroCard>
              <RetroCard title="WIFI_HEATMAP" status="MAPPING">
                <div className="grid grid-cols-5 gap-1 h-32">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div key={i} className={cn(
                      "border border-neon-green/20 transition-all duration-1000",
                      Math.random() > 0.8 ? "bg-neon-pink/40" : 
                      Math.random() > 0.4 ? "bg-neon-green/20" : "bg-transparent"
                    )} />
                  ))}
                </div>
                <div className="text-[8px] font-bold text-neon-green/40 mt-2 uppercase flex justify-between">
                  <span>Packet_Density</span>
                  <Map className="size-3" />
                </div>
              </RetroCard>
            </div>
          </div>
          <div className="lg:col-span-5 space-y-8">
            <RetroCard title="WIFISCOUT_WAR_SCAN" status={isScanning ? "PROBING" : "IDLE"}>
              <div className="space-y-4">
                <div className="bg-black/80 border border-neon-green/30 p-3 h-32 font-mono text-[9px] text-neon-green/80 overflow-y-auto">
                  {logs.map((log, i) => <div key={i}>{log}</div>)}
                  {isScanning && <div className="animate-pulse">_</div>}
                </div>
                <button onClick={handleScan} disabled={isScanning} className="retro-button w-full flex items-center justify-center gap-2">
                  <Search className="size-4" /> {isScanning ? "SURVEYING_AREA..." : "START_WAR_DRIVE"}
                </button>
                <div className="space-y-2 pt-2 h-48 overflow-y-auto scrollbar-thin">
                  {scanResults.map((net) => (
                    <div key={net.ssid} className="flex items-center justify-between p-2 border border-neon-green/20 bg-neon-green/5 text-[10px] hover:border-neon-pink hover:bg-neon-pink/10 transition-all cursor-crosshair">
                      <div className="flex items-center gap-2">
                        <Signal className={cn("size-3", net.signal > -50 ? "text-neon-green" : "text-yellow-400")} />
                        <span className="font-black truncate w-24">{net.ssid}</span>
                      </div>
                      <div className="flex gap-3 font-mono">
                        <span className="opacity-40">CH:{net.channel}</span>
                        <span className={cn(net.pwnability > 80 ? "text-neon-pink" : "text-neon-green")}>P:{net.pwnability}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RetroCard>
            <RetroCard title="ETHICAL_FIREWALL" variant="warning">
              <div className="space-y-2">
                {ETHICAL_DISCLAIMER.slice(0, 3).map((d, i) => (
                  <div key={i} className="flex gap-2 text-[9px] font-bold uppercase text-yellow-400 opacity-80 leading-tight">
                    <ShieldCheck className="size-3 shrink-0" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </RetroCard>
          </div>
        </div>
      </div>
    </RetroLayout>
  );
}