export interface VersionStats {
  version: string;
  jailbreak: 'EXPLOITED' | 'VULNERABLE' | 'PATCHED';
  trollStore: 'NATIVE' | 'INDIRECT' | 'NONE';
  multiboot: string;
  riskScore: number;
  notes: string;
}
export const IOS_VERSION_MATRIX: VersionStats[] = [
  {
    version: "15.0 - 15.4.1",
    jailbreak: 'EXPLOITED',
    trollStore: 'NATIVE',
    multiboot: 'READY (KALI/EMU)',
    riskScore: 2,
    notes: "The Golden Era. CoreTrust bug is fully accessible. Partitioning is stable. Virtualization (QEMU) viable via Linux stack."
  },
  {
    version: "15.5 - 15.7.9",
    jailbreak: 'EXPLOITED',
    trollStore: 'INDIRECT',
    multiboot: 'READY (KALI/EMU)',
    riskScore: 3,
    notes: "Requires Palera1n for TrollStore. Kernel hardening is minimal. QEMU virtualization supported over pmOS base."
  },
  {
    version: "15.8 - 15.8.3",
    jailbreak: 'EXPLOITED',
    trollStore: 'INDIRECT',
    multiboot: 'EXPERIMENTAL (KALI/EMU)',
    riskScore: 5,
    notes: "Latest firmware. NAND wear warning: Rolling release cycles and heavy VM swaps show extreme cell fatigue."
  }
];
export function getCapabilities(version: string): VersionStats | undefined {
  return IOS_VERSION_MATRIX.find(v => v.version.includes(version));
}