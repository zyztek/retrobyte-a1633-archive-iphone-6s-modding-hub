import React, { useState } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { Cpu, Smartphone, Database, Zap, Target, Lock, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { SecretVault } from '@/components/SecretVault';
export function HomePage() {
  const [vaultOpen, setVaultOpen] = useState(false);
  const [asciiClicks, setAsciiClicks] = useState(0);
  const handleBindTerminal = () => {
    toast.success("TERMINAL_LINKED: Secure handshake complete.", {
      description: "A1633 mainframe is now receiving commands.",
      style: {
        background: '#0a0a0a',
        color: '#00ff41',
        border: '1px solid #00ff41'
      }
    });
  };
  const handleAsciiClick = () => {
    const newCount = asciiClicks + 1;
    setAsciiClicks(newCount);
    if (newCount >= 3) {
      setVaultOpen(true);
      setAsciiClicks(0);
      toast.error("WARNING: BREACH DETECTED", {
        description: "Accessing Forbidden_Sector...",
        style: { background: '#7f1d1d', color: '#fff' }
      });
    }
  };
  return (
    <RetroLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <RetroCard title="SYSTEM_OVERVIEW" status="READY" className="relative overflow-hidden">
            <div className="absolute inset-0 bg-neon-green/5 animate-pulse pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold retro-glow tracking-tighter">RETROBYTE A1633</h1>
              <p className="text-lg md:text-xl text-neon-green/80">
                Core mainframe for iPhone 6s modding and legacy preservation. [V1.1.0]
              </p>
              <div
                className="bg-black/40 p-2 md:p-4 border border-neon-green/10 inline-block w-full cursor-help hover:border-neon-pink group transition-colors"
                onClick={handleAsciiClick}
              >
                <pre className="text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] leading-none text-neon-green/40 group-hover:text-neon-pink group-hover:animate-glitch overflow-hidden select-none flex justify-center py-4">
{`        .------------------------.
        | [ ................... ] |
        | [ ................... ] |
        | [      A 1 6 3 3      ] |
        | [ ................... ] |
        | [ ................... ] |
        | [_____________________] |
        |           (_)           |
        '-------------------------'`}
                </pre>
              </div>
              <div className="space-y-2 mt-4">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-neon-green/60">
                  <span>Integrity_Index</span>
                  <span>98.4%</span>
                </div>
                <div className="h-1 w-full bg-neon-green/10 border border-neon-green/20">
                  <div className="h-full bg-neon-green shadow-[0_0_10px_rgba(0,255,65,0.5)]" style={{ width: '98.4%' }} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="border border-neon-green/30 p-3 flex gap-3 items-center bg-retro-black/50">
                  <Cpu className="w-5 h-5 text-neon-green" />
                  <div>
                    <div className="text-[10px] uppercase opacity-50">Processor</div>
                    <div className="text-sm font-bold">Apple A9 (64-bit)</div>
                  </div>
                </div>
                <div className="border border-neon-green/30 p-3 flex gap-3 items-center bg-retro-black/50">
                  <Database className="w-5 h-5 text-neon-green" />
                  <div>
                    <div className="text-[10px] uppercase opacity-50">Memory</div>
                    <div className="text-sm font-bold">2GB LPDDR4</div>
                  </div>
                </div>
              </div>
            </div>
          </RetroCard>
          <RetroCard title="GODMODE_PROFILES" variant="danger">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="size-16 bg-neon-pink/20 flex items-center justify-center border-2 border-neon-pink shadow-[0_0_15px_rgba(210,9,250,0.3)]">
                <Target className="size-10 text-neon-pink animate-pulse" />
              </div>
              <div className="flex-1 space-y-2 text-center md:text-left">
                <h3 className="text-xl font-bold uppercase text-neon-pink">Authority Override Enabled</h3>
                <p className="text-xs opacity-80 uppercase tracking-tighter">
                  One-click mission profiles for automation.
                  Access verified paths for Jailbreak, Multiboot, and Pentesting.
                </p>
                <Link to="/godmode" className="retro-button border-neon-pink text-neon-pink mt-2 inline-block shadow-[4px_4px_0px_rgba(210,9,250,1)] hover:shadow-none">
                  ENTER_GODMODE_HUB
                </Link>
              </div>
            </div>
          </RetroCard>
        </div>
        <div className="space-y-6">
          <RetroCard title="DEVICE_STATS" status="LIVE">
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-neon-green/20 pb-2">
                <span className="opacity-70 uppercase text-[10px]">MAX_OFFICIAL_OS</span>
                <span className="font-bold">iOS 15.8.3</span>
              </div>
              <div className="flex justify-between border-b border-neon-green/20 pb-2">
                <span className="opacity-70 uppercase text-[10px]">JAILBREAK_STATUS</span>
                <span className="text-neon-pink font-bold">COMPATIBLE</span>
              </div>
              <div className="flex justify-between border-b border-neon-green/20 pb-2">
                <span className="opacity-70 uppercase text-[10px]">METHOD</span>
                <span className="font-bold">Paler1n / Checkra1n</span>
              </div>
              <div className="flex justify-between items-center text-neon-pink">
                 <span className="text-[10px] font-bold">VULNERABILITY</span>
                 <Activity className="size-4 animate-pulse" />
              </div>
            </div>
          </RetroCard>
          <RetroCard title="QUICK_ACTIONS">
            <div className="space-y-3">
              <button
                onClick={handleBindTerminal}
                className="retro-button w-full flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" /> BIND_TERMINAL
              </button>
              <Link
                to="/system-lab"
                className="retro-button w-full flex items-center justify-center gap-2 border-yellow-400 text-yellow-400 shadow-[4px_4px_0px_rgba(250,204,21,1)] hover:shadow-none"
              >
                <Database className="w-4 h-4" /> SYSTEM_DIAGS
              </Link>
              <Link
                to="/multiboot"
                className="retro-button w-full flex items-center justify-center gap-2 border-neon-pink text-neon-pink shadow-[4px_4px_0px_rgba(210,9,250,1)] hover:shadow-none"
              >
                <Smartphone className="w-4 h-4" /> SCAN_DEVICE
              </Link>
            </div>
          </RetroCard>
          <RetroCard title="SECURE_VAULT" status="LOCKED">
             <div className="flex items-center gap-3 opacity-30 grayscale">
               <Lock className="size-5" />
               <span className="text-[10px] uppercase font-bold italic">Forbidden data detected. Multi-signature clearance required.</span>
             </div>
          </RetroCard>
        </div>
      </div>
      <SecretVault isOpen={vaultOpen} onClose={() => setVaultOpen(false)} />
    </RetroLayout>
  );
}