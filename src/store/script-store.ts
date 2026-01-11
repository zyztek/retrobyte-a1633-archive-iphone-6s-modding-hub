import { create } from 'zustand';
import { ScriptOptions } from '@/lib/script-templates';
interface ScriptState {
  options: ScriptOptions;
  toggleOption: (key: keyof ScriptOptions) => void;
  resetOptions: () => void;
}
const defaultOptions: ScriptOptions = {
  installDrivers: true,
  installiTunes: true,
  downloadPaler1n: true,
  downloadCheckra1n: false,
  fetchIPSW: false,
  backupDevice: false,
  genGitHubWorkflow: false,
  genDevContainer: false,
  includeReadmeGuides: false,
  setupCodespaceProxy: false,
};
export const useScriptStore = create<ScriptState>((set) => ({
  options: defaultOptions,
  toggleOption: (key) => set((state) => ({
    options: {
      ...state.options,
      [key]: !state.options[key]
    }
  })),
  resetOptions: () => set({ options: defaultOptions }),
}));