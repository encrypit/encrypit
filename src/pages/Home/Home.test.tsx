import { screen } from '@testing-library/react';
import { renderWithProviders } from 'test/helpers';

import Home from './Home';

it('renders home', () => {
  renderWithProviders(<Home />);
  expect(screen.getByText(/Welcome/)).toHaveTextContent('Welcome to Encrypit!');
});

it('renders GitHub link', () => {
  renderWithProviders(<Home />);
  expect(screen.getByText('Encrypit')).toHaveAttribute(
    'href',
    'https://github.com/encrypit/encrypit'
  );
});
