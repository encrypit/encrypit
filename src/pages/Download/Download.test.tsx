import { screen } from '@testing-library/react';
import { useDownloadFileQuery, useSelector } from 'src/hooks';
import type { RootState } from 'src/types';
import { renderWithProviders } from 'test/helpers';

import Download from './Download';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(() => mockNavigate),
}));

jest.mock('src/hooks', () => ({
  useDownloadFileQuery: jest.fn(),
  useSelector: jest.fn(),
}));

const mockedUseDownloadFileQuery = jest.mocked(useDownloadFileQuery);
const mockedUseSelector = jest.mocked(useSelector);

type UseDownloadFileQuery = ReturnType<typeof mockedUseDownloadFileQuery>[0];

beforeEach(() => {
  jest.clearAllMocks();
  mockedUseDownloadFileQuery.mockReturnValue({} as UseDownloadFileQuery);
  mockedUseSelector.mockImplementation((selector) =>
    selector({ file: { key: 'abc123' } } as RootState)
  );
});

describe('no file key', () => {
  it('navigates to home', () => {
    mockedUseSelector
      .mockReset()
      .mockImplementation((selector) =>
        selector({ file: { key: '' } } as RootState)
      );
    renderWithProviders(<Download />);
    expect(mockNavigate).toBeCalledWith('/', { replace: true });
  });
});

describe('when loading', () => {
  it('renders heading', () => {
    renderWithProviders(<Download />);
    expect(
      screen.getByRole('heading', { level: 1, name: /Downloading/ })
    ).toBeInTheDocument();
  });
});

describe('on error', () => {
  it('renders heading', () => {
    mockedUseDownloadFileQuery.mockReturnValue({
      isError: true,
    } as UseDownloadFileQuery);
    renderWithProviders(<Download />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Download error' })
    ).toBeInTheDocument();
  });
});

describe('on success', () => {
  const file = btoa('file');
  const name = 'file.txt';

  beforeEach(() => {
    mockedUseDownloadFileQuery.mockReturnValue({
      data: { file, customMetadata: { name } },
      isSuccess: true,
    } as UseDownloadFileQuery);
  });

  it('renders heading', () => {
    renderWithProviders(<Download />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Download success!' })
    ).toBeInTheDocument();
  });

  it('renders download link', () => {
    renderWithProviders(<Download />);
    expect(screen.getByRole('link', { name: 'Download file' })).toHaveAttribute(
      'href',
      file
    );
  });
});
