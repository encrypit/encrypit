import { render, screen, waitFor } from '@testing-library/react';

import ConfirmDownloadLoader from '.';

jest.mock('./ConfirmDownload', () => () => <>ConfirmDownload</>);

it('lazy loads ConfirmDownload', async () => {
  render(<ConfirmDownloadLoader />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
  expect(screen.getByText('ConfirmDownload')).toBeInTheDocument();
});
