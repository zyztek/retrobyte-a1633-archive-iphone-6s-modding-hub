import React from "react";
import { cn } from "@/lib/utils";
interface RetroCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  status?: string;
  variant?: 'default' | 'danger' | 'warning';
}
export function RetroCard({ title, status, children, className, variant = 'default', ...props }: RetroCardProps) {
  const variantStyles = {
    default: "border-neon-green shadow-[4px_4px_0px_rgba(0,255,65,1)]",
    danger: "border-neon-pink shadow-[4px_4px_0px_rgba(210,9,250,1)]",
    warning: "border-yellow-400 shadow-[4px_4px_0px_rgba(250,204,21,1)]"
  };
  const headerStyles = {
    default: "bg-neon-green text-retro-black",
    danger: "bg-neon-pink text-white",
    warning: "bg-yellow-400 text-retro-black"
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
          "px-3 py-1 flex justify-between items-center font-bold text-sm uppercase tracking-wider",
          headerStyles[variant]
        )}>
          <span>{title || "COMMAND_TERMINAL"}</span>
          {status && <span className="text-[10px] animate-pulse">{status}</span>}
        </div>
      )}
      <div className={cn(
        "p-4 md:p-6 overflow-hidden",
        variant === 'danger' ? 'text-neon-pink' : variant === 'warning' ? 'text-yellow-400' : 'text-neon-green'
      )}>
        {children}
      </div>
    </div>
  );
}