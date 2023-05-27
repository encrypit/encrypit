import { useCallback } from 'react';
import { type DropzoneOptions } from 'react-dropzone';
import { API_URL } from 'src/config';
import { FILE } from 'src/constants';

type OnDrop = Required<DropzoneOptions>['onDrop'];

export function useOnDrop() {
  const onDrop: OnDrop = useCallback(async (acceptedFiles: File[]) => {
    const formData = new FormData();
    formData.append(FILE, acceptedFiles[0]);
    const response = await fetch(`${API_URL}/api/files`, {
      body: formData,
      method: 'POST',
    });
    const uuid = await response.text();
    console.log(uuid); // eslint-disable-line no-console
  }, []);
  return onDrop;
}
