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
    expect(fetchMock.mock.calls[0][0]).toMatchInlineSnapshot(`
     Request {
       "agent": undefined,
       "compress": true,
       "counter": 0,
       "follow": 20,
       "size": 0,
       "timeout": 0,
       Symbol(Body internals): {
         "body": null,
         "disturbed": false,
         "error": null,
       },
       Symbol(Request internals): {
         "headers": Headers {
           Symbol(map): {
             "X-Password-Sha512": [
               "cc7222b9eb5b430fc446942a1a7b85f9593328f9c42f3a343a9c698e5574fdc3d9b435f94dbc667f82786b1747bbb27abe76bfddc473fbc2145b8d2e3265114e",
             ],
           },
         },
         "method": "DELETE",
         "parsedURL": Url {
           "auth": null,
           "hash": null,
           "host": "localhost",
           "hostname": "localhost",
           "href": "http://localhost/api/files/fileKey",
           "path": "/api/files/fileKey",
           "pathname": "/api/files/fileKey",
           "port": null,
           "protocol": "http:",
           "query": null,
           "search": null,
           "slashes": true,
         },
         "redirect": "follow",
         "signal": AbortSignal {},
       },
     }
    `);
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
      expect(fetchMock.mock.calls[0][0]).toMatchInlineSnapshot(`
        Request {
          "agent": undefined,
          "compress": true,
          "counter": 0,
          "follow": 20,
          "size": 0,
          "timeout": 0,
          Symbol(Body internals): {
            "body": null,
            "disturbed": false,
            "error": null,
          },
          Symbol(Request internals): {
            "headers": Headers {
              Symbol(map): {
                "X-Password-Sha512": [
                  "passwordSHA512",
                ],
              },
            },
            "method": "GET",
            "parsedURL": Url {
              "auth": null,
              "hash": null,
              "host": "localhost",
              "hostname": "localhost",
              "href": "http://localhost/api/files/fileKey",
              "path": "/api/files/fileKey",
              "pathname": "/api/files/fileKey",
              "port": null,
              "protocol": "http:",
              "query": null,
              "search": null,
              "slashes": true,
            },
            "redirect": "follow",
            "signal": AbortSignal {},
          },
        }
      `);
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
    expect(fetchMock.mock.calls[0][0]).toMatchInlineSnapshot(`
      Request {
        "agent": undefined,
        "compress": true,
        "counter": 0,
        "follow": 20,
        "size": 0,
        "timeout": 0,
        Symbol(Body internals): {
          "body": {
            "data": [
              91,
              111,
              98,
              106,
              101,
              99,
              116,
              32,
              70,
              111,
              114,
              109,
              68,
              97,
              116,
              97,
              93,
            ],
            "type": "Buffer",
          },
          "disturbed": false,
          "error": null,
        },
        Symbol(Request internals): {
          "headers": Headers {
            Symbol(map): {
              "Content-Type": [
                "text/plain;charset=UTF-8",
              ],
            },
          },
          "method": "POST",
          "parsedURL": Url {
            "auth": null,
            "hash": null,
            "host": "localhost",
            "hostname": "localhost",
            "href": "http://localhost/api/files",
            "path": "/api/files",
            "pathname": "/api/files",
            "port": null,
            "protocol": "http:",
            "query": null,
            "search": null,
            "slashes": true,
          },
          "redirect": "follow",
          "signal": AbortSignal {},
        },
      }
    `);
  });
});
