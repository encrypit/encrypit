import { fireEvent, screen } from '@testing-library/react';
import { useSelector } from 'src/hooks';
import type { RootState } from 'src/types';
import { renderWithProviders } from 'test/helpers';

import Share from './Share';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(() => mockNavigate),
}));

const mockDeleteFile = jest.fn();

jest.mock('src/hooks', () => ({
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
    renderWithProviders(<Share />);
    expect(screen.queryByText('File link ready')).not.toBeInTheDocument();
  });

  it('navigates to home', () => {
    renderWithProviders(<Share />);
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
    renderWithProviders(<Share />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'File link ready' })
    ).toBeInTheDocument();
  });

  it('does not navigate away', () => {
    renderWithProviders(<Share />);
    expect(mockNavigate).not.toBeCalled();
  });

  it('renders file link', () => {
    renderWithProviders(<Share />);
    expect(screen.getByText(link)).toHaveAttribute('to', link);
  });

  it('renders warning', () => {
    renderWithProviders(<Share />);
    expect(
      screen.getByText("The file will be deleted after it's downloaded.")
    ).toBeInTheDocument();
  });

  it('copies link', () => {
    renderWithProviders(<Share />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy link' }));
    expect(writeText).toBeCalledTimes(1);
    expect(writeText).toBeCalledWith(link);
  });

  it('emails link', () => {
    renderWithProviders(<Share />);
    expect(screen.getByRole('link', { name: 'Email link' })).toHaveAttribute(
      'href',
      `mailto:?body=${link}`
    );
  });

  it('deletes file', () => {
    renderWithProviders(<Share />);
    fireEvent.click(screen.getByRole('button', { name: 'Delete file' }));
    expect(mockDeleteFile).toBeCalledTimes(1);
    expect(mockDeleteFile).toBeCalledWith(key);
  });
});
