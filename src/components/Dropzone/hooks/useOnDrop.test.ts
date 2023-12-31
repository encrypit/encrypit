import { act, renderHook } from '@testing-library/react';
import { MAX_FILES } from 'shared/constants';
import type { FileData } from 'src/types';
import { mockFiles, store, wrapper } from 'test/helpers';

import { useOnDrop } from './useOnDrop';

const event = new Event('drop');

it('returns onDrop callback', async () => {
  const { result } = renderHook(() => useOnDrop(), { wrapper });
  await act(async () => {
    const onDrop = result.current;
    expect(onDrop).toBeInstanceOf(Function);
  });
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
    await act(async () => {
      const onDrop = result.current;
      await onDrop(files, [], event);
    });
    const file: FileData = JSON.parse(JSON.stringify(store.getState().file));
    file.files.forEach(
      (file: Partial<FileData['files'][0]>) => delete file['lastModified'],
    );
    expect(file).toMatchSnapshot();
  });
});

describe('error', () => {
  it('does not upload if there is no file', async () => {
    const { result } = renderHook(() => useOnDrop(), { wrapper });
    await act(async () => {
      const onDrop = result.current;
      await onDrop([], [], event);
    });
    expect(store.getState().file).toMatchInlineSnapshot(`
      {
        "files": [],
        "key": "",
        "password": "",
      }
    `);
  });

  it('does not upload more than the max number of files', async () => {
    const { result } = renderHook(() => useOnDrop(), { wrapper });
    const files = mockFiles(MAX_FILES.DEFAULT);
    for (let i = 0; i < MAX_FILES.DEFAULT + 1; i++) {
      await act(async () => {
        const onDrop = result.current;
        await onDrop(files, [], event);
        expect(store.getState().file.files).toHaveLength(MAX_FILES.DEFAULT);
      });
    }
  });
});
