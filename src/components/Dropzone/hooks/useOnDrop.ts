import { useCallback } from 'react';
import type { DropEvent, DropzoneOptions, FileRejection } from 'react-dropzone';
import { API_URL } from 'src/config';
import { FILE } from 'src/constants';

type OnDrop = Required<DropzoneOptions>['onDrop'];

export function useOnDrop() {
  const onDrop: OnDrop = useCallback(
    async (
      acceptedFiles: File[],
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      fileRejections: FileRejection[],
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      event: DropEvent
    ) => {
      if (fileRejections.length || !acceptedFiles.length) {
        return;
      }

      const formData = new FormData();
      formData.append(FILE, acceptedFiles[0]);

      const response = await fetch(`${API_URL}/api/files`, {
        body: formData,
        method: 'POST',
      });

      const uuid = await response.text();
      // eslint-disable-next-line no-console
      console.log(uuid);
    },
    []
  );
  return onDrop;
}
