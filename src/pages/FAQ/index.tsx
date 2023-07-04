import CircularProgress from '@mui/material/CircularProgress';
import { lazy, Suspense } from 'react';

const FAQ = lazy(() => import('./FAQ'));

export default function FAQLoader() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <FAQ />
    </Suspense>
  );
}
