import { render, screen, waitFor } from '@testing-library/react';

import DownloadLoader from '.';

jest.mock('./Download', () => () => <>Download</>);

it('lazy loads Download', async () => {
  render(<DownloadLoader />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
  expect(screen.getByText('Download')).toBeInTheDocument();
});
