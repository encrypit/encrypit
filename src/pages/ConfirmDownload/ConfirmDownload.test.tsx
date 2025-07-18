import { screen, waitFor } from '@testing-library/react';
import { type Location, useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'src/hooks';
import type { RootState } from 'src/types';
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

jest.mock('src/hooks', () => ({
  ...jest.requireActual('src/hooks'),
  useSelector: jest.fn(),
}));

const mockedUseSelector = jest.mocked(useSelector);

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation();
});

afterAll(() => {
  jest.restoreAllMocks();
});

beforeEach(() => {
  jest.clearAllMocks();
  mockedUseSelector.mockImplementationOnce((callback) =>
    callback({ file: {} } as unknown as RootState),
  );
});

describe('when params does not have fileKey', () => {
  const params = { fileKey: '' };
  const location = { hash: '#' };

  beforeEach(() => {
    mockedUseLocation.mockReturnValueOnce(location as Location);
    mockedUseParams.mockReturnValueOnce(params);
  });

  it('navigates to /', async () => {
    renderWithProviders(<ConfirmDownload />);
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
    });
  });
});

describe('when params has fileKey but location hash does not have password', () => {
  const params = { fileKey: 'fileKey' };
  const location = { hash: '#' };

  beforeEach(() => {
    mockedUseLocation.mockReturnValueOnce(location as Location);
    mockedUseParams.mockReturnValueOnce(params);
    mockedUseSelector
      .mockReset()
      .mockImplementationOnce((callback) =>
        callback({ file: {} } as unknown as RootState),
      );
  });

  it('navigates to /invalid', async () => {
    renderWithProviders(<ConfirmDownload />);
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/invalid', { replace: true });
    });
  });
});

describe('when params has fileKey and locaton hash has password', () => {
  const password = 'password9';
  const params = { fileKey: 'fileKey' };
  const location = { hash: `#${password}`, pathname: params.fileKey };

  beforeEach(() => {
    mockedUseLocation.mockReset().mockReturnValueOnce(location as Location);
    mockedUseParams.mockReturnValueOnce(params);
  });

  it('renders heading', () => {
    renderWithProviders(<ConfirmDownload />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Download and delete?' }),
    ).toBeInTheDocument();
  });

  it('renders warning', () => {
    renderWithProviders(<ConfirmDownload />);
    expect(
      screen.getByText(/You're about to download and delete the file with key/),
    ).toBeInTheDocument();
  });

  it('renders download link', () => {
    renderWithProviders(<ConfirmDownload />);
    expect(screen.getByText('Yes, download the file')).toHaveAttribute(
      'to',
      '/download',
    );
  });

  it('renders index link', () => {
    renderWithProviders(<ConfirmDownload />);
    expect(screen.getByText('No, not now')).toHaveAttribute('to', '/');
  });

  it('stores file key and password', async () => {
    renderWithProviders(<ConfirmDownload />);
    await waitFor(() => {
      expect(store.getState().file).toMatchObject({
        key: params.fileKey,
        password,
      });
    });
  });

  it('navigates to path without hash', async () => {
    renderWithProviders(<ConfirmDownload />);
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith(params.fileKey, {
        replace: true,
      });
    });
  });
});
