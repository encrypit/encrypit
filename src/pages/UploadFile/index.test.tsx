import { render, screen, waitFor } from '@testing-library/react';

import UploadFileLoader from '.';

jest.mock('./UploadFile', () => () => <>UploadFile</>);

it('lazy loads UploadFile', async () => {
  render(<UploadFileLoader />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
  expect(screen.getByText('UploadFile')).toBeInTheDocument();
});
