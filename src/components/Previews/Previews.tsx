import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { createSelector } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'src/hooks';
import { actions } from 'src/store';
import { RootState } from 'src/types';

const selectFiles = createSelector(
  (state: RootState) => state.file,
  (file) => file.files,
);

export default function Previews() {
  const dispatch = useDispatch();
  const files = useSelector(selectFiles);

  if (!files?.length) {
    return null;
  }

  return (
    <Box component="aside" sx={{ marginTop: 2 }}>
      <Stack direction="row" spacing={1}>
        {files.map(({ name, id }) => (
          <Chip
            key={id}
            label={name}
            onDelete={() => dispatch(actions.deleteFile(id))}
            variant="outlined"
          />
        ))}
      </Stack>
    </Box>
  );
}
