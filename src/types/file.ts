export interface FileData {
  files: {
    name: string;
    type: string;
    data: string; // Base64
  }[];
  key: string;
}

export interface DownloadFileResponse {
  file: string; // Base64
  customMetadata: {
    size: string;
    type: string;
  };
}
