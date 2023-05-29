import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'src/hooks';

export default function Share() {
  const fileKey = useSelector((state) => state.file.key);
  const navigate = useNavigate();

  useEffect(() => {
    if (!fileKey) {
      navigate('/', { replace: true });
    }
  }, []);

  const link = `${location.origin}/${fileKey}`;

  return (
    <>
      <Typography component="h1" gutterBottom variant="h6">
        File link ready
      </Typography>

      <Link component={RouterLink} to={link}>
        {link}
      </Link>
    </>
  );
}
