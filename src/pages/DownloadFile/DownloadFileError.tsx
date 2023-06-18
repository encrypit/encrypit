import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  status?: number;
}

export default function DownloadFileError(props: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.status === 403) {
      navigate('/invalid', { replace: true });
    }
  }, [props.status]);

  return (
    <>
      <Typography component="h1" gutterBottom variant="h6">
        Download error
      </Typography>

      <Typography paragraph>
        {props.status === 404
          ? 'File has been deleted or does not exist.'
          : 'File failed to download. Please try again.'}
      </Typography>
    </>
  );
}
