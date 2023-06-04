export interface FileData {
  file?: File;
  key?: string;
}

export interface DownloadFileResponse {
  file: string; // base64
  customMetadata: {
    size: string;
    type: string;
  };
}
