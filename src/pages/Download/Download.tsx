import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'src/hooks';

import DownloadFile, { type Props as DownloadFileProps } from './DownloadFile';

type DownloadFileParameter = Parameters<DownloadFileProps['onDownloadFile']>[0];

export default function Download() {
  const fileKey = useSelector((state) => state.file.key);
  const navigate = useNavigate();
  const [downloadFile, setDownloadFile] = useState<DownloadFileParameter>();
  const [downloadUrl, setDownloadUrl] = useState('');
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!fileKey) {
      navigate('/', { replace: true });
    }
  }, []);

  useEffect(() => {
    if (downloadFile?.data) {
      setDownloadUrl(downloadFile.data.file);
    }
  }, [downloadFile]);

  useEffect(() => {
    if (downloadUrl) {
      /* istanbul ignore next */
      linkRef.current?.click();
    }
  }, [downloadUrl]);

  if (!fileKey) {
    return null;
  }

  return (
    <>
      <DownloadFile fileKey={fileKey} onDownloadFile={setDownloadFile} />

      <Typography component="h1" gutterBottom variant="h6">
        {getHeading(downloadFile)}
      </Typography>

      {downloadUrl && (
        <Link
          download={
            /* istanbul ignore next */
            downloadFile?.data?.customMetadata.name
          }
          href={downloadUrl}
          ref={linkRef}
        >
          Download file
        </Link>
      )}
    </>
  );
}

function getHeading(downloadFile?: DownloadFileParameter): string {
  switch (true) {
    case downloadFile?.isSuccess:
      return 'Download success!';
    case downloadFile?.isError:
      return 'Download error';
    default:
      return 'Downloading…';
  }
}
