import Typography from '@mui/material/Typography';
import Dropzone from 'src/components/Dropzone';

export default function UploadFile() {
  return (
    <>
      <Typography component="h1" gutterBottom variant="h6">
        New file
      </Typography>

      <Dropzone />
    </>
  );
}
