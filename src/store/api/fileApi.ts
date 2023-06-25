import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { blobToBase64 } from 'file64';
import { HEADERS } from 'shared/constants';
import { API_URL } from 'src/config';
import type { DownloadFileResponse } from 'src/types';

export const fileApi = createApi({
  reducerPath: 'fileApi',

  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api/files`,
  }),

  endpoints: (build) => ({
    /**
     * DELETE /api/files/[key]
     */
    deleteFile: build.mutation<void, string>({
      query: (fileKey: string) => ({
        url: `/${fileKey}`,
        method: 'DELETE',
      }),
    }),

    /**
     * GET /api/files/[key]
     */
    downloadFile: build.query<
      DownloadFileResponse,
      { key: string; passwordSHA512: string }
    >({
      query: ({ key, passwordSHA512 }) => ({
        url: `/${key}`,
        headers: {
          [HEADERS.PASSWORD_SHA512]: passwordSHA512,
        },
        responseHandler: async (response) =>
          blobToBase64(await response.blob()),
      }),

      transformResponse: /* istanbul ignore next */ (base64: string, meta) => ({
        file: base64,
        customMetadata: JSON.parse(
          meta!.response!.headers.get(HEADERS.CUSTOM_METADATA)!
        ) as DownloadFileResponse['customMetadata'],
      }),

      transformErrorResponse: ({ status }) => ({ status }),
    }),

    /**
     * POST /api/files
     */
    uploadFile: build.mutation<string, FormData>({
      query: (formData) => ({
        url: '',
        method: 'POST',
        body: formData,
        responseHandler: 'content-type',
      }),
    }),
  }),
});
