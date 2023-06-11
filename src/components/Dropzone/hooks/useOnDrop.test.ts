import { renderHook } from '@testing-library/react';
import type { FileData } from 'src/types';
import { mockFiles, store, wrapper } from 'test/helpers';

import { useOnDrop } from './useOnDrop';

const event = new Event('drop');

it('returns onDrop callback', () => {
  const { result } = renderHook(() => useOnDrop(), { wrapper });
  expect(result.current).toBeInstanceOf(Function);
});

describe('success', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2020-04-20'));
    jest
      .spyOn(crypto, 'randomUUID')
      .mockReturnValue('a7177311-3b7a-4593-942a-36b23c5afd30');
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it.each([1, 2])('sets %d files in store', async (count) => {
    const { result } = renderHook(() => useOnDrop(), { wrapper });
    const files = mockFiles(count);
    await result.current(files, [], event);
    const file: FileData = JSON.parse(JSON.stringify(store.getState().file));
    file.files.forEach(
      (file: Partial<FileData['files'][0]>) => delete file['lastModified']
    );
    expect(file).toMatchSnapshot();
  });
});

describe('error', () => {
  it('does not upload if there is no file', async () => {
    const { result } = renderHook(() => useOnDrop(), { wrapper });
    await result.current([], [], event);
    expect(store.getState().file).toMatchInlineSnapshot(`
      {
        "files": [],
        "key": "",
        "password": "",
      }
    `);
  });

  it('does not upload if there are file rejections', async () => {
    const { result } = renderHook(() => useOnDrop(), { wrapper });
    const files = mockFiles();
    const fileRejections = files.map((file) => ({
      errors: [{ code: 'too-many-files', message: 'Too many files' }],
      file,
    }));
    await result.current(files, fileRejections, event);
    expect(store.getState().file).toMatchInlineSnapshot(`
      {
        "files": [],
        "key": "",
        "password": "",
      }
    `);
  });
});
