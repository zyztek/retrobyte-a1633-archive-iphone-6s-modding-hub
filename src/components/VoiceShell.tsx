import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Terminal, Zap, ShieldAlert } from 'lucide-react';
import { useUIStore } from '@/store/ui-store';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
export function VoiceShell() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const addLog = useUIStore(s => s.addLog);
  const navigate = useNavigate();
  const handleCommand = useCallback((cmd: string) => {
    const clean = cmd.toLowerCase();
    addLog(`VOICE_CMD: ${clean.toUpperCase()}`);
    if (clean.includes('inject') || clean.includes('jailbreak')) {
      toast.info("COMMAND_ACCEPTED: Initializing Exploit Lab...");
      navigate('/exploit-lab');
    } else if (clean.includes('god') || clean.includes('godmode')) {
      toast.warning("AUTHORITY_OVERRIDE: Entering GodMode...");
      navigate('/godmode');
    } else if (clean.includes('archives')) {
      navigate('/archives');
    } else if (clean.includes('script') || clean.includes('forge')) {
      navigate('/script-forge');
    } else if (clean.includes('backup')) {
      toast.success("INITIATING_BACKUP_PROTOCOL");
    } else {
      toast.error("UNRECOGNIZED_VOICE_KEYWORD");
    }
  }, [addLog, navigate]);
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      handleCommand(text);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    if (isListening) recognition.start();
    else recognition.stop();
    return () => recognition.stop();
  }, [isListening, handleCommand]);
  return (
    <div className="relative">
      <div className="flex items-center gap-4 p-4 border-2 border-neon-green bg-retro-black/80 shadow-[4px_4px_0px_rgba(0,255,65,1)]">
        <button
          onClick={() => setIsListening(!isListening)}
          className={cn(
            "p-3 border-2 transition-all active:scale-95",
            isListening ? "bg-neon-pink border-neon-pink animate-pulse" : "border-neon-green text-neon-green"
          )}
        >
          {isListening ? <MicOff className="size-6 text-white" /> : <Mic className="size-6" />}
        </button>
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center gap-2 mb-1">
            <Terminal className="size-3 text-neon-green" />
            <span className="text-[9px] font-black uppercase tracking-widest opacity-60">Voice_Command_Link</span>
          </div>
          <div className="text-xs font-mono h-5 truncate italic text-neon-green/80">
            {isListening ? "Listening for keywords..." : transcript || "System idle. Awaiting voice input."}
          </div>
        </div>
        {isListening && (
          <div className="flex gap-1 items-end h-6 pb-1">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: [4, Math.random() * 20 + 4, 4] }}
                transition={{ duration: 0.3, repeat: Infinity }}
                className="w-0.5 bg-neon-pink"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}