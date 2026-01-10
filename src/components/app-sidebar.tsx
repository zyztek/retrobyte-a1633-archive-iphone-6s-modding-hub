import React from "react";
import { Terminal, Code, BookOpen, Package, Github, Settings } from "lucide-react";
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
} from "@/components/ui/sidebar";
export function AppSidebar(): JSX.Element {
  const location = useLocation();
  const menuItems = [
    { title: "Terminal", icon: Terminal, path: "/" },
    { title: "Script Forge", icon: Code, path: "/script-forge" },
    { title: "Archives", icon: BookOpen, path: "#" },
    { title: "Repo", icon: Package, path: "#" },
  ];
  return (
    <Sidebar className="border-r-2 border-neon-green bg-retro-black">
      <SidebarHeader className="border-b-2 border-neon-green p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-neon-green flex items-center justify-center text-retro-black font-bold text-xl">A</div>
          <div className="flex flex-col">
            <span className="text-xs font-bold leading-none tracking-tighter">RETROBYTE</span>
            <span className="text-[10px] text-neon-pink font-bold">A1633_SYSTEM</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2 space-y-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild 
                isActive={location.pathname === item.path}
                className={cn(
                  "hover:bg-neon-green hover:text-retro-black rounded-none h-12 transition-colors border-2 border-transparent",
                  location.pathname === item.path && "border-neon-green text-neon-green bg-neon-green/10"
                )}
              >
                <Link to={item.path} className="flex items-center gap-3 w-full">
                  <item.icon className="size-5" />
                  <span className="uppercase text-sm font-bold tracking-widest">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t-2 border-neon-green p-4 space-y-4">
        <div className="flex justify-around items-center">
          <Github className="size-5 cursor-pointer hover:text-neon-pink transition-colors" />
          <Settings className="size-5 cursor-pointer hover:text-neon-pink transition-colors" />
        </div>
        <div className="text-[8px] text-center opacity-50 uppercase tracking-tighter">
          Unauthorized Access Prohibited
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}