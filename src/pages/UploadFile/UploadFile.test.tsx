import { fireEvent, screen, waitFor } from '@testing-library/react';
import { useSelector, useUploadFileMutation } from 'src/hooks';
import type { RootState } from 'src/types';
import { createZipFile } from 'src/utils';
import { renderWithProviders, store } from 'test/helpers';

import UploadFile from './UploadFile';

jest.mock('nanoid', () => ({
  customAlphabet: jest.fn(() => jest.fn(() => 'password')),
}));

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(() => mockNavigate),
}));

const mockUploadFile = jest.fn();

jest.mock('src/hooks', () => ({
  ...jest.requireActual('src/hooks'),
  useSelector: jest.fn(),
  useUploadFileMutation: jest.fn(() => [mockUploadFile, {}]),
}));

const mockedUseSelector = jest.mocked(useSelector);
const mockedUseUploadFileMutation = jest.mocked(useUploadFileMutation);

jest.mock('src/utils', () => ({
  ...jest.requireActual('src/utils'),
  createZipFile: jest.fn().mockResolvedValue(new Blob()),
}));

const mockedCreateZipFile = jest.mocked(createZipFile);

beforeEach(() => {
  jest.clearAllMocks();
});

it('renders heading', () => {
  renderWithProviders(<UploadFile />);
  expect(
    screen.getByRole('heading', { level: 1, name: 'Encrypt file' })
  ).toBeInTheDocument();
});

it('renders Dropzone', () => {
  renderWithProviders(<UploadFile />);
  expect(screen.getByText('Drag and drop your file')).toBeInTheDocument();
});

it('renders upload button', () => {
  renderWithProviders(<UploadFile />);
  expect(screen.getByRole('button', { name: 'Upload' })).toBeInTheDocument();
});

it('disables the upload button when loading', () => {
  mockedUseUploadFileMutation.mockReturnValueOnce([
    mockUploadFile,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { isLoading: true } as any,
  ]);
  renderWithProviders(<UploadFile />);
  expect(screen.getByRole('button', { name: 'Upload' })).toBeDisabled();
});

describe('without files', () => {
  beforeEach(() => {
    const state = {
      file: {},
    };
    mockedUseSelector.mockImplementationOnce((callback) =>
      callback(state as unknown as RootState)
    );
  });

  it('disables the upload button', () => {
    renderWithProviders(<UploadFile />);
    expect(screen.getByRole('button', { name: 'Upload' })).toBeDisabled();
  });
});

describe('with files', () => {
  const name = 'filename';
  const files = [
    {
      name,
      type: '',
      data: 'data:application/octet-stream;base64,',
      id: crypto.randomUUID(),
    },
  ];
  const key = 'key';
  const password = 'password';

  beforeEach(() => {
    const state = {
      file: {
        files,
      },
    };
    mockedUseSelector
      .mockReset()
      .mockImplementation((callback) =>
        callback(state as unknown as RootState)
      );
    mockUploadFile.mockReturnValueOnce({
      unwrap: jest.fn().mockResolvedValueOnce(key),
    });
  });

  it('enables the upload button', () => {
    renderWithProviders(<UploadFile />);
    expect(screen.getByRole('button', { name: 'Upload' })).not.toBeDisabled();
  });

  it('uploads the file on click', async () => {
    renderWithProviders(<UploadFile />);
    fireEvent.click(screen.getByText('Upload'));
    await waitFor(() => {
      expect(store.getState().file).toEqual({
        files: [],
        key,
        password,
      });
    });
    expect(mockedCreateZipFile).toBeCalledTimes(1);
    expect(mockUploadFile).toBeCalledTimes(1);
  });

  it('renders preview', async () => {
    renderWithProviders(<UploadFile />);
    fireEvent.click(screen.getByText('Upload'));
    await waitFor(() => {
      expect(store.getState().file.key).toBeTruthy();
    });
    expect(screen.getByText(name)).toBeInTheDocument();
  });

  it('navigates to /share', async () => {
    renderWithProviders(<UploadFile />);
    fireEvent.click(screen.getByText('Upload'));
    await waitFor(() => {
      expect(store.getState().file.key).toBeTruthy();
    });
    expect(mockNavigate).toBeCalledWith('/share', { replace: true });
  });
});
