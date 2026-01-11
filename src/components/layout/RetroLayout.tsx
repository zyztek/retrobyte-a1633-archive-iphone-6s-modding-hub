import React, { useState, useEffect, useMemo } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { VerboseHUD } from "@/components/ui/verbose-hud";
import { BrandLogo } from "@/components/ui/brand-logo";
interface RetroLayoutProps {
  children: React.ReactNode;
}
export function RetroLayout({ children }: RetroLayoutProps) {
  const [memSeed, setMemSeed] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setMemSeed(prev => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const memAddress = useMemo(() => {
    const base = Math.floor(Math.random() * 0xFFFFFFFF) ^ memSeed;
    return "0x" + (base >>> 0).toString(16).toUpperCase().padStart(8, '0');
  }, [memSeed]);
  const marqueeText = "WARNING: VOIDING WARRANTY IS REVERSIBLE BUT RISKY. PROCEED WITH CAUTION. | A1633 ARCHIVE V1.1.0 | SECURE CONNECTION ESTABLISHED... | EXPLOIT STAGE 2: PAYLOAD_INJECTED | INTEGRITY_CHECK_COMPLETE :: ALL_SYSTEMS_OPERATIONAL | ";
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="crt-overlay opacity-90 pointer-events-none fixed inset-0 z-[9999]" />
      <div className="screen-glow pointer-events-none fixed inset-0 z-[9998] opacity-30 shadow-[inset_0_0_100px_rgba(0,255,65,0.1)]" />
      <LoadingOverlay />
      <VerboseHUD />
      <div className="relative min-h-screen w-full bg-retro-black flex font-mono overflow-hidden">
        <AppSidebar />
        <SidebarInset className="bg-transparent flex flex-col min-h-screen relative overflow-hidden">
          <header className="h-14 md:h-12 border-b-2 border-neon-green flex items-center justify-between px-2 md:px-6 bg-retro-black/95 backdrop-blur-md z-50 flex-nowrap shrink-0">
            <div className="flex items-center gap-1.5 md:gap-4 overflow-hidden min-w-0">
              <SidebarTrigger
                className="text-neon-green hover:bg-neon-green hover:text-retro-black border-2 border-neon-green rounded-none transition-all h-9 w-9 md:h-8 md:w-8 shrink-0 flex items-center justify-center active:scale-95"
                aria-label="Toggle System Menu"
              />
              <BrandLogo size="sm" className="hidden xs:flex shrink-0" />
              <div className="flex items-center gap-2 md:gap-4 leading-none overflow-hidden border-l-2 border-neon-green/20 pl-2 md:pl-4 min-w-0">
                <span className="text-[9px] md:text-xs animate-pulse text-neon-green font-bold shrink-0 whitespace-nowrap">● SYS_UP</span>
                <span className="text-[8px] md:text-[10px] text-neon-pink font-mono opacity-80 truncate max-w-[50px] sm:max-w-none retro-glow">
                  {memAddress}
                </span>
                <div className="hidden sm:flex items-center gap-2 border-l-2 border-neon-green/20 pl-4 shrink-0">
                  <span className="text-[8px] uppercase opacity-50">Build</span>
                  <span className="text-[8px] bg-neon-green text-retro-black px-1 font-bold retro-glow">PASSING</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-6 shrink-0">
              <div className="hidden lg:flex flex-col text-right">
                <span className="text-[8px] uppercase opacity-50 leading-none">Frame_Lock</span>
                <span className="text-[10px] text-neon-green retro-glow leading-none">60.00 FPS</span>
              </div>
              <ThemeToggle className="static" />
              <div className="text-[9px] md:text-xs tabular-nums font-bold border-l-2 border-neon-green/30 pl-2 md:pl-4 whitespace-nowrap">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto overflow-x-hidden relative z-10 scrollbar-thin">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="py-8 md:py-10 lg:py-12">
                {children}
              </div>
            </div>
          </main>
          <footer className="h-10 border-t-2 border-neon-green flex items-center bg-retro-black text-[10px] uppercase tracking-tighter overflow-hidden shrink-0">
            <div className="relative flex w-full h-full items-center">
              <div className="animate-marquee whitespace-nowrap flex items-center h-full will-change-transform">
                <span className="px-8 font-bold text-neon-green/90">{marqueeText}</span>
                <span className="px-8 font-bold text-neon-green/90">{marqueeText}</span>
              </div>
              <div className="absolute right-0 h-full bg-retro-black border-l-2 border-neon-green px-4 flex items-center gap-2 z-20 shadow-[-10px_0_15px_rgba(10,10,10,1)]">
                <BrandLogo size="sm" showText={false} iconClassName="text-neon-pink" />
                <span className="text-[8px] font-black text-neon-pink tracking-widest hidden xs:block retro-glow">SOLUCIONES_646</span>
              </div>
            </div>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}