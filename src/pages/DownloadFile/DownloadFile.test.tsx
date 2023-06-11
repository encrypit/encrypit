import { fireEvent, screen, waitFor } from '@testing-library/react';
import { digest } from 'pepto';
import { useLazyDownloadFileQuery, useSelector } from 'src/hooks';
import type { RootState } from 'src/types';
import { renderWithProviders } from 'test/helpers';

import DownloadFile from './DownloadFile';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(() => mockNavigate),
}));

const mockDeleteFile = jest.fn();

jest.mock('src/hooks', () => ({
  useDeleteFileMutation: jest.fn(() => [mockDeleteFile]),
  useLazyDownloadFileQuery: jest.fn(),
  useSelector: jest.fn(),
}));

const mockedLazyUseDownloadFileQuery = jest.mocked(useLazyDownloadFileQuery);
const mockedUseSelector = jest.mocked(useSelector);
const mockDownloadFile = jest.fn();

const file = {
  key: 'key',
  password: 'password',
};
const lastPromiseInfo = {
  lastArg: {
    key: '',
    passwordSHA512: '',
  },
};

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation();
});

afterAll(() => {
  jest.restoreAllMocks();
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('no file key', () => {
  beforeEach(() => {
    mockedLazyUseDownloadFileQuery
      .mockReset()
      .mockReturnValue([mockDownloadFile, {}, lastPromiseInfo]);
    mockedUseSelector
      .mockReset()
      .mockImplementation((selector) =>
        selector({ file: { key: '' } } as RootState)
      );
  });

  it('navigates to home', () => {
    renderWithProviders(<DownloadFile />);
    expect(mockNavigate).toBeCalledWith('/', { replace: true });
  });

  it('does not download file', () => {
    renderWithProviders(<DownloadFile />);
    expect(mockDownloadFile).not.toBeCalled();
  });
});

describe('isLoading', () => {
  beforeEach(() => {
    mockedLazyUseDownloadFileQuery
      .mockReset()
      .mockReturnValue([
        mockDownloadFile,
        { isLoading: true },
        lastPromiseInfo,
      ]);
    mockedUseSelector.mockImplementation((selector) =>
      selector({ file } as RootState)
    );
  });

  it('renders heading', () => {
    renderWithProviders(<DownloadFile />);
    expect(
      screen.getByRole('heading', { level: 1, name: /Downloading/ })
    ).toBeInTheDocument();
  });

  it('renders progressbar', () => {
    renderWithProviders(<DownloadFile />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('downloads file', async () => {
    renderWithProviders(<DownloadFile />);
    await waitFor(async () => {
      expect(mockDownloadFile).toBeCalledWith({
        key: file.key,
        passwordSHA512: await digest('SHA-512', file.password),
      });
    });
  });
});

describe('isError', () => {
  beforeEach(() => {
    mockedLazyUseDownloadFileQuery
      .mockReset()
      .mockReturnValue([mockDownloadFile, { isError: true }, lastPromiseInfo]);
    mockedUseSelector.mockImplementation((selector) =>
      selector({ file } as RootState)
    );
  });

  it('renders heading', () => {
    renderWithProviders(<DownloadFile />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Download error' })
    ).toBeInTheDocument();
  });
});

describe('isSuccess', () => {
  const data = {
    file: btoa('file'),
    customMetadata: {
      name: 'file.txt',
    },
  };

  beforeEach(() => {
    mockedLazyUseDownloadFileQuery
      .mockReset()
      .mockReturnValue([
        mockDownloadFile,
        { isSuccess: true, data },
        lastPromiseInfo,
      ]);
    mockedUseSelector.mockImplementation((selector) =>
      selector({ file } as RootState)
    );
  });

  it('renders heading', () => {
    renderWithProviders(<DownloadFile />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Download success!' })
    ).toBeInTheDocument();
  });

  it('renders paragraph', () => {
    renderWithProviders(<DownloadFile />);
    expect(
      screen.getByText(
        'File has been deleted from the server. Please close this page after the download has finished.'
      )
    ).toBeInTheDocument();
  });

  it('renders download link', () => {
    renderWithProviders(<DownloadFile />);
    expect(screen.getByRole('link', { name: 'Download file' })).toHaveAttribute(
      'href',
      data.file
    );
  });

  it('renders home link', () => {
    renderWithProviders(<DownloadFile />);
    expect(screen.getByText('Upload file')).toHaveAttribute('to', '/');
  });

  it('downloads file', async () => {
    renderWithProviders(<DownloadFile />);
    await waitFor(async () => {
      expect(mockDownloadFile).toBeCalledWith({
        key: file.key,
        passwordSHA512: await digest('SHA-512', file.password),
      });
    });
  });

  it('deletes file on download', () => {
    renderWithProviders(<DownloadFile />);
    fireEvent.click(screen.getByRole('link', { name: 'Download file' }));
    expect(mockDeleteFile).toBeCalledTimes(1);
    expect(mockDeleteFile).toBeCalledWith(file.key);
  });
});
