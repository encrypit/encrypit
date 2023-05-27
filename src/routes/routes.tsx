import { Route } from 'react-router-dom';
import Layout from 'src/components/Layout';
import ErrorBoundary from 'src/pages/ErrorBoundary';
import Home from 'src/pages/Home';
import NotFound from 'src/pages/NotFound';

const routes = (
  <Route path="/" element={<Layout />}>
    <Route errorElement={<ErrorBoundary />}>
      <Route index element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Route>
);

export default routes;
