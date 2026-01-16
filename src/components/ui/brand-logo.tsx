import React from 'react';
import { Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
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
    sm: { icon: 'size-4', text: 'text-[10px]' },
    md: { icon: 'size-6', text: 'text-sm' },
    lg: { icon: 'size-10', text: 'text-2xl' }
  };
  return (
    <div className={cn("flex items-center gap-2 group select-none", className)}>
      <div className="relative">
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [45, 45, 45] // Base rotation
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Wrench
            className={cn(
              sizes[size].icon,
              "text-neon-green brand-glow transition-transform duration-700 group-hover:rotate-[225deg]",
              iconClassName
            )}
          />
        </motion.div>
        <div className="absolute inset-0 bg-neon-green/30 blur-xl rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={cn(
            sizes[size].text,
            "font-black tracking-[-0.05em] retro-glow text-neon-green uppercase"
          )}>
            Soluciones
          </span>
          <span className={cn(
            size === 'lg' ? 'text-xl' : 'text-[11px]',
            "font-black tracking-[0.3em] text-neon-pink pink-glow"
          )}>
            646
          </span>
        </div>
      )}
    </div>
  );
}