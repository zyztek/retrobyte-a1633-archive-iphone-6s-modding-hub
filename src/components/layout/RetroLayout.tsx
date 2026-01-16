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
  useEffect(() => {
    const interval = setInterval(() => {
      setMemSeed(prev => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    // Enable Singularity mode at 2500 XP threshold
    if (xp >= 2500 && !isSingularityMode) {
      setSingularityMode(true);
    } else if (xp < 2500 && isSingularityMode) {
      // Allow manual or reset-based toggle off if XP drops
      setSingularityMode(false);
    }
  }, [xp, isSingularityMode, setSingularityMode]);
  const memAddress = useMemo(() => {
    const base = Math.floor(Math.random() * 0xFFFFFFFF) ^ memSeed;
    return "0x" + (base >>> 0).toString(16).toUpperCase().padStart(8, '0');
  }, [memSeed]);
  const marqueeText = isSingularityMode 
    ? "SYSTEM_SINGULARITY_REACHED :: VOIDING_ALL_RESTRICTIONS :: GLOBAL_GRID_SYNC_ACTIVE :: PROTOCOL_4163_ENGAGED :: WELCOME_TO_THE_ABYSS :: "
    : "WARNING: VOIDING WARRANTY IS REVERSIBLE BUT RISKY. PROCEED WITH CAUTION. | A1633 ARCHIVE V1.1.0 | GPRS_LINK: ACTIVE | CH_BUS: 133mhz | PAYLOAD_INJECTED | INTEGRITY_CHECK_COMPLETE :: ALL_SYSTEMS_OPERATIONAL | SOLUCIONES_646_SINGULARITY | ";
  return (
    <TooltipProvider delayDuration={400}>
      <SidebarProvider defaultOpen={true}>
        <div className={cn(
          "crt-overlay pointer-events-none fixed inset-0 z-[9999] transition-all duration-1000",
          isSingularityMode ? "opacity-100 animate-crt-flicker grayscale-[0.1]" : "opacity-90"
        )} />
        {/* Additional Singularity Scanline Layer */}
        {isSingularityMode && (
          <div className="fixed inset-0 z-[10000] pointer-events-none opacity-40 bg-[linear-gradient(rgba(210,9,250,0.05)_50%,transparent_50%)] bg-[length:100%_1px] animate-scanline" />
        )}
        <div className={cn(
          "screen-glow pointer-events-none fixed inset-0 z-[9998] transition-all duration-1000",
          isSingularityMode ? "opacity-50 shadow-[inset_0_0_150px_rgba(210,9,250,0.3)]" : "opacity-30 shadow-[inset_0_0_120px_rgba(0,255,65,0.15)]"
        )} />
        {isSingularityMode && (
          <div className="fixed inset-0 z-[9997] pointer-events-none opacity-[0.05] bg-red-950 animate-pulse" />
        )}
        <LoadingOverlay />
        <VerboseHUD />
        <div className="relative min-h-screen w-full bg-retro-black flex font-mono overflow-hidden">
          <AppSidebar />
          <SidebarInset className="bg-transparent flex flex-col min-h-screen relative overflow-hidden">
            <header className={cn(
              "h-14 md:h-16 border-b-2 flex items-center justify-between px-4 md:px-8 bg-retro-black/95 backdrop-blur-lg z-50 flex-nowrap shrink-0 transition-colors duration-500",
              isSingularityMode ? "border-neon-pink shadow-[0_4px_20px_rgba(210,9,250,0.2)]" : "border-neon-green shadow-[0_4px_20px_rgba(0,255,65,0.1)]"
            )}>
              <div className="flex items-center gap-4 overflow-hidden min-w-0">
                <div className="relative">
                  <SidebarTrigger
                    className={cn(
                      "rounded-none h-10 w-10 shrink-0 flex items-center justify-center transition-all active:scale-95",
                      isSingularityMode
                        ? "text-neon-pink border-neon-pink hover:bg-neon-pink hover:text-white shadow-[4px_4px_0px_rgba(210,9,250,0.3)]"
                        : "text-neon-green border-neon-green hover:bg-neon-green hover:text-retro-black shadow-[4px_4px_0px_rgba(0,255,65,0.3)]"
                    )}
                    aria-label="Toggle System Menu"
                  />
                  {isSingularityMode && (
                    <span className="absolute -top-1 -right-1 size-3 bg-neon-pink border border-white animate-pulse rounded-full hidden xs:block" />
                  )}
                </div>
                <BrandLogo size="lg" className="hidden sm:flex shrink-0" iconClassName={isSingularityMode ? "text-neon-pink" : ""} />
                <BrandLogo size="md" className="flex sm:hidden shrink-0" iconClassName={isSingularityMode ? "text-neon-pink" : ""} />
                <div className={cn(
                  "flex items-center gap-2 md:gap-6 leading-none overflow-hidden border-l-2 pl-4 md:pl-8 min-w-0 transition-colors duration-500",
                  isSingularityMode ? "border-neon-pink/30" : "border-neon-green/20"
                )}>
                  <span className={cn(
                    "text-[10px] md:text-xs animate-pulse font-black shrink-0 whitespace-nowrap",
                    isSingularityMode ? "text-neon-pink pink-glow" : "text-neon-green retro-glow"
                  )}>● {isSingularityMode ? "SINGULARITY_LINK" : "SYS_UP"}</span>
                  <span className={cn(
                    "text-[10px] md:text-xs font-mono truncate italic transition-colors",
                    isSingularityMode ? "text-neon-pink pink-glow" : "text-neon-pink/80"
                  )}>
                    {memAddress}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 md:gap-8 shrink-0">
                <div className="hidden lg:flex flex-col text-right">
                  <span className="text-[8px] uppercase opacity-50 leading-none font-black tracking-widest">Sync_Depth</span>
                  <span className={cn(
                    "text-[11px] leading-none font-bold transition-colors",
                    isSingularityMode ? "text-neon-pink pink-glow" : "text-neon-green retro-glow"
                  )}>{xp} XP</span>
                </div>
                <ThemeToggle className="static" />
                <div className={cn(
                  "text-[10px] md:text-sm tabular-nums font-black border-l-2 pl-4 md:pl-8 whitespace-nowrap transition-colors",
                  isSingularityMode ? "border-neon-pink/30 text-neon-pink pink-glow" : "border-neon-green/30 text-neon-green retro-glow"
                )}>
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
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
            <footer className={cn(
              "h-12 border-t-2 flex items-center bg-retro-black text-[11px] uppercase tracking-tighter overflow-hidden shrink-0 transition-colors duration-500",
              isSingularityMode ? "border-neon-pink" : "border-neon-green"
            )}>
              <div className="relative flex w-full h-full items-center">
                <div className={cn(
                  "whitespace-nowrap flex items-center h-full will-change-transform",
                  isSingularityMode ? "animate-marquee" : "animate-marquee"
                )} style={{ animationDuration: isSingularityMode ? '15s' : '30s' }}>
                  <span className={cn(
                    "px-12 font-black transition-colors",
                    isSingularityMode ? "text-neon-pink pink-glow" : "text-neon-green/90 retro-glow"
                  )}>{marqueeText}</span>
                  <span className={cn(
                    "px-12 font-black transition-colors",
                    isSingularityMode ? "text-neon-pink pink-glow" : "text-neon-green/90 retro-glow"
                  )}>{marqueeText}</span>
                </div>
                <div className={cn(
                  "absolute right-0 h-full bg-retro-black border-l-2 px-6 flex items-center gap-4 z-20 transition-all",
                  isSingularityMode 
                    ? "border-neon-pink shadow-[-20px_0_40px_rgba(210,9,250,0.5)]" 
                    : "border-neon-green shadow-[-20px_0_30px_rgba(10,10,10,1)]"
                )}>
                  <BrandLogo size="sm" showText={false} iconClassName={isSingularityMode ? "text-neon-pink pink-glow" : "text-neon-pink"} />
                  <span className={cn(
                    "text-[10px] font-black tracking-[0.2em] hidden xs:block",
                    isSingularityMode ? "text-white pink-glow" : "text-neon-pink"
                  )}>SOLUCIONES_646</span>
                </div>
              </div>
            </footer>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}