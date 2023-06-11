import Typography from '@mui/material/Typography';

export default function InvalidLink() {
  return (
    <>
      <Typography component="h1" gutterBottom variant="h6">
        File link invalid
      </Typography>

      <Typography paragraph>
        The link is incomplete or incorrect. Please make sure all the characters
        after the <strong>#</strong> are included.
      </Typography>
    </>
  );
}
