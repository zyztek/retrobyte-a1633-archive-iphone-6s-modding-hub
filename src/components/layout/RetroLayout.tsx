import React, { useState, useEffect, useMemo } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { VerboseHUD } from "@/components/ui/verbose-hud";
import { BrandLogo } from "@/components/ui/brand-logo";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAcademyStore } from "@/store/academy-store";
import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";
interface RetroLayoutProps {
  children: React.ReactNode;
}
export function RetroLayout({ children }: RetroLayoutProps) {
  const [memSeed, setMemSeed] = useState(0);
  const xp = useAcademyStore(s => s.xp);
  const setSingularityMode = useUIStore(s => s.setSingularityMode);
  const isSingularityMode = useUIStore(s => s.isSingularityMode);
  const isEternityMode = useUIStore(s => s.isEternityMode);
  const isOCAbyss = useUIStore(s => s.isOCAbyss);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    setIsLargeScreen(window.innerWidth >= 1024);
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setMemSeed(prev => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (xp >= 2500 && !isSingularityMode) {
      setSingularityMode(true);
    } else if (xp < 2500 && isSingularityMode) {
      setSingularityMode(false);
    }
  }, [xp, isSingularityMode, setSingularityMode]);
  const memAddress = useMemo(() => {
    const base = Math.floor(Math.random() * 0xFFFFFFFF) ^ memSeed;
    return "0x" + (base >>> 0).toString(16).toUpperCase().padStart(8, '0');
  }, [memSeed]);
  const marqueeText = isSingularityMode
    ? "VOIDING_ALL_DATA_RESTRICTIONS :: APOCALYPSE_PROTOCOL_4163 :: SINGULARITY_LOCK_ENGAGED :: WELCOME_TO_THE_ABYSS :: NO_MERCY_FOR_LEGACY_CODE :: "
    : "A1633 ARCHIVE V1.2.0 | GPRS_LINK: ACTIVE | CH_BUS: 133mhz | PAYLOAD_INJECTED | SOLUCIONES_646_SINGULARITY | ";
  return (
    <TooltipProvider delayDuration={400}>
      <SidebarProvider defaultOpen={isLargeScreen}>
        {/* Apocalypse Noise Background Layer */}
        {isSingularityMode && (
          <div className="fixed inset-0 z-[-1] pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
        )}
        <div className={cn(
          "crt-overlay pointer-events-none fixed inset-0 z-[9999] transition-all duration-700",
          isSingularityMode ? "opacity-100 animate-crt-flicker" : "opacity-90"
        )} />
        <div className={cn(
          "screen-glow pointer-events-none fixed inset-0 z-[9998] transition-all duration-1000",
          isSingularityMode ? "opacity-60 shadow-[inset_0_0_200px_rgba(210,9,250,0.4)]" : "opacity-30 shadow-[inset_0_0_120px_rgba(0,255,65,0.15)]"
        )} />
        <LoadingOverlay />
        <VerboseHUD />
        <div className="relative min-h-screen w-full bg-retro-black flex font-mono overflow-hidden">
          <AppSidebar />
          <SidebarInset className={cn(
            "bg-transparent flex flex-col min-h-screen relative transition-all duration-1000",
            isSingularityMode ? "hue-rotate-15 saturate-[1.5]" : ""
          )}>
            <header className={cn(
              "h-14 md:h-16 border-b-2 flex items-center justify-between px-4 md:px-8 bg-retro-black/95 backdrop-blur-lg z-50 transition-colors duration-1000",
              isSingularityMode ? "border-neon-pink shadow-[0_4px_20px_rgba(210,9,250,0.2)]" : "border-neon-green shadow-[0_4px_20px_rgba(0,255,65,0.1)]"
            )}>
              <div className="flex items-center gap-4 min-w-0">
                <SidebarTrigger className={cn("rounded-none transition-all", isSingularityMode ? "text-neon-pink border-neon-pink" : "text-neon-green border-neon-green")} />
                <BrandLogo size="md" className="shrink-0" iconClassName={isSingularityMode ? "text-neon-pink" : ""} />
                <div className={cn("hidden sm:flex items-center gap-6 border-l-2 pl-4 transition-colors", isSingularityMode ? "border-neon-pink/30" : "border-neon-green/20")}>
                  <span className={cn("text-[10px] animate-pulse font-black", isSingularityMode ? "text-neon-pink" : "text-neon-green")}>● {isSingularityMode ? "ABYSS_SYNC" : "SYS_UP"}</span>
                  <span className={cn("text-[10px] font-mono", isSingularityMode ? "text-neon-pink" : "text-neon-pink/80")}>{memAddress}</span>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="hidden lg:flex flex-col text-right">
                   <span className="text-[8px] opacity-50 font-black">SYNC_DEPTH</span>
                   <span className={cn("text-[11px] font-bold", isSingularityMode ? "text-neon-pink" : "text-neon-green")}>{xp} XP</span>
                </div>
                <ThemeToggle className="static" />
                <div className={cn("text-[10px] md:text-sm tabular-nums font-black border-l-2 pl-4", isSingularityMode ? "text-neon-pink border-neon-pink/30" : "text-neon-green border-neon-green/30")}>
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
                </div>
              </div>
            </header>
            <main className="flex-1 overflow-y-auto overflow-x-hidden relative z-10 scrollbar-thin">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="py-8 md:py-10 lg:py-12">
                  {children}
                </div>
              </div>
            </main>
            <footer className={cn("h-12 border-t-2 flex items-center bg-retro-black text-[11px] uppercase overflow-hidden shrink-0 transition-colors", isSingularityMode ? "border-neon-pink" : "border-neon-green")}>
              <div className="relative flex w-full h-full items-center">
                <div className="whitespace-nowrap flex items-center h-full animate-marquee" style={{ animationDuration: isSingularityMode ? '15s' : '30s' }}>
                  <span className={cn("px-12 font-black", isSingularityMode ? "text-neon-pink pink-glow" : "text-neon-green/90")}>{marqueeText}</span>
                  <span className={cn("px-12 font-black", isSingularityMode ? "text-neon-pink pink-glow" : "text-neon-green/90")}>{marqueeText}</span>
                </div>
                <div className={cn("absolute right-0 h-full bg-retro-black border-l-2 px-6 flex items-center gap-4 z-20", isSingularityMode ? "border-neon-pink shadow-[-20px_0_40px_rgba(210,9,250,0.5)]" : "border-neon-green")}>
                   <BrandLogo size="sm" showText={false} iconClassName={isSingularityMode ? "text-neon-pink" : "text-neon-green"} />
                   <span className={cn("text-[10px] font-black tracking-widest hidden xs:block", isSingularityMode ? "text-white" : "text-neon-pink")}>SOLUCIONES_646</span>
                </div>
              </div>
            </footer>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}