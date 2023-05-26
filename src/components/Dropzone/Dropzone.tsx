/* istanbul ignore file */
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
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <section {...getRootProps({ style })}>
      <input {...getInputProps()} />

      {isDragActive ? (
        <p>Drop file...</p>
      ) : (
        <p>Drag and drop file or click to select file</p>
      )}
    </section>
  );
}
