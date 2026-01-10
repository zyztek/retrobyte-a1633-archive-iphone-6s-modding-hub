import React, { useState, useMemo, useEffect, useRef } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { TWEAK_AI_QUIZ } from '@shared/extended-data';
import { MOD_REPOSITORY } from '@shared/archive-data';
import { Brain, RefreshCw, Target, Cpu, Activity, Database, Zap } from 'lucide-react';
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
  const [neuralLogs, setNeuralLogs] = useState<string[]>([]);
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  const generateNeuralLog = () => {
    const activations = ['ReLU', 'Sigmoid', 'Softmax', 'Tanh'];
    const layer = Math.floor(Math.random() * 64);
    const tensor = Array.from({ length: 4 }, () => Math.random().toFixed(4)).join(', ');
    const loss = (Math.random() * 0.1).toFixed(6);
    return `[L${layer}] ACT:${activations[Math.floor(Math.random() * activations.length)]} | TENSOR:[${tensor}] | LOSS:${loss}`;
  };
  const handleSelect = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    if (step < TWEAK_AI_QUIZ.length - 1) {
      setStep(step + 1);
    } else {
      setIsProcessing(true);
      addLog("NEURAL_SYNC: Initializing TensorFlow.js_Lite environment...");
      let logCount = 0;
      const logInterval = setInterval(() => {
        setNeuralLogs(prev => [generateNeuralLog(), ...prev].slice(0, 15));
        logCount++;
        if (logCount === 20) clearInterval(logInterval);
      }, 150);
      timeoutRef.current = setTimeout(() => {
        setIsProcessing(false);
        setShowResult(true);
        addLog("ORACLE_SYNC: Model_Generalization successful. Loss_Optimization at peak.");
      }, 3500);
    }
  };
  const reset = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setStep(0);
    setAnswers({});
    setShowResult(false);
    setIsProcessing(false);
    setNeuralLogs([]);
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
            <p className="text-xs text-neon-pink uppercase font-bold tracking-widest">Neural_Weights_v6.0 :: Singularity_Net</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <RetroCard title="NEURAL_PROBE" status={isProcessing ? "LEARNING" : "READY"}>
              <AnimatePresence mode="wait">
                {isProcessing ? (
                  <motion.div key="processing" className="py-12 flex flex-col items-center gap-8">
                    <div className="relative size-32">
                      <motion.div
                        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-4 border-dashed border-neon-pink rounded-full opacity-50"
                      />
                      <div className="absolute inset-4 border-2 border-neon-pink rounded-full flex items-center justify-center bg-neon-pink/5">
                        <Zap className="size-12 text-neon-pink animate-pulse" />
                      </div>
                    </div>
                    <div className="w-full space-y-4">
                      <div className="text-center text-[10px] font-black text-neon-pink uppercase tracking-[0.3em]">Optimizing_Loss_Function...</div>
                      <div className="h-48 bg-black/80 border border-neon-pink/30 p-3 font-mono text-[8px] text-neon-pink/80 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 pointer-events-none" />
                        {neuralLogs.map((log, i) => (
                          <div key={i} className="animate-in fade-in slide-in-from-left-1 duration-200">
                            {log}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : !showResult ? (
                  <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                    <div className="space-y-2">
                      <div className="text-[10px] font-bold text-neon-pink uppercase opacity-60">Step {step + 1} of {TWEAK_AI_QUIZ.length}</div>
                      <h2 className="text-2xl font-bold uppercase tracking-tight">{currentQuestion.text}</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {currentQuestion.options.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => handleSelect(currentQuestion.id, opt.value)}
                          className="retro-button text-left border-neon-pink text-neon-pink py-6 group relative"
                        >
                          <span className="text-lg font-bold italic relative z-10">:: {opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="bg-neon-pink/10 border-2 border-neon-pink p-6 flex items-center gap-6">
                      <Activity className="size-16 text-neon-pink" />
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold uppercase text-neon-pink tracking-tighter">Singularity Analysis Complete</h2>
                        <div className="text-[9px] font-black uppercase text-neon-pink/60">Model_Generalization: 99.4% | Loss: 0.000421</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {recommendations.map((mod) => (
                        <div key={mod.name} className="border-2 border-neon-pink/30 p-4 bg-black/40 hover:border-neon-pink transition-all">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-sm font-black text-neon-pink italic uppercase">{mod.name}</span>
                            <span className="text-[9px] bg-neon-pink text-white px-1 font-bold">{mod.confidence}%</span>
                          </div>
                          <p className="text-[10px] opacity-70 uppercase font-bold leading-tight mb-2">{mod.description}</p>
                          <div className="text-[8px] text-neon-pink/40 font-mono italic">WEIGHT_ID: {Math.random().toString(16).slice(2, 8)}</div>
                        </div>
                      ))}
                    </div>
                    <button onClick={reset} className="retro-button w-full flex items-center justify-center gap-2">
                      <RefreshCw className="size-4" /> RE_CALIBRATE_MODEL
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </RetroCard>
          </div>
          <div className="lg:col-span-4 space-y-6">
            <RetroCard title="MODEL_STATS" variant="danger">
              <div className="space-y-4 text-[10px] font-mono">
                <div className="flex justify-between"><span>TENSORS:</span> <span className="text-neon-pink">1,024</span></div>
                <div className="flex justify-between"><span>ACTIVATION:</span> <span className="text-neon-pink">RELU_6</span></div>
                <div className="flex justify-between"><span>LEARNING_RATE:</span> <span className="text-neon-pink">0.001</span></div>
                <div className="flex justify-between"><span>EPOCHS:</span> <span className="text-neon-pink">256</span></div>
              </div>
            </RetroCard>
            <RetroCard title="ORACLE_INSIGHT">
              <p className="text-[10px] leading-relaxed uppercase opacity-80 italic font-bold text-neon-pink">
                "Our neural network maps the specific power-draw curves of the A9's Twister cores to suggest tweaks that balance visual fidelity with thermal overhead."
              </p>
            </RetroCard>
          </div>
        </div>
      </div>
    </RetroLayout>
  );
}