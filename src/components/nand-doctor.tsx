import React, { useState, useEffect, useRef } from 'react';
import { RetroCard } from './ui/retro-card';
import { Activity, AlertTriangle, Terminal, Cpu, Database, ChevronRight, Tooltip as TooltipIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
const JC_COMMANDS = [
  "AT+READ_SYSCFG",
  "AT+WRITE_SERIAL=G6VQD...",
  "BGA110_AUTH_CHALLENGE",
  "NAND_RE_PARTITION_BLOCK_0",
  "SYNC_WIFI_MAC_ADDR",
  "UNBIND_WIFI_MODULE"
];
const ERROR_CODES: Record<string, string> = {
  "0x4005": "Restore failed: Unexpected DFU disconnect during kernel handshake.",
  "0x4013": "Hardware fault: NAND I/O failure or defective Lightning data lines.",
  "0x4014": "Handshake timeout: Bootrom refused the checkm8 payload."
};
export function NANDDoctor() {
  const [scanning, setScanning] = useState(false);
  const [sectors, setSectors] = useState<number[]>([]);
  const [health, setHealth] = useState(100);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const totalSectors = 100;
  const intervalRef = useRef<number | null>(null);
  const addConsoleLog = (msg: string) => {
    setConsoleLogs(prev => [`[JC-P7] ${msg}`, ...prev].slice(0, 8));
  };
  const startScan = () => {
    if (scanning) return;
    setScanning(true);
    setSectors([]);
    setHealth(100);
    addConsoleLog("INITIALIZING BGA110 PROTOCOL...");
    let current = 0;
    intervalRef.current = window.setInterval(() => {
      setSectors(prev => [...prev, Math.random() > 0.95 ? 2 : 1]);
      current++;
      if (current % 10 === 0) addConsoleLog(JC_COMMANDS[Math.floor(Math.random() * JC_COMMANDS.length)]);
      if (current >= totalSectors) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setScanning(false);
        setHealth(Math.floor(85 + Math.random() * 15));
        addConsoleLog("SCAN_COMPLETE: PERSISTING_LOGS");
      }
    }, 40);
  };
  return (
    <RetroCard title="NAND_DOCTOR_V2" status={scanning ? "PROBING" : "STABLE"}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="grid grid-cols-10 gap-1 bg-black/50 p-2 border border-neon-green/30 aspect-square">
              {Array.from({ length: totalSectors }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-full w-full transition-colors duration-200",
                    sectors[i] === 1 ? "bg-neon-green shadow-[0_0_5px_rgba(0,255,65,0.5)]" :
                    sectors[i] === 2 ? "bg-neon-pink animate-pulse" :
                    "bg-neon-green/10"
                  )}
                />
              ))}
            </div>
            <div className="flex justify-between items-center text-[8px] font-bold text-neon-green/40 uppercase">
              <span>BGA110_DIE_MAP</span>
              <span>ADDR: 0x00000 - 0xFFFFF</span>
            </div>
          </div>
          <div className="space-y-4 flex flex-col">
            <div className="flex-1 bg-black/80 border border-neon-green/30 p-3 font-mono text-[9px] text-neon-green/80 overflow-hidden relative">
              <div className="absolute top-1 right-2 text-neon-pink text-[7px] font-bold">UART_115200</div>
              <div className="space-y-1">
                {consoleLogs.map((log, i) => (
                  <div key={i} className="animate-in fade-in slide-in-from-bottom-1 duration-200 truncate">
                    {log}
                  </div>
                ))}
                {scanning && <div className="animate-pulse">_</div>}
              </div>
            </div>
            <div className="bg-neon-pink/5 border border-neon-pink/20 p-2 space-y-2">
              <div className="text-[9px] font-black text-neon-pink uppercase flex items-center gap-2">
                <AlertTriangle className="size-3" /> Restore_Error_Atlas
              </div>
              <div className="flex flex-wrap gap-2">
                <TooltipProvider>
                  {Object.keys(ERROR_CODES).map(code => (
                    <Tooltip key={code}>
                      <TooltipTrigger asChild>
                        <div className="px-1 border border-neon-pink text-[9px] cursor-help hover:bg-neon-pink hover:text-white transition-colors">
                          {code}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="bg-retro-black border border-neon-pink text-neon-pink text-[10px] uppercase font-bold max-w-[200px]">
                        {ERROR_CODES[code]}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Health', val: `${health}%`, icon: Activity },
            { label: 'Die_Temp', val: '32°C', icon: Cpu },
            { label: 'Bad_Blocks', val: sectors.filter(s => s === 2).length, icon: Database },
            { label: 'Protocol', val: 'BGA110', icon: Terminal }
          ].map(stat => (
            <div key={stat.label} className="border-2 border-neon-green/20 p-2 bg-black/40">
              <div className="text-[8px] uppercase font-bold opacity-40">{stat.label}</div>
              <div className="text-lg font-black text-neon-green font-mono">{scanning ? "..." : stat.val}</div>
            </div>
          ))}
        </div>
        <button
          onClick={startScan}
          disabled={scanning}
          className="retro-button w-full flex items-center justify-center gap-2 group"
        >
          <Terminal className={cn("size-4", scanning && "animate-spin")} /> 
          {scanning ? "COMMUNICATING_VIA_JC_P7..." : "INITIALIZE_JC_P7_DIAGNOSTICS"}
        </button>
      </div>
    </RetroCard>
  );
}