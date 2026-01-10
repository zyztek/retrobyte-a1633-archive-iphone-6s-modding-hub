export interface VersionStats {
  version: string;
  jailbreak: 'EXPLOITED' | 'VULNERABLE' | 'PATCHED';
  trollStore: 'NATIVE' | 'INDIRECT' | 'NONE';
  multiboot: 'READY' | 'EXPERIMENTAL' | 'LOCKED';
  riskScore: number;
  notes: string;
}
export const IOS_VERSION_MATRIX: VersionStats[] = [
  {
    version: "15.0 - 15.4.1",
    jailbreak: 'EXPLOITED',
    trollStore: 'NATIVE',
    multiboot: 'READY (KALI_CHROOT)',
    riskScore: 2,
    notes: "The Golden Era. CoreTrust bug is fully accessible. Partitioning is stable but still risks NAND wear."
  },
  {
    version: "15.5 - 15.7.9",
    jailbreak: 'EXPLOITED',
    trollStore: 'INDIRECT',
    multiboot: 'READY (KALI_CHROOT)',
    riskScore: 3,
    notes: "Requires Palera1n for TrollStore. Kernel hardening is minimal; Linux bootstrap is functional."
  },
  {
    version: "15.8 - 15.8.3",
    jailbreak: 'EXPLOITED',
    trollStore: 'INDIRECT',
    multiboot: 'EXPERIMENTAL (KALI_EXT)',
    riskScore: 5,
    notes: "Latest firmware. NAND wear warning: Rolling release cycles on iOS 15.8+ partitions show extreme cell fatigue."
  }
];
export function getCapabilities(version: string): VersionStats | undefined {
  return IOS_VERSION_MATRIX.find(v => v.version.includes(version));
}