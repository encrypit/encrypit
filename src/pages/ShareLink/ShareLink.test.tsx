import { fireEvent, screen, waitFor } from '@testing-library/react';
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
      } as RootState)
    );
  });

  it('does not render heading', () => {
    renderWithProviders(<ShareLink />);
    expect(screen.queryByText('File link ready')).not.toBeInTheDocument();
  });

  it('navigates to home', () => {
    renderWithProviders(<ShareLink />);
    expect(mockNavigate).toBeCalledWith('/', { replace: true });
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
      } as RootState)
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

  describe.each([200, 404])('when delete status is %d', (status) => {
    it('closes modal and resets store', async () => {
      const unwrap = jest.fn().mockRejectedValueOnce({ status });
      mockDeleteFile.mockReturnValue({ unwrap });
      renderWithProviders(<ShareLink />);
      await waitFor(() => {
        fireEvent.click(screen.getByRole('button', { name: 'Delete file' }));
        fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
      });
      expect(mockDeleteFile).toBeCalledTimes(1);
      expect(mockDeleteFile).toBeCalledWith(key);
      expect(unwrap).toBeCalledTimes(1);
      expect(store.getState().file).toMatchInlineSnapshot(`
      {
        "files": [],
        "key": "",
        "password": "",
      }
    `);
    });
  });
});
