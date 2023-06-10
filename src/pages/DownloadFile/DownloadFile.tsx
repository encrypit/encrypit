import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useDeleteFileMutation,
  useLazyDownloadFileQuery,
  useSelector,
} from 'src/hooks';
import { generateFileName } from 'src/utils';

export default function DownloadFile() {
  const fileKey = useSelector((state) => state.file.key);
  const navigate = useNavigate();
  const [downloadUrl, setDownloadUrl] = useState('');
  const [downloadFile, downloadFileResult] = useLazyDownloadFileQuery();
  const [deleteFile] = useDeleteFileMutation();
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (fileKey) {
      downloadFile(fileKey);
    } else {
      navigate('/', { replace: true });
    }
  }, []);

  useEffect(() => {
    if (downloadFileResult.data) {
      setDownloadUrl(downloadFileResult.data.file);
    }
  }, [downloadFileResult]);

  useEffect(() => {
    if (downloadUrl && fileKey) {
      /* istanbul ignore next */
      linkRef.current?.click();
      deleteFile(fileKey);
    }
  }, [downloadUrl, fileKey]);

  if (!fileKey) {
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
        <Button
          component={Link}
          download={generateFileName()}
          href={downloadUrl}
          ref={linkRef}
          variant="contained"
        >
          Download file
        </Button>
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
