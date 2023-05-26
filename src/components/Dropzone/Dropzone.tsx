import { useCallback } from 'react';
import { type DropzoneOptions, useDropzone } from 'react-dropzone';

type OnDrop = Required<DropzoneOptions>['onDrop'];

export default function Dropzone() {
  /* istanbul ignore next */
  const onDrop: OnDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles); // eslint-disable-line no-console
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <section {...getRootProps()}>
      <input {...getInputProps()} />

      {isDragActive ? (
        /* istanbul ignore next */
        <p>Drop file...</p>
      ) : (
        <p>Drag and drop file or click to select file</p>
      )}
    </section>
  );
}
