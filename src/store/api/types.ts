export interface DownloadFileResponse {
  file: File;
  customMetadata: {
    lastModified: string;
    name: string;
    size: string;
    type: string;
  };
}
