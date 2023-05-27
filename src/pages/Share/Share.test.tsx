import { screen } from '@testing-library/react';
import { renderWithProviders } from 'test/helpers';

import Share from './Share';

it('renders home', () => {
  renderWithProviders(<Share />);
  expect(
    screen.getByRole('heading', { level: 1, name: 'File link ready' })
  ).toBeInTheDocument();
});
