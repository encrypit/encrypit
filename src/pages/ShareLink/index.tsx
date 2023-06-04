import CircularProgress from '@mui/material/CircularProgress';
import { lazy, Suspense } from 'react';

const ShareLink = lazy(() => import('./ShareLink'));

export default function ShareLinkLoader() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <ShareLink />
    </Suspense>
  );
}
