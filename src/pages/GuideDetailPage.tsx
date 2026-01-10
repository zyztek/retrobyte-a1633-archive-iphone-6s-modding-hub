import React, { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { ARCHIVE_GUIDES } from '@shared/archive-data';
import { ChevronLeft, Terminal, ShieldAlert, Zap } from 'lucide-react';
export function GuideDetailPage() {
  const { slug } = useParams();
  const guide = ARCHIVE_GUIDES.find(g => g.slug === slug);
  const documentId = useMemo(() => {
    return `A1633-${Math.floor(Math.random() * 9000) + 1000}`;
  }, []);
  if (!guide) return <Navigate to="/archives" replace />;
  return (
    <RetroLayout>
      <div className="space-y-6">
        <Link
          to="/archives"
          className="inline-flex items-center gap-2 text-xs hover:text-neon-pink transition-colors uppercase tracking-widest font-bold"
        >
          <ChevronLeft className="size-4" /> CD .. /ARCHIVES
        </Link>
        {guide.riskLevel && (
          <div className="flex gap-2 items-center mb-2 h-6">
            <span className="text-[10px] font-bold uppercase text-neon-pink shrink-0">DANGER_LEVEL:</span>
            <div className="flex gap-1 items-center">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`h-4 w-3 border transition-colors duration-300 ${
                    level <= (guide.riskLevel || 0) 
                      ? 'bg-neon-pink border-neon-pink animate-crt-flicker' 
                      : 'border-neon-pink/30'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
        <RetroCard
          title={`FILE: ${guide.slug.toUpperCase()}.DAT`}
          variant={guide.clearance === 'SECRET' ? 'danger' : 'default'}
          status={guide.clearance}
        >
          <div className="space-y-8 max-w-4xl">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-none animate-glitch">
                {guide.title}
              </h1>
              <div className="flex gap-4 text-[10px] opacity-60 uppercase font-bold">
                <span>Subject: {guide.category}</span>
                <span>ID: {documentId}</span>
              </div>
            </div>
            <div className="prose prose-invert max-w-none">
              <div className="p-4 border-l-4 border-neon-pink bg-neon-pink/5 text-sm mb-8">
                <div className="flex items-center gap-2 text-neon-pink font-bold mb-1 uppercase text-xs">
                  <ShieldAlert className="size-4" /> Classification Notice
                </div>
                This document contains {guide.clearance.toLowerCase()} information regarding the A1633 hardware profile.
                Unauthorized reproduction will result in system lockout.
              </div>
              <div className="text-lg leading-relaxed space-y-4">
                {guide.content.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-neon-green/60">
                  <Terminal className="size-4" /> Shell Execution Block
                </div>
                <div className="bg-black/50 border border-neon-green/30 p-4 font-mono text-xs overflow-x-auto">
                  <code className="block text-neon-green whitespace-nowrap">
                    $ sudo inject-payload --target A1633 --file {guide.slug}.bin<br />
                    $ verify-integrity --check-hash sha256
                  </code>
                </div>
              </div>
            </div>
          </div>
        </RetroCard>
      </div>
    </RetroLayout>
  );
}