import React, { useState, useMemo } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { TWEAK_AI_QUIZ } from '@shared/extended-data';
import { MOD_REPOSITORY } from '@shared/archive-data';
import { Brain, RefreshCw, CheckCircle2, ListFilter, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
export function TweakAIPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const handleSelect = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    if (step < TWEAK_AI_QUIZ.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };
  const reset = () => {
    setStep(0);
    setAnswers({});
    setShowResult(false);
  };
  const recommendations = useMemo(() => {
    if (!showResult) return [];
    const goal = answers.goal;
    return MOD_REPOSITORY.filter(mod => {
      if (goal === 'aesthetic') return mod.type === 'UI' || mod.type === 'Tool';
      if (goal === 'gaming') return mod.type === 'System' || mod.type === 'Tool' || mod.type === 'Experimental';
      if (goal === 'stable') return mod.type === 'Battery' || mod.type === 'System';
      return true;
    }).slice(0, 4);
  }, [showResult, answers]);
  const currentQuestion = TWEAK_AI_QUIZ[step];
  return (
    <RetroLayout>
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Brain className="size-10 text-neon-pink animate-pulse" />
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold retro-glow uppercase tracking-tighter">TweakAI</h1>
            <p className="text-xs text-neon-pink uppercase font-bold">Neural Loadout Recommender v4.0.1</p>
          </div>
        </div>
        <RetroCard title="NEURAL_PROBE" status={showResult ? "PROCESSED" : "ANALYZING"}>
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <div className="text-[10px] font-bold text-neon-pink uppercase tracking-widest">Probe {step + 1} of {TWEAK_AI_QUIZ.length}</div>
                  <h2 className="text-2xl font-bold tracking-tight uppercase leading-none">{currentQuestion.text}</h2>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {currentQuestion.options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect(currentQuestion.id, opt.value)}
                      className="retro-button text-left border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-white py-6"
                    >
                      <span className="text-lg font-bold">:: {opt.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="bg-neon-pink/10 border-2 border-neon-pink p-6 text-center shadow-[inset_0_0_20px_rgba(210,9,250,0.2)]">
                  <CheckCircle2 className="size-12 text-neon-pink mx-auto mb-4" />
                  <h2 className="text-2xl font-bold uppercase mb-2">Analysis Complete</h2>
                  <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-neon-pink uppercase font-bold tracking-widest">
                    <Target className="size-3" /> Profile: A1633_{answers.goal?.toUpperCase()}_SPEC
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase border-b-2 border-neon-pink/30 pb-2 flex items-center gap-2">
                    <ListFilter className="size-4" /> Recommended Packages:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recommendations.map((mod) => (
                      <div key={mod.name} className="border-2 border-neon-pink/30 p-4 bg-black/40 hover:border-neon-pink/80 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <div className="text-sm font-bold text-neon-pink uppercase">{mod.name}</div>
                          <div className="text-[9px] bg-neon-pink/20 px-1 border border-neon-pink/30">{mod.type}</div>
                        </div>
                        <div className="text-[10px] opacity-70 uppercase leading-tight font-mono">{mod.description}</div>
                      </div>
                    ))}
                    {recommendations.length === 0 && (
                      <div className="col-span-2 py-8 text-center text-[10px] opacity-50 uppercase italic">
                        No specific packages found for this profile.
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/repo"
                    className="retro-button flex-1 text-center bg-neon-pink text-white flex items-center justify-center gap-2"
                  >
                    PROCEED_TO_REPO
                  </Link>
                  <button onClick={reset} className="retro-button flex items-center justify-center gap-2">
                    <RefreshCw className="size-4" /> RETRY_ANALYSIS
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </RetroCard>
      </div>
    </RetroLayout>
  );
}