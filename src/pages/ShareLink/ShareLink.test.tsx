import { fireEvent, screen, waitFor } from '@testing-library/react';
import { useSelector } from 'src/hooks';
import type { RootState } from 'src/types';
import { hashPassword } from 'src/utils';
import { actions, renderWithProviders, store } from 'test/helpers';

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
  jest.spyOn(console, 'error').mockImplementation();
});

afterAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (navigator as any).clipboard = clipboard;
  jest.restoreAllMocks();
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('without file key', () => {
  beforeEach(() => {
    mockedUseSelector.mockImplementation((selector) =>
      selector({
        file: {},
      } as RootState),
    );
  });

  it('does not render heading', () => {
    renderWithProviders(<ShareLink />);
    expect(screen.queryByText('File link ready')).not.toBeInTheDocument();
  });

  it('navigates to home', () => {
    renderWithProviders(<ShareLink />);
    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
  });
});

describe('with file key and password', () => {
  const key = 'key';
  const password = 'password';
  const link = `${location.origin}/${key}#${password}`;

  beforeEach(() => {
    mockedUseSelector.mockImplementation((selector) =>
      selector({
        file: {
          key,
          password,
        },
      } as RootState),
    );
  });

  it('renders heading', () => {
    renderWithProviders(<ShareLink />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'File link ready' }),
    ).toBeInTheDocument();
  });

  it('does not navigate away', () => {
    renderWithProviders(<ShareLink />);
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('renders file link', () => {
    renderWithProviders(<ShareLink />);
    expect(screen.getByText(link)).toHaveAttribute('to', link);
  });

  it('renders warning', () => {
    renderWithProviders(<ShareLink />);
    expect(
      screen.getByText(/File will be deleted after download/),
    ).toBeInTheDocument();
  });

  it('copies link', () => {
    renderWithProviders(<ShareLink />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy link' }));
    expect(writeText).toHaveBeenCalledTimes(1);
    expect(writeText).toHaveBeenCalledWith(link);
    expect(store.getState().snackbar).toMatchObject({
      autoHideDuration: 2000,
      message: 'Copied link',
      open: true,
    });
  });

  it('emails link', () => {
    renderWithProviders(<ShareLink />);
    expect(screen.getByRole('link', { name: 'Email link' })).toHaveAttribute(
      'href',
      `mailto:?body=${link}`,
    );
  });

  it('confirms delete file', () => {
    renderWithProviders(<ShareLink />);
    fireEvent.click(screen.getByRole('button', { name: 'Delete file' }));
    expect(
      screen.getByText('Are you sure you want to delete this file?'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('This action cannot be undone.'),
    ).toBeInTheDocument();
  });

  it('cancels delete file', () => {
    renderWithProviders(<ShareLink />);
    fireEvent.click(screen.getByRole('button', { name: 'Delete file' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(mockDeleteFile).not.toHaveBeenCalled();
  });

  const files = [
    {
      lastModified: 0,
      name: 'filename',
      size: 0,
      type: 'application/octet-stream',
      data: 'data:application/octet-stream;base64,',
      id: 'uuid',
    },
  ];

  describe.each([200, 404])('when delete status is %d', (status) => {
    beforeEach(async () => {
      store.dispatch(actions.addFiles(files));
      const unwrap = jest.fn().mockRejectedValueOnce({ status });
      mockDeleteFile.mockReturnValue({ unwrap });
      renderWithProviders(<ShareLink />);
      fireEvent.click(screen.getByRole('button', { name: 'Delete file' }));

      await waitFor(async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
        expect(mockDeleteFile).toHaveBeenCalledWith({
          key,
          passwordSHA512: await hashPassword(password),
        });
        expect(mockDeleteFile).toHaveBeenCalledTimes(1);
        expect(unwrap).toHaveBeenCalledTimes(1);
      });
    });

    it('closes modal and resets store ', () => {
      expect(
        screen.getByText('Are you sure you want to delete this file?'),
      ).not.toBeVisible();

      expect(store.getState().file).toEqual({
        files: [],
        key: '',
        password: '',
      });
    });
  });

  describe.each([400, 500])('when delete status is %d', (status) => {
    beforeEach(async () => {
      store.dispatch(actions.addFiles(files));
      const unwrap = jest.fn().mockRejectedValueOnce({ status });
      mockDeleteFile.mockReturnValue({ unwrap });
      renderWithProviders(<ShareLink />);
      fireEvent.click(screen.getByRole('button', { name: 'Delete file' }));

      await waitFor(async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
        expect(mockDeleteFile).toHaveBeenCalledWith({
          key,
          passwordSHA512: await hashPassword(password),
        });
        expect(mockDeleteFile).toHaveBeenCalledTimes(1);
        expect(unwrap).toHaveBeenCalledTimes(1);
      });
    });

    it('does not close modal and reset store', () => {
      expect(
        screen.queryByText('Are you sure you want to delete this file?'),
      ).toBeVisible();

      expect(store.getState().file).toEqual({
        files,
        key: '',
        password: '',
      });
    });
  });
});
