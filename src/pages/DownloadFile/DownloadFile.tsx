import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { digest } from 'pepto';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import {
  useDeleteFileMutation,
  useLazyDownloadFileQuery,
  useSelector,
} from 'src/hooks';
import { generateFileName } from 'src/utils';

export default function DownloadFile() {
  const file = useSelector((state) => state.file);
  const navigate = useNavigate();
  const [downloadUrl, setDownloadUrl] = useState('');
  const [downloadFile, downloadFileResult] = useLazyDownloadFileQuery();
  const [deleteFile] = useDeleteFileMutation();
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (file.key && file.password) {
      digest('SHA-512', file.password).then((passwordSHA512) => {
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
      setDownloadUrl(downloadFileResult.data.file);
    }
  }, [downloadFileResult]);

  useEffect(() => {
    if (downloadUrl && file.key) {
      /* istanbul ignore next */
      linkRef.current?.click();
      deleteFile(file.key);
    }
  }, [downloadUrl, file.key]);

  if (!file.key) {
    return null;
  }

  return (
    <>
      <Typography component="h1" gutterBottom variant="h6">
        {getHeading(downloadFileResult)}
      </Typography>

      {downloadFileResult.isLoading && (
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
  isSuccess: boolean;
  isError: boolean;
}): string {
  switch (true) {
    case downloadFileResult.isSuccess:
      return 'Download success!';
    case downloadFileResult.isError:
      return 'Download error';
    default:
      return 'Downloading…';
  }
}
