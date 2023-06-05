import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HEADERS } from 'shared/constants';
import { API_URL } from 'src/config';
import type { DownloadFileResponse } from 'src/types';
import { blobToBase64 } from 'src/utils';

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
    downloadFile: build.query<DownloadFileResponse, string>({
      query: (fileKey: string) => ({
        url: `/${fileKey}`,
        responseHandler: async (response) =>
          blobToBase64(await response.blob()),
      }),

      transformResponse: /* istanbul ignore next */ (base64: string, meta) => {
        return {
          file: base64,
          customMetadata: JSON.parse(
            meta!.response!.headers.get(HEADERS.CUSTOM_METADATA)!
          ) as DownloadFileResponse['customMetadata'],
        };
      },
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
