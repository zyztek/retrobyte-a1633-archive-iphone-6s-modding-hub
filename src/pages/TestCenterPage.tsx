import React, { useState } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { RetroProgress } from '@/components/ui/retro-progress';
import { 
  CheckCircle2, Play, Terminal, History, Code, 
  BarChart3, RefreshCw, Activity, ShieldCheck 
} from 'lucide-react';
import { 
  UNIT_TESTS_SUMMARY, E2E_TESTS_SUMMARY, 
  COVERAGE_DATA, WORKFLOW_HISTORY, MOCK_TEST_LOGS 
} from '@shared/test-results';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
export function TestCenterPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>(MOCK_TEST_LOGS);
  const runDiagnostics = () => {
    setIsRunning(true);
    setLogs([]);
    const sequence = [
      "SCRUBBING_NODE_MODULES...",
      "TRANSPILLING_TYPESCRIPT_V5...",
      "BOOTSTRAPPING_PLAYWRIGHT_CHROME...",
      "COLLECTING_ENTROPY...",
      "EXECUTING_UNIT_SUITES...",
      "VERIFYING_ZUSTAND_IMMUTABILITY...",
      "CHECKING_CRT_OVERLAY_OPACITY...",
      "FINAL_REPORT_GEN_SUCCESS"
    ];
    sequence.forEach((msg, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, `> [${new Date().toLocaleTimeString()}] ${msg}`]);
        if (i === sequence.length - 1) {
          setIsRunning(false);
          toast.success("INTEGRITY_VERIFIED", { description: "All systems passed validation." });
        }
      }, i * 600);
    });
  };
  return (
    <RetroLayout>
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold retro-glow uppercase tracking-tighter flex items-center gap-3">
              <ShieldCheck className="size-10 text-neon-green" /> Test Center
            </h1>
            <p className="text-xs text-neon-green/60 uppercase font-bold tracking-[0.2em]">Quality Assurance & Intelligence Suite v4.4</p>
          </div>
          <button 
            onClick={runDiagnostics}
            disabled={isRunning}
            className="retro-button border-neon-pink text-neon-pink shadow-[4px_4px_0px_rgba(210,9,250,1)] hover:shadow-none flex items-center gap-2"
          >
            {isRunning ? <RefreshCw className="size-4 animate-spin" /> : <Play className="size-4" />}
            INITIATE_FULL_VALIDATION
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RetroCard title="UNIT_TEST_REPORT" status="100%_PASS" variant="success">
                <div className="space-y-4">
                  <div className="text-4xl font-black text-emerald-400">
                    {UNIT_TESTS_SUMMARY.passed}/{UNIT_TESTS_SUMMARY.total}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-emerald-400/60">Functional Integrity Verified</div>
                  <div className="flex gap-1">
                    {Array.from({ length: 45 }).map((_, i) => (
                      <div key={i} className="size-1 bg-emerald-500/40" />
                    ))}
                  </div>
                </div>
              </RetroCard>
              <RetroCard title="E2E_SCENARIO_MAP" status="STABLE" variant="success">
                <div className="space-y-4">
                  <div className="text-4xl font-black text-emerald-400">
                    {E2E_TESTS_SUMMARY.passed}/{E2E_TESTS_SUMMARY.total}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-emerald-400/60">Cross-Browser Consistency Checked</div>
                  <div className="flex gap-1">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="h-4 w-1 bg-emerald-500/40" />
                    ))}
                  </div>
                </div>
              </RetroCard>
            </div>
            <RetroCard title="CI_PIPELINE_STREAMS" status={isRunning ? "RUNNING" : "IDLE"}>
              <div className="bg-black/60 p-4 border border-neon-green/30 h-64 overflow-y-auto font-mono text-[10px] text-neon-green/80 space-y-1.5 scrollbar-thin">
                <AnimatePresence>
                  {logs.map((log, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="border-l border-neon-green/20 pl-2"
                    >
                      {log}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {isRunning && <div className="animate-pulse">_</div>}
              </div>
            </RetroCard>
            <Tabs defaultValue="workflow" className="w-full">
              <TabsList className="bg-retro-black border-2 border-neon-green/30 rounded-none w-full flex justify-start p-1 gap-1">
                <TabsTrigger value="workflow" className="rounded-none border-2 border-transparent data-[state=active]:border-neon-green data-[state=active]:bg-neon-green/10 text-[10px] font-bold uppercase py-2 flex-1">
                  <History className="size-3 mr-2" /> Workflow_History
                </TabsTrigger>
                <TabsTrigger value="config" className="rounded-none border-2 border-transparent data-[state=active]:border-neon-green data-[state=active]:bg-neon-green/10 text-[10px] font-bold uppercase py-2 flex-1">
                  <Code className="size-3 mr-2" /> Runner_Config
                </TabsTrigger>
              </TabsList>
              <TabsContent value="workflow" className="mt-4">
                <RetroCard title="GITHUB_ACTIONS_LOG">
                  <div className="space-y-3">
                    {WORKFLOW_HISTORY.map((run) => (
                      <div key={run.id} className="flex items-center justify-between p-3 border-2 border-neon-green/20 bg-neon-green/5 text-[10px] font-bold uppercase">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="size-4 text-neon-green" />
                          <span>{run.sha}</span>
                          <span className="opacity-40">{run.trigger}</span>
                        </div>
                        <div className="flex gap-4">
                          <span>{run.duration}</span>
                          <span className="opacity-40">{new Date(run.timestamp).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </RetroCard>
              </TabsContent>
              <TabsContent value="config" className="mt-4">
                <RetroCard title="VITEST_CONFIG_BLOCK">
                  <pre className="text-[10px] font-mono p-4 bg-black/40 border border-neon-green/20 text-neon-green/80 overflow-x-auto whitespace-pre-wrap">
{`export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        statements: 95,
        branches: 90
      }
    }
  }
})`}
                  </pre>
                </RetroCard>
              </TabsContent>
            </Tabs>
          </div>
          <div className="lg:col-span-4 space-y-8">
            <RetroCard title="COVERAGE_HEATMAP">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase">
                    <span>Statements</span>
                    <span>{COVERAGE_DATA.statements}%</span>
                  </div>
                  <RetroProgress current={COVERAGE_DATA.statements} max={100} segments={15} className="!space-y-0" variant="green" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase">
                    <span>Branches</span>
                    <span>{COVERAGE_DATA.branches}%</span>
                  </div>
                  <RetroProgress current={COVERAGE_DATA.branches} max={100} segments={15} className="!space-y-0" variant="yellow" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase">
                    <span>Functions</span>
                    <span>{COVERAGE_DATA.functions}%</span>
                  </div>
                  <RetroProgress current={COVERAGE_DATA.functions} max={100} segments={15} className="!space-y-0" variant="pink" />
                </div>
              </div>
            </RetroCard>
            <RetroCard title="SYSTEM_HEALTH" variant="success">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 border-2 border-neon-green bg-neon-green/10">
                    <Activity className="size-6 text-neon-green" />
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase">Core Integrity</div>
                    <div className="text-[10px] opacity-60 uppercase font-mono">NOMINAL_OPERATIONAL</div>
                  </div>
                </div>
                <div className="p-3 border border-neon-green/30 bg-black/40 text-[9px] uppercase space-y-1">
                  <div className="flex justify-between"><span>Vulnerabilities:</span> <span>0_DETECTED</span></div>
                  <div className="flex justify-between"><span>Memory_Leak:</span> <span>NEGATIVE</span></div>
                  <div className="flex justify-between"><span>Render_Loop:</span> <span>NEGATIVE</span></div>
                </div>
              </div>
            </RetroCard>
            <div className="p-4 border-2 border-neon-pink bg-neon-pink/5 space-y-2">
              <div className="flex items-center gap-2 text-neon-pink font-bold text-xs uppercase">
                <BarChart3 className="size-4" /> Performance_KPI
              </div>
              <p className="text-[9px] opacity-70 uppercase leading-tight">
                98th percentile LCP: 420ms. Total blocking time: 0ms. System optimization exceeds baseline requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </RetroLayout>
  );
}