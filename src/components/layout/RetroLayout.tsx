import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
interface RetroLayoutProps {
  children: React.ReactNode;
}
export function RetroLayout({ children }: RetroLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="crt-overlay" />
      <div className="relative min-h-screen w-full bg-retro-black flex font-mono">
        <AppSidebar />
        <SidebarInset className="bg-transparent flex flex-col min-h-screen">
          <header className="h-12 border-b-2 border-neon-green flex items-center justify-between px-6 bg-retro-black/50 backdrop-blur-sm z-10">
            <div className="flex items-center gap-4">
              <span className="text-xs animate-pulse">● SYSTEM_STATUS: ONLINE</span>
              <span className="hidden md:inline text-xs text-neon-green/60">TARGET_HW: iPhone_6s_A1633</span>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle className="static" />
              <div className="text-xs tabular-nums">
                {new Date().toLocaleTimeString()}
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="py-8 md:py-10 lg:py-12">
                {children}
              </div>
            </div>
          </main>
          <footer className="h-8 border-t-2 border-neon-green flex items-center px-4 bg-retro-black text-[10px] uppercase tracking-tighter">
            <div className="flex gap-4 overflow-hidden whitespace-nowrap">
              <span className="animate-marquee inline-block">
                WARNING: VOIDING WARRANTY IS REVERSIBLE BUT RISKY. PROCEED WITH CAUTION. | A1633 ARCHIVE V1.0.4 | SECURE CONNECTION ESTABLISHED...
              </span>
            </div>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}