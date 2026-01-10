import React from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { PACKAGE_STORES } from '@shared/extended-data';
import { Copy, ExternalLink, Package } from 'lucide-react';
import { toast } from 'sonner';
export function PackageStoresPage() {
  const copyRepo = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("REPO_URL_COPIED", {
      description: "Ready for paste in package manager.",
      className: "border-neon-pink text-neon-pink bg-retro-black"
    });
  };
  return (
    <RetroLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold retro-glow uppercase tracking-tighter">Software Hub</h1>
          <p className="text-xs text-neon-pink uppercase font-bold">Sector: Alternative Package Management</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PACKAGE_STORES.map((store) => (
            <RetroCard key={store.name} title={store.name.toUpperCase()} variant="danger" status="VERIFIED">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Package className="size-8 text-neon-pink" />
                  <p className="text-sm leading-tight opacity-90">{store.description}</p>
                </div>
                <div className="space-y-2 pt-4">
                  <div className="text-[10px] uppercase font-bold text-neon-pink/60">Repository URL</div>
                  <div className="flex gap-2">
                    <code className="bg-black/50 p-2 text-[10px] flex-1 border border-neon-pink/30 truncate">
                      {store.repoUrl}
                    </code>
                    <button 
                      onClick={() => copyRepo(store.repoUrl)}
                      className="bg-neon-pink text-white p-2 hover:opacity-80 transition-opacity"
                    >
                      <Copy className="size-4" />
                    </button>
                  </div>
                </div>
                <div className="p-3 bg-neon-pink/5 border border-neon-pink/20">
                  <div className="text-[10px] font-bold uppercase mb-1">Installation Protocol:</div>
                  <p className="text-[10px] leading-relaxed opacity-70 italic">{store.installationGuide}</p>
                </div>
                <button className="retro-button w-full border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-white flex items-center justify-center gap-2">
                  <ExternalLink className="size-4" /> VISIT_OFFICIAL_SITE
                </button>
              </div>
            </RetroCard>
          ))}
        </div>
      </div>
    </RetroLayout>
  );
}