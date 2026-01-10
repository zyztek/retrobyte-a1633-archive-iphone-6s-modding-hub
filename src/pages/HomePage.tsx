import React from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { Cpu, Smartphone, Database, Zap } from 'lucide-react';
export function HomePage() {
  return (
    <RetroLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <RetroCard title="SYSTEM_OVERVIEW" status="READY">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold retro-glow">RETROBYTE A1633</h1>
              <p className="text-xl text-neon-green/80">
                Core mainframe for iPhone 6s modding and legacy preservation.
              </p>
              <pre className="text-[10px] leading-none text-neon-green/40 mt-4 overflow-hidden select-none">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="border border-neon-green/30 p-3 flex gap-3 items-center">
                  <Cpu className="w-5 h-5" />
                  <div>
                    <div className="text-[10px] uppercase opacity-50">Processor</div>
                    <div className="text-sm">Apple A9 (64-bit)</div>
                  </div>
                </div>
                <div className="border border-neon-green/30 p-3 flex gap-3 items-center">
                  <Database className="w-5 h-5" />
                  <div>
                    <div className="text-[10px] uppercase opacity-50">Memory</div>
                    <div className="text-sm">2GB LPDDR4</div>
                  </div>
                </div>
              </div>
            </div>
          </RetroCard>
          <RetroCard title="ARCHIVE_LOG" className="font-mono text-sm">
            <div className="space-y-2">
              <div className="flex gap-2">
                <span className="text-neon-pink">[08:22:11]</span>
                <span>Initializing boot sequence...</span>
              </div>
              <div className="flex gap-2">
                <span className="text-neon-pink">[08:22:12]</span>
                <span>Detected iPhone 6s (N71AP/N71mAP).</span>
              </div>
              <div className="flex gap-2 text-neon-pink">
                <span className="animate-pulse">_</span>
                <span>Awaiting user command...</span>
              </div>
            </div>
          </RetroCard>
        </div>
        <div className="space-y-6">
          <RetroCard title="DEVICE_STATS" status="LIVE">
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-neon-green/20 pb-2">
                <span className="opacity-70">MAX_OFFICIAL_OS</span>
                <span className="font-bold">iOS 15.8.3</span>
              </div>
              <div className="flex justify-between border-b border-neon-green/20 pb-2">
                <span className="opacity-70">JAILBREAK_STATUS</span>
                <span className="text-neon-pink font-bold">COMPATIBLE</span>
              </div>
              <div className="flex justify-between border-b border-neon-green/20 pb-2">
                <span className="opacity-70">METHOD</span>
                <span>Paler1n / Checkra1n</span>
              </div>
            </div>
          </RetroCard>
          <RetroCard title="QUICK_ACTIONS">
            <div className="space-y-3">
              <button className="retro-button w-full flex items-center justify-center gap-2">
                <Zap className="w-4 h-4" /> BIND_TERMINAL
              </button>
              <button className="retro-button w-full flex items-center justify-center gap-2 border-neon-pink text-neon-pink shadow-neon-pink">
                <Smartphone className="w-4 h-4" /> SCAN_DEVICE
              </button>
            </div>
          </RetroCard>
        </div>
      </div>
    </RetroLayout>
  );
}