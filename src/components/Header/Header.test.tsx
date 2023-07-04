import { screen } from '@testing-library/react';
import { renderWithProviders } from 'test/helpers';

import Header from './Header';

it('renders header', () => {
  renderWithProviders(<Header />);
  expect(screen.getByRole('banner')).toHaveTextContent('Encrypit');
});

it('renders heading link', () => {
  renderWithProviders(<Header />);
  expect(screen.getByRole('link', { name: 'Encrypit' })).toHaveAttribute(
    'href',
    '/'
  );
});

it.each([
  ['Support', '/support'],
  ['Privacy', '/privacy'],
  ['GitHub', 'https://github.com/encrypit/encrypit'],
])('renders %p link', (label, link) => {
  renderWithProviders(<Header />);
  expect(screen.getByLabelText(label)).toHaveAttribute('href', link);
});
