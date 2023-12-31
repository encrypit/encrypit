import routes from './routes';

it('matches snapshot', () => {
  expect(routes).toMatchInlineSnapshot(`
    <Route
      element={<Layout />}
      path="/"
    >
      <Route
        errorElement={<ErrorBoundaryLoader />}
      >
        <Route
          element={<UploadFileLoader />}
          index={true}
        />
        <Route
          element={<NotFoundLoader />}
          path="/404"
        />
        <Route
          element={<FAQLoader />}
          path="/faq"
        />
        <Route
          element={<DownloadFileLoader />}
          path="/download"
        />
        <Route
          element={<InvalidLinkLoader />}
          path="/invalid"
        />
        <Route
          element={<PrivacyLoader />}
          path="/privacy"
        />
        <Route
          element={<ShareLinkLoader />}
          path="/share"
        />
        <Route
          element={<SupportLoader />}
          path="/support"
        />
        <Route
          element={<ConfirmDownloadLoader />}
          loader={[Function]}
          path="/:fileKey"
        />
        <Route
          element={<NotFoundLoader />}
          path="*"
        />
      </Route>
    </Route>
  `);
});
