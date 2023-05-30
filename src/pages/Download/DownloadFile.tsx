import { useEffect } from 'react';
import { useDownloadFileQuery } from 'src/hooks';
import type { DownloadFileResponse } from 'src/types';

export interface Props {
  fileKey: string;
  onDownloadFile: (downloadFile: {
    data?: DownloadFileResponse;
    isError: boolean;
    isSuccess: boolean;
  }) => void;
}

export default function DownloadFile(props: Props) {
  const downloadFile = useDownloadFileQuery(props.fileKey);

  useEffect(() => {
    props.onDownloadFile({
      data: downloadFile.data,
      isError: downloadFile.isError,
      isSuccess: downloadFile.isSuccess,
    });
  }, [downloadFile]);

  return null;
}
