import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Terminal, AlertCircle, Trash2 } from 'lucide-react';
import { useUIStore } from '@/store/ui-store';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
export function VoiceShell() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(true);
  const addLog = useUIStore(s => s.addLog);
  const navigate = useNavigate();
  const recognitionRef = useRef<any>(null);
  const handleCommand = useCallback((cmd: string) => {
    const clean = cmd.toLowerCase();
    addLog(`VOICE_CMD: ${clean.toUpperCase()}`);
    if (clean.includes('reset') || clean.includes('purge') || clean.includes('clear')) {
      setTranscript("");
      addLog("VOICE_BUFFER_PURGED");
      toast.success("VOICE_BUFFER_CLEARED");
      return;
    }
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
    if (!SpeechRecognition) {
      setIsSupported(false);
    } else {
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
      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        if (event.error !== 'aborted') {
          addLog(`VOICE_ERROR: ${event.error.toUpperCase()}`);
          toast.error("VOICE_SYSTEM_FAILURE", { description: event.error });
        }
        setIsListening(false);
      };
      recognition.onend = () => {
        setIsListening(false);
      };
      recognitionRef.current = recognition;
    }
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // No-op
        }
      }
    };
  }, [addLog, handleCommand]);
  const toggleListening = () => {
    if (!isSupported || !recognitionRef.current) return;
    if (!isListening) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error("Speech recognition start failed", e);
        addLog("VOICE_SYS_FAIL: RECOGNITION_START_ERROR");
        setIsListening(false);
      }
    } else {
      try {
        recognitionRef.current.stop();
        setIsListening(false);
      } catch (e) {
        setIsListening(false);
      }
    }
  };
  return (
    <div className="relative">
      <div className={cn(
        "flex items-center gap-4 p-4 border-2 bg-retro-black/80 shadow-[4px_4px_0px_rgba(0,255,65,1)]",
        !isSupported ? "border-yellow-400/50 shadow-[4px_4px_0px_rgba(250,204,21,0.5)]" : "border-neon-green"
      )}>
        <button
          onClick={toggleListening}
          disabled={!isSupported}
          className={cn(
            "p-3 border-2 transition-all active:scale-95",
            !isSupported ? "border-white/10 text-white/10 cursor-not-allowed" :
            isListening ? "bg-neon-pink border-neon-pink animate-pulse" : "border-neon-green text-neon-green hover:bg-neon-green/10"
          )}
        >
          {isListening ? <MicOff className="size-6 text-white" /> : <Mic className="size-6" />}
        </button>
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              {isSupported ? (
                <Terminal className="size-3 text-neon-green" />
              ) : (
                <AlertCircle className="size-3 text-yellow-400" />
              )}
              <span className={cn(
                "text-[9px] font-black uppercase tracking-widest opacity-60",
                !isSupported && "text-yellow-400"
              )}>
                {isSupported ? "Voice_Command_Link" : "Compatibility_Error"}
              </span>
            </div>
            {transcript && (
              <button onClick={() => setTranscript("")} className="hover:text-neon-pink transition-colors">
                <Trash2 className="size-3" />
              </button>
            )}
          </div>
          <div className={cn(
            "text-xs font-mono h-5 truncate italic",
            !isSupported ? "text-yellow-400/80" : "text-neon-green/80"
          )}>
            {!isSupported
              ? "Browser does not support Voice protocols. Use Chrome/Edge."
              : isListening
                ? "Listening for keywords..."
                : transcript || "System idle. Awaiting voice input."}
          </div>
        </div>
        {isListening && isSupported && (
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