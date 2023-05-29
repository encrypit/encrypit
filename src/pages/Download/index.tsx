import CircularProgress from '@mui/material/CircularProgress';
import { lazy, Suspense } from 'react';

const Download = lazy(() => import('./Download'));

export default function DownloadLoader() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Download />
    </Suspense>
  );
}
