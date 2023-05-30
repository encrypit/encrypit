export interface FileData {
  file?: File;
  key?: string;
}

export interface DownloadFileResponse {
  file: string; // base64
  customMetadata: {
    lastModified: string;
    name: string;
    size: string;
    type: string;
  };
}
