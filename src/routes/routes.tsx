import { Route } from 'react-router-dom';
import Layout from 'src/components/Layout';
import ConfirmDownload from 'src/pages/ConfirmDownload';
import Download from 'src/pages/Download';
import ErrorBoundary from 'src/pages/ErrorBoundary';
import NotFound from 'src/pages/NotFound';
import ShareLink from 'src/pages/ShareLink';
import UploadFile from 'src/pages/UploadFile';

const routes = (
  <Route path="/" element={<Layout />}>
    <Route errorElement={<ErrorBoundary />}>
      <Route index element={<UploadFile />} />
      <Route path="/download" element={<Download />} />
      <Route path="/share" element={<ShareLink />} />
      <Route path="/:fileKey" element={<ConfirmDownload />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Route>
);

export default routes;
