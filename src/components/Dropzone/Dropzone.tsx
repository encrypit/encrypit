/* istanbul ignore file */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import { useCallback, useMemo } from 'react';
import { type DropzoneOptions, useDropzone } from 'react-dropzone';

import { acceptStyle, baseStyle, focusedStyle, rejectStyle } from './styles';

type OnDrop = Required<DropzoneOptions>['onDrop'];

export default function Dropzone() {
  const onDrop: OnDrop = useCallback((acceptedFiles) => {
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

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused && focusedStyle),
      ...(isDragAccept && acceptStyle),
      ...(isDragReject && rejectStyle),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const { style: rootStyle, ...rootProps } = getRootProps({ style });

  return (
    <Box component="section" sx={rootStyle} {...rootProps}>
      <input {...getInputProps()} />

      <Button color="info" sx={{ color: grey[900] }}>
        {isDragActive ? 'Drop your file here' : 'Drag & drop your file here'}
        &hellip;
      </Button>
    </Box>
  );
}
