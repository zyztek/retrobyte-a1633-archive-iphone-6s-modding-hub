import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface ActionLog {
  id: string;
  message: string;
  timestamp: string;
}
interface UIState {
  isVerbose: boolean;
  isLoading: boolean;
  isPublic: boolean;
  isSingularityMode: boolean;
  isEternityMode: boolean;
  isOCAbyss: boolean;
  actionLogs: ActionLog[];
  toggleVerbose: () => void;
  togglePublic: () => void;
  setSingularityMode: (active: boolean) => void;
  setEternityMode: (active: boolean) => void;
  setOCAbyss: (active: boolean) => void;
  setLoading: (loading: boolean) => void;
  addLog: (message: string) => void;
  clearLogs: () => void;
  resetUI: () => void;
}
export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isVerbose: true,
      isLoading: false,
      isPublic: false,
      isSingularityMode: false,
      isEternityMode: false,
      isOCAbyss: false,
      actionLogs: [],
      toggleVerbose: () => set((state) => ({ isVerbose: !state.isVerbose })),
      togglePublic: () => set((state) => ({ isPublic: !state.isPublic })),
      setSingularityMode: (active) => set({ isSingularityMode: active }),
      setEternityMode: (active) => set({ isEternityMode: active }),
      setOCAbyss: (active) => set({ isOCAbyss: active }),
      setLoading: (loading) => set({ isLoading: loading }),
      addLog: (message) => set((state) => {
        const newLog: ActionLog = {
          id: Math.random().toString(36).substring(7),
          message,
          timestamp: new Date().toLocaleTimeString([], { hour12: false }),
        };
        return {
          actionLogs: [newLog, ...state.actionLogs].slice(0, 10)
        };
      }),
      clearLogs: () => set({ actionLogs: [] }),
      resetUI: () => set({
        isSingularityMode: false,
        isEternityMode: false,
        isOCAbyss: false,
        actionLogs: [],
        isPublic: false,
        isLoading: false
      }),
    }),
    {
      name: 'a1633-ui-storage',
      partialize: (state) => ({
        isVerbose: state.isVerbose,
        isPublic: state.isPublic,
        isSingularityMode: state.isSingularityMode,
        isEternityMode: state.isEternityMode,
        isOCAbyss: state.isOCAbyss
      }),
    }
  )
);