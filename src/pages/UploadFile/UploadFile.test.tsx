import { screen } from '@testing-library/react';
import { renderWithProviders } from 'test/helpers';

import UploadFile from './UploadFile';

it('renders heading', () => {
  renderWithProviders(<UploadFile />);
  expect(
    screen.getByRole('heading', { level: 1, name: 'New file' })
  ).toBeInTheDocument();
});

it('renders Dropzone', () => {
  renderWithProviders(<UploadFile />);
  expect(screen.getByText('Drag and drop your file')).toBeInTheDocument();
});

it('renders upload button', () => {
  renderWithProviders(<UploadFile />);
  expect(screen.getByRole('button', { name: 'Upload' })).toBeInTheDocument();
});
