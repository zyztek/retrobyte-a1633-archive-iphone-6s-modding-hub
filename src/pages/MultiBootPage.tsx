import React from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { Layers, AlertTriangle, CheckCircle2, XCircle, Terminal, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
export function MultiBootPage() {
  const riskLevels = [
    { name: 'Data Loss', level: 'HIGH', color: 'text-neon-pink' },
    { name: 'Bootloop', level: 'CRITICAL', color: 'text-neon-pink' },
    { name: 'Hardware Wear', level: 'MEDIUM', color: 'text-yellow-400' },
    { name: 'Warranty Void', level: 'MAXIMUM', color: 'text-neon-pink' },
  ];
  return (
    <RetroLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold retro-glow uppercase tracking-tighter">Multi-Boot Hub</h1>
            <p className="text-xs text-neon-green/60 uppercase">Advanced Systems Acquisition</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Prerequisites */}
          <div className="space-y-6">
            <RetroCard title="PREREQUISITES" status="CHECKING">
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="size-4 mt-1 flex-shrink-0 text-neon-green" />
                  <div>
                    <p className="font-bold">iOS 15.8.3 Base</p>
                    <p className="text-[10px] opacity-60">Latest signed firmware installed.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="size-4 mt-1 flex-shrink-0 text-neon-green" />
                  <div>
                    <p className="font-bold">Paler1n / Checkra1n</p>
                    <p className="text-[10px] opacity-60">Bootstrap environment active.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="size-4 mt-1 flex-shrink-0 text-yellow-400" />
                  <div>
                    <p className="font-bold">64GB+ Storage</p>
                    <p className="text-[10px] opacity-60 text-yellow-400">Recommended for partition splitting.</p>
                  </div>
                </li>
              </ul>
              <Link to="/archives/paler1n-guide" className="retro-button block text-center mt-6 text-xs">
                GO_TO_BOOTSTRAP_ARCHIVES
              </Link>
            </RetroCard>
            <RetroCard title="RISK_MATRIX" variant="danger">
              <div className="space-y-3">
                {riskLevels.map((risk) => (
                  <div key={risk.name} className="flex justify-between items-center border-b border-neon-pink/20 pb-1">
                    <span className="text-[10px] uppercase opacity-70">{risk.name}</span>
                    <span className={`text-xs font-bold ${risk.color}`}>{risk.level}</span>
                  </div>
                ))}
              </div>
            </RetroCard>
          </div>
          {/* OS Selection */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RetroCard title="PROJECT_SANDCASTLE" status="ALPHA">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-neon-pink">
                    <Layers className="size-4" /> ANDROID 10 (Modified)
                  </div>
                  <p className="text-xs leading-relaxed opacity-80">
                    A1633 silicon running Android. Proof of concept for checkm8 exploits.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-[10px] uppercase">
                    <div className="bg-neon-green/10 p-1 border border-neon-green/20">CPU: OK</div>
                    <div className="bg-neon-pink/10 p-1 border border-neon-pink/20">GPU: FAIL</div>
                    <div className="bg-neon-green/10 p-1 border border-neon-green/20">USB: OK</div>
                    <div className="bg-neon-pink/10 p-1 border border-neon-pink/20">BT: FAIL</div>
                  </div>
                  <button className="retro-button w-full text-[10px] flex items-center justify-center gap-2">
                    <ExternalLink className="size-3" /> FETCH_SANDCASTLE_ISO
                  </button>
                </div>
              </RetroCard>
              <RetroCard title="POSTMARKETOS" status="STABLE">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-neon-green">
                    <Terminal className="size-4" /> ALPINE LINUX BASE
                  </div>
                  <p className="text-xs leading-relaxed opacity-80">
                    True mainline Linux support. Aimed at privacy and longevity.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-[10px] uppercase">
                    <div className="bg-neon-green/10 p-1 border border-neon-green/20">SHELL: OK</div>
                    <div className="bg-neon-green/10 p-1 border border-neon-green/20">WIFI: OK</div>
                    <div className="bg-neon-green/10 p-1 border border-neon-green/20">FS: OK</div>
                    <div className="bg-neon-pink/10 p-1 border border-neon-pink/20">AUDIO: FAIL</div>
                  </div>
                  <Link to="/archives/linux-pmos" className="retro-button w-full text-[10px] flex items-center justify-center gap-2">
                    READ_BUILD_GUIDE
                  </Link>
                </div>
              </RetroCard>
            </div>
            <RetroCard title="THE_FORBIDDEN_ENTRY" variant="warning">
              <div className="flex items-start gap-4">
                <XCircle className="size-8 text-yellow-400 flex-shrink-0" />
                <div className="space-y-2">
                  <h3 className="font-bold text-yellow-400 uppercase italic">Windows 11 Impossibility</h3>
                  <p className="text-xs leading-relaxed opacity-80">
                    Architecture Mismatch: A9 lacks ARMv8.1 mandatory instructions for Windows kernels. 
                    No active UEFI implementation exists for N71AP hardware. 
                    Deployment attempts result in permanent hardware state desync.
                  </p>
                  <div className="text-[10px] opacity-60 uppercase">
                    Reason: [ARCH_DRIVER_MISMATCH] | Status: [PERMANENT_FAIL]
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