import CircularProgress from '@mui/material/CircularProgress';
import { lazy, Suspense } from 'react';

const DownloadFile = lazy(() => import('./DownloadFile'));

export default function DownloadFileLoader() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <DownloadFile />
    </Suspense>
  );
}
