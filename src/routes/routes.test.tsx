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
          element={<DownloadFileLoader />}
          path="/download"
        />
        <Route
          element={<InvalidLinkLoader />}
          path="/invalid"
        />
        <Route
          element={<ShareLinkLoader />}
          path="/share"
        />
        <Route
          element={<NotFoundLoader />}
          path="/404"
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
