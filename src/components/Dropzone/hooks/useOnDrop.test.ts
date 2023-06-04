import { renderHook } from '@testing-library/react';
import { createZipFile } from 'src/utils';
import { fetchMock, mockFiles, store, wrapper } from 'test/helpers';

import { useOnDrop } from './useOnDrop';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(() => mockNavigate),
}));

const mockUploadFile = jest.fn();

jest.mock('src/hooks', () => ({
  ...jest.requireActual('src/hooks'),
  useUploadFileMutation: jest.fn(() => [mockUploadFile]),
}));

jest.mock('src/utils', () => ({
  ...jest.requireActual('src/utils'),
  createZipFile: jest.fn().mockResolvedValue(new Blob()),
}));

const mockedCreateZipFile = jest.mocked(createZipFile);

const event = new Event('drop');

beforeEach(() => {
  jest.clearAllMocks();
});

it('returns onDrop callback', () => {
  const { result } = renderHook(() => useOnDrop(), { wrapper });
  expect(result.current).toBeInstanceOf(Function);
});

describe('success', () => {
  const uuid = 'uuid';

  beforeEach(() => {
    mockUploadFile.mockReturnValueOnce({
      unwrap: jest.fn().mockResolvedValueOnce(uuid),
    });
  });

  it('uploads files', async () => {
    const { result } = renderHook(() => useOnDrop(), { wrapper });
    const files = mockFiles();
    await result.current(files, [], event);
    expect(mockedCreateZipFile).toBeCalledWith(files);
    expect(mockUploadFile).toBeCalledWith(expect.any(FormData));
    expect(store.getState().file.key).toBe(uuid);
  });

  it('navigates to /share', async () => {
    const { result } = renderHook(() => useOnDrop(), { wrapper });
    const files = mockFiles(1);
    await result.current(files, [], event);
    expect(mockNavigate).toBeCalledWith('/share', { replace: true });
  });
});

describe('error', () => {
  it('does not upload if there is no file', async () => {
    const { result } = renderHook(() => useOnDrop(), { wrapper });
    await result.current([], [], event);
    expect(fetchMock).not.toBeCalled();
  });

  it('does not upload if there are file rejections', async () => {
    const { result } = renderHook(() => useOnDrop(), { wrapper });
    const files = mockFiles();
    const fileRejections = files.map((file) => ({
      errors: [{ code: 'too-many-files', message: 'Too many files' }],
      file,
    }));
    await result.current(files, fileRejections, event);
    expect(fetchMock).not.toBeCalled();
  });
});
