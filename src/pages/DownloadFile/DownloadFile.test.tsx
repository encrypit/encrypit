import { fireEvent, screen, waitFor } from '@testing-library/react';
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

describe.each(['isLoading', 'isFetching'])('%s', (queryStatus) => {
  beforeEach(() => {
    mockedLazyUseDownloadFileQuery.mockReset().mockReturnValue([
      mockDownloadFile,
      {
        [queryStatus]: true,
      },
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
        passwordSHA512:
          'b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86',
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

  it('renders heading', () => {
    renderWithProviders(<DownloadFile />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Download error' })
    ).toBeInTheDocument();
  });

  it('navigates to /invalid when status is 403', () => {
    mockedLazyUseDownloadFileQuery
      .mockReset()
      .mockReturnValue([
        mockDownloadFile,
        { isError: true, error: { status: 403 } },
        lastPromiseInfo,
      ]);
    renderWithProviders(<DownloadFile />);
    expect(mockNavigate).toBeCalledWith('/invalid', { replace: true });
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
        passwordSHA512:
          'b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86',
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
