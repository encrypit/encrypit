import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { API_URL } from 'src/config';

export default function Download() {
  const params = useParams<{ fileKey: string }>();

  return (
    <>
      <Typography component="h1" gutterBottom variant="h6">
        Download and delete?
      </Typography>

      <Typography paragraph>
        You're about to download and delete the file with key{' '}
        <strong>{params.fileKey}</strong>
      </Typography>

      <Button
        component={Link}
        download
        href={`${API_URL}/api/files/${params.fileKey}`}
        sx={{ marginRight: 1 }}
        variant="contained"
      >
        Yes, download the file
      </Button>

      <Button
        color="secondary"
        component={RouterLink}
        replace
        to="/"
        variant="contained"
      >
        No, not now
      </Button>
    </>
  );
}
