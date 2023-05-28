import { render } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { resetActions, store } from 'src/store';

export { store };
export { default as fetchMock } from 'jest-fetch-mock';
export let router: ReturnType<typeof createMemoryRouter>;

export function wrapper(props: { children?: ReactNode }) {
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

const mockFile = () =>
  new File([JSON.stringify({ ping: true })], 'ping.json', {
    type: 'application/json',
  });

export const mockFiles = (count = 2) => Array(count).fill(null).map(mockFile);

export const mockData = (files = mockFiles(1)) => ({
  dataTransfer: {
    files,
    items: files.map((file) => ({
      kind: 'file',
      type: file.type,
      getAsFile: () => file,
    })),
    types: ['Files'],
  },
});
