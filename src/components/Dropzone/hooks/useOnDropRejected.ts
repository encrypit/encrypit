import { useCallback } from 'react';
import type { DropzoneOptions, FileRejection } from 'react-dropzone';
import { useSnackbar } from 'src/hooks';

export type OnDropRejected = Required<DropzoneOptions>['onDropRejected'];

export function useOnDropRejected() {
  const snackbar = useSnackbar();

  const onDropRejected: OnDropRejected = useCallback(
    async (fileRejections: FileRejection[]) => {
      if (!fileRejections.length) {
        return;
      }

      snackbar({
        message: fileRejections[0].errors[0].message,
        open: true,
      });
      return;
    },
    [snackbar],
  );

  return onDropRejected;
}
