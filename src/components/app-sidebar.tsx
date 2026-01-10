import React from "react";
import {
  Terminal, Code, BookOpen, Package, Github, Settings, Layers,
  FlaskConical, LayoutGrid, Target, Cpu, Brain, Laptop, Camera, Activity, Wifi
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
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
export function AppSidebar(): JSX.Element {
  const location = useLocation();
  const mainNav = [
    { title: "Terminal", icon: Terminal, path: "/" },
    { title: "Script Forge", icon: Code, path: "/script-forge" },
    { title: "Archives", icon: BookOpen, path: "/archives" },
    { title: "Repo", icon: Package, path: "/repo" },
    { title: "Multi-Boot", icon: Layers, path: "/multiboot" },
  ];
  const softwareNav = [
    { title: "Software Hub", icon: LayoutGrid, path: "/stores" },
    { title: "EmuVault", icon: Laptop, path: "/emuvault" },
  ];
  const labNav = [
    { title: "System Lab", icon: FlaskConical, path: "/system-lab" },
    { title: "TweakAI", icon: Brain, path: "/tweak-ai" },
    { title: "Exploit Lab", icon: Activity, path: "/exploit-lab" },
    { title: "Network Arsenal", icon: Wifi, path: "/network-arsenal" },
    { title: "HackCam", icon: Camera, path: "/hack-cam" },
    { title: "GodMode", icon: Target, path: "/godmode" },
  ];
  const renderItems = (items: typeof mainNav) => (
    <SidebarMenu>
      {items.map((item) => {
        const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              className={cn(
                "hover:bg-neon-green hover:text-retro-black rounded-none h-11 transition-colors border-2 border-transparent",
                isActive && "border-neon-green text-neon-green bg-neon-green/10",
                item.path === '/godmode' && "border-neon-pink text-neon-pink hover:bg-neon-pink"
              )}
            >
              <Link to={item.path} className="flex items-center gap-3 w-full">
                <item.icon className="size-4" />
                <span className="uppercase text-[11px] font-bold tracking-widest">{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
  return (
    <Sidebar className="border-r-2 border-neon-green bg-retro-black">
      <SidebarHeader className="border-b-2 border-neon-green p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-neon-green flex items-center justify-center text-retro-black font-bold text-xl shadow-[0_0_10px_rgba(0,255,65,0.5)]">A</div>
          <div className="flex flex-col">
            <span className="text-xs font-bold leading-none tracking-tighter">RETROBYTE</span>
            <span className="text-[10px] text-neon-pink font-bold uppercase tracking-widest">A1633_SYSTEM</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2 space-y-2 overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[9px] uppercase font-bold text-neon-green/50">Core_Mainframe</SidebarGroupLabel>
          {renderItems(mainNav)}
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[9px] uppercase font-bold text-neon-pink/50">Software_Sector</SidebarGroupLabel>
          {renderItems(softwareNav)}
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[9px] uppercase font-bold text-yellow-400/50">Lab_Diagnostics</SidebarGroupLabel>
          {renderItems(labNav)}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t-2 border-neon-green p-4 space-y-4">
        <div className="flex justify-around items-center">
          <Github className="size-5 cursor-pointer hover:text-neon-pink transition-colors" />
          <Settings className="size-5 cursor-pointer hover:text-neon-pink transition-colors" />
        </div>
        <div className="text-[8px] text-center opacity-50 uppercase tracking-tighter leading-tight">
          Unauthorized Access Prohibited<br/>(C) 1997 RETROBYTE
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}