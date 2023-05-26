import Typography from '@mui/material/Typography';
import Dropzone from 'src/components/Dropzone';

export default function Home() {
  return (
    <>
      <Typography component="h1" variant="h6">
        New file
      </Typography>

      <Dropzone />
    </>
  );
}
