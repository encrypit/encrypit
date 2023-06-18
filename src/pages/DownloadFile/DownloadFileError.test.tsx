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

describe('status 403', () => {
  it('navigates to /invalid', () => {
    renderWithProviders(<DownloadFileError status={403} />);
    expect(mockNavigate).toBeCalledWith('/invalid', { replace: true });
  });
});

describe('status 404', () => {
  it('renders paragraph', () => {
    renderWithProviders(<DownloadFileError status={404} />);
    expect(
      screen.getByText('File has been deleted or does not exist.')
    ).toBeInTheDocument();
  });
});

describe.each([undefined, 400, 500])('status %p', (status) => {
  it('renders paragraph', () => {
    renderWithProviders(<DownloadFileError status={status} />);
    expect(
      screen.getByText('File failed to download. Please try again.')
    ).toBeInTheDocument();
  });
});
