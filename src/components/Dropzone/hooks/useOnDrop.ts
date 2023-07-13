import { blobToBase64 } from 'file64';
import { useCallback } from 'react';
import type { DropEvent, DropzoneOptions, FileRejection } from 'react-dropzone';
import { MAX_FILES } from 'shared/constants';
import { useDispatch, useSelector, useSnackbar } from 'src/hooks';
import { actions } from 'src/store';

export type OnDrop = Required<DropzoneOptions>['onDrop'];

export function useOnDrop() {
  const dispatch = useDispatch();
  const filesCount = useSelector((state) => state.file.files.length);
  const snackbar = useSnackbar();

  const onDrop: OnDrop = useCallback(
    async (
      acceptedFiles: File[],
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      fileRejections: FileRejection[],
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      event: DropEvent,
    ) => {
      if (!acceptedFiles.length) {
        return;
      }

      if (fileRejections.length) {
        snackbar({
          message: fileRejections[0].errors[0].message,
          open: true,
        });
        return;
      }

      if (filesCount >= MAX_FILES.DEFAULT) {
        snackbar({
          message: 'Too many files',
          open: true,
        });
        return;
      }

      const files = await Promise.all(
        acceptedFiles.map(async (file) => ({
          lastModified: file.lastModified,
          name: file.name,
          size: file.size,
          type: file.type,
          data: await blobToBase64(file),
          id: crypto.randomUUID(),
        })),
      );

      dispatch(actions.addFiles(files));
    },
    [filesCount],
  );

  return onDrop;
}
