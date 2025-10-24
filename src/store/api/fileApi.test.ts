import { act, renderHook } from '@testing-library/react';
import { createFormData, hashPassword } from 'src/utils';
import { fetchMock, mockFiles, wrapper } from 'test/helpers';

import { fileApi } from './fileApi';

const key = 'fileKey';
const passwordSHA512 = 'passwordSHA512';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('deleteFile', () => {
  it('deletes file given key and password hash', async () => {
    const { result } = renderHook(() => fileApi.useDeleteFileMutation(), {
      wrapper,
    });

    await act(async () => {
      const [deleteFile] = result.current;
      deleteFile({
        key,
        passwordSHA512: await hashPassword(passwordSHA512),
      });
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toMatchSnapshot();
  });
});

describe('downloadFile', () => {
  describe('success', () => {
    beforeEach(() => {
      const blob = new Blob(['blob'], { type: 'text/plain' });
      fetchMock.mockResponseOnce(blob as unknown as string);
    });

    it('downloads file given key', async () => {
      await act(() => {
        renderHook(
          () => fileApi.useDownloadFileQuery({ key, passwordSHA512 }),
          { wrapper },
        );
      });
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock.mock.calls[0][0]).toMatchSnapshot();
    });
  });

  describe('error', () => {
    beforeEach(() => {
      fetchMock.mockRejectOnce(new Error());
    });

    it('responds with null', async () => {
      await act(() => {
        const { result } = renderHook(
          () => fileApi.useDownloadFileQuery({ key, passwordSHA512 }),
          { wrapper },
        );
        expect(result.current).toBe(null);
      });
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });
  });
});

describe('uploadFile', () => {
  it('uploads files', async () => {
    const { result } = renderHook(() => fileApi.useUploadFileMutation(), {
      wrapper,
    });

    const formData = await createFormData({
      file: mockFiles(1)[0],
      password: 'password',
      version: '1.0.0',
    });

    await act(async () => {
      const [uploadFile] = result.current;
      uploadFile(formData);
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toMatchSnapshot();
  });
});
