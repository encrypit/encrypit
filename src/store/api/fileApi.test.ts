import { act, renderHook } from '@testing-library/react';
import { createFormData } from 'src/utils';
import { fetchMock, mockFiles, wrapper } from 'test/helpers';

import { fileApi } from './fileApi';

const fileKey = 'fileKey';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('deleteFile', () => {
  it('deletes file given key', async () => {
    const { result } = renderHook(() => fileApi.useDeleteFileMutation(), {
      wrapper,
    });

    await act(() => {
      const [deleteFile] = result.current;
      deleteFile(fileKey);
    });

    expect(fetchMock).toBeCalledTimes(1);
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
            Symbol(map): {},
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
  beforeEach(() => {
    const blob = new Blob(['blob'], { type: 'text/plain' });
    fetchMock.mockResponseOnce(blob as unknown as string);
  });

  it('downloads file given key', async () => {
    await act(() => {
      renderHook(() => fileApi.useDownloadFileQuery(fileKey), {
        wrapper,
      });
    });
    expect(fetchMock).toBeCalledTimes(1);
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
            Symbol(map): {},
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

describe('uploadFile', () => {
  it('uploads files', async () => {
    const { result } = renderHook(() => fileApi.useUploadFileMutation(), {
      wrapper,
    });

    await act(() => {
      const [uploadFile] = result.current;
      uploadFile(createFormData(mockFiles(1)[0]));
    });

    expect(fetchMock).toBeCalledTimes(1);
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
