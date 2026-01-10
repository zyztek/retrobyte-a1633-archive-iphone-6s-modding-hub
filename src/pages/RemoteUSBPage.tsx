import React, { useState } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { RetroProgress } from '@/components/ui/retro-progress';
import { Laptop, Globe, Terminal, ShieldCheck, Zap, Monitor, Network, Copy, ExternalLink, Activity, RefreshCw } from 'lucide-react';
import { REMOTE_OPS_TOOLS, CODESPACES_PROXY_GUIDE } from '@shared/extended-data';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
export function RemoteUSBPage() {
  const [latency, setLatency] = useState(24);
  const [proxyStatus, setProxyStatus] = useState<'IDLE' | 'ACTIVE' | 'ERROR'>('IDLE');
  const [isInitializing, setIsInitializing] = useState(false);
  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    toast.success("CMD_COPIED", { 
      description: "Instruction ready for shell execution.",
      className: "border-neon-green text-neon-green bg-retro-black"
    });
  };
  const handleStartProxy = () => {
    setIsInitializing(true);
    setProxyStatus('IDLE');
    setTimeout(() => {
      setIsInitializing(false);
      setProxyStatus('ACTIVE');
      setLatency(Math.floor(Math.random() * 15) + 12);
      toast.info("PROXY_INITIATED", { 
        description: "Bridge established via socat tunnel.",
        style: { background: '#0a0a0a', color: '#facc15', border: '1px solid #facc15' }
      });
    }, 2000);
  };
  return (
    <RetroLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12 space-y-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-1">
              <h1 className="text-4xl font-bold retro-glow uppercase tracking-tighter flex items-center gap-3">
                <Globe className="size-10 text-neon-green" /> Remote Ops
              </h1>
              <p className="text-xs text-neon-green/60 uppercase font-bold tracking-[0.2em]">Remote System Management & Proxy Orchestration</p>
            </div>
            <div className="flex items-center gap-4">
              <div className={cn(
                "border px-3 py-1 text-[10px] font-bold uppercase flex items-center gap-2 transition-colors",
                proxyStatus === 'ACTIVE' ? "bg-neon-green/10 border-neon-green text-neon-green" : "bg-white/5 border-white/20 text-white/40"
              )}>
                <Activity className={cn("size-3", proxyStatus === 'ACTIVE' && "animate-pulse")} /> 
                {proxyStatus === 'ACTIVE' ? `Latency: ${latency}ms` : 'LINK_OFFLINE'}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <RetroCard title="LIBIMOBILEDEVICE_WORKSTATION" status="READY">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 border-b border-neon-green/20 pb-4">
                    <Laptop className="size-8 text-neon-green" />
                    <div>
                      <h3 className="text-lg font-bold uppercase">Workstation Initialization</h3>
                      <p className="text-[10px] opacity-60 font-bold uppercase">Establish local-to-remote device bridge</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {REMOTE_OPS_TOOLS.slice(0, 2).map((tool) => (
                      <div key={tool.id} className="p-4 border border-neon-green/30 bg-black/40 space-y-3 hover:border-neon-green/60 transition-colors">
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-black text-neon-green">{tool.name}</span>
                          <span className="text-[8px] border border-neon-green/50 px-1">{tool.platform}</span>
                        </div>
                        <p className="text-[10px] opacity-70 leading-tight uppercase font-bold">{tool.description}</p>
                        <div className="bg-black p-2 flex justify-between items-center group border border-neon-green/10">
                          <code className="text-[9px] text-neon-green font-mono truncate mr-2">{tool.command}</code>
                          <button onClick={() => copyCommand(tool.command)} className="opacity-40 group-hover:opacity-100 transition-opacity">
                            <Copy className="size-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </RetroCard>
              <RetroCard title="REMOTE_CONSOLE_CONFIG" variant="danger" status="SECURE">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Monitor className="size-8 text-neon-pink" />
                    <div>
                      <h3 className="text-lg font-bold uppercase text-neon-pink">VNC & SSH Orchestration</h3>
                      <p className="text-[10px] opacity-60 font-bold uppercase">GUI & Terminal Remote Control</p>
                    </div>
                  </div>
                  <div className="p-4 bg-neon-pink/5 border border-neon-pink/20 space-y-4">
                    <div className="flex items-center justify-between text-xs font-bold uppercase">
                      <span>Credentials: Alpine / root</span>
                      <span className="text-neon-pink animate-pulse">! SECURITY_ALERT</span>
                    </div>
                    <p className="text-[10px] opacity-80 leading-relaxed uppercase">
                      Veency enables an unencrypted VNC server. <span className="text-neon-pink font-bold">WARNING:</span> Transmitting credentials over public WiFi will result in total system compromise. 
                      Always tunnel VNC through an SSH bridge ($ ssh -L 5900:localhost:5900 root@ip) or use a secure VPN tunnel.
                    </p>
                    <button className="retro-button w-full border-neon-pink text-neon-pink shadow-[4px_4px_0px_rgba(210,9,250,1)] hover:shadow-none transition-all">
                      INITIALIZE_REMOTE_MIRROR
                    </button>
                  </div>
                </div>
              </RetroCard>
            </div>
            <div className="lg:col-span-4 space-y-8">
              <RetroCard title="CODESPACES_PROXY" variant="warning" status={isInitializing ? "BOOTING" : proxyStatus}>
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-yellow-400">
                    <Network className="size-8" />
                    <div className="text-[10px] font-bold uppercase tracking-widest">socat Port Bridge</div>
                  </div>
                  <div className="space-y-4">
                    {CODESPACES_PROXY_GUIDE.steps.map((step, i) => (
                      <div key={i} className="flex gap-3 items-start group">
                        <span className="text-yellow-400 font-black shrink-0">0{i + 1}</span>
                        <div className="flex-1">
                          <p className="text-[9px] font-bold uppercase opacity-80 mb-1">{step.split(':')[0]}</p>
                          <div className="bg-black p-1.5 border border-yellow-400/20 text-[8px] font-mono text-yellow-400 flex justify-between items-center">
                            <code className="truncate mr-1">{step.split(': ')[1] || step}</code>
                            <button onClick={() => copyCommand(step.split(': ')[1] || step)} className="opacity-40 group-hover:opacity-100 transition-opacity">
                              <Copy className="size-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <RetroProgress 
                      current={proxyStatus === 'ACTIVE' ? 100 : (isInitializing ? 50 : 0)} 
                      max={100} 
                      label="PROXY_STABILITY" 
                      variant="yellow" 
                      isIndeterminate={isInitializing} 
                    />
                  </div>
                  <button
                    onClick={handleStartProxy}
                    disabled={proxyStatus === 'ACTIVE' || isInitializing}
                    className={cn(
                      "retro-button w-full border-yellow-400 text-yellow-400 flex items-center justify-center gap-2 shadow-[4px_4px_0px_rgba(250,204,21,1)] hover:shadow-none",
                      (proxyStatus === 'ACTIVE' || isInitializing) && "opacity-50"
                    )}
                  >
                    {isInitializing ? <RefreshCw className="size-4 animate-spin" /> : <Zap className="size-4" />}
                    {proxyStatus === 'ACTIVE' ? 'BRIDGE_OPERATIONAL' : 'START_SOCAT_BRIDGE'}
                  </button>
                </div>
              </RetroCard>
              <RetroCard title="SYSTEM_INTEGRITY_CHECK" variant="success">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="size-6 text-emerald-400" />
                    <span className="text-[10px] font-bold uppercase">Security_Validation</span>
                  </div>
                  <p className="text-[9px] opacity-70 leading-tight uppercase font-bold">
                    All remote connections must be verified against the local MD5 identity of the N71AP hardware.
                  </p>
                  <div className="text-xs font-mono font-black text-emerald-400 text-center py-2 border border-emerald-400/30 bg-emerald-400/5">
                    ID: 0x41633_SECURE
                  </div>
                </div>
              </RetroCard>
            </div>
          </div>
        </div>
      </div>
    </RetroLayout>
  );
}