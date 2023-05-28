import { screen } from '@testing-library/react';
import { renderWithProviders } from 'test/helpers';

import Upload from './Upload';

it('renders heading', () => {
  renderWithProviders(<Upload />);
  expect(
    screen.getByRole('heading', { level: 1, name: 'New file' })
  ).toBeInTheDocument();
});
