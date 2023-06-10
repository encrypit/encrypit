import { useCallback } from 'react';
import type { DropEvent, DropzoneOptions, FileRejection } from 'react-dropzone';
import { useDispatch } from 'src/hooks';
import { actions } from 'src/store';
import { blobToBase64 } from 'src/utils';

type OnDrop = Required<DropzoneOptions>['onDrop'];

export function useOnDrop() {
  const dispatch = useDispatch();

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

      const files = await Promise.all(
        acceptedFiles.map(async (file) => ({
          name: file.name,
          type: file.type,
          data: await blobToBase64(file),
        }))
      );

      dispatch(actions.addFiles(files));
    },
    []
  );

  return onDrop;
}
