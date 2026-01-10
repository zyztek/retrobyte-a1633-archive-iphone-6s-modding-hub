import React, { useState } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { ARCHIVE_GUIDES } from '@shared/archive-data';
import { FileText, Search, FolderOpen, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
export function ArchivesPage() {
  const [search, setSearch] = useState("");
  const filteredGuides = ARCHIVE_GUIDES.filter(g => 
    g.title.toLowerCase().includes(search.toLowerCase()) ||
    g.category.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <RetroLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold retro-glow uppercase tracking-tighter">The Archives</h1>
            <p className="text-xs text-neon-green/60 uppercase">Clearance Required: CONFIDENTIAL</p>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neon-green/50" />
            <Input 
              placeholder="SEARCH_FILES..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-retro-black border-2 border-neon-green/50 rounded-none pl-10 focus-visible:ring-0 focus-visible:border-neon-green text-xs"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(['Initial Setup', 'Jailbreaking', 'Post-Install'] as const).map(category => (
            <RetroCard key={category} title={category.toUpperCase().replace(" ", "_")} status="SECURE">
              <div className="space-y-4">
                {filteredGuides.filter(g => g.category === category).map(guide => (
                  <Link 
                    to={`/archives/${guide.slug}`} 
                    key={guide.slug}
                    className="group flex items-start gap-3 p-2 border border-transparent hover:border-neon-green/30 hover:bg-neon-green/5 transition-all"
                  >
                    <div className="mt-1">
                      {guide.clearance === 'SECRET' ? (
                        <Lock className="size-4 text-neon-pink group-hover:animate-pulse" />
                      ) : (
                        <FileText className="size-4 text-neon-green" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-bold group-hover:text-neon-pink transition-colors">
                        {guide.title}
                      </div>
                      <div className="text-[10px] opacity-50 flex items-center gap-2">
                        <span>{guide.clearance}</span>
                        <span>��</span>
                        <span>A1633_REF_{guide.slug.slice(0, 4).toUpperCase()}</span>
                      </div>
                    </div>
                  </Link>
                ))}
                {filteredGuides.filter(g => g.category === category).length === 0 && (
                  <div className="text-[10px] opacity-30 italic py-4">NO_FILES_FOUND_IN_SECTOR</div>
                )}
              </div>
            </RetroCard>
          ))}
        </div>
      </div>
    </RetroLayout>
  );
}