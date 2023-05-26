import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function Home() {
  return (
    <Typography>
      Welcome to{' '}
      <Link
        href="https://github.com/remarkablemark/mui-template"
        target="_blank"
        rel="noopener noreferrer"
      >
        MUI Template
      </Link>
      !
    </Typography>
  );
}
