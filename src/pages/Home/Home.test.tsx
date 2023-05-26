import { screen } from '@testing-library/react';
import { renderWithProviders } from 'test/helpers';

import Home from './Home';

it('renders home', () => {
  renderWithProviders(<Home />);
  expect(screen.getByText(/Welcome/)).toHaveTextContent(
    'Welcome to MUI Template!'
  );
});

it('renders GitHub link', () => {
  renderWithProviders(<Home />);
  expect(screen.getByText('MUI Template')).toHaveAttribute(
    'href',
    'https://github.com/remarkablemark/mui-template'
  );
});
