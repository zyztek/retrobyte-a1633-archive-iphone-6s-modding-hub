import React from "react";
import {
  Terminal, Code, BookOpen, Package, Github, Settings, Layers, Book,
  FlaskConical, LayoutGrid, Target, Brain, Laptop, Camera, Activity, Wifi, GraduationCap, ShieldCheck
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BrandLogo } from "@/components/ui/brand-logo";
export function AppSidebar(): JSX.Element {
  const location = useLocation();
  const isVerbose = useUIStore(s => s.isVerbose);
  const toggleVerbose = useUIStore(s => s.toggleVerbose);
  const mainNav = [
    { title: "Terminal", icon: Terminal, path: "/", tip: "Main system interface" },
    { title: "Script Forge", icon: Code, path: "/script-forge", tip: "Automation script generator" },
    { title: "Archives", icon: BookOpen, path: "/archives", tip: "Technical modding database" },
    { title: "Repo", icon: Package, path: "/repo", tip: "Curated tweak repository" },
    { title: "Multi-Boot", icon: Layers, path: "/multiboot", tip: "Advanced partition control" },
  ];
  const softwareNav = [
    { title: "Software Hub", icon: LayoutGrid, path: "/stores", tip: "Package store alternatives" },
    { title: "EmuVault", icon: Laptop, path: "/emuvault", tip: "Virtualization environment" },
  ];
  const labNav = [
    { title: "System Lab", icon: FlaskConical, path: "/system-lab", tip: "Hardware diagnostics" },
    { title: "TweakAI", icon: Brain, path: "/tweak-ai", tip: "Neural recommendation engine" },
    { title: "Exploit Lab", icon: Activity, path: "/exploit-lab", tip: "Race-condition simulator" },
    { title: "Network Arsenal", icon: Wifi, path: "/network-arsenal", tip: "RF & Tunneling suite" },
    { title: "HackCam", icon: Camera, path: "/hack-cam", tip: "AR Hardware recon" },
    { title: "Docs Vault", icon: Book, path: "/docs-vault", tip: "Classified technical specs" },
    { title: "Academy", icon: GraduationCap, path: "/academy", tip: "Ascension knowledge base" },
    { title: "GodMode", icon: Target, path: "/godmode", tip: "Authority override center" },
  ];
  const devNav = [
    { title: "Test Center", icon: ShieldCheck, path: "/test-center", tip: "Quality assurance suite" },
  ];
  const renderItems = (items: typeof mainNav) => (
    <SidebarMenu>
      {items.map((item) => {
        const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
        const isGodMode = item.path === '/godmode';
        return (
          <SidebarMenuItem key={item.title}>
            <TooltipProvider delayDuration={400}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className={cn(
                      "hover:bg-neon-green hover:text-retro-black rounded-none h-11 transition-all duration-200 border-2 border-transparent",
                      isActive && "border-neon-green text-neon-green bg-neon-green/10",
                      isActive && isGodMode && "border-neon-pink text-neon-pink bg-neon-pink/10",
                      isGodMode && "hover:bg-neon-pink hover:animate-glitch group/god"
                    )}
                  >
                    <Link to={item.path} className="flex items-center gap-3 w-full">
                      <item.icon className={cn("size-4 shrink-0 transition-transform group-hover:scale-110", isGodMode && "text-neon-pink group-hover/god:text-white")} />
                      <span className={cn(
                        "uppercase text-[11px] font-black tracking-widest",
                        isGodMode && "text-neon-pink group-hover/god:text-white"
                      )}>
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-retro-black border-2 border-neon-green text-neon-green rounded-none font-bold text-[10px] uppercase">
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
    <Sidebar className="border-r-2 border-neon-green bg-retro-black flex-shrink-0">
      <SidebarHeader className="border-b-2 border-neon-green p-6 bg-retro-black">
        <BrandLogo size="lg" />
      </SidebarHeader>
      <SidebarContent className="p-3 space-y-4 overflow-y-auto scrollbar-none bg-retro-black">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[9px] uppercase font-black text-neon-green/40 mb-2 px-2">Core_Mainframe</SidebarGroupLabel>
          {renderItems(mainNav)}
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[9px] uppercase font-black text-neon-pink/40 mb-2 px-2">Software_Sector</SidebarGroupLabel>
          {renderItems(softwareNav)}
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[9px] uppercase font-black text-yellow-400/40 mb-2 px-2">Lab_Diagnostics</SidebarGroupLabel>
          {renderItems(labNav)}
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[9px] uppercase font-black text-emerald-400/40 mb-2 px-2">Dev_Intelligence</SidebarGroupLabel>
          {renderItems(devNav)}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t-2 border-neon-green p-6 bg-retro-black space-y-6">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="text-[9px] uppercase font-black text-neon-pink/40 mb-4">System_Config</SidebarGroupLabel>
          <div className="flex items-center justify-between px-2">
            <span className="text-[10px] font-bold text-neon-pink uppercase">Verbose_Mode</span>
            <Switch
              checked={isVerbose}
              onCheckedChange={toggleVerbose}
              className="data-[state=checked]:bg-neon-pink rounded-none"
            />
          </div>
        </SidebarGroup>
        <div className="flex justify-around items-center border-b border-neon-green/10 pb-4">
          <Github className="size-5 cursor-pointer text-neon-green/60 hover:text-neon-pink transition-colors" />
          <Settings className="size-5 cursor-pointer text-neon-green/60 hover:text-neon-pink transition-colors" />
        </div>
        <div className="text-[8px] text-center text-neon-green/40 font-bold uppercase tracking-widest leading-loose">
          Unauthorized Access Prohibited<br/>(C) 2024 SOLUCIONES 646
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}