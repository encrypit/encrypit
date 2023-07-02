import CircularProgress from '@mui/material/CircularProgress';
import { lazy, Suspense } from 'react';

const Privacy = lazy(() => import('./Privacy'));

export default function PrivacyLoader() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Privacy />
    </Suspense>
  );
}
