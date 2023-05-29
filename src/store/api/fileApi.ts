/* istanbul ignore file */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'src/config';
import { FILE, HEADERS } from 'src/constants';

import { DownloadFileResponse } from './types';

export const fileApi = createApi({
  reducerPath: 'fileApi',

  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api/files`,
  }),

  endpoints: (build) => ({
    downloadFile: build.query<DownloadFileResponse, string>({
      query: (fileKey: string) => ({
        url: `/${fileKey}`,
        responseHandler: 'content-type',
      }),
      transformResponse: (response, meta) => {
        const file = response as File;
        const customMetadata = JSON.parse(
          meta!.response!.headers.get(HEADERS.CUSTOM_METADATA)!
        ) as DownloadFileResponse['customMetadata'];
        return {
          file,
          customMetadata,
        };
      },
    }),

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

export const { useDownloadFileQuery, useUploadFileMutation } = fileApi;
