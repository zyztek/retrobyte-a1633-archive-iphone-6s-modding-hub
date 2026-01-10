import React, { useState } from 'react';
import { RetroLayout } from '@/components/layout/RetroLayout';
import { RetroCard } from '@/components/ui/retro-card';
import { useScriptStore } from '@/store/script-store';
import { generatePowerShellScript, ScriptOptions } from '@/lib/script-templates';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Copy, Check, Download } from 'lucide-react';
import { toast } from 'sonner';
export function ScriptGenPage() {
  const options = useScriptStore(s => s.options);
  const toggleOption = useScriptStore(s => s.toggleOption);
  const [copied, setCopied] = useState(false);
  const scriptBody = generatePowerShellScript(options);
  const handleCopy = () => {
    navigator.clipboard.writeText(scriptBody);
    setCopied(true);
    toast.success("Script copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };
  const handleDownload = () => {
    const blob = new Blob([scriptBody], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'A1633_Mod_Setup.ps1';
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloading .ps1 script...");
  };
  const labels: Record<keyof ScriptOptions, string> = {
    installDrivers: "Install USBDK Drivers",
    installiTunes: "Install iTunes (WinGet)",
    downloadPaler1n: "Fetch Paler1n CLI",
    downloadCheckra1n: "Get Rufus (Bootable)",
    fetchIPSW: "Download iOS 15.8.3 IPSW",
    backupDevice: "Initialize Backup Script"
  };
  return (
    <RetroLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold retro-glow uppercase tracking-tighter">Script Forge</h1>
          <div className="flex gap-2">
            <button onClick={handleCopy} className="retro-button flex gap-2 items-center">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              COPY_CODE
            </button>
            <button onClick={handleDownload} className="retro-button flex gap-2 items-center border-neon-pink text-neon-pink">
              <Download className="w-4 h-4" /> SAVE_.PS1
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <RetroCard title="CONFIGURATION">
              <div className="space-y-6">
                <div className="space-y-4">
                  {(Object.keys(options) as Array<keyof ScriptOptions>).map((key) => (
                    <div key={key} className="flex items-center space-x-3 group cursor-pointer" onClick={() => toggleOption(key)}>
                      <Checkbox 
                        id={key} 
                        checked={options[key]} 
                        className="border-neon-green data-[state=checked]:bg-neon-green data-[state=checked]:text-retro-black"
                      />
                      <Label 
                        htmlFor={key} 
                        className="text-sm uppercase tracking-tight cursor-pointer group-hover:text-neon-pink transition-colors"
                      >
                        {labels[key]}
                      </Label>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-neon-pink/10 border border-neon-pink/30 text-[10px] text-neon-pink leading-tight uppercase">
                  Notice: Ensure you have administrative privileges on your Windows host before executing the generated script.
                </div>
              </div>
            </RetroCard>
          </div>
          <div className="lg:col-span-8">
            <RetroCard title="POWERSHELL_OUTPUT" className="h-full">
              <div className="bg-black/50 p-4 border border-neon-green/30 font-mono text-xs overflow-x-auto h-[500px] scrollbar-thin">
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