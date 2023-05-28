/* istanbul ignore file */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'src/config';

export const fileApi = createApi({
  reducerPath: 'fileApi',

  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api/files`,
  }),

  endpoints: (build) => ({
    downloadFile: build.query<File, string>({
      query: (fileKey: string) => ({
        url: `/${fileKey}`,
        responseHandler: 'content-type',
      }),
    }),

    uploadFile: build.mutation<string, FormData>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
        responseHandler: 'content-type',
      }),
    }),
  }),
});

export const { useDownloadFileQuery, useUploadFileMutation } = fileApi;
