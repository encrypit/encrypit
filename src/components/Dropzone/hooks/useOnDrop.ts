import { useCallback } from 'react';
import { type DropzoneOptions } from 'react-dropzone';

type OnDrop = Required<DropzoneOptions>['onDrop'];

export function useOnDrop() {
  const onDrop: OnDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles); // eslint-disable-line no-console
  }, []);
  return onDrop;
}
