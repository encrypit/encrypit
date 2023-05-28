import CircularProgress from '@mui/material/CircularProgress';
import { lazy, Suspense } from 'react';

const Upload = lazy(() => import('./Upload'));

export default function UploadLoader() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Upload />
    </Suspense>
  );
}
