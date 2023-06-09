import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dropzone from 'src/components/Dropzone';

export default function UploadFile() {
  return (
    <>
      <Typography component="h1" gutterBottom variant="h6">
        New file
      </Typography>

      <Dropzone />

      <Button disabled sx={{ marginTop: 3 }} variant="contained">
        Upload
      </Button>
    </>
  );
}
