import { render, screen, waitFor } from '@testing-library/react';

import InvalidLinkLoader from '.';

jest.mock('./InvalidLink', () => () => <>InvalidLink</>);

it('lazy loads InvalidLink', async () => {
  render(<InvalidLinkLoader />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
  expect(screen.getByText('InvalidLink')).toBeInTheDocument();
});
