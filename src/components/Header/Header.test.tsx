import { screen } from '@testing-library/react';
import { renderWithProviders } from 'test/helpers';

import Header from './Header';

it('renders header', () => {
  renderWithProviders(<Header />);
  expect(screen.getByRole('banner')).toHaveTextContent('MUI Template');
});

it('renders heading link', () => {
  renderWithProviders(<Header />);
  expect(screen.getByRole('link', { name: 'MUI Template' })).toHaveAttribute(
    'href',
    '/'
  );
});

it('renders GitHub link', () => {
  renderWithProviders(<Header />);
  expect(screen.getByLabelText('Open GitHub repository')).toHaveAttribute(
    'href',
    'https://github.com/remarkablemark/mui-template'
  );
});
