import CircularProgress from '@mui/material/CircularProgress';
import { lazy, Suspense } from 'react';

const ConfirmDownload = lazy(() => import('./ConfirmDownload'));

export default function ConfirmDownloadLoader() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <ConfirmDownload />
    </Suspense>
  );
}
