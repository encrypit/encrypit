import { render, screen, waitFor } from '@testing-library/react';

import ErrorBoundaryLoader from '.';

jest.mock('./ErrorBoundary', () => () => <>ErrorBoundary</>);

it('lazy loads ErrorBoundary', async () => {
  render(<ErrorBoundaryLoader />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
  expect(screen.getByText('ErrorBoundary')).toBeInTheDocument();
});
