import { render, screen, waitFor } from '@testing-library/react';

import FAQLoader from '.';

jest.mock('./FAQ', () => () => <>FAQ</>);

it('lazy loads FAQ', async () => {
  render(<FAQLoader />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
  expect(screen.getByText('FAQ')).toBeInTheDocument();
});
