import { render, screen, waitFor } from '@testing-library/react';

import DownloadFileLoader from '.';

jest.mock('./DownloadFile', () => () => <>DownloadFile</>);

it('lazy loads DownloadFile', async () => {
  render(<DownloadFileLoader />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
  expect(screen.getByText('DownloadFile')).toBeInTheDocument();
});
