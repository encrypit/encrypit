import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import { useCallback } from 'react';
import { type DropzoneOptions, useDropzone } from 'react-dropzone';

import { useStyle } from './hooks';

type OnDrop = Required<DropzoneOptions>['onDrop'];

export default function Dropzone() {
  const onDrop: OnDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles); // eslint-disable-line no-console
  }, []);

  const {
    getInputProps,
    getRootProps,
    isDragAccept,
    isDragActive,
    isDragReject,
    isFocused,
  } = useDropzone({ onDrop });

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
