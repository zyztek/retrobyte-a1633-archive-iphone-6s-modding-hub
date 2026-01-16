import '@/lib/errorReporter';
import React, { StrictMode, Suspense, lazy } from 'react';
declare global {
  interface Window {
    __ROOT__: import('react-dom/client').Root | null;
  }
}
import { enableMapSet } from "immer";
enableMapSet();
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css';
import { LoadingOverlay } from '@/components/ui/loading-overlay';
// Lazy loaded page components
const HomePage = lazy(() => import('@/pages/HomePage').then(m => ({ default: m.HomePage })));
const ScriptGenPage = lazy(() => import('@/pages/ScriptGenPage').then(m => ({ default: m.ScriptGenPage })));
const ArchivesPage = lazy(() => import('@/pages/ArchivesPage').then(m => ({ default: m.ArchivesPage })));
const GuideDetailPage = lazy(() => import('@/pages/GuideDetailPage').then(m => ({ default: m.GuideDetailPage })));
const ModRepoPage = lazy(() => import('@/pages/ModRepoPage').then(m => ({ default: m.ModRepoPage })));
const MultiBootPage = lazy(() => import('@/pages/MultiBootPage').then(m => ({ default: m.MultiBootPage })));
const PackageStoresPage = lazy(() => import('@/pages/PackageStoresPage').then(m => ({ default: m.PackageStoresPage })));
const EmuVaultPage = lazy(() => import('@/pages/EmuVaultPage').then(m => ({ default: m.EmuVaultPage })));
const TweakAIPage = lazy(() => import('@/pages/TweakAIPage').then(m => ({ default: m.TweakAIPage })));
const SystemLabPage = lazy(() => import('@/pages/SystemLabPage').then(m => ({ default: m.SystemLabPage })));
const GodModePage = lazy(() => import('@/pages/GodModePage').then(m => ({ default: m.GodModePage })));
const ExploitLabPage = lazy(() => import('@/pages/ExploitLabPage').then(m => ({ default: m.ExploitLabPage })));
const NetworkArsenalPage = lazy(() => import('@/pages/NetworkArsenalPage').then(m => ({ default: m.NetworkArsenalPage })));
const HackCamPage = lazy(() => import('@/pages/HackCamPage').then(m => ({ default: m.HackCamPage })));
const DocsVaultPage = lazy(() => import('@/pages/DocsVaultPage').then(m => ({ default: m.DocsVaultPage })));
const AcademyPage = lazy(() => import('@/pages/AcademyPage').then(m => ({ default: m.AcademyPage })));
const TestCenterPage = lazy(() => import('@/pages/TestCenterPage').then(m => ({ default: m.TestCenterPage })));
const ExportHubPage = lazy(() => import('@/pages/ExportHubPage').then(m => ({ default: m.ExportHubPage })));
const USBForgePage = lazy(() => import('@/pages/USBForgePage').then(m => ({ default: m.USBForgePage })));
const RemoteUSBPage = lazy(() => import('@/pages/RemoteUSBPage').then(m => ({ default: m.RemoteUSBPage })));
const IslandFakeoutPage = lazy(() => import('@/pages/IslandFakeoutPage').then(m => ({ default: m.IslandFakeoutPage })));
const LiveStreamPage = lazy(() => import('@/pages/LiveStreamPage').then(m => ({ default: m.LiveStreamPage })));
const ThemeAbyssPage = lazy(() => import('@/pages/ThemeAbyssPage').then(m => ({ default: m.ThemeAbyssPage })));
const queryClient = new QueryClient();
const router = createBrowserRouter([
  { path: "/", element: <HomePage />, errorElement: <RouteErrorBoundary /> },
  { path: "/script-forge", element: <ScriptGenPage />, errorElement: <RouteErrorBoundary /> },
  { path: "/archives", element: <ArchivesPage />, errorElement: <RouteErrorBoundary /> },
  { path: "/archives/:slug", element: <GuideDetailPage />, errorElement: <RouteErrorBoundary /> },
  { path: "/repo", element: <ModRepoPage />, errorElement: <RouteErrorBoundary /> },
  { path: "/multiboot", element: <MultiBootPage />, errorElement: <RouteErrorBoundary /> },
  { path: "/stores", element: <PackageStoresPage />, errorElement: <RouteErrorBoundary /> },
  { path: "/emuvault", element: <EmuVaultPage />, errorElement: <RouteErrorBoundary /> },
  { path: "/tweak-ai", element: <TweakAIPage />, errorElement: <RouteErrorBoundary /> },
  { path: "/system-lab", element: <SystemLabPage />, errorElement: <RouteErrorBoundary /> },
  { path: "/godmode", element: <GodModePage />, errorElement: <RouteErrorBoundary /> },
  { path: "/exploit-lab", element: <ExploitLabPage />, errorElement: <RouteErrorBoundary /> },
  { path: "/network-arsenal", element: <NetworkArsenalPage />, errorElement: <RouteErrorBoundary /> },
  { path: "/hack-cam", element: <HackCamPage />, errorElement: <RouteErrorBoundary /> },
  { path: "/academy", element: <AcademyPage />, errorElement: <RouteErrorBoundary /> },
  { path: "/docs-vault", element: <DocsVaultPage />, errorElement: <RouteErrorBoundary /> },
  { path: "/test-center", element: <TestCenterPage />, errorElement: <RouteErrorBoundary /> },
  { path: "/export-hub", element: <ExportHubPage />, errorElement: <RouteErrorBoundary /> },
  { path: "/usb-forge", element: <USBForgePage />, errorElement: <RouteErrorBoundary /> },
  { path: "/remote-ops", element: <RemoteUSBPage />, errorElement: <RouteErrorBoundary /> },
  { path: "/island-fakeout", element: <IslandFakeoutPage />, errorElement: <RouteErrorBoundary /> },
  { path: "/spectator", element: <LiveStreamPage />, errorElement: <RouteErrorBoundary /> },
  { path: "/themes", element: <ThemeAbyssPage />, errorElement: <RouteErrorBoundary /> }
]);
const container = document.getElementById('root')!;
if (!window.__ROOT__) {
  window.__ROOT__ = createRoot(container);
}
const root = window.__ROOT__!;
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Suspense fallback={<LoadingOverlay forcedState />}>
          <RouterProvider router={router} />
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
);
if (import.meta.hot) {
  import.meta.hot.accept();
}