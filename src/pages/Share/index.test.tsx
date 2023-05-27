import { render, screen, waitFor } from '@testing-library/react';

import ShareLoader from '.';

jest.mock('./Share', () => () => <>Share</>);

it('lazy loads Share', async () => {
  render(<ShareLoader />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
  expect(screen.getByText('Share')).toBeInTheDocument();
});
