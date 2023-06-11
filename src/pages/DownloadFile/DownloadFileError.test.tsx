import { screen } from '@testing-library/react';
import { renderWithProviders } from 'test/helpers';

import DownloadFileError from './DownloadFileError';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(() => mockNavigate),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

it('renders heading', () => {
  renderWithProviders(<DownloadFileError />);
  expect(
    screen.getByRole('heading', { level: 1, name: 'Download error' })
  ).toBeInTheDocument();
});

it('renders paragraph', () => {
  renderWithProviders(<DownloadFileError />);
  expect(
    screen.getByText('File failed to download. Please try again.')
  ).toBeInTheDocument();
});

it('navigates to /invalid when status is 403', () => {
  renderWithProviders(<DownloadFileError status={403} />);
  expect(mockNavigate).toBeCalledWith('/invalid', { replace: true });
});
