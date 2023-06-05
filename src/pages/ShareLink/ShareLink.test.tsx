import { fireEvent, screen } from '@testing-library/react';
import { useSelector } from 'src/hooks';
import type { RootState } from 'src/types';
import { renderWithProviders, store } from 'test/helpers';

import ShareLink from './ShareLink';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(() => mockNavigate),
}));

const mockDeleteFile = jest.fn();

jest.mock('src/hooks', () => ({
  ...jest.requireActual('src/hooks'),
  useDeleteFileMutation: jest.fn(() => [mockDeleteFile]),
  useSelector: jest.fn(),
}));

const mockedUseSelector = jest.mocked(useSelector);

const { clipboard } = navigator;
const writeText = jest.fn();

beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (navigator as any).clipboard = { writeText };
});

afterAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (navigator as any).clipboard = clipboard;
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('without file key', () => {
  it('does not render heading', () => {
    renderWithProviders(<ShareLink />);
    expect(screen.queryByText('File link ready')).not.toBeInTheDocument();
  });

  it('navigates to home', () => {
    renderWithProviders(<ShareLink />);
    expect(mockNavigate).toBeCalledWith('/', { replace: true });
  });
});

describe('with file key', () => {
  const key = 'abc123';
  const link = `${location.origin}/${key}`;

  beforeEach(() => {
    mockedUseSelector.mockImplementation((selector) =>
      selector({ file: { key: 'abc123' } } as RootState)
    );
  });

  it('renders heading', () => {
    renderWithProviders(<ShareLink />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'File link ready' })
    ).toBeInTheDocument();
  });

  it('does not navigate away', () => {
    renderWithProviders(<ShareLink />);
    expect(mockNavigate).not.toBeCalled();
  });

  it('renders file link', () => {
    renderWithProviders(<ShareLink />);
    expect(screen.getByText(link)).toHaveAttribute('to', link);
  });

  it('renders warning', () => {
    renderWithProviders(<ShareLink />);
    expect(
      screen.getByText(/File will be deleted after download/)
    ).toBeInTheDocument();
  });

  it('copies link', () => {
    renderWithProviders(<ShareLink />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy link' }));
    expect(writeText).toBeCalledTimes(1);
    expect(writeText).toBeCalledWith(link);
  });

  it('emails link', () => {
    renderWithProviders(<ShareLink />);
    expect(screen.getByRole('link', { name: 'Email link' })).toHaveAttribute(
      'href',
      `mailto:?body=${link}`
    );
  });

  it('confirms delete file', () => {
    renderWithProviders(<ShareLink />);
    fireEvent.click(screen.getByRole('button', { name: 'Delete file' }));
    expect(
      screen.getByText('Are you sure you want to delete the file?')
    ).toBeInTheDocument();
    expect(
      screen.getByText('This action cannot be undone.')
    ).toBeInTheDocument();
  });

  it('cancels delete file', () => {
    renderWithProviders(<ShareLink />);
    fireEvent.click(screen.getByRole('button', { name: 'Delete file' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(mockDeleteFile).not.toBeCalled();
  });

  it('deletes file', () => {
    renderWithProviders(<ShareLink />);
    fireEvent.click(screen.getByRole('button', { name: 'Delete file' }));
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(mockDeleteFile).toBeCalledTimes(1);
    expect(mockDeleteFile).toBeCalledWith(key);
    expect(store.getState().file).toEqual({});
  });
});
