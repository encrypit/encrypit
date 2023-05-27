import CircularProgress from '@mui/material/CircularProgress';
import { lazy, Suspense } from 'react';

const ErrorBoundary = lazy(() => import('./ErrorBoundary'));

export default function ErrorBoundaryLoader() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <ErrorBoundary />
    </Suspense>
  );
}
