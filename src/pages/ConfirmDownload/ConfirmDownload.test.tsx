import { screen, waitFor } from '@testing-library/react';
import { type Location, useLocation, useParams } from 'react-router-dom';
import { renderWithProviders, store } from 'test/helpers';

import ConfirmDownload from './ConfirmDownload';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  useNavigate: jest.fn(() => mockNavigate),
  useParams: jest.fn(),
}));

const mockedUseLocation = jest.mocked(useLocation);
const mockedUseParams = jest.mocked(useParams);

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation();
});

afterAll(() => {
  jest.restoreAllMocks();
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('without file key', () => {
  beforeEach(() => {
    mockedUseLocation.mockReturnValueOnce({ hash: '#' } as Location);
    mockedUseParams.mockReturnValueOnce({ fileKey: '' });
  });

  it('navigates to home', async () => {
    renderWithProviders(<ConfirmDownload />);
    await waitFor(() => {
      expect(mockNavigate).toBeCalledWith('/', { replace: true });
    });
  });
});

describe('with file key but no password', () => {
  beforeEach(() => {
    mockedUseLocation.mockReturnValueOnce({ hash: '#' } as Location);
    mockedUseParams.mockReturnValueOnce({ fileKey: 'abc123' });
  });

  it('navigates to home', async () => {
    renderWithProviders(<ConfirmDownload />);
    await waitFor(() => {
      expect(mockNavigate).toBeCalledWith('/invalid', { replace: true });
    });
  });
});

describe('with file key and password', () => {
  const params = { fileKey: 'abc123' };
  const location = { hash: '#123456789' };

  beforeEach(() => {
    mockedUseLocation.mockReset().mockReturnValueOnce(location as Location);
    mockedUseParams.mockReturnValueOnce(params);
  });

  it('renders heading', () => {
    renderWithProviders(<ConfirmDownload />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Download and delete?' })
    ).toBeInTheDocument();
  });

  it('renders warning', () => {
    renderWithProviders(<ConfirmDownload />);
    expect(
      screen.getByText(/You're about to download and delete the file with key/)
    ).toBeInTheDocument();
  });

  it('renders download link', () => {
    renderWithProviders(<ConfirmDownload />);
    expect(screen.getByText('Yes, download the file')).toHaveAttribute(
      'to',
      '/download'
    );
  });

  it('renders index link', () => {
    renderWithProviders(<ConfirmDownload />);
    expect(screen.getByText('No, not now')).toHaveAttribute('to', '/');
  });

  it('stores file key', async () => {
    renderWithProviders(<ConfirmDownload />);
    await waitFor(() => {
      expect(store.getState().file.key).toBe(params.fileKey);
    });
  });
});
