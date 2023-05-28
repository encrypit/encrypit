import { Route } from 'react-router-dom';
import Layout from 'src/components/Layout';
import ErrorBoundary from 'src/pages/ErrorBoundary';
import NotFound from 'src/pages/NotFound';
import Share from 'src/pages/Share';
import Upload from 'src/pages/Upload';

const routes = (
  <Route path="/" element={<Layout />}>
    <Route errorElement={<ErrorBoundary />}>
      <Route index element={<Upload />} />
      <Route path="/share" element={<Share />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Route>
);

export default routes;
