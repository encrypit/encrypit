import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function Home() {
  return (
    <Typography>
      Welcome to{' '}
      <Link
        href="https://github.com/encrypit/encrypit"
        target="_blank"
        rel="noopener noreferrer"
      >
        Encrypit
      </Link>
      !
    </Typography>
  );
}
