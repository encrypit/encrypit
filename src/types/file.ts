import type { CustomMetadata } from 'shared/types';

export interface FileData {
  files: {
    lastModified: number;
    name: string;
    size: number;
    type: string;
    data: string; // Base64
    id: string; // UUID
  }[];
  key: string;
}

export interface DownloadFileResponse {
  file: string; // Base64
  customMetadata: CustomMetadata;
}
