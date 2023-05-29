import { screen } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import { API_URL } from 'src/config';
import { renderWithProviders } from 'test/helpers';

import Download from './Download';

const mockNavigate = jest.fn();
const mockedUseParams = jest.mocked(useParams);

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(() => mockNavigate),
  useParams: jest.fn(),
}));

const params = { fileKey: 'abc123' };

beforeEach(() => {
  jest.clearAllMocks();
  mockedUseParams.mockReturnValueOnce(params);
});

describe('invalid param fileKey', () => {
  it('navigates to home', () => {
    mockedUseParams.mockReset().mockReturnValueOnce({ fileKey: '' });
    renderWithProviders(<Download />);
    expect(mockNavigate).toBeCalledWith('/', { replace: true });
  });
});

it('renders heading', () => {
  renderWithProviders(<Download />);
  expect(
    screen.getByRole('heading', { level: 1, name: 'Download and delete?' })
  ).toBeInTheDocument();
});

it('renders warning', () => {
  renderWithProviders(<Download />);
  expect(
    screen.getByText(/You're about to download and delete the file with key/)
  ).toBeInTheDocument();
});

it('renders download link', () => {
  renderWithProviders(<Download />);
  expect(
    screen.getByRole('link', { name: 'Yes, download the file' })
  ).toHaveAttribute('href', `${API_URL}/api/files/${params.fileKey}`);
});

it('renders index link', () => {
  renderWithProviders(<Download />);
  expect(screen.getByText('No, not now')).toHaveAttribute('to', '/');
});
