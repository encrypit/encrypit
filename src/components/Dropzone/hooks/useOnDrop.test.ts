import { renderHook } from '@testing-library/react';
import { mockFiles, store, wrapper } from 'test/helpers';

import { useOnDrop } from './useOnDrop';

const event = new Event('drop');

it('returns onDrop callback', () => {
  const { result } = renderHook(() => useOnDrop(), { wrapper });
  expect(result.current).toBeInstanceOf(Function);
});

describe('success', () => {
  it.each([1, 2])('sets %d files in store', async (count) => {
    const { result } = renderHook(() => useOnDrop(), { wrapper });
    const files = mockFiles(count);
    await result.current(files, [], event);
    expect(store.getState().file).toMatchSnapshot();
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
      }
    `);
  });
});
