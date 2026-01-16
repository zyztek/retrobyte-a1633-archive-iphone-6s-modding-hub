import React, { useState, useEffect } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { RetroProgress } from '@/components/ui/retro-progress';
import { RetroTable } from '@/components/ui/retro-table';
import { useAcademyStore, getRankByXp } from '@/store/academy-store';
import { ACADEMY_MODULES, ACADEMY_QUIZZES, Module, QuizQuestion, AcademyTier } from '@shared/academy-data';
import { GraduationCap, Play, Lock, CheckCircle2, BrainCircuit, Globe, RefreshCw, UserCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
export function AcademyPage() {
  const xp = useAcademyStore(s => s.xp);
  const username = useAcademyStore(s => s.username);
  const setUsername = useAcademyStore(s => s.setUsername);
  const addXp = useAcademyStore(s => s.addXp);
  const completedModules = useAcademyStore(s => s.completedModules);
  const completeModule = useAcademyStore(s => s.completeModule);
  const unlockedTiers = useAcademyStore(s => s.unlockedTiers);
  const unlockTier = useAcademyStore(s => s.unlockTier);
  const isSyncing = useAcademyStore(s => s.isSyncing);
  const setSyncing = useAcademyStore(s => s.setSyncing);
  const lastSync = useAcademyStore(s => s.lastSync);
  const setLastSync = useAcademyStore(s => s.setLastSync);
  const [activeVideo, setActiveVideo] = useState<Module | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<QuizQuestion | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [showNameModal, setShowNameModal] = useState(false);
  const [tempName, setTempName] = useState(username);
  const rank = getRankByXp(xp);
  const fetchLeaderboard = async () => {
    try {
      const res = await fetch('/api/academy/leaderboard');
      const json = await res.json();
      if (json.success) setLeaderboard(json.data);
    } catch (e) {
      console.error("Leaderboard fetch failed:", e);
    }
  };
  const syncProgress = async () => {
    setSyncing(true);
    try {
      const res = await fetch('/api/academy/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          xp,
          rank: rank.title,
          lastUpdate: new Date().toISOString()
        })
      });
      const json = await res.json();
      if (json.success) {
        setLeaderboard(json.data);
        setLastSync(new Date().toLocaleTimeString());
        toast.success("MAINFRAME_SYNC_COMPLETE");
      }
    } catch (e) {
      toast.error("SYNC_CONNECTION_ERROR");
    } finally {
      setSyncing(false);
    }
  };
  useEffect(() => {
    fetchLeaderboard();
  }, []);
  const handleCompleteModule = (mod: Module) => {
    if (completedModules.includes(mod.id)) return;
    completeModule(mod.id);
    addXp(mod.xpValue);
    toast.success(`MODULE_LOGGED: +${mod.xpValue} XP`);
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
        toast.success(`TIER_UNLOCKED: ${nextTier}`);
      } else {
        addXp(100);
        toast.success("ASSESSMENT_PASSED");
      }
      setActiveQuiz(null);
      setQuizAnswer(null);
    } else {
      toast.error("CHALLENGE_FAILED: ACCESS_DENIED");
    }
  };
  const renderTierModules = (tier: AcademyTier) => {
    const isLocked = !unlockedTiers.includes(tier);
    const tierModules = ACADEMY_MODULES.filter(m => m.tier === tier);
    const tierQuiz = ACADEMY_QUIZZES.find(q => q.tier === tier);
    return (
      <div className={cn("space-y-6 relative", isLocked && "min-h-[300px]")}>
        {isLocked && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-retro-black/80 backdrop-blur-sm">
            <div className="text-center p-6 border-2 border-neon-pink">
              <Lock className="size-10 text-neon-pink mx-auto mb-2" />
              <div className="text-lg font-bold text-neon-pink uppercase tracking-widest">Sector_Locked</div>
              <p className="text-[10px] text-neon-pink/60 uppercase mt-2">Complete previous tier assessment</p>
            </div>
          </div>
        )}
        <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6", isLocked && "opacity-20 pointer-events-none")}>
          {tierModules.map(mod => (
            <RetroCard key={mod.id} title={mod.title} status={completedModules.includes(mod.id) ? "DONE" : "PENDING"}>
              <div className="space-y-4 flex flex-col h-full">
                <p className="text-xs uppercase font-bold flex-1 tracking-tight">{mod.description}</p>
                <div className="flex items-center justify-between pt-3">
                  <span className="text-[10px] font-bold text-neon-green">+{mod.xpValue} XP</span>
                  <div className="flex gap-2">
                    <button onClick={() => setActiveVideo(mod)} className="p-2 border-2 border-neon-green hover:bg-neon-green hover:text-black transition-colors">
                      <Play className="size-4" />
                    </button>
                    <button onClick={() => handleCompleteModule(mod)} disabled={completedModules.includes(mod.id)} className="retro-button py-1 px-3 text-[10px] shadow-none">
                      {completedModules.includes(mod.id) ? "LOGGED" : "COMPLETE"}
                    </button>
                  </div>
                </div>
              </div>
            </RetroCard>
          ))}
        </div>
        {!isLocked && tierQuiz && (
          <RetroCard title="TIER_CERTIFICATION" variant="danger">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <BrainCircuit className="size-12 text-neon-pink" />
              <div className="flex-1">
                <h3 className="text-lg font-bold uppercase text-neon-pink">Manual Verification Required</h3>
                <p className="text-xs opacity-70 uppercase">Confirm {tier} tier expertise to proceed to next sector.</p>
              </div>
              <button onClick={() => setActiveQuiz(tierQuiz)} className="retro-button border-neon-pink text-neon-pink shadow-[4px_4px_0px_rgba(210,9,250,1)] hover:shadow-none">START_EXAM</button>
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
              <GraduationCap className="size-10" />
            </div>
            <div>
              <h1 className="text-3xl font-bold retro-glow uppercase tracking-tighter">Academy_Node</h1>
              <div className="flex items-center gap-2 cursor-pointer hover:text-neon-pink transition-colors" onClick={() => setShowNameModal(true)}>
                <UserCircle className="size-3" />
                <span className="text-[10px] font-bold opacity-80 uppercase tracking-widest">{username}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <button onClick={syncProgress} disabled={isSyncing} className="retro-button flex items-center gap-2 border-neon-pink text-neon-pink shadow-[4px_4px_0px_rgba(210,9,250,1)] hover:shadow-none">
              {isSyncing ? <RefreshCw className="size-4 animate-spin" /> : <Globe className="size-4" />} SYNC_GRID
            </button>
            {lastSync && <span className="text-[8px] uppercase opacity-40 font-bold">Last Sync: {lastSync}</span>}
          </div>
        </div>
        <RetroProgress current={xp} max={2500} label="MAINFRAME_SYNC_DEPTH" variant={xp >= 1500 ? 'pink' : 'green'} />
        <Tabs defaultValue="LAMER" className="space-y-8">
          <TabsList className="bg-retro-black border-2 border-neon-green/30 h-auto flex flex-wrap gap-1 p-1">
            <TabsTrigger value="LAMER" className="px-6 py-2 uppercase font-black text-[10px] data-[state=active]:bg-neon-green/10">LAMER</TabsTrigger>
            <TabsTrigger value="PRO" className="px-6 py-2 uppercase font-black text-[10px] data-[state=active]:bg-neon-green/10">PRO</TabsTrigger>
            <TabsTrigger value="GOD" className="px-6 py-2 uppercase font-black text-[10px] data-[state=active]:bg-neon-green/10">GOD</TabsTrigger>
            <TabsTrigger value="LEADERBOARD" className="px-6 py-2 uppercase font-black text-[10px] border-neon-pink text-neon-pink data-[state=active]:bg-neon-pink/10">GLOBAL_RANKS</TabsTrigger>
          </TabsList>
          <TabsContent value="LAMER" className="mt-0">{renderTierModules('LAMER')}</TabsContent>
          <TabsContent value="PRO" className="mt-0">{renderTierModules('PRO')}</TabsContent>
          <TabsContent value="GOD" className="mt-0">{renderTierModules('GOD')}</TabsContent>
          <TabsContent value="LEADERBOARD" className="mt-0">
            <RetroCard title="GLOBAL_OPERATOR_GRID" status="LIVE_TELEMETRY">
              <div className="space-y-4">
                <RetroTable
                  headers={['RANK', 'OPERATOR', 'SYNC_DEPTH', 'CLEARANCE']}
                  rows={leaderboard.map((e, i) => [
                    <span className="font-bold text-neon-pink">#{i + 1}</span>,
                    <span className="uppercase font-bold tracking-tight">{e.username}</span>,
                    <span className="font-mono text-neon-green">{e.xp} XP</span>,
                    <span className="text-[9px] border px-2 py-0.5 border-neon-green/30 uppercase font-bold">{e.rank}</span>
                  ])}
                />
                <div className="text-[8px] text-center opacity-30 uppercase font-black tracking-[0.4em] py-4">
                  --- Global_Mainframe_Broadcasting_Active ---
                </div>
              </div>
            </RetroCard>
          </TabsContent>
        </Tabs>
        <Dialog open={showNameModal} onOpenChange={setShowNameModal}>
          <DialogContent className="bg-retro-black border-4 border-neon-green text-neon-green rounded-none">
            <DialogHeader><DialogTitle className="uppercase font-black italic tracking-widest border-b border-neon-green/30 pb-2">Identity_Registry</DialogTitle></DialogHeader>
            <div className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-black opacity-60">New_Operator_Callsign</Label>
                <Input
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value.toUpperCase().slice(0, 15))}
                  className="bg-black border-2 border-neon-green rounded-none focus-visible:ring-0 focus-visible:border-neon-pink transition-colors font-mono"
                  placeholder="ENTER_ID"
                />
              </div>
              <button
                onClick={() => { setUsername(tempName); setShowNameModal(false); }}
                className="retro-button w-full py-4 text-sm"
              >
                COMMIT_IDENTITY_SYNC
              </button>
            </div>
          </DialogContent>
        </Dialog>
        {/* Quiz Dialog */}
        <Dialog open={!!activeQuiz} onOpenChange={(open) => !open && setActiveQuiz(null)}>
          <DialogContent className="bg-retro-black border-4 border-neon-pink text-neon-pink rounded-none max-w-lg">
            <DialogHeader>
              <DialogTitle className="uppercase font-black italic tracking-widest border-b border-neon-pink/30 pb-2">Assessment_In_Progress</DialogTitle>
            </DialogHeader>
            {activeQuiz && (
              <div className="space-y-6 pt-4">
                <p className="text-lg font-bold uppercase tracking-tight">{activeQuiz.question}</p>
                <div className="grid grid-cols-1 gap-3">
                  {activeQuiz.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => setQuizAnswer(i)}
                      className={cn(
                        "w-full text-left p-4 border-2 transition-all uppercase font-bold text-xs",
                        quizAnswer === i ? "bg-neon-pink text-white border-neon-pink" : "border-neon-pink/20 hover:border-neon-pink/50 bg-black"
                      )}
                    >
                      {i + 1}. {opt}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleQuizSubmit}
                  disabled={quizAnswer === null}
                  className="retro-button w-full border-neon-pink text-neon-pink py-4 mt-4 disabled:opacity-30"
                >
                  EXECUTE_SUBMISSION
                </button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </RetroLayout>
  );
}