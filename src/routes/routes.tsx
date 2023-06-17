import { Route } from 'react-router-dom';
import Layout from 'src/components/Layout';
import ConfirmDownload from 'src/pages/ConfirmDownload';
import DownloadFile from 'src/pages/DownloadFile';
import ErrorBoundary from 'src/pages/ErrorBoundary';
import InvalidLink from 'src/pages/InvalidLink';
import NotFound from 'src/pages/NotFound';
import ShareLink from 'src/pages/ShareLink';
import UploadFile from 'src/pages/UploadFile';

import { fileKeyLoader } from './loaders';

const routes = (
  <Route path="/" element={<Layout />}>
    <Route errorElement={<ErrorBoundary />}>
      <Route index element={<UploadFile />} />
      <Route path="/download" element={<DownloadFile />} />
      <Route path="/invalid" element={<InvalidLink />} />
      <Route path="/share" element={<ShareLink />} />
      <Route path="/404" element={<NotFound />} />
      <Route
        path="/:fileKey"
        element={<ConfirmDownload />}
        loader={fileKeyLoader}
      />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Route>
);

export default routes;
