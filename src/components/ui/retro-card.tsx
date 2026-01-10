import React from "react";
import { cn } from "@/lib/utils";
interface RetroCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  status?: string;
}
export function RetroCard({ title, status, children, className, ...props }: RetroCardProps) {
  return (
    <div 
      className={cn(
        "bg-retro-black/80 border-2 border-neon-green relative mb-6",
        "shadow-[4px_4px_0px_rgba(0,255,65,1)]",
        className
      )}
      {...props}
    >
      {(title || status) && (
        <div className="bg-neon-green text-retro-black px-3 py-1 flex justify-between items-center font-bold text-sm uppercase tracking-wider">
          <span>{title || "COMMAND_TERMINAL"}</span>
          {status && <span className="text-[10px] animate-pulse">{status}</span>}
        </div>
      )}
      <div className="p-4 md:p-6 text-neon-green overflow-hidden">
        {children}
      </div>
    </div>
  );
}