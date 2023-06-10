import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useSelector } from 'src/hooks';

export default function Previews() {
  const files = useSelector((state) => state.file.files) || [];

  if (!files.length) {
    return null;
  }

  return (
    <Box component="aside" sx={{ marginTop: 2 }}>
      <Stack direction="row" spacing={1}>
        {files.map(({ name, id }) => (
          <Chip key={id} label={name} variant="outlined" />
        ))}
      </Stack>
    </Box>
  );
}
