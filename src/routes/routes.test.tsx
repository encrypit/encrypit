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
          element={<Home />}
          index={true}
        />
      </Route>
    </Route>
  `);
});
