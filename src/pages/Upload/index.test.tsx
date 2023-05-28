import { render, screen, waitFor } from '@testing-library/react';

import UploadLoader from '.';

jest.mock('./Upload', () => () => <>Upload</>);

it('lazy loads Upload', async () => {
  render(<UploadLoader />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
  expect(screen.getByText('Upload')).toBeInTheDocument();
});
