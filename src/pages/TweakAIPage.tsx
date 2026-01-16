import React, { useState, useMemo, useEffect, useRef } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { TWEAK_AI_QUIZ } from '@shared/extended-data';
import { MOD_REPOSITORY } from '@shared/archive-data';
import { Brain, RefreshCw, ListFilter, Target, Cpu, Activity, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useUIStore } from '@/store/ui-store';
export function TweakAIPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const addLog = useUIStore(s => s.addLog);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  const handleSelect = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    if (step < TWEAK_AI_QUIZ.length - 1) {
      setStep(step + 1);
    } else {
      setIsProcessing(true);
      addLog("NEURAL_SYNC: Processing Tweak_Decision_Matrix...");
      timeoutRef.current = setTimeout(() => {
        setIsProcessing(false);
        setShowResult(true);
        addLog("ORACLE_SYNC: Analysis complete.");
      }, 3000);
    }
  };
  const reset = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setStep(0);
    setAnswers({});
    setShowResult(false);
    setIsProcessing(false);
  };
  const recommendations = useMemo(() => {
    if (!showResult) return [];
    const goal = answers.goal ?? 'stable';
    return MOD_REPOSITORY.filter(mod => {
      if (goal === 'aesthetic') return mod.type === 'UI' || mod.type === 'Tool';
      if (goal === 'gaming') return mod.type === 'System' || mod.type === 'Tool' || mod.type === 'Experimental';
      if (goal === 'stable') return mod.type === 'Battery' || mod.type === 'System';
      return true;
    }).map(m => ({ ...m, confidence: Math.floor(Math.random() * 15) + 85 }));
  }, [showResult, answers]);
  const currentQuestion = TWEAK_AI_QUIZ[step];
  return (
    <RetroLayout>
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Brain className="size-10 text-neon-pink animate-pulse" />
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold retro-glow uppercase tracking-tighter text-neon-pink">Tweak Oracle</h1>
            <p className="text-xs text-neon-pink uppercase font-bold tracking-widest">ML-Lite Prediction Engine v5.0</p>
          </div>
        </div>
        <RetroCard title="NEURAL_PROBE" status={isProcessing ? "THINKING" : "ACTIVE"}>
          <AnimatePresence mode="wait">
            {isProcessing ? (
              <motion.div 
                key="processing" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center gap-8"
              >
                <div className="relative size-32">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-4 border-dashed border-neon-pink rounded-full"
                  />
                  <div className="absolute inset-4 border-2 border-neon-pink/30 rounded-full flex items-center justify-center bg-neon-pink/5">
                    <Cpu className="size-12 text-neon-pink animate-pulse" />
                  </div>
                </div>
                <div className="space-y-4 text-center w-full max-w-xs">
                  <div className="text-[10px] font-black text-neon-pink uppercase tracking-[0.3em]">Loading_Tensors...</div>
                  <div className="h-1 bg-neon-pink/20 w-full overflow-hidden border border-neon-pink/30">
                    <motion.div 
                      initial={{ x: '-100%' }} 
                      animate={{ x: '100%' }} 
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} 
                      className="h-full bg-neon-pink w-1/3" 
                    />
                  </div>
                  <div className="font-mono text-[8px] text-neon-pink opacity-60 uppercase italic">
                    MATCHING_WEIGHTS: 0x{Math.random().toString(16).slice(2, 8).toUpperCase()}
                  </div>
                </div>
              </motion.div>
            ) : !showResult ? (
              <motion.div 
                key="quiz" 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="space-y-8"
              >
                <div className="space-y-2">
                  <div className="text-[10px] font-bold text-neon-pink uppercase opacity-60">Step {step + 1} of {TWEAK_AI_QUIZ.length}</div>
                  <h2 className="text-2xl font-bold uppercase tracking-tight">{currentQuestion.text}</h2>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {currentQuestion.options.map((opt) => (
                    <button 
                      key={opt.value} 
                      onClick={() => handleSelect(currentQuestion.id, opt.value)} 
                      className="retro-button text-left border-neon-pink text-neon-pink py-6 relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-neon-pink/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                      <span className="text-lg font-bold italic relative z-10">:: {opt.label}</span>
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
                <div className="bg-neon-pink/10 border-2 border-neon-pink p-6 flex flex-col md:flex-row items-center gap-6 shadow-[inset_0_0_20px_rgba(210,9,250,0.1)]">
                  <Activity className="size-16 text-neon-pink" />
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl font-bold uppercase text-neon-pink">Singularity Analysis Complete</h2>
                    <div className="text-[10px] font-black uppercase text-neon-pink/60">Profile: N71AP_OPTIMIZED_{(answers.goal ?? 'stable').toUpperCase()}</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendations.map((mod) => (
                    <div key={mod.name} className="border-2 border-neon-pink/30 p-4 bg-black/40 hover:border-neon-pink transition-all group relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-neon-pink/5 rotate-45 translate-x-8 -translate-y-8" />
                      <div className="flex justify-between items-start mb-2 relative z-10">
                        <span className="text-sm font-black text-neon-pink italic uppercase tracking-tighter">{mod.name}</span>
                        <span className="text-[9px] bg-neon-pink text-white px-1 font-bold">{mod.confidence}% MATCH</span>
                      </div>
                      <p className="text-[10px] opacity-70 uppercase font-bold leading-tight mb-4 relative z-10">{mod.description}</p>
                      <div className="flex gap-2 items-center relative z-10">
                         <div className="size-1.5 bg-neon-pink rounded-full animate-pulse" />
                         <span className="text-[8px] opacity-50 uppercase font-black">Neural_Verification_Passed</span>
                      </div>
                    </div>
                  ))}
                  {recommendations.length === 0 && (
                    <div className="col-span-full py-8 text-center text-neon-pink/40 uppercase font-black italic">
                      NO_MATCHING_TWEAKS_FOUND
                    </div>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={reset} className="retro-button flex-1 flex items-center justify-center gap-2">
                    <RefreshCw className="size-4" /> NEW_ANALYSIS
                  </button>
                  <Link to="/repo" className="retro-button flex-1 border-neon-pink text-neon-pink text-center flex items-center justify-center gap-2">
                    <Target className="size-4" /> ACCESS_RESOURCES
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </RetroCard>
      </div>
    </RetroLayout>
  );
}