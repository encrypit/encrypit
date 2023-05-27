import CircularProgress from '@mui/material/CircularProgress';
import { lazy, Suspense } from 'react';

const Share = lazy(() => import('./Share'));

export default function ShareLoader() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Share />
    </Suspense>
  );
}
