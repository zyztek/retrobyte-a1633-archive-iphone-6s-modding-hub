import React, { useState, useEffect, useMemo } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { VerboseHUD } from "@/components/ui/verbose-hud";
import { BrandLogo } from "@/components/ui/brand-logo";
import { TooltipProvider } from "@/components/ui/tooltip";
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
  const marqueeText = "WARNING: VOIDING WARRANTY IS REVERSIBLE BUT RISKY. PROCEED WITH CAUTION. | A1633 ARCHIVE V1.1.0 | GPRS_LINK: ACTIVE | CH_BUS: 133mhz | PAYLOAD_INJECTED | INTEGRITY_CHECK_COMPLETE :: ALL_SYSTEMS_OPERATIONAL | SOLUCIONES_646_SINGULARITY | ";
  return (
    <TooltipProvider delayDuration={400}>
      <SidebarProvider defaultOpen={true}>
        <div className="crt-overlay opacity-90 pointer-events-none fixed inset-0 z-[9999]" />
        <div className="screen-glow pointer-events-none fixed inset-0 z-[9998] opacity-30 shadow-[inset_0_0_120px_rgba(0,255,65,0.15)]" />
        <LoadingOverlay />
        <VerboseHUD />
        <div className="relative min-h-screen w-full bg-retro-black flex font-mono overflow-hidden">
          <AppSidebar />
          <SidebarInset className="bg-transparent flex flex-col min-h-screen relative overflow-hidden">
            <header className="h-14 md:h-16 border-b-2 border-neon-green flex items-center justify-between px-4 md:px-8 bg-retro-black/95 backdrop-blur-lg z-50 flex-nowrap shrink-0">
              <div className="flex items-center gap-4 overflow-hidden min-w-0">
                <div className="relative">
                  <SidebarTrigger
                    className="text-neon-green hover:bg-neon-green hover:text-retro-black border-2 border-neon-green rounded-none transition-all h-10 w-10 shrink-0 flex items-center justify-center active:scale-95 shadow-[4px_4px_0px_rgba(0,255,65,0.3)]"
                    aria-label="Toggle System Menu"
                  />
                  <span className="absolute -top-1 -right-1 size-3 bg-neon-pink border border-white animate-pulse rounded-full hidden xs:block" />
                </div>
                <BrandLogo size="lg" className="hidden sm:flex shrink-0" />
                <BrandLogo size="md" className="flex sm:hidden shrink-0" />
                <div className="flex items-center gap-2 md:gap-6 leading-none overflow-hidden border-l-2 border-neon-green/20 pl-4 md:pl-8 min-w-0">
                  <span className="text-[10px] md:text-xs animate-pulse text-neon-green font-black shrink-0 whitespace-nowrap retro-glow">● SYS_UP</span>
                  <span className="text-[10px] md:text-xs text-neon-pink font-mono opacity-90 truncate retro-glow italic">
                    {memAddress}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 md:gap-8 shrink-0">
                <div className="hidden lg:flex flex-col text-right">
                  <span className="text-[8px] uppercase opacity-50 leading-none font-black">Frame_Lock</span>
                  <span className="text-[11px] text-neon-green retro-glow leading-none font-bold">60.00 FPS</span>
                </div>
                <ThemeToggle className="static" />
                <div className="text-[10px] md:text-sm tabular-nums font-black border-l-2 border-neon-green/30 pl-4 md:pl-8 whitespace-nowrap retro-glow">
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
            <footer className="h-12 border-t-2 border-neon-green flex items-center bg-retro-black text-[11px] uppercase tracking-tighter overflow-hidden shrink-0">
              <div className="relative flex w-full h-full items-center">
                <div className="animate-marquee whitespace-nowrap flex items-center h-full will-change-transform">
                  <span className="px-12 font-black text-neon-green/90 retro-glow">{marqueeText}</span>
                  <span className="px-12 font-black text-neon-green/90 retro-glow">{marqueeText}</span>
                </div>
                <div className="absolute right-0 h-full bg-retro-black border-l-2 border-neon-green px-6 flex items-center gap-4 z-20 shadow-[-20px_0_30px_rgba(10,10,10,1)]">
                  <BrandLogo size="sm" showText={false} iconClassName="text-neon-pink brand-glow" />
                  <span className="text-[10px] font-black text-neon-pink tracking-[0.2em] hidden xs:block pink-glow">SOLUCIONES_646</span>
                </div>
              </div>
            </footer>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}