import React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
interface RetroLayoutProps {
  children: React.ReactNode;
}
export function RetroLayout({ children }: RetroLayoutProps) {
  const marqueeText = "WARNING: VOIDING WARRANTY IS REVERSIBLE BUT RISKY. PROCEED WITH CAUTION. | A1633 ARCHIVE V1.0.4 | SECURE CONNECTION ESTABLISHED... | EXPLOIT STAGE 2: PAYLOAD_INJECTED | KERNEL_ADDR: 0xFFFF0000 | "
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="crt-overlay" />
      <div className="relative min-h-screen w-full bg-retro-black flex font-mono overflow-hidden">
        <AppSidebar />
        <SidebarInset className="bg-transparent flex flex-col min-h-screen relative overflow-hidden">
          <header className="h-12 border-b-2 border-neon-green flex items-center justify-between px-4 md:px-6 bg-retro-black/80 backdrop-blur-sm z-50">
            <div className="flex items-center gap-2 md:gap-4">
              <SidebarTrigger className="text-neon-green hover:bg-neon-green hover:text-retro-black border border-neon-green/30 rounded-none transition-colors" />
              <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                <span className="text-[10px] md:text-xs animate-pulse">�� SYSTEM_STATUS: ONLINE</span>
                <span className="hidden sm:inline text-[10px] md:text-xs text-neon-green/60">TARGET_HW: iPhone_6s_A1633</span>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <ThemeToggle className="static" />
              <div className="text-[10px] md:text-xs tabular-nums">
                {new Date().toLocaleTimeString()}
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="py-8 md:py-10 lg:py-12">
                {children}
              </div>
            </div>
          </main>
          <footer className="h-8 border-t-2 border-neon-green flex items-center bg-retro-black text-[10px] uppercase tracking-tighter overflow-hidden">
            <div className="relative flex w-full">
              <div className="animate-marquee whitespace-nowrap flex">
                <span className="px-4">{marqueeText}</span>
                <span className="px-4">{marqueeText}</span>
              </div>
            </div>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}