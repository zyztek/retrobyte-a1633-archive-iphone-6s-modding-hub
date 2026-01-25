import React, { useState } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { useScriptStore } from '@/store/script-store';
import { useUIStore } from '@/store/ui-store';
import { generatePowerShellScript, ScriptOptions } from '@/lib/script-templates';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Copy, Check, Download, Rocket, Terminal } from 'lucide-react';
import { toast } from 'sonner';
import { SCRIPT_PRESETS } from '@shared/extended-data';
import { cn } from '@/lib/utils';
export function ScriptGenPage() {
  const options = useScriptStore(s => s.options);
  const toggleOption = useScriptStore(s => s.toggleOption);
  const setOptions = useScriptStore(s => s.setOptions);
  const addLog = useUIStore(s => s.addLog);
  const [copied, setCopied] = useState(false);
  const scriptBody = generatePowerShellScript(options);
  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(scriptBody);
        setCopied(true);
        toast.success("CODE_COPIED_TO_CLIPBOARD");
        addLog("CLIPBOARD: Success via navigator.clipboard");
        setTimeout(() => setCopied(false), 2000);
      } else {
        throw new Error("Clipboard API not available");
      }
    } catch (err) {
      console.warn("Clipboard API failed, trying fallback...", err);
      try {
        const textArea = document.createElement("textarea");
        textArea.value = scriptBody;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        if (successful) {
          setCopied(true);
          toast.success("CODE_COPIED_TO_CLIPBOARD (FALLBACK)");
          addLog("CLIPBOARD: Success via execCommand fallback");
          setTimeout(() => setCopied(false), 2000);
        } else {
          throw new Error("execCommand failed");
        }
      } catch (fallbackErr) {
        addLog("CLIPBOARD_ERROR: All methods failed");
        toast.error("CLIPBOARD_ACCESS_DENIED", {
          description: "Please select and copy the code manually from the terminal window."
        });
      }
    }
  };
  const handleDownload = () => {
    try {
      const blob = new Blob([scriptBody], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'A1633_Mainframe_Setup.ps1';
      a.click();
      URL.revokeObjectURL(url);
      toast.success("DOWNLOADING_SETUP_SCRIPT");
      addLog("FILESYSTEM: Generated A1633_Mainframe_Setup.ps1");
    } catch (err) {
      addLog("DOWNLOAD_ERROR: Blob generation failed");
    }
  };
  const handleLoadPreset = (presetOptions: ScriptOptions) => {
    setOptions(presetOptions);
    toast.info("PRESET_LOADED_SUCCESSFULLY");
    addLog(`PRESET: Loaded config sector`);
  };
  const toolLabels: Partial<Record<keyof ScriptOptions, string>> = {
    installDrivers: "Install USBDK Drivers",
    installiTunes: "Install iTunes (WinGet)",
    downloadPaler1n: "Fetch Paler1n CLI",
    downloadCheckra1n: "Get Rufus (Bootable)",
    fetchIPSW: "Download iOS 15.8.3 IPSW",
    backupDevice: "Initialize Backup Script"
  };
  const deployLabels: Partial<Record<keyof ScriptOptions, string>> = {
    genGitHubWorkflow: "Generate GH-Pages Workflow",
    genDevContainer: "Create Codespace Container",
    includeReadmeGuides: "Include README Tutorials",
    setupCodespaceProxy: "Setup Cloud Proxy (socat)"
  };
  return (
    <RetroLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <Rocket className="size-8 text-neon-pink" />
            <h1 className="text-3xl font-bold retro-glow uppercase tracking-tighter">Script Forge</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={handleCopy} className="retro-button flex gap-2 items-center">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              COPY_CODE
            </button>
            <button onClick={handleDownload} className="retro-button flex gap-2 items-center border-neon-pink text-neon-pink shadow-[4px_4px_0px_rgba(210,9,250,1)] hover:shadow-none">
              <Download className="w-4 h-4" /> SAVE_.PS1
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <RetroCard title="SYSTEM_PRESETS" variant="warning">
              <div className="space-y-3">
                {SCRIPT_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleLoadPreset(preset.options)}
                    className="w-full text-left p-3 border-2 border-yellow-400/30 bg-black/40 hover:border-yellow-400 hover:bg-yellow-400/10 transition-all group"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[11px] font-black text-yellow-400 group-hover:retro-glow uppercase">{preset.name}</span>
                      <span className={cn(
                        "text-[8px] px-1 border",
                        preset.complexity === 'MAXIMUM' ? "border-neon-pink text-neon-pink" : "border-yellow-400 text-yellow-400"
                      )}>{preset.complexity}</span>
                    </div>
                    <p className="text-[9px] opacity-60 leading-tight uppercase font-bold">{preset.description}</p>
                  </button>
                ))}
              </div>
            </RetroCard>
            <RetroCard title="CORE_MOD_TOOLS">
              <div className="space-y-4">
                {(Object.keys(toolLabels) as Array<keyof ScriptOptions>).map((key) => (
                  <div key={key} className="flex items-center space-x-3 group cursor-pointer" onClick={() => toggleOption(key)}>
                    <Checkbox
                      id={key}
                      checked={options[key]}
                      className="border-neon-green data-[state=checked]:bg-neon-green data-[state=checked]:text-retro-black"
                    />
                    <Label htmlFor={key} className="text-[10px] md:text-xs uppercase tracking-tight cursor-pointer group-hover:text-neon-pink transition-colors font-bold">
                      {toolLabels[key]}
                    </Label>
                  </div>
                ))}
              </div>
            </RetroCard>
            <RetroCard title="DEPLOYMENT_EXTENSIONS" variant="danger">
              <div className="space-y-4">
                {(Object.keys(deployLabels) as Array<keyof ScriptOptions>).map((key) => (
                  <div key={key} className="flex items-center space-x-3 group cursor-pointer" onClick={() => toggleOption(key)}>
                    <Checkbox
                      id={key}
                      checked={options[key]}
                      className="border-neon-pink data-[state=checked]:bg-neon-pink data-[state=checked]:text-white"
                    />
                    <Label htmlFor={key} className="text-[10px] md:text-xs uppercase tracking-tight cursor-pointer group-hover:text-white transition-colors font-bold text-neon-pink">
                      {deployLabels[key]}
                    </Label>
                  </div>
                ))}
              </div>
            </RetroCard>
            <div className="p-3 bg-neon-pink/10 border border-neon-pink/30 text-[9px] text-neon-pink leading-tight uppercase font-bold italic">
              Notice: Ensure you have administrative privileges and GitHub CLI access for cloud orchestration features.
            </div>
          </div>
          <div className="lg:col-span-8">
            <RetroCard title="POWERSHELL_OUTPUT" className="h-full" status="DYNAMIC_GEN">
              <div className="bg-black/50 p-4 border border-neon-green/30 font-mono text-[10px] md:text-xs overflow-x-auto h-[600px] scrollbar-thin relative">
                <div className="absolute top-2 right-4 flex items-center gap-2 text-[9px] text-neon-green/40">
                  <Terminal className="size-3" /> UTF-8
                </div>
                <pre className="text-neon-green/90">
                  <code>{scriptBody}</code>
                </pre>
              </div>
            </RetroCard>
          </div>
        </div>
      </div>
    </RetroLayout>
  );
}