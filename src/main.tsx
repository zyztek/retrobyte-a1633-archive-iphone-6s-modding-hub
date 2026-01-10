import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
import { ScriptGenPage } from '@/pages/ScriptGenPage'
import { ArchivesPage } from '@/pages/ArchivesPage'
import { GuideDetailPage } from '@/pages/GuideDetailPage'
import { ModRepoPage } from '@/pages/ModRepoPage'
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/script-forge",
    element: <ScriptGenPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/archives",
    element: <ArchivesPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/archives/:slug",
    element: <GuideDetailPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/repo",
    element: <ModRepoPage />,
    errorElement: <RouteErrorBoundary />,
  }
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
)