import React, { useState, useEffect } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { DOCS_VAULT_CONTENT, type WikiArticle } from '@shared/extended-data';
import { Search, Shield, Book, Play, Terminal, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';
export function DocsVaultPage() {
  const [search, setSearch] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<WikiArticle | null>(DOCS_VAULT_CONTENT[0]);
  const [logs, setLogs] = useState<string[]>([]);
  useEffect(() => {
    const interval = setInterval(() => {
      const phrases = [
        "DECRYPTING_SECTOR_7...",
        "MD5_HASH_VERIFIED: OK",
        "FETCHING_MANIFEST...",
        "SYNCING_HARDWARE_HUD...",
        "ACCESSING_FORBIDDEN_FILES..."
      ];
      setLogs(prev => [phrases[Math.floor(Math.random() * phrases.length)], ...prev].slice(0, 5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const filteredArticles = DOCS_VAULT_CONTENT.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.content.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <RetroLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold retro-glow uppercase tracking-tighter flex items-center gap-3">
              <Shield className="size-8 text-neon-green" /> Docs_Vault
            </h1>
            <p className="text-xs text-neon-green/60 uppercase font-bold tracking-[0.2em]">Compiled Classified Intelligence v1.2</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neon-green/50" />
            <Input
              placeholder="SEARCH_INTELLIGENCE..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-retro-black border-2 border-neon-green/50 rounded-none pl-10 focus-visible:ring-0 focus-visible:border-neon-green text-xs"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <RetroCard title="ARTICLE_INDEX" status="SECURE">
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
                {filteredArticles.map(article => (
                  <button
                    key={article.id}
                    onClick={() => setSelectedArticle(article)}
                    className={cn(
                      "w-full text-left p-3 border-2 transition-all flex items-center justify-between group",
                      selectedArticle?.id === article.id
                        ? "bg-neon-green/20 border-neon-green text-neon-green"
                        : "border-neon-green/20 text-neon-green/60 hover:border-neon-green/40 hover:bg-neon-green/5"
                    )}
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-bold uppercase tracking-tight">{article.title}</div>
                      <div className="text-[9px] opacity-50 uppercase font-mono">{article.category}</div>
                    </div>
                    <ChevronRight className={cn("size-4 transition-transform", selectedArticle?.id === article.id && "rotate-90")} />
                  </button>
                ))}
              </div>
            </RetroCard>
            <RetroCard title="LIVE_DECRYPTION_LOG" status="DECRYPTING">
              <div className="bg-black/60 p-3 h-32 font-mono text-[9px] text-neon-green/70 space-y-1 border border-neon-green/20">
                {logs.map((log, i) => (
                  <div key={i} className="animate-in fade-in slide-in-from-left-1 duration-300">
                    {`> [${new Date().toLocaleTimeString()}] ${log}`}
                  </div>
                ))}
                <div className="animate-pulse">_</div>
              </div>
            </RetroCard>
          </div>
          <div className="lg:col-span-8 space-y-6">
            {selectedArticle ? (
              <RetroCard title={`INTEL_REPORT :: ${selectedArticle.id.toUpperCase()}`} status="CLASSIFIED">
                <div className="space-y-6">
                  <div className="space-y-2 border-b border-neon-green/20 pb-4">
                    <h2 className="text-3xl font-black uppercase tracking-tighter leading-none animate-glitch">
                      {selectedArticle.title}
                    </h2>
                    <div className="text-[10px] font-bold text-neon-pink uppercase tracking-widest">
                      Classification: SECRET_CLEARANCE_REQUIRED
                    </div>
                  </div>
                  {selectedArticle.videoUrl && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-neon-green/60 uppercase">
                        <Play className="size-3" /> Visual_Aids_Attached
                      </div>
                      <div className="border-2 border-neon-green/30 overflow-hidden bg-black">
                        <AspectRatio ratio={16 / 9}>
                          <iframe
                            src={selectedArticle.videoUrl}
                            className="w-full h-full grayscale brightness-75 contrast-125"
                            allowFullScreen
                          />
                        </AspectRatio>
                      </div>
                    </div>
                  )}
                  <div className="prose prose-invert max-w-none">
                    <p className="text-sm leading-relaxed text-neon-green/90 font-mono whitespace-pre-wrap">
                      {selectedArticle.content}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-neon-green/20 flex flex-col sm:flex-row gap-4">
                    <button className="retro-button flex-1 flex items-center justify-center gap-2 text-xs">
                      <Terminal className="size-4" /> RE_DECRYPT_SOURCE
                    </button>
                    <button className="retro-button flex-1 flex items-center justify-center gap-2 border-neon-pink text-neon-pink text-xs">
                      <Book className="size-4" /> EXPORT_TO_PDF_LOCAL
                    </button>
                  </div>
                </div>
              </RetroCard>
            ) : (
              <div className="h-full flex items-center justify-center border-4 border-dashed border-neon-green/20 p-12">
                <div className="text-center space-y-4">
                  <Book className="size-16 text-neon-green/20 mx-auto" />
                  <div className="text-sm font-bold uppercase text-neon-green/30 tracking-widest">
                    Awaiting_Intelligence_Selection...
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </RetroLayout>
  );
}