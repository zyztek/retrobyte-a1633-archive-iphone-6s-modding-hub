import React from "react";
import { cn } from "@/lib/utils";
import { BrandLogo } from "./brand-logo";
interface RetroCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  status?: string;
  variant?: 'default' | 'danger' | 'warning' | 'success';
}
export function RetroCard({ title, status, children, className, variant = 'default', ...props }: RetroCardProps) {
  const variantStyles = {
    default: "border-neon-green shadow-[6px_6px_0px_rgba(0,255,65,1)]",
    danger: "border-neon-pink shadow-[6px_6px_0px_rgba(210,9,250,1)]",
    warning: "border-yellow-400 shadow-[6px_6px_0px_rgba(250,204,21,1)]",
    success: "border-emerald-500 shadow-[6px_6px_0px_rgba(16,185,129,1)]"
  };
  const headerStyles = {
    default: "bg-neon-green text-retro-black",
    danger: "bg-neon-pink text-white",
    warning: "bg-yellow-400 text-retro-black",
    success: "bg-emerald-500 text-white"
  };
  const brandColors = {
    default: "text-retro-black",
    danger: "text-white",
    warning: "text-retro-black",
    success: "text-white"
  };
  return (
    <div
      className={cn(
        "bg-retro-black/80 border-2 relative mb-6",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {(title || status) && (
        <div className={cn(
          "px-3 py-1.5 flex justify-between items-center font-black text-[11px] uppercase tracking-[0.15em] border-b-2",
          headerStyles[variant],
          variantStyles[variant].split(' ')[0] // Border color
        )}>
          <div className="flex items-center gap-3 truncate mr-4">
            <span className="truncate">{title || "COMMAND_TERMINAL"}</span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {status && <span className="text-[9px] animate-pulse opacity-80">{status}</span>}
            <BrandLogo showText={false} size="sm" iconClassName={brandColors[variant]} />
          </div>
        </div>
      )}
      <div className={cn(
        "p-4 md:p-6 overflow-hidden",
        variant === 'danger' ? 'text-neon-pink' :
        variant === 'warning' ? 'text-yellow-400' :
        variant === 'success' ? 'text-emerald-400' :
        'text-neon-green'
      )}>
        {children}
      </div>
    </div>
  );
}