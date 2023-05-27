import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import { useDropzone } from 'react-dropzone';
import { MAX_FILES, MAX_SIZE } from 'src/constants';

import { useOnDrop, useStyle } from './hooks';

export default function Dropzone() {
  const onDrop = useOnDrop();

  const {
    getInputProps,
    getRootProps,
    isDragAccept,
    isDragActive,
    isDragReject,
    isFocused,
  } = useDropzone({
    maxFiles: MAX_FILES.DEFAULT,
    maxSize: MAX_SIZE.DEFAULT,
    onDrop,
  });

  const { style, ...rootProps } = getRootProps({
    style: useStyle({
      isFocused,
      isDragAccept,
      isDragReject,
    }),
  });

  return (
    <Box component="section" sx={style} {...rootProps}>
      <input {...getInputProps()} />

      <Button color="info" sx={{ color: grey[900] }}>
        {isDragActive ? 'Drop your file here' : 'Drag & drop your file here'}
        &hellip;
      </Button>
    </Box>
  );
}
