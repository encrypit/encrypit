import { screen } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import { renderWithProviders, store } from 'test/helpers';

import ConfirmDownload from './ConfirmDownload';

const mockNavigate = jest.fn();
const mockedUseParams = jest.mocked(useParams);

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(() => mockNavigate),
  useParams: jest.fn(),
}));

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
  it('navigates to home', () => {
    mockedUseParams.mockReturnValueOnce({ fileKey: '' });
    renderWithProviders(<ConfirmDownload />);
    expect(mockNavigate).toBeCalledWith('/', { replace: true });
  });
});

describe('with file key', () => {
  const params = { fileKey: 'abc123' };

  beforeEach(() => {
    jest.clearAllMocks();
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

  it('stores file key', () => {
    renderWithProviders(<ConfirmDownload />);
    expect(store.getState().file.key).toBe(params.fileKey);
  });
});
