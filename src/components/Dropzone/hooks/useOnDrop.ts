import { useCallback } from 'react';
import type { DropEvent, DropzoneOptions, FileRejection } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { FILE } from 'src/constants';
import { useUploadFileMutation } from 'src/hooks';

type OnDrop = Required<DropzoneOptions>['onDrop'];

export function useOnDrop() {
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

      const formData = new FormData();
      formData.append(FILE, acceptedFiles[0]);
      const uuid = await uploadFile(formData).unwrap();
      // eslint-disable-next-line no-console
      console.log(uuid);

      navigate('/share', { replace: true });
    },
    []
  );

  return onDrop;
}
