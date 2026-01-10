export type TestStatus = 'PASS' | 'FAIL' | 'SKIPPED';
export interface TestResult {
  id: string;
  name: string;
  suite: 'UNIT' | 'E2E' | 'INTEGRATION';
  status: TestStatus;
  duration: number;
  timestamp: string;
}
export interface CoverageStats {
  statements: number;
  branches: number;
  functions: number;
  lines: number;
}
export interface WorkflowRun {
  id: string;
  sha: string;
  trigger: string;
  status: 'SUCCESS' | 'FAILURE' | 'IN_PROGRESS';
  duration: string;
  timestamp: string;
}
export const CI_STATUS = 'PASSING';
export const UNIT_TESTS_SUMMARY = {
  total: 45,
  passed: 45,
  failed: 0,
  skipped: 0
};
export const E2E_TESTS_SUMMARY = {
  total: 12,
  passed: 12,
  failed: 0,
  skipped: 0
};
export const COVERAGE_DATA: CoverageStats = {
  statements: 98.4,
  branches: 94.2,
  functions: 100,
  lines: 98.8
};
export const WORKFLOW_HISTORY: WorkflowRun[] = [
  { id: 'wf-102', sha: '7f2a1b9', trigger: 'push', status: 'SUCCESS', duration: '4m 12s', timestamp: '2024-05-20T10:30:00Z' },
  { id: 'wf-101', sha: 'a1b2c3d', trigger: 'manual', status: 'SUCCESS', duration: '3m 58s', timestamp: '2024-05-19T22:15:00Z' },
  { id: 'wf-100', sha: 'e5f6g7h', trigger: 'push', status: 'SUCCESS', duration: '4m 05s', timestamp: '2024-05-19T14:45:00Z' }
];
export const MOCK_TEST_LOGS = [
  "[10:30:01] INITIATING VITEST RUNNER...",
  "[10:30:05] RUNNING src/tests/App.test.tsx (3 tests passed)",
  "[10:30:08] RUNNING src/tests/Navigation.e2e.ts (5 tests passed)",
  "[10:30:12] GENERATING COVERAGE REPORT...",
  "[10:30:15] ALL SUITES PASSED. TERMINATING_SUCCESSFULLY."
];