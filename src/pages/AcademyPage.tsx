import React, { useState } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { RetroProgress } from '@/components/ui/retro-progress';
import { useAcademyStore, getRankByXp } from '@/store/academy-store';
import { ACADEMY_MODULES, ACADEMY_QUIZZES, Module, QuizQuestion, AcademyTier } from '@shared/academy-data';
import { GraduationCap, Play, Lock, CheckCircle2, Trophy, BrainCircuit, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
export function AcademyPage() {
  const xp = useAcademyStore(s => s.xp);
  const addXp = useAcademyStore(s => s.addXp);
  const completedModules = useAcademyStore(s => s.completedModules);
  const completeModule = useAcademyStore(s => s.completeModule);
  const unlockedTiers = useAcademyStore(s => s.unlockedTiers);
  const unlockTier = useAcademyStore(s => s.unlockTier);
  const isMobile = useIsMobile();
  const [activeVideo, setActiveVideo] = useState<Module | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<QuizQuestion | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const rank = getRankByXp(xp);
  const displayXp = Math.floor(xp);
  const handleCompleteModule = (mod: Module) => {
    if (completedModules.includes(mod.id)) return;
    completeModule(mod.id);
    addXp(mod.xpValue);
    toast.success(`MODULE_COMPLETE: +${mod.xpValue} XP`, {
      description: `Target acquired: ${mod.title}`,
      className: "border-neon-green text-neon-green bg-retro-black"
    });
  };
  const handleQuizSubmit = () => {
    if (activeQuiz === null || quizAnswer === null) return;
    if (quizAnswer === activeQuiz.correctIndex) {
      const tiers: AcademyTier[] = ['LAMER', 'PRO', 'GOD'];
      const currentIndex = tiers.indexOf(activeQuiz.tier);
      const nextTier = tiers[currentIndex + 1];
      if (nextTier && !unlockedTiers.includes(nextTier)) {
        unlockTier(nextTier);
        addXp(200);
        toast.success(`TIER_UNLOCKED: ${nextTier}`, {
          description: "New operational directives received.",
          className: "border-neon-pink text-neon-pink bg-retro-black"
        });
      } else {
        addXp(100);
        toast.success("QUIZ_PASSED: +100 XP");
      }
      setActiveQuiz(null);
      setQuizAnswer(null);
    } else {
      toast.error("AUTH_FAILURE", { description: "Incorrect response. Neural link rejected." });
    }
  };
  const renderTierModules = (tier: AcademyTier) => {
    const isLocked = !unlockedTiers.includes(tier);
    const tierModules = ACADEMY_MODULES.filter(m => m.tier === tier);
    const tierQuiz = ACADEMY_QUIZZES.find(q => q.tier === tier);
    return (
      <div className={cn("space-y-6 relative", isLocked && "min-h-[300px]")}>
        {isLocked && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-retro-black/80 backdrop-blur-sm border-2 border-dashed border-neon-green/20">
            <div className="text-center p-6 bg-retro-black border-2 border-neon-pink shadow-[0_0_20px_rgba(210,9,250,0.3)] max-w-[280px]">
              <Lock className="size-10 text-neon-pink mx-auto mb-2" />
              <div className="text-lg font-bold text-neon-pink uppercase tracking-tighter">Sector_Locked</div>
              <div className="text-[10px] uppercase font-bold text-neon-pink/60 mt-1 leading-tight">Complete Previous Tier Quiz</div>
            </div>
          </div>
        )}
        <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6", isLocked && "opacity-20 grayscale pointer-events-none")}>
          {tierModules.map(mod => (
            <RetroCard
              key={mod.id}
              title={mod.title}
              status={completedModules.includes(mod.id) ? "DONE" : "PENDING"}
              variant={completedModules.includes(mod.id) ? "success" : "default"}
              className="h-full"
            >
              <div className="space-y-4 flex flex-col h-full">
                <p className="text-[11px] md:text-sm opacity-80 flex-1 leading-snug uppercase font-bold">{mod.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-neon-green/10">
                  <span className="text-[10px] font-bold text-neon-green">+{mod.xpValue} XP</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveVideo(mod)}
                      className="p-2 border-2 border-neon-green hover:bg-neon-green hover:text-retro-black transition-all"
                      aria-label="Play Video"
                    >
                      <Play className="size-4" />
                    </button>
                    <button
                      onClick={() => handleCompleteModule(mod)}
                      disabled={completedModules.includes(mod.id)}
                      className={cn(
                        "retro-button py-1 px-3 text-[10px] shadow-none hover:shadow-none",
                        completedModules.includes(mod.id) && "opacity-50 pointer-events-none"
                      )}
                    >
                      {completedModules.includes(mod.id) ? "LOGGED" : "MARK_COMPLETE"}
                    </button>
                  </div>
                </div>
              </div>
            </RetroCard>
          ))}
        </div>
        {!isLocked && tierQuiz && (
          <RetroCard title="TIER_CERTIFICATION" variant="danger" status="AVAILABLE">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <BrainCircuit className="size-12 text-neon-pink shrink-0" />
              <div className="flex-1 space-y-2 text-center md:text-left">
                <h3 className="text-lg font-bold uppercase text-neon-pink tracking-tight">Level Up Assessment</h3>
                <p className="text-xs opacity-70 uppercase leading-snug">Verify {tier} proficiency to unlock advanced sectors.</p>
              </div>
              <button
                onClick={() => setActiveQuiz(tierQuiz)}
                className="retro-button w-full md:w-auto border-neon-pink text-neon-pink shadow-[4px_4px_0px_rgba(210,9,250,1)] hover:shadow-none"
              >
                START_EXAM
              </button>
            </div>
          </RetroCard>
        )}
      </div>
    );
  };
  return (
    <RetroLayout>
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-neon-green p-3 text-retro-black shadow-[0_0_20px_rgba(0,255,65,0.4)]">
              <GraduationCap className="size-8 md:size-10" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold retro-glow uppercase tracking-tighter leading-none">A1633_Academy</h1>
              <p className="text-[10px] md:text-xs text-neon-green uppercase font-bold tracking-[0.2em]">Knowledge Ascension</p>
            </div>
          </div>
          <RetroCard title="RANK_IDENT" className="mb-0 min-w-full md:min-w-[240px] shadow-[0_0_15px_rgba(0,255,65,0.1)]">
            <div className="flex items-center gap-4">
              <div className="size-12 border-2 border-neon-green flex items-center justify-center bg-neon-green/5 relative">
                <div className={cn("absolute inset-0 blur-md opacity-30", rank.color.replace('text', 'bg'))} />
                <Trophy className={cn("size-6 animate-pulse relative z-10", rank.color)} />
              </div>
              <div>
                <div className={cn("text-lg font-black tracking-tighter uppercase", rank.color)}>
                  {rank.title}
                </div>
                <div className="text-[10px] font-bold opacity-50 uppercase">ID: #4163</div>
              </div>
            </div>
          </RetroCard>
        </div>
        <RetroProgress
          current={displayXp}
          max={2500}
          segments={isMobile ? 12 : 30}
          label="Knowledge_Depth_Index"
          variant={xp >= 1500 ? 'pink' : xp >= 500 ? 'yellow' : 'green'}
          className="max-w-4xl"
        />
        <Tabs defaultValue="LAMER" className="space-y-8">
          <TabsList className="bg-retro-black border-2 border-neon-green/30 p-1 h-auto flex flex-wrap justify-start gap-1 w-full md:w-max">
            {['LAMER', 'PRO', 'GOD'].map(t => (
              <TabsTrigger
                key={t}
                value={t}
                className="flex-1 md:flex-none rounded-none border-2 border-transparent data-[state=active]:border-neon-green data-[state=active]:bg-neon-green/10 text-[9px] md:text-[10px] font-black uppercase tracking-widest px-4 md:px-8 py-2 md:py-3 transition-all"
              >
                {t} <span className="hidden sm:inline ml-1 opacity-50">[{unlockedTiers.includes(t as AcademyTier) ? 'OPEN' : 'LOCKED'}]</span>
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="LAMER" className="relative focus-visible:outline-none">{renderTierModules('LAMER')}</TabsContent>
          <TabsContent value="PRO" className="relative focus-visible:outline-none">{renderTierModules('PRO')}</TabsContent>
          <TabsContent value="GOD" className="relative focus-visible:outline-none">{renderTierModules('GOD')}</TabsContent>
        </Tabs>
        <Dialog open={!!activeVideo} onOpenChange={() => setActiveVideo(null)}>
          <DialogContent className="max-w-4xl bg-retro-black border-4 border-neon-green text-neon-green rounded-none p-0 overflow-hidden outline-none">
            <div className="bg-neon-green text-retro-black px-4 py-1.5 flex justify-between items-center font-bold text-xs uppercase">
              <span className="truncate mr-4">Video_Feed: {activeVideo?.title}</span>
              <button onClick={() => setActiveVideo(null)} className="hover:scale-110 transition-transform"><X className="size-4" /></button>
            </div>
            <div className="aspect-video w-full bg-black relative">
              <iframe
                src={activeVideo?.videoUrl}
                className="w-full h-full grayscale brightness-75 contrast-125"
                allowFullScreen
              />
              <div className="absolute inset-0 pointer-events-none border-[12px] md:border-[20px] border-black/20" />
            </div>
          </DialogContent>
        </Dialog>
        <Dialog open={!!activeQuiz} onOpenChange={() => setActiveQuiz(null)}>
          <DialogContent className="max-w-lg w-[95vw] bg-retro-black border-4 border-neon-pink text-neon-pink rounded-none p-6 md:p-8 max-h-[90vh] overflow-y-auto scrollbar-thin outline-none">
            <DialogHeader className="space-y-4">
              <DialogTitle className="text-2xl md:text-3xl font-bold tracking-tighter uppercase italic text-center">Certification_Exam</DialogTitle>
              <div className="p-4 border-2 border-neon-pink/30 bg-neon-pink/5 font-bold uppercase tracking-tight text-sm md:text-base text-center">
                {activeQuiz?.question}
              </div>
            </DialogHeader>
            <div className="space-y-3 mt-6">
              {activeQuiz?.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setQuizAnswer(i)}
                  className={cn(
                    "w-full text-left p-4 border-2 transition-all text-[11px] md:text-xs font-bold uppercase leading-tight",
                    quizAnswer === i
                      ? "bg-neon-pink text-white border-neon-pink"
                      : "border-neon-pink/30 hover:border-neon-pink bg-black/40"
                  )}
                >
                  <span className="opacity-50 mr-2">[{i + 1}]</span> {opt}
                </button>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                onClick={handleQuizSubmit}
                disabled={quizAnswer === null}
                className="retro-button flex-1 border-neon-pink text-neon-pink bg-neon-pink/10 hover:bg-neon-pink hover:text-white disabled:opacity-30 disabled:pointer-events-none"
              >
                SUBMIT_ANSWERS
              </button>
              <button onClick={() => setActiveQuiz(null)} className="retro-button flex-1 border-white/20 text-white/50 shadow-none hover:shadow-none">CANCEL</button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </RetroLayout>
  );
}