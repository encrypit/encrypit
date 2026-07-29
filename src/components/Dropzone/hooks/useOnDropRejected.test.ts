import { act, renderHook } from '@testing-library/react';
import type { FileRejection } from 'react-dropzone';
import { store, wrapper } from 'test/helpers';

import { type OnDropRejected, useOnDropRejected } from './useOnDropRejected';

const event = new Event('drop');

it('returns onDropRejected callback', async () => {
  const { result } = renderHook(() => useOnDropRejected(), { wrapper });
  await act(async () => {
    const onDropRejected = result.current;
    expect(onDropRejected).toBeInstanceOf(Function);
  });
});

it('does not do anything if there are no file rejections', async () => {
  const { result } = renderHook(() => useOnDropRejected(), { wrapper });
  await act(async () => {
    const onDropRejected = result.current;
    await onDropRejected([], event);
  });
  expect(store.getState().snackbar).toMatchObject({
    message: '',
    open: false,
  });
});

describe('file rejections', () => {
  const message = 'File is larger than 5242880 bytes';
  let fileRejections: FileRejection[];
  let onDropRejected: OnDropRejected;

  beforeEach(() => {
    fileRejections = Array(2)
      .fill(null)
      .map(() => ({
        errors: [{ code: 'too-many-files', message }],
        file: Object.assign(new File([], ''), {
          path: '',
          relativePath: '',
        }),
      }));
    const { result } = renderHook(() => useOnDropRejected(), { wrapper });
    onDropRejected = result.current;
  });

  it('opens snackbar message for file rejection', async () => {
    expect(store.getState().snackbar).toMatchObject({
      message: '',
      open: false,
    });
    await act(async () => {
      await onDropRejected(fileRejections, event);
    });
    expect(store.getState().snackbar).toMatchObject({
      message,
      open: true,
    });
  });
});
