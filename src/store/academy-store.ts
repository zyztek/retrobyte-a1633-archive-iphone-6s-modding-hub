import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AcademyTier } from '@shared/academy-data';
interface AcademyState {
  xp: number;
  completedModules: string[];
  unlockedTiers: AcademyTier[];
  addXp: (amount: number) => void;
  completeModule: (moduleId: string) => void;
  unlockTier: (tier: AcademyTier) => void;
  resetProgress: () => void;
}
export const useAcademyStore = create<AcademyState>()(
  persist(
    (set) => ({
      xp: 0,
      completedModules: [],
      unlockedTiers: ['LAMER'],
      addXp: (amount) => set((state) => ({ xp: state.xp + amount })),
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
      resetProgress: () => set({ xp: 0, completedModules: [], unlockedTiers: ['LAMER'] }),
    }),
    {
      name: 'a1633-academy-storage',
    }
  )
);
export const getRankByXp = (xp: number): { title: string; color: string } => {
  if (xp >= 1500) return { title: 'GOD_MODDER', color: 'text-neon-pink' };
  if (xp >= 500) return { title: 'PRO_OPERATOR', color: 'text-yellow-400' };
  return { title: 'LAMER_RECRUIT', color: 'text-neon-green' };
};