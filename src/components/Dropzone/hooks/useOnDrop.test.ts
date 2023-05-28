import { renderHook } from '@testing-library/react';
import { fetchMock, mockFiles, wrapper } from 'test/helpers';

import { useOnDrop } from './useOnDrop';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(() => mockNavigate),
}));

const mockUploadFile = jest.fn();

jest.mock('src/hooks', () => ({
  useUploadFileMutation: jest.fn(() => [mockUploadFile]),
}));

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

  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation();
  });

  afterAll(() => {
    // eslint-disable-next-line no-console
    (console.log as jest.Mock).mockRestore();
  });

  beforeEach(() => {
    mockUploadFile.mockReturnValueOnce({
      unwrap: jest.fn().mockResolvedValueOnce(uuid),
    });
  });

  it('uploads first file', async () => {
    const { result } = renderHook(() => useOnDrop(), { wrapper });
    const files = mockFiles();
    await result.current(files, [], event);
    expect(mockUploadFile).toBeCalledWith(expect.any(FormData));
    // eslint-disable-next-line no-console
    expect(console.log).toBeCalledWith(uuid);
  });

  it('navigates to /share', async () => {
    const { result } = renderHook(() => useOnDrop(), { wrapper });
    const files = mockFiles(1);
    await result.current(files, [], event);
    expect(mockUploadFile).toBeCalledWith(expect.any(FormData));
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
