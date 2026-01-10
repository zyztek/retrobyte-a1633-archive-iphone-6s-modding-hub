import React from 'react';
import { Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';
interface BrandLogoProps {
  className?: string;
  iconClassName?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}
export function BrandLogo({ 
  className, 
  iconClassName, 
  showText = true, 
  size = 'md' 
}: BrandLogoProps) {
  const sizes = {
    sm: { icon: 'size-4', text: 'text-xs' },
    md: { icon: 'size-6', text: 'text-sm' },
    lg: { icon: 'size-10', text: 'text-2xl' }
  };
  return (
    <div className={cn("flex items-center gap-2 group select-none", className)}>
      <div className="relative">
        <Wrench 
          className={cn(
            sizes[size].icon,
            "text-neon-green rotate-45 brand-glow transition-transform duration-500 group-hover:rotate-[225deg]",
            iconClassName
          )} 
        />
        <div className="absolute inset-0 bg-neon-green/20 blur-lg rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={cn(
            sizes[size].text,
            "font-black tracking-tighter retro-glow text-neon-green"
          )}>
            SOLUCIONES
          </span>
          <span className={cn(
            size === 'lg' ? 'text-lg' : 'text-[10px]',
            "font-bold tracking-[0.2em] text-neon-pink"
          )}>
            646
          </span>
        </div>
      )}
    </div>
  );
}