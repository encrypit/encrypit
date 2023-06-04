import { useCallback } from 'react';
import type { DropEvent, DropzoneOptions, FileRejection } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useUploadFileMutation } from 'src/hooks';
import { actions } from 'src/store';
import { createFormData, createZipFile } from 'src/utils';

type OnDrop = Required<DropzoneOptions>['onDrop'];

export function useOnDrop() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [uploadFile] = useUploadFileMutation();

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

      const zipFile = await createZipFile(acceptedFiles);
      const formData = createFormData(zipFile);
      const uuid = await uploadFile(formData).unwrap();
      dispatch(actions.setFile({ key: uuid }));
      navigate('/share', { replace: true });
    },
    []
  );

  return onDrop;
}
