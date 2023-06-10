import { act, fireEvent, screen } from '@testing-library/react';
import { useSelector } from 'src/hooks';
import type { RootState } from 'src/types';
import { createZipFile } from 'src/utils';
import { renderWithProviders, store } from 'test/helpers';

import UploadFile from './UploadFile';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(() => mockNavigate),
}));

const mockUploadFile = jest.fn();

jest.mock('src/hooks', () => ({
  ...jest.requireActual('src/hooks'),
  useSelector: jest.fn(),
  useUploadFileMutation: jest.fn(() => [mockUploadFile]),
}));

const mockedUseSelector = jest.mocked(useSelector);

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
    screen.getByRole('heading', { level: 1, name: 'New file' })
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

describe('without file', () => {
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

describe('with file', () => {
  const files = [
    { name: '', type: '', data: 'data:application/octet-stream;base64,' },
  ];
  const key = 'key';

  beforeEach(() => {
    const state = {
      file: {
        files,
      },
    };
    mockedUseSelector.mockImplementationOnce((callback) =>
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
    await act(() => {
      fireEvent.click(screen.getByText('Upload'));
    });
    expect(mockedCreateZipFile).toBeCalledTimes(1);
    expect(mockUploadFile).toBeCalledTimes(1);
    expect(store.getState().file).toEqual({ files: [], key });
  });

  it('navigates to /share', async () => {
    renderWithProviders(<UploadFile />);
    await act(() => {
      fireEvent.click(screen.getByText('Upload'));
    });
    expect(mockNavigate).toBeCalledWith('/share', { replace: true });
  });
});
