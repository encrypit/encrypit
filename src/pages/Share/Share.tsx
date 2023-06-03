import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDeleteFileMutation, useSelector } from 'src/hooks';

export default function Share() {
  const fileKey = useSelector((state) => state.file.key);
  const navigate = useNavigate();
  const link = `${location.origin}/${fileKey}`;
  const [deleteFile] = useDeleteFileMutation();

  useEffect(() => {
    if (!fileKey) {
      navigate('/', { replace: true });
    }
  }, [fileKey]);

  const copyLink = useCallback(
    () => navigator.clipboard.writeText(link),
    [link]
  );

  const handleDeleteFile = useCallback(() => deleteFile(fileKey!), [fileKey]);

  if (!fileKey) {
    return null;
  }

  return (
    <>
      <Typography component="h1" gutterBottom variant="h6">
        File link ready
      </Typography>

      <Alert severity="warning" sx={{ marginBottom: 2 }}>
        File will be deleted after download.
      </Alert>

      <Link component={RouterLink} to={link}>
        {link}
      </Link>

      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ marginTop: 2 }}
      >
        <Stack direction="row" spacing={1}>
          <Button onClick={copyLink} variant="outlined">
            Copy link
          </Button>

          <Button
            component="a"
            href={`mailto:?body=${link}`}
            variant="outlined"
          >
            Email link
          </Button>
        </Stack>

        <Button onClick={handleDeleteFile} variant="contained">
          Delete file
        </Button>
      </Stack>
    </>
  );
}
