import React from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { VersionScanner } from '@/components/version-scanner';
import { RetroTable } from '@/components/ui/retro-table';
import { IOS_VERSION_MATRIX } from '@/lib/version-logic';
import { Layers, AlertTriangle, CheckCircle2, XCircle, Terminal, ExternalLink, Info, ShieldAlert, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
export function MultiBootPage() {
  const riskLevels = [
    { name: 'Data Loss', level: 'HIGH', color: 'text-neon-pink' },
    { name: 'Bootloop', level: 'CRITICAL', color: 'text-neon-pink' },
    { name: 'NAND Wear', level: 'EXTREME', color: 'text-neon-pink' },
    { name: 'Warranty Void', level: 'MAXIMUM', color: 'text-neon-pink' },
  ];
  return (
    <RetroLayout>
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-1">
              <h1 className="text-4xl font-bold retro-glow uppercase tracking-tighter">Multi-Boot Hub</h1>
              <p className="text-xs text-neon-green/60 uppercase">Advanced Systems Acquisition & Partition Control</p>
            </div>
          </div>
          <VersionScanner />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <RetroCard title="MATRIX_OF_THE_VOID" status="VERSION_INTEL">
              <RetroTable
                headers={['VERSION', 'JAILBREAK', 'TROLLSTORE', 'MULTIBOOT', 'RISK']}
                rows={IOS_VERSION_MATRIX.map(v => [
                  <span className="font-bold">{v.version}</span>,
                  <div className="flex items-center gap-2"><div className="size-2 bg-neon-green rounded-full animate-pulse" /> {v.jailbreak}</div>,
                  <div className={v.trollStore === 'NATIVE' ? 'text-neon-pink' : 'text-neon-green'}>{v.trollStore}</div>,
                  <div className="text-[10px] flex items-center gap-1">
                    {v.multiboot}
                    {v.multiboot.includes('KALI') && <AlertTriangle className="size-3 text-neon-pink" />}
                  </div>,
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className={i < v.riskScore ? 'w-2 h-3 bg-neon-pink' : 'w-2 h-3 bg-white/10'} />
                    ))}
                  </div>
                ])}
              />
              <div className="mt-4 p-3 bg-neon-green/5 border border-neon-green/20 flex gap-3 items-start">
                <Info className="size-4 mt-0.5 text-neon-green" />
                <p className="text-[10px] leading-tight opacity-70 uppercase">
                  TrollStore NATIVE (15.0-15.4.1) allows permanent app signing without a persistent jailbreak.
                  Users on 15.5+ must re-jailbreak after reboots to maintain system hooks.
                </p>
              </div>
            </RetroCard>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RetroCard title="KALI_LINUX_ROLLING" variant="danger" status="EXPERIMENTAL">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-neon-pink">
                    <ShieldAlert className="size-4" /> KALI CHROOT (pmOS BASE)
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                    <div className="border border-neon-pink/30 p-1">GUI: ALPHA</div>
                    <div className="border border-neon-pink/30 p-1">WIFI: OTG_REQ</div>
                    <div className="border border-neon-pink/30 p-1">BT: FUNCTIONAL</div>
                    <div className="border border-neon-pink/30 p-1">CHROOT: REQUIRED</div>
                  </div>
                  <p className="text-xs leading-relaxed opacity-80">
                    Full pentesting suite for A1633. Optimized for terminal-based operations. Hardware acceleration for X11 is non-functional.
                  </p>
                  <Link to="/archives/kali-deployment" className="retro-button w-full text-[10px] flex items-center justify-center gap-2 border-neon-pink text-neon-pink shadow-none">
                    <Zap className="size-3" /> DEPLOY_KALI_PROTOCOL
                  </Link>
                </div>
              </RetroCard>
              <RetroCard title="POSTMARKETOS" status="STABLE">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-neon-green">
                    <Terminal className="size-4" /> ALPINE LINUX BASE
                  </div>
                  <p className="text-xs leading-relaxed opacity-80">
                    True mainline Linux support. Aimed at privacy and longevity. Functional WiFi and shell access on A9 silicon.
                  </p>
                  <Link to="/archives/linux-pmos" className="retro-button w-full text-[10px] flex items-center justify-center gap-2">
                    READ_BUILD_GUIDE
                  </Link>
                </div>
              </RetroCard>
            </div>
            <RetroCard title="NAND_LIFESPAN_WARNING" variant="danger" status="CRITICAL">
              <div className="flex gap-4 items-start">
                <div className="animate-pulse bg-neon-pink/20 p-2 border-2 border-neon-pink">
                   <AlertTriangle className="size-8 text-neon-pink" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-neon-pink">Block-Level Degradation Alert</h3>
                  <p className="text-xs leading-snug opacity-90">
                    Running rolling-release distributions like Kali Linux involves high-frequency write cycles and massive swap file usage. This significantly accelerates the death of aging A9 flash storage cells.
                  </p>
                  <div className="text-[10px] uppercase font-bold text-neon-pink bg-neon-pink/10 p-2 border border-neon-pink/30">
                    STATUS: NAND CELLS AT 68% EFFICIENCY (PROJECTED)
                  </div>
                </div>
              </div>
            </RetroCard>
          </div>
          <div className="space-y-6">
            <RetroCard title="PREREQUISITES" status="CHECKING">
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="size-4 mt-1 flex-shrink-0 text-neon-green" />
                  <div>
                    <p className="font-bold">iOS 15.x Base</p>
                    <p className="text-[10px] opacity-60">N71AP Architecture verified.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="size-4 mt-1 flex-shrink-0 text-neon-green" />
                  <div>
                    <p className="font-bold">128GB Storage</p>
                    <p className="text-[10px] opacity-60">Highly recommended for Linux co-habitation.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="size-4 mt-1 flex-shrink-0 text-yellow-400" />
                  <div>
                    <p className="font-bold">OTG Adapter</p>
                    <p className="text-[10px] opacity-60 text-yellow-400">Lightning-to-USB required for network injection.</p>
                  </div>
                </li>
              </ul>
              <Link to="/archives/multiboot-prep" className="retro-button block text-center mt-6 text-xs">
                OPEN_PARTITION_GUIDE
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
            <RetroCard title="PROJECT_SANDCASTLE" status="ALPHA">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-neon-pink">
                    <Layers className="size-4" /> ANDROID 10 (A9)
                  </div>
                  <p className="text-xs leading-relaxed opacity-80">
                    A1633 silicon running Android. Proof of concept for checkm8. GPU acceleration missing.
                  </p>
                  <button className="retro-button w-full text-[10px] flex items-center justify-center gap-2 border-neon-pink text-neon-pink">
                    <ExternalLink className="size-3" /> FETCH_ISO
                  </button>
                </div>
            </RetroCard>
          </div>
        </div>
      </div>
    </RetroLayout>
  );
}