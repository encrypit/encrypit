import { renderHook } from '@testing-library/react';
import { API_URL } from 'src/config';
import { fetch, mockFiles } from 'test/helpers';

import { useOnDrop } from './useOnDrop';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(() => mockNavigate),
}));

const uuid = 'uuid';
const event = new Event('drop');

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation();
});

afterAll(() => {
  // eslint-disable-next-line no-console
  (console.log as jest.Mock).mockRestore();
});

beforeEach(() => {
  jest.clearAllMocks();
  fetch.mockResolvedValueOnce({
    text: jest.fn().mockResolvedValueOnce(uuid),
  } as unknown as Response);
});

it('returns onDrop callback', () => {
  const { result } = renderHook(() => useOnDrop());
  expect(result.current).toBeInstanceOf(Function);
});

describe('success', () => {
  it('uploads first file', async () => {
    const { result } = renderHook(() => useOnDrop());
    const files = mockFiles();
    await result.current(files, [], event);
    expect(fetch).toBeCalledWith(
      `${API_URL}/api/files`,
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('navigates to /share', async () => {
    const { result } = renderHook(() => useOnDrop());
    const files = mockFiles(1);
    await result.current(files, [], event);
    expect(fetch).toBeCalledWith(
      `${API_URL}/api/files`,
      expect.objectContaining({ method: 'POST' })
    );
    expect(mockNavigate).toBeCalledWith('/share', { replace: true });
  });
});

describe('error', () => {
  it('does not upload if there is no file', async () => {
    const { result } = renderHook(() => useOnDrop());
    await result.current([], [], event);
    expect(fetch).not.toBeCalled();
  });

  it('does not upload if there are file rejections', async () => {
    const { result } = renderHook(() => useOnDrop());
    const files = mockFiles();
    const fileRejections = files.map((file) => ({
      errors: [{ code: 'too-many-files', message: 'Too many files' }],
      file,
    }));
    await result.current(files, fileRejections, event);
    expect(fetch).not.toBeCalled();
  });
});
