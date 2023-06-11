import CircularProgress from '@mui/material/CircularProgress';
import { lazy, Suspense } from 'react';

const InvalidLink = lazy(() => import('./InvalidLink'));

export default function InvalidLinkLoader() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <InvalidLink />
    </Suspense>
  );
}
