import React, { useState } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { 
  Wifi, Activity, ShieldCheck, Lock, Signal, 
  Terminal, Globe, Copy, ShieldAlert, Zap, Search
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  NETWORK_TOOLS, ETHICAL_DISCLAIMER, 
  MOCK_WIFI_NETWORKS, MOCK_DATA_USAGE 
} from '@shared/extended-data';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
export function NetworkArsenalPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<typeof MOCK_WIFI_NETWORKS>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const handleScan = () => {
    setIsScanning(true);
    setLogs(prev => [...prev, "> INITIALIZING WIFI_PROBE..."]);
    setTimeout(() => {
      setLogs(prev => [...prev, "> CAPTURING BEACON FRAMES..."]);
    }, 800);
    setTimeout(() => {
      setScanResults(MOCK_WIFI_NETWORKS);
      setIsScanning(false);
      setLogs(prev => [...prev, "> SCAN_COMPLETE. 4 NETWORKS DETECTED."]);
      toast.success("WIFI_SCAN_COMPLETE", {
        description: "Surface area mapped successfully.",
        className: "border-neon-green text-neon-green bg-retro-black"
      });
    }, 2500);
  };
  const copyVpnConfig = () => {
    const config = `[Interface]\nPrivateKey = <REDACTED>\nAddress = 10.0.0.2/32\nDNS = 1.1.1.1\n\n[Peer]\nPublicKey = A1633_MASTER_PUB_KEY\nEndpoint = 45.72.11.23:51820\nAllowedIPs = 0.0.0.0/0`;
    navigator.clipboard.writeText(config);
    toast.info("VPN_CONFIG_COPIED", {
      description: "Paste into VPNForge or WireGuard app.",
      style: { background: '#0a0a0a', color: '#d209fa', border: '1px solid #d209fa' }
    });
  };
  return (
    <RetroLayout>
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold retro-glow uppercase tracking-tighter">Network Arsenal</h1>
            <p className="text-xs text-neon-green/60 uppercase">Ethernet, Wireless & Tunneling Operations</p>
          </div>
          <div className="flex items-center gap-2 text-neon-pink font-bold text-[10px] animate-pulse border border-neon-pink px-2 py-1">
            <Activity className="size-3" /> PACKET_STATUS: SNIFFING
          </div>
        </div>
        {/* Ethical Firewall Banner */}
        <RetroCard variant="warning" title="ETHICAL_FIREWALL_PROTOCOL" status="ACTIVE">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <ShieldAlert className="size-12 text-yellow-400 shrink-0" />
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase text-yellow-400">Rules of Engagement</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
                {ETHICAL_DISCLAIMER.map((rule, i) => (
                  <p key={i} className="text-[9px] uppercase opacity-80 leading-tight">
                    {rule}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </RetroCard>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* DataMonitor Module */}
          <div className="lg:col-span-7 space-y-8">
            <RetroCard title="DATAMONITOR_V3" status="LIVE_TELEMETRY">
              <div className="h-64 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MOCK_DATA_USAGE}>
                    <defs>
                      <linearGradient id="colorDown" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00ff41" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00ff41" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorUp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#d209fa" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#d209fa" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#00ff4120" />
                    <XAxis 
                      dataKey="time" 
                      stroke="#00ff4180" 
                      fontSize={10} 
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="#00ff4180" 
                      fontSize={10} 
                      tickLine={false} 
                      unit="MB"
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #00ff41', color: '#00ff41', fontSize: '10px' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="download" 
                      stroke="#00ff41" 
                      fillOpacity={1} 
                      fill="url(#colorDown)" 
                      name="DOWNLOAD"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="upload" 
                      stroke="#d209fa" 
                      fillOpacity={1} 
                      fill="url(#colorUp)" 
                      name="UPLOAD"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="p-2 border border-neon-green/30 bg-black/40 text-center">
                  <div className="text-[8px] uppercase opacity-50">Session_Total</div>
                  <div className="text-sm font-bold">240.4 MB</div>
                </div>
                <div className="p-2 border border-neon-green/30 bg-black/40 text-center">
                  <div className="text-[8px] uppercase opacity-50">Peak_Rate</div>
                  <div className="text-sm font-bold">89.2 MB/s</div>
                </div>
                <div className="p-2 border border-neon-green/30 bg-black/40 text-center">
                  <div className="text-[8px] uppercase opacity-50">Compression</div>
                  <div className="text-sm font-bold text-neon-pink">14.2%</div>
                </div>
              </div>
            </RetroCard>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {NETWORK_TOOLS.slice(0, 2).map((tool) => (
                <RetroCard key={tool.id} title={tool.name} status={tool.status}>
                  <p className="text-xs opacity-80 mb-4 h-10">{tool.desc}</p>
                  <div className="text-[9px] font-mono opacity-50 mb-4">REPO: {tool.repo}</div>
                  <button className="retro-button w-full text-[10px] flex items-center justify-center gap-2">
                    <Globe className="size-3" /> FETCH_PACKAGE
                  </button>
                </RetroCard>
              ))}
            </div>
          </div>
          {/* WiFiScout & VPNForge */}
          <div className="lg:col-span-5 space-y-8">
            <RetroCard title="WIFISCOUT_WARDRIEVER" status={isScanning ? "BUSY" : "READY"}>
              <div className="space-y-4">
                <div className="bg-black/60 border border-neon-green/30 p-3 h-32 overflow-y-auto font-mono text-[10px] space-y-1">
                  {logs.map((log, i) => (
                    <div key={i} className="text-neon-green/70">{log}</div>
                  ))}
                  {isScanning && <div className="animate-pulse">_</div>}
                  {logs.length === 0 && <div className="opacity-30 italic">Awaiting radio initialization...</div>}
                </div>
                <button 
                  onClick={handleScan}
                  disabled={isScanning}
                  className={cn(
                    "retro-button w-full flex items-center justify-center gap-2",
                    isScanning && "opacity-50"
                  )}
                >
                  <Search className="size-4" /> {isScanning ? "PROBING..." : "SCAN_SURROUNDINGS"}
                </button>
                <div className="space-y-2 mt-4">
                  {scanResults.map((net) => (
                    <div key={net.ssid} className="flex items-center justify-between p-2 border border-neon-green/20 bg-neon-green/5 text-[10px] group hover:border-neon-pink transition-colors">
                      <div className="flex items-center gap-3">
                        <Signal className={cn("size-3", net.signal > -50 ? "text-neon-green" : "text-yellow-400")} />
                        <span className="font-bold">{net.ssid}</span>
                      </div>
                      <div className="flex gap-4">
                        <span className="opacity-50">CH: {net.channel}</span>
                        <span className={cn("font-bold", net.pwnability > 80 ? "text-neon-pink" : "text-neon-green")}>
                          PWN_{net.pwnability}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RetroCard>
            <RetroCard title="VPNFORGE_TUNNEL" variant="success" status="ENCRYPTED">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-neon-green">
                  <Lock className="size-6" />
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest">WireGuard Core</div>
                    <div className="text-[9px] opacity-60 uppercase font-mono">Status: Tunnel_Active_0</div>
                  </div>
                </div>
                <div className="bg-black/50 border border-neon-green/30 p-3 font-mono text-[9px] text-neon-green/80 relative">
                  <pre className="overflow-x-auto whitespace-pre">
                    {`[Interface]\nPrivateKey = ************\nAddress = 10.0.0.2/32\n\n[Peer]\nPublicKey = A1633_MASTER_PUB...`}
                  </pre>
                  <button 
                    onClick={copyVpnConfig}
                    className="absolute top-2 right-2 bg-neon-green text-retro-black p-1 hover:opacity-80"
                  >
                    <Copy className="size-3" />
                  </button>
                </div>
                <div className="flex gap-2">
                  <button className="retro-button flex-1 text-[10px] border-neon-pink text-neon-pink shadow-none">
                    STOP_TUNNEL
                  </button>
                  <button className="retro-button flex-1 text-[10px]">
                    ROT_KEYS
                  </button>
                </div>
              </div>
            </RetroCard>
            <div className="p-4 border-2 border-neon-green bg-neon-green/5 flex items-start gap-3">
              <ShieldCheck className="size-5 text-neon-green shrink-0 mt-1" />
              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase">System Integrity</div>
                <p className="text-[9px] opacity-70 uppercase leading-tight italic">
                  All networking traffic is routed via secondary A9 kernel hooks to bypass standard iOS 15 encryption bottlenecks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RetroLayout>
  );
}