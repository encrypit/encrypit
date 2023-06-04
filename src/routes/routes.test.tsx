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
          element={<UploadLoader />}
          index={true}
        />
        <Route
          element={<DownloadLoader />}
          path="/download"
        />
        <Route
          element={<ShareLinkLoader />}
          path="/share"
        />
        <Route
          element={<ConfirmDownloadLoader />}
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
