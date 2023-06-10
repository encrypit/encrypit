export interface FileData {
  file?: string; // base64
  key?: string;
}

export interface DownloadFileResponse {
  file: string; // base64
  customMetadata: {
    size: string;
    type: string;
  };
}
