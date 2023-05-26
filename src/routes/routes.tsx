import { Route } from 'react-router-dom';
import Layout from 'src/components/Layout';
import ErrorBoundary from 'src/pages/ErrorBoundary';
import Home from 'src/pages/Home';

const routes = (
  <Route path="/" element={<Layout />}>
    <Route errorElement={<ErrorBoundary />}>
      <Route index element={<Home />} />
    </Route>
  </Route>
);

export default routes;
