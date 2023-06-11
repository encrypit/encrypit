import { render, screen } from '@testing-library/react';

import InvalidLink from './InvalidLink';

it('renders heading', () => {
  render(<InvalidLink />);
  expect(
    screen.getByRole('heading', { level: 1, name: 'File link invalid' })
  ).toBeInTheDocument();
});

it('renders paragraph', () => {
  render(<InvalidLink />);
  expect(
    screen.getByText(/The link is incomplete or incorrect./)
  ).toBeInTheDocument();
});
