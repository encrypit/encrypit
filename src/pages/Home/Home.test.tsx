import { screen } from '@testing-library/react';
import { renderWithProviders } from 'test/helpers';

import Home from './Home';

it('renders home', () => {
  renderWithProviders(<Home />);
  expect(
    screen.getByRole('heading', { level: 1, name: 'New file' })
  ).toBeInTheDocument();
});
