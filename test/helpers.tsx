import { render } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { resetActions, store } from 'src/store';

export { store };

export let router: ReturnType<typeof createMemoryRouter>;

function wrapper(props: { children?: ReactNode }) {
  const routes = [
    {
      path: '/',
      element: <>{props.children}</>,
    },
    {
      path: '*',
      element: <></>,
    },
  ];

  router = createMemoryRouter(routes);
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

/**
 * @see {@link https://redux.js.org/usage/writing-tests#setting-up-a-reusable-test-render-function}
 */
export function renderWithProviders(ui: ReactElement) {
  return render(ui, { wrapper });
}

export function resetStore() {
  resetActions.forEach((resetAction) => store.dispatch(resetAction()));
}

export const fetch = jest.mocked((global.fetch = jest.fn()));
