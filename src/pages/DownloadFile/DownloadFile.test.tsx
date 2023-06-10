import { fireEvent, screen } from '@testing-library/react';
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

const fileKey = 'fileKey';
const downloadFile = jest.fn();
const lastPromiseInfo = { lastArg: '' };

beforeEach(() => {
  jest.clearAllMocks();
  mockedLazyUseDownloadFileQuery.mockReturnValue([
    downloadFile,
    {},
    lastPromiseInfo,
  ]);
  mockedUseSelector.mockImplementation((selector) =>
    selector({ file: { key: fileKey } } as RootState)
  );
});

describe('no file key', () => {
  beforeEach(() => {
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
    expect(downloadFile).not.toBeCalled();
  });
});

describe('isLoading', () => {
  beforeEach(() => {
    mockedLazyUseDownloadFileQuery.mockReturnValue([
      downloadFile,
      { isLoading: true },
      lastPromiseInfo,
    ]);
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

  it('downloads file', () => {
    renderWithProviders(<DownloadFile />);
    expect(downloadFile).toBeCalledTimes(1);
    expect(downloadFile).toBeCalledWith(fileKey);
  });
});

describe('isError', () => {
  it('renders heading', () => {
    mockedLazyUseDownloadFileQuery.mockReturnValue([
      downloadFile,
      { isError: true },
      lastPromiseInfo,
    ]);
    renderWithProviders(<DownloadFile />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Download error' })
    ).toBeInTheDocument();
  });
});

describe('isSuccess', () => {
  const file = btoa('file');
  const name = 'file.txt';

  beforeEach(() => {
    mockedLazyUseDownloadFileQuery.mockReturnValue([
      downloadFile,
      { isSuccess: true, data: { file, customMetadata: { name } } },
      lastPromiseInfo,
    ]);
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
      file
    );
  });

  it('renders home link', () => {
    renderWithProviders(<DownloadFile />);
    expect(screen.getByText('Upload file')).toHaveAttribute('to', '/');
  });

  it('downloads file', () => {
    renderWithProviders(<DownloadFile />);
    expect(downloadFile).toBeCalledTimes(1);
    expect(downloadFile).toBeCalledWith(fileKey);
  });

  it('deletes file on download', () => {
    renderWithProviders(<DownloadFile />);
    fireEvent.click(screen.getByRole('link', { name: 'Download file' }));
    expect(mockDeleteFile).toBeCalledTimes(1);
    expect(mockDeleteFile).toBeCalledWith(fileKey);
  });
});
