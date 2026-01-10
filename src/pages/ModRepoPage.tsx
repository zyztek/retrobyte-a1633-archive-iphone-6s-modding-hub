import React, { useState } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { MOD_REPOSITORY, Mod } from '@shared/archive-data';
import { Package, Download, Star, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
export function ModRepoPage() {
  const [activeTab, setActiveTab] = useState<Mod['type'] | 'All'>('All');
  const filteredMods = activeTab === 'All' 
    ? MOD_REPOSITORY 
    : MOD_REPOSITORY.filter(m => m.type === activeTab);
  const categories: (Mod['type'] | 'All')[] = ['All', 'System', 'UI', 'Battery', 'Experimental'];
  return (
    <RetroLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold retro-glow uppercase tracking-tighter">Mod Repository</h1>
            <p className="text-xs text-neon-green/60 uppercase">Package Manager V1.0.2</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={cn(
                  "px-3 py-1 text-[10px] font-bold uppercase border-2 transition-all",
                  activeTab === cat 
                    ? "bg-neon-green text-retro-black border-neon-green" 
                    : "border-neon-green/30 text-neon-green/60 hover:border-neon-green/60"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMods.map((mod, idx) => (
            <RetroCard 
              key={mod.name} 
              title={mod.name.toUpperCase().replace(" ", "_")}
              variant={mod.type === 'Experimental' ? 'warning' : 'default'}
              status={`V${mod.version}`}
              className="h-full flex flex-col"
            >
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="bg-neon-green/10 text-neon-green text-[10px] px-2 py-0.5 border border-neon-green/20">
                    {mod.type}
                  </div>
                  <div className="flex items-center gap-1 text-neon-pink">
                    <Star className="size-3 fill-neon-pink" />
                    <span className="text-xs font-bold">{mod.rating}/10</span>
                  </div>
                </div>
                <p className="text-sm leading-snug text-neon-green/80">
                  {mod.description}
                </p>
                <div className="text-[10px] space-y-1 opacity-60">
                  <div>AUTHOR: {mod.author}</div>
                  <div>COMPAT: {mod.compatibility}</div>
                </div>
                <button className="retro-button w-full mt-4 flex items-center justify-center gap-2 group">
                  <Download className="size-4 group-hover:translate-y-0.5 transition-transform" /> 
                  INSTALL_PACKAGE
                </button>
              </div>
            </RetroCard>
          ))}
        </div>
      </div>
    </RetroLayout>
  );
}