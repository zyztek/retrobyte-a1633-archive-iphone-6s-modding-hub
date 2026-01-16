import React from "react";
import {
  Terminal, Code, BookOpen, Package, Github, Settings, Layers, Book,
  FlaskConical, LayoutGrid, Target, Brain, Laptop, Camera, Activity, Wifi, GraduationCap, ShieldCheck,
  Globe, Smartphone, Rocket, Usb, BarChart3, Shield, Monitor
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { BrandLogo } from "@/components/ui/brand-logo";
export function AppSidebar(): JSX.Element {
  const location = useLocation();
  const isVerbose = useUIStore(s => s.isVerbose);
  const toggleVerbose = useUIStore(s => s.toggleVerbose);
  const mainNav = [
    { title: "Terminal", icon: Terminal, path: "/", tip: "Main system interface" },
    { title: "Script Forge", icon: Code, path: "/script-forge", tip: "Automation generator" },
    { title: "Archives", icon: BookOpen, path: "/archives", tip: "Technical database" },
    { title: "Mod Repo", icon: Package, path: "/repo", tip: "Tweak repository" },
  ];
  const softwareNav = [
    { title: "Island Fakeout", icon: Smartphone, path: "/island-fakeout", tip: "Modern UI simulation" },
    { title: "EmuVault", icon: Laptop, path: "/emuvault", tip: "A9 JIT Emulation" },
    { title: "Remote Ops", icon: Globe, path: "/remote-ops", tip: "SSH & VNC Hub" },
    { title: "Docs Vault", icon: Shield, path: "/docs-vault", tip: "Classified Intel" },
  ];
  const labNav = [
    { title: "System Lab", icon: FlaskConical, path: "/system-lab", tip: "Foundry & Forge" },
    { title: "Tweak Oracle", icon: Brain, path: "/tweak-ai", tip: "ML-Lite recommendations" },
    { title: "Exploit Lab", icon: Activity, path: "/exploit-lab", tip: "Race-condition sim" },
    { title: "USB Forge", icon: Usb, path: "/usb-forge", tip: "P7 & OTG Protocols" },
    { title: "Academy", icon: GraduationCap, path: "/academy", tip: "Global Ranks & XP" },
    { title: "Test Center", icon: ShieldCheck, path: "/test-center", tip: "Integrity validation" },
    { title: "GodMode", icon: Target, path: "/godmode", tip: "Command singularity" },
  ];
  const renderItems = (items: any[]) => (
    <SidebarMenu>
      {items.map((item) => {
        const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
        return (
          <SidebarMenuItem key={item.title}>
            <TooltipProvider delayDuration={400}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className={cn(
                      "rounded-none h-12 border-2 border-transparent transition-all",
                      isActive && "border-neon-green text-neon-green bg-neon-green/10 shadow-[inset_0_0_10px_rgba(0,255,65,0.1)]",
                      item.title === 'GodMode' && "text-neon-pink hover:bg-neon-pink hover:text-white border-neon-pink/30"
                    )}
                  >
                    <Link to={item.path} className="flex items-center gap-3 w-full">
                      <item.icon className={cn("size-4 shrink-0", isActive && "brand-glow")} />
                      <span className="uppercase text-[11px] font-black tracking-[0.2em]">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-retro-black border-2 border-neon-green text-neon-green rounded-none text-[11px] uppercase font-black">
                  {item.tip}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
  return (
    <Sidebar className="border-r-2 border-neon-green bg-retro-black shadow-[10px_0_30px_rgba(0,255,65,0.05)]">
      <SidebarHeader className="border-b-2 border-neon-green p-8 bg-retro-black flex justify-center items-center">
        <BrandLogo size="lg" className="brand-glow" />
      </SidebarHeader>
      <SidebarContent className="p-4 space-y-6 bg-retro-black scrollbar-thin">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase font-black text-neon-green/60 mb-3 px-2 tracking-[0.3em]">Core_System</SidebarGroupLabel>
          {renderItems(mainNav)}
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase font-black text-neon-pink/60 mb-3 px-2 tracking-[0.3em]">Software_Sector</SidebarGroupLabel>
          {renderItems(softwareNav)}
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase font-black text-yellow-400/60 mb-3 px-2 tracking-[0.3em]">Technical_Labs</SidebarGroupLabel>
          {renderItems(labNav)}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t-2 border-neon-green p-8 bg-retro-black space-y-6">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <Monitor className={cn("size-4", isVerbose ? "text-neon-pink animate-pulse" : "text-white/20")} />
            <span className={cn("text-[11px] font-black uppercase tracking-widest", isVerbose ? "text-neon-pink" : "text-white/40")}>Verbose</span>
          </div>
          <Switch 
            checked={isVerbose} 
            onCheckedChange={toggleVerbose} 
            className="data-[state=checked]:bg-neon-pink border-2 border-transparent rounded-none" 
          />
        </div>
        <div className="text-[9px] text-center text-neon-green/40 font-black uppercase tracking-[0.4em] leading-relaxed">
          (C) 2024 SOLUCIONES 646<br/>
          <span className="text-neon-pink/40">SINGULARITY_V30.0</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}