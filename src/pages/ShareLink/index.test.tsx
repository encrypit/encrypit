import { render, screen, waitFor } from '@testing-library/react';

import ShareLinkLoader from '.';

jest.mock('./ShareLink', () => () => <>ShareLink</>);

it('lazy loads ShareLink', async () => {
  render(<ShareLinkLoader />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
  expect(screen.getByText('ShareLink')).toBeInTheDocument();
});
