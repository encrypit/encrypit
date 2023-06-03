/* istanbul ignore file */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'src/config';
import { FILE, HEADERS } from 'src/constants';
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

      transformResponse: (base64: string, meta) => {
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
    uploadFile: build.mutation<string, File[]>({
      query: (files) => {
        const [file] = files;
        const body = new FormData();
        body.append(FILE, file);
        return {
          url: '',
          method: 'POST',
          body,
          responseHandler: 'content-type',
        };
      },
    }),
  }),
});
