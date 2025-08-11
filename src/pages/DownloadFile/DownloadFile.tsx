import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { base64ToBlob, blobToBase64 } from 'file64';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { useLazyDownloadFileQuery, useSelector } from 'src/hooks';
import { generateFileName, hashPassword, unzip } from 'src/utils';

import DownloadFileError from './DownloadFileError';

export default function DownloadFile() {
  const file = useSelector((state) => state.file);
  const navigate = useNavigate();
  const [downloadUrl, setDownloadUrl] = useState('');
  const [downloadFile, downloadFileResult] = useLazyDownloadFileQuery();
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (file.key && file.password) {
      hashPassword(file.password).then((passwordSHA512) => {
        downloadFile({
          key: file.key,
          passwordSHA512,
        });
      });
    } else {
      navigate('/', { replace: true });
    }
  }, [file.key, file.password]);

  useEffect(() => {
    if (downloadFileResult.data) {
      base64ToBlob(downloadFileResult.data.file)
        .then((blob) => unzip(blob, file.password))
        .then((blob) => blobToBase64(blob))
        .then((base64) => setDownloadUrl(base64))
        .catch(() => navigate('/invalid', { replace: true }));
    }
  }, [downloadFileResult]);

  useEffect(() => {
    if (downloadUrl && file.key) {
      /* istanbul ignore next */
      linkRef.current?.click();
    }
  }, [downloadUrl, file.key]);

  if (!file.key) {
    return null;
  }

  if (downloadFileResult.isError) {
    return (
      <DownloadFileError
        status={(downloadFileResult.error as { status: number })?.status}
      />
    );
  }

  return (
    <>
      <Typography component="h1" gutterBottom variant="h6">
        {getHeading(downloadFileResult)}
      </Typography>

      {(downloadFileResult.isFetching || downloadFileResult.isLoading) && (
        <Box>
          <CircularProgress />
        </Box>
      )}

      {downloadFileResult.isSuccess && (
        <Typography paragraph>
          File has been deleted from the server. Please close this page after
          the download has finished.
        </Typography>
      )}

      {downloadUrl && (
        <Stack direction="row" justifyContent="space-between">
          <Button
            component={Link}
            download={generateFileName()}
            href={downloadUrl}
            ref={linkRef}
            variant="contained"
          >
            Download file
          </Button>

          <Button component={RouterLink} replace to="/" variant="outlined">
            Upload file
          </Button>
        </Stack>
      )}
    </>
  );
}

function getHeading(downloadFileResult: {
  isFetching: boolean;
  isLoading: boolean;
  isSuccess: boolean;
}): string {
  switch (true) {
    case downloadFileResult.isSuccess:
      return 'Download success!';
    case downloadFileResult.isFetching:
    case downloadFileResult.isLoading:
    default:
      return 'Downloading…';
  }
}
