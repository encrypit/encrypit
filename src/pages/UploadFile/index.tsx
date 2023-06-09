import CircularProgress from '@mui/material/CircularProgress';
import { lazy, Suspense } from 'react';

const UploadFile = lazy(() => import('./UploadFile'));

export default function UploadFileLoader() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <UploadFile />
    </Suspense>
  );
}
