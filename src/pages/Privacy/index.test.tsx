import { render, screen, waitFor } from '@testing-library/react';

import PrivacyLoader from '.';

jest.mock('./Privacy', () => () => <>Privacy</>);

it('lazy loads Privacy', async () => {
  render(<PrivacyLoader />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
  expect(screen.getByText('Privacy')).toBeInTheDocument();
});
