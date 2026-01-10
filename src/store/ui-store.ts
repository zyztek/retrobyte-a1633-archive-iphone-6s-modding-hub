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
  actionLogs: ActionLog[];
  toggleVerbose: () => void;
  togglePublic: () => void;
  setLoading: (loading: boolean) => void;
  addLog: (message: string) => void;
  clearLogs: () => void;
}
export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isVerbose: true,
      isLoading: false,
      isPublic: false,
      actionLogs: [],
      toggleVerbose: () => set((state) => ({ isVerbose: !state.isVerbose })),
      togglePublic: () => set((state) => ({ isPublic: !state.isPublic })),
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
    }),
    {
      name: 'a1633-ui-storage',
      partialize: (state) => ({ isVerbose: state.isVerbose, isPublic: state.isPublic }),
    }
  )
);