import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AcademyTier } from '@shared/academy-data';
interface AcademyState {
  xp: number;
  username: string;
  completedModules: string[];
  unlockedTiers: AcademyTier[];
  isSyncing: boolean;
  lastSync: string | null;
  addXp: (amount: number) => void;
  setUsername: (name: string) => void;
  completeModule: (moduleId: string) => void;
  unlockTier: (tier: AcademyTier) => void;
  setSyncing: (status: boolean) => void;
  setLastSync: (time: string) => void;
  resetProgress: () => void;
}
const generateOperatorId = () => `OPERATOR_${Math.floor(Math.random() * 9000 + 1000)}`;
export const useAcademyStore = create<AcademyState>()(
  persist(
    (set) => ({
      xp: 0,
      username: generateOperatorId(),
      completedModules: [],
      unlockedTiers: ['LAMER'],
      isSyncing: false,
      lastSync: null,
      addXp: (amount) => set((state) => ({ xp: state.xp + amount })),
      setUsername: (name) => set({ username: name }),
      completeModule: (moduleId) =>
        set((state) => ({
          completedModules: state.completedModules.includes(moduleId)
            ? state.completedModules
            : [...state.completedModules, moduleId],
        })),
      unlockTier: (tier) =>
        set((state) => ({
          unlockedTiers: state.unlockedTiers.includes(tier)
            ? state.unlockedTiers
            : [...state.unlockedTiers, tier],
        })),
      setSyncing: (status) => set({ isSyncing: status }),
      setLastSync: (time) => set({ lastSync: time }),
      resetProgress: () => set({
        xp: 0,
        completedModules: [],
        unlockedTiers: ['LAMER'],
        username: generateOperatorId(),
        lastSync: null
      }),
    }),
    {
      name: 'a1633-academy-storage',
      partialize: (state) => ({
        xp: state.xp,
        username: state.username,
        completedModules: state.completedModules,
        unlockedTiers: state.unlockedTiers,
        lastSync: state.lastSync
      })
    }
  )
);
export const getRankByXp = (xp: number): { title: string; color: string } => {
  if (xp >= 1500) return { title: 'GOD_MODDER', color: 'text-neon-pink' };
  if (xp >= 500) return { title: 'PRO_OPERATOR', color: 'text-yellow-400' };
  return { title: 'LAMER_RECRUIT', color: 'text-neon-green' };
};