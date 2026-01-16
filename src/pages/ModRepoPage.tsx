import React, { useState } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { MOD_REPOSITORY, Mod } from '@shared/archive-data';
import { Package, Download, Star, Filter, ShoppingCart, Check, ShieldCheck, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
export function ModRepoPage() {
  const [activeTab, setActiveTab] = useState<Mod['type'] | 'All'>('All');
  const [cart, setCart] = useState<string[]>([]);
  const categories: (Mod['type'] | 'All')[] = ['All', 'System', 'UI', 'Battery', 'Experimental'];
  const filteredMods = activeTab === 'All'
    ? MOD_REPOSITORY
    : MOD_REPOSITORY.filter(m => m.type === activeTab);
  const toggleCart = (name: string) => {
    setCart(prev => prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]);
  };
  const handleBatchInstall = () => {
    if (cart.length === 0) return;
    toast.success("BATCH_SYNC_INITIATED", { description: `Installing ${cart.length} packages to A1633.` });
    setCart([]);
  };
  return (
    <RetroLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold retro-glow uppercase tracking-tighter">Mod Repository</h1>
            <p className="text-xs text-neon-green/60 uppercase">Market_Sector :: Soluciones_646_Affiliate</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={cn(
                  "px-3 py-1 text-[10px] font-bold uppercase border-2 transition-all",
                  activeTab === cat ? "bg-neon-green text-black border-neon-green" : "border-neon-green/30 text-neon-green/60 hover:border-neon-green/60"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        {cart.length > 0 && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"
          >
            <div className="bg-neon-pink border-2 border-white p-4 flex justify-between items-center shadow-[0_10px_40px_rgba(210,9,250,0.5)]">
              <div className="flex items-center gap-3">
                <ShoppingCart className="size-5 text-white" />
                <span className="text-xs font-black text-white uppercase">{cart.length} ITEMS_IN_BUFFER</span>
              </div>
              <button onClick={handleBatchInstall} className="bg-white text-neon-pink px-4 py-1 text-[10px] font-black uppercase hover:bg-black hover:text-white transition-all">
                EXECUTE_BATCH
              </button>
            </div>
          </motion.div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMods.map((mod, idx) => {
            const isPartner = idx === 0 || idx === 3; // Mock partner status
            const isPremium = mod.type === 'System' || mod.type === 'Experimental';
            return (
              <RetroCard
                key={mod.name}
                title={mod.name.toUpperCase().replace(" ", "_")}
                variant={mod.type === 'Experimental' ? 'warning' : 'default'}
                status={`V${mod.version}`}
                className="h-full flex flex-col relative"
              >
                {isPartner && (
                  <div className="absolute top-0 right-10 -translate-y-1/2 bg-neon-pink text-white text-[7px] font-black px-2 py-0.5 border-2 border-white z-20">
                    646_PARTNER
                  </div>
                )}
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="bg-neon-green/10 text-neon-green text-[9px] px-2 py-0.5 border border-neon-green/20 font-bold uppercase">
                      {mod.type}
                    </div>
                    {isPremium ? (
                      <span className="text-[10px] font-black text-neon-pink">$0.00_PRO_FREE</span>
                    ) : (
                      <div className="flex items-center gap-1 text-neon-pink">
                        <Star className="size-3 fill-neon-pink" />
                        <span className="text-xs font-bold">{mod.rating}/10</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm leading-snug text-neon-green/80 uppercase font-bold">
                    {mod.description}
                  </p>
                  <div className="text-[9px] space-y-1 opacity-60 font-mono font-bold">
                    <div>AUTHOR: {mod.author}</div>
                    <div>COMPAT: {mod.compatibility}</div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <button 
                      onClick={() => toggleCart(mod.name)}
                      className={cn(
                        "p-2 border-2 transition-all",
                        cart.includes(mod.name) ? "bg-neon-pink border-neon-pink text-white" : "border-neon-green text-neon-green hover:bg-neon-green hover:text-black"
                      )}
                    >
                      {cart.includes(mod.name) ? <Check className="size-4" /> : <ShoppingCart className="size-4" />}
                    </button>
                    <button className="retro-button flex-1 flex items-center justify-center gap-2 group text-xs py-1">
                      <Download className="size-4 group-hover:translate-y-0.5" />
                      INSTALL_DIRECT
                    </button>
                  </div>
                </div>
              </RetroCard>
            );
          })}
        </div>
      </div>
    </RetroLayout>
  );
}