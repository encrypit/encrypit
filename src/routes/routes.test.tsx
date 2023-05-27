import routes from './routes';

it('matches snapshot', () => {
  expect(routes).toMatchInlineSnapshot(`
    <Route
      element={<Layout />}
      path="/"
    >
      <Route
        errorElement={<ErrorBoundary />}
      >
        <Route
          element={<HomeLoader />}
          index={true}
        />
        <Route
          element={<NotFoundLoader />}
          index={true}
        />
      </Route>
    </Route>
  `);
});
