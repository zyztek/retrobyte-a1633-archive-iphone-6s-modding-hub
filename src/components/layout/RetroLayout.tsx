import React, { useState, useEffect } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { VerboseHUD } from "@/components/ui/verbose-hud";
import { Shield } from "lucide-react";
interface RetroLayoutProps {
  children: React.ReactNode;
}
export function RetroLayout({ children }: RetroLayoutProps) {
  const [memAddress, setMemAddress] = useState("0x00000000");
  useEffect(() => {
    const interval = setInterval(() => {
      setMemAddress("0x" + Math.floor(Math.random() * 0xFFFFFFFF).toString(16).toUpperCase().padStart(8, '0'));
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  const marqueeText = "WARNING: VOIDING WARRANTY IS REVERSIBLE BUT RISKY. PROCEED WITH CAUTION. | A1633 ARCHIVE V1.1.0 | SECURE CONNECTION ESTABLISHED... | EXPLOIT STAGE 2: PAYLOAD_INJECTED | INTEGRITY_CHECK_COMPLETE :: ALL_SYSTEMS_OPERATIONAL | "
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="crt-overlay" />
      <LoadingOverlay />
      <VerboseHUD />
      <div className="relative min-h-screen w-full bg-retro-black flex font-mono overflow-hidden">
        <AppSidebar />
        <SidebarInset className="bg-transparent flex flex-col min-h-screen relative overflow-hidden">
          <header className="h-14 md:h-12 border-b-2 border-neon-green flex items-center justify-between px-3 md:px-6 bg-retro-black/90 backdrop-blur-md z-50">
            <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
              <SidebarTrigger className="text-neon-green hover:bg-neon-green hover:text-retro-black border-2 border-neon-green rounded-none transition-all h-9 w-9 md:h-8 md:w-8 shrink-0" />
              <div className="flex items-center gap-2 shrink-0">
                <Shield className="size-5 text-neon-green animate-pulse hidden xs:block" />
                <span className="text-xs font-black text-neon-green tracking-tighter hidden sm:block">RB_SYS</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 leading-none overflow-hidden">
                <span className="text-[9px] md:text-xs animate-pulse text-neon-green font-bold shrink-0">● SYS_UP</span>
                <span className="text-[8px] md:text-[10px] text-neon-pink font-mono opacity-80 truncate max-w-[60px] md:max-w-none">{memAddress}</span>
                <div className="hidden xs:flex items-center gap-2 border-l-2 border-neon-green/20 pl-4 shrink-0">
                  <span className="text-[8px] uppercase opacity-50">Build</span>
                  <span className="text-[8px] bg-neon-green text-retro-black px-1 font-bold">PASSING</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-6 shrink-0">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-[8px] uppercase opacity-50">Coverage</span>
                <span className="text-[10px] text-neon-pink font-bold">98.4%</span>
              </div>
              <div className="hidden lg:flex flex-col text-right">
                <span className="text-[8px] uppercase opacity-50">Frame_Lock</span>
                <span className="text-[10px] text-neon-green">60.00 FPS</span>
              </div>
              <ThemeToggle className="static" />
              <div className="text-[9px] md:text-xs tabular-nums font-bold border-l-2 border-neon-green/30 pl-2 md:pl-4 whitespace-nowrap">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto overflow-x-hidden relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="py-8 md:py-10 lg:py-12">
                {children}
              </div>
            </div>
          </main>
          <footer className="h-10 border-t-2 border-neon-green flex items-center bg-retro-black text-[10px] uppercase tracking-tighter overflow-hidden">
            <div className="relative flex w-full h-full items-center">
              <div className="animate-marquee whitespace-nowrap flex items-center h-full">
                <span className="px-8 font-bold text-neon-green/90">{marqueeText}</span>
                <span className="px-8 font-bold text-neon-green/90">{marqueeText}</span>
              </div>
              <div className="absolute right-0 h-full bg-retro-black border-l-2 border-neon-green px-4 flex items-center gap-2 z-10">
                <Shield className="size-3 text-neon-pink" />
                <span className="text-[8px] font-black text-neon-pink tracking-widest hidden xs:block">RETROBYTE_A1633</span>
              </div>
            </div>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}