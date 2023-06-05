import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { type ComponentProps, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

export default function ConfirmDownload() {
  const { fileKey } = useParams<{ fileKey: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!fileKey) {
      navigate('/', { replace: true });
    }
  }, [fileKey]);

  return (
    <>
      <Typography component="h1" gutterBottom variant="h6">
        Download and delete?
      </Typography>

      <Typography paragraph>
        You're about to download and delete the file with key{' '}
        <strong>{fileKey}</strong>
      </Typography>

      <Stack spacing={1} direction="row">
        <Button
          component={RouterLink}
          replace
          to="/download"
          variant="contained"
        >
          Yes, download the file
        </Button>

        <Button
          color={'grey' as ComponentProps<typeof Button>['color']}
          component={RouterLink}
          replace
          to="/"
          variant="contained"
        >
          No, not now
        </Button>
      </Stack>
    </>
  );
}
