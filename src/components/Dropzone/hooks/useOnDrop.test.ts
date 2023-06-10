import { renderHook } from '@testing-library/react';
import { createZipFile } from 'src/utils';
import { mockFiles, store, wrapper } from 'test/helpers';

import { useOnDrop } from './useOnDrop';

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
  it('sets file in store', async () => {
    const { result } = renderHook(() => useOnDrop(), { wrapper });
    const files = mockFiles();
    await result.current(files, [], event);
    expect(mockedCreateZipFile).toBeCalledWith(files);
    expect(store.getState().file.file).toBe(
      'data:application/octet-stream;base64,'
    );
  });
});

describe('error', () => {
  it('does not upload if there is no file', async () => {
    const { result } = renderHook(() => useOnDrop(), { wrapper });
    await result.current([], [], event);
    expect(mockedCreateZipFile).not.toBeCalled();
    expect(store.getState().file).toEqual({});
  });

  it('does not upload if there are file rejections', async () => {
    const { result } = renderHook(() => useOnDrop(), { wrapper });
    const files = mockFiles();
    const fileRejections = files.map((file) => ({
      errors: [{ code: 'too-many-files', message: 'Too many files' }],
      file,
    }));
    await result.current(files, fileRejections, event);
    expect(mockedCreateZipFile).not.toBeCalled();
    expect(store.getState().file).toEqual({});
  });
});
