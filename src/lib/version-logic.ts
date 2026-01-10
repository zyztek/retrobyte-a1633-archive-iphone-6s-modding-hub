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
    multiboot: 'READY',
    riskScore: 2,
    notes: "The Golden Era. CoreTrust bug is fully accessible without a jailbreak."
  },
  {
    version: "15.5 - 15.7.9",
    jailbreak: 'EXPLOITED',
    trollStore: 'INDIRECT',
    multiboot: 'READY',
    riskScore: 3,
    notes: "Requires Palera1n to install TrollStore helper. Kernel is hardening."
  },
  {
    version: "15.8 - 15.8.3",
    jailbreak: 'EXPLOITED',
    trollStore: 'INDIRECT',
    multiboot: 'EXPERIMENTAL',
    riskScore: 4,
    notes: "Latest A1633 firmware. Most secure, requires specific Palera1n CLI flags."
  }
];
export function getCapabilities(version: string): VersionStats | undefined {
  return IOS_VERSION_MATRIX.find(v => v.version.includes(version));
}