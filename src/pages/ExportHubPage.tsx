import React, { useState } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { Github, Share2, Globe, Rocket, ShieldCheck, CheckCircle2, Copy, ExternalLink, Cloud, Lock, Eye, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/ui-store';
import { motion, AnimatePresence } from 'framer-motion';
export function ExportHubPage() {
  const isPublic = useUIStore(s => s.isPublic);
  const togglePublic = useUIStore(s => s.togglePublic);
  const addLog = useUIStore(s => s.addLog);
  const [activeStep, setActiveStep] = useState(0);
  const [isPropagating, setIsPropagating] = useState(false);
  const steps = [
    {
      id: 'repo',
      title: 'Initialize Repository',
      icon: Github,
      desc: 'Create a new repository on GitHub to host your A1633 Archive.',
      action: 'https://github.com/new'
    },
    {
      id: 'env',
      title: 'Configure Codespaces',
      icon: Cloud,
      desc: 'Set up your cloud development environment for A9 toolchains.',
      action: 'https://github.com/codespaces'
    },
    {
      id: 'deploy',
      title: 'Global Propagation',
      icon: Globe,
      desc: 'Publish your workstation as a globally accessible web portal.',
      action: null
    }
  ];
  const handleToggleVisibility = () => {
    setIsPropagating(true);
    addLog(`NETWORK: PROPAGATING_GLOBAL_VISIBILITY -> ${!isPublic ? 'PUBLIC' : 'PRIVATE'}`);
    setTimeout(() => {
      togglePublic();
      setIsPropagating(false);
      toast.success(isPublic ? "ARCHIVE_RESTRICTED" : "ARCHIVE_PUBLISHED", {
        description: isPublic ? "System visibility set to INTERNAL_ONLY." : "Archive is now live on the global grid.",
        className: "border-neon-pink text-neon-pink bg-retro-black"
      });
    }, 2000);
  };
  const copyUrl = () => {
    navigator.clipboard.writeText("https://retrobyte-a1633.github.io/");
    toast.info("DEPLOYMENT_URL_COPIED");
  };
  return (
    <RetroLayout>
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold retro-glow uppercase tracking-tighter flex items-center gap-3">
              <Rocket className="size-10 text-neon-pink animate-pulse" /> Export Hub
            </h1>
            <p className="text-xs text-neon-pink/60 uppercase font-bold tracking-[0.2em]">Deployment & Synchronization Suite v2.0</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 border-2 border-neon-green px-3 py-1 bg-neon-green/5 text-[10px] font-bold uppercase">
              <ShieldCheck className="size-3" /> Build: PASSING
            </div>
            <div className="flex items-center gap-2 border-2 border-neon-pink px-3 py-1 bg-neon-pink/5 text-[10px] font-bold uppercase animate-pulse">
              <Globe className="size-3" /> CDN: ACTIVE
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <RetroCard title="DEPLOYMENT_STEPPER" status={`${activeStep + 1}/3`}>
              <div className="space-y-10 py-4">
                <div className="relative flex justify-between">
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-neon-green/20 -translate-y-1/2 z-0" />
                  {steps.map((step, idx) => (
                    <button
                      key={step.id}
                      onClick={() => setActiveStep(idx)}
                      className={cn(
                        "relative z-10 size-10 flex items-center justify-center border-2 transition-all duration-300",
                        activeStep >= idx ? "border-neon-green bg-retro-black text-neon-green" : "border-neon-green/20 bg-retro-black text-neon-green/30",
                        activeStep === idx && "shadow-[0_0_15px_rgba(0,255,65,0.5)] scale-110"
                      )}
                    >
                      <step.icon className="size-5" />
                      {activeStep > idx && <CheckCircle2 className="absolute -top-2 -right-2 size-4 bg-retro-black text-neon-green" />}
                    </button>
                  ))}
                </div>
                <div className="bg-black/40 border-2 border-neon-green/30 p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-neon-green/10 p-3 border-2 border-neon-green/30">
                      {React.createElement(steps[activeStep].icon, { className: "size-8 text-neon-green" })}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold uppercase text-neon-green">{steps[activeStep].title}</h3>
                      <p className="text-xs opacity-60 uppercase font-bold">{steps[activeStep].desc}</p>
                    </div>
                  </div>
                  <div className="pt-4 flex gap-4">
                    {steps[activeStep].action ? (
                      <a
                        href={steps[activeStep].action || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="retro-button flex items-center gap-2 text-xs"
                      >
                        <ExternalLink className="size-4" /> INITIALIZE_EXTERNAL_LINK
                      </a>
                    ) : (
                      <button
                        onClick={() => setActiveStep(0)}
                        className="retro-button flex items-center gap-2 text-xs"
                      >
                        <RefreshCw className="size-4" /> RESTART_SEQUENCE
                      </button>
                    )}
                    <button
                      onClick={() => setActiveStep(prev => (prev + 1) % steps.length)}
                      className="retro-button border-neon-pink text-neon-pink shadow-none text-xs"
                    >
                      NEXT_PHASE
                    </button>
                  </div>
                </div>
              </div>
            </RetroCard>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RetroCard title="RESOURCE_BUNDLER" variant="warning">
                <div className="space-y-4">
                  <p className="text-[10px] leading-relaxed uppercase opacity-80">
                    Compile all verified modding scripts and guides into a single, offline-ready deployment pack.
                  </p>
                  <div className="bg-black/50 p-3 border border-yellow-400/30 font-mono text-[9px] text-yellow-400 space-y-1">
                    <div>{">"} BUNDLING: ARCHIVE_V1.2.0</div>
                    <div>{">"} INCLUDES: SCRIPT_FORGE.PS1</div>
                    <div>{">"} INCLUDES: KERNEL_INTEL.PDF</div>
                  </div>
                  <button className="retro-button w-full border-yellow-400 text-yellow-400 shadow-none text-[10px] flex items-center justify-center gap-2">
                    <Share2 className="size-4" /> GENERATE_BUNDLE
                  </button>
                </div>
              </RetroCard>
              <RetroCard title="SYNC_STATUS" status="ONLINE">
                <div className="space-y-4 text-[10px] uppercase font-bold">
                  <div className="flex justify-between border-b border-neon-green/10 pb-1">
                    <span>Last Sync:</span>
                    <span className="text-neon-green">2_MIN_AGO</span>
                  </div>
                  <div className="flex justify-between border-b border-neon-green/10 pb-1">
                    <span>Registry:</span>
                    <span className="text-neon-green">GH_CONTAINER</span>
                  </div>
                  <div className="flex justify-between border-b border-neon-green/10 pb-1">
                    <span>Build_Hash:</span>
                    <span className="text-neon-pink opacity-60">7F2A1B9</span>
                  </div>
                  <div className="flex items-center gap-2 text-neon-green mt-2">
                    <div className="size-1.5 bg-neon-green rounded-full animate-ping" />
                    LISTENING_FOR_WEBHOOKS...
                  </div>
                </div>
              </RetroCard>
            </div>
          </div>
          <div className="lg:col-span-4 space-y-8">
            <RetroCard title="VISIBILITY_CONTROL" variant="danger" status={isPublic ? "PUBLIC" : "PRIVATE"}>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "size-16 border-2 flex items-center justify-center transition-all duration-500",
                    isPublic ? "border-neon-pink bg-neon-pink/10 shadow-[0_0_20px_rgba(210,9,250,0.4)]" : "border-white/20 bg-white/5"
                  )}>
                    {isPublic ? <Eye className="size-10 text-neon-pink animate-pulse" /> : <Lock className="size-10 text-white/40" />}
                  </div>
                  <div>
                    <h3 className={cn("text-xl font-black uppercase tracking-tighter", isPublic ? "text-neon-pink" : "text-white/40")}>
                      {isPublic ? "Global Grid" : "Restricted"}
                    </h3>
                    <p className="text-[10px] opacity-60 font-bold uppercase">Visibility: {isPublic ? 'BROADCASTING' : 'OFFLINE'}</p>
                  </div>
                </div>
                <div className="relative">
                  <AnimatePresence>
                    {isPropagating && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        exit={{ opacity: 0 }}
                        className="absolute -top-1 left-0 h-1 bg-neon-pink z-10"
                      />
                    )}
                  </AnimatePresence>
                  <button
                    onClick={handleToggleVisibility}
                    disabled={isPropagating}
                    className={cn(
                      "retro-button w-full flex items-center justify-center gap-2 py-4 shadow-none hover:shadow-none transition-all",
                      isPublic ? "border-white text-white" : "border-neon-pink text-neon-pink",
                      isPropagating && "opacity-50"
                    )}
                  >
                    {isPropagating ? <RefreshCw className="size-4 animate-spin" /> : isPublic ? <Lock className="size-4" /> : <Globe className="size-4" />}
                    {isPublic ? "REVOKE_PUBLIC_ACCESS" : "PROPAGATE_TO_GLOBAL_GRID"}
                  </button>
                </div>
                {isPublic && (
                  <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-500">
                    <div className="text-[9px] uppercase font-bold text-neon-pink opacity-60">Live Deployment URL</div>
                    <div className="flex gap-1">
                      <code className="flex-1 bg-black/50 border border-neon-pink/30 p-2 text-[9px] text-neon-pink truncate font-mono">
                        retrobyte-a1633.github.io
                      </code>
                      <button onClick={copyUrl} className="bg-neon-pink text-white p-2">
                        <Copy className="size-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </RetroCard>
            <RetroCard title="CI_CICD_STATUS" status="PASSING">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="size-2 bg-neon-green rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neon-green">Build Pipeline Success</span>
                </div>
                <div className="space-y-2">
                  {[
                    { label: 'Linting', status: 'OK' },
                    { label: 'Type Check', status: 'OK' },
                    { label: 'Unit Tests', status: '45/45' },
                    { label: 'E2E Suite', status: '12/12' }
                  ].map(stat => (
                    <div key={stat.label} className="flex justify-between text-[9px] font-mono border-b border-white/5 pb-1">
                      <span className="opacity-50">{stat.label}</span>
                      <span className="text-neon-green font-bold">{stat.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </RetroCard>
          </div>
        </div>
      </div>
    </RetroLayout>
  );
}