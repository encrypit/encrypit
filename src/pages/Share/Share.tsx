import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'src/hooks';

export default function Share() {
  const key = useSelector((state) => state.file.key);
  const navigate = useNavigate();

  useEffect(() => {
    if (!key) {
      navigate('/', { replace: true });
    }
  }, []);

  const link = `${location.origin}/${key}`;

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
