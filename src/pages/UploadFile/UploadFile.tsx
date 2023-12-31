import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { base64ToFile } from 'file64';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateFilePassword } from 'shared/id';
import Dropzone from 'src/components/Dropzone';
import Previews from 'src/components/Previews';
import { APP_NAME } from 'src/config';
import {
  useDispatch,
  useSelector,
  useSetDocumentTitle,
  useUploadFileMutation,
} from 'src/hooks';
import { actions } from 'src/store';
import { createFormData, createZipFile } from 'src/utils';

export default function UploadFile() {
  useSetDocumentTitle(APP_NAME);
  const dispatch = useDispatch();
  const files = useSelector((state) => state.file.files) || [];
  const navigate = useNavigate();
  const [uploadFile, uploadFileResult] = useUploadFileMutation();

  const handleClick = useCallback(async () => {
    /* istanbul ignore next */
    if (!files.length) {
      return;
    }

    const convertedFiles = await Promise.all(
      files.map(({ data, name, ...options }) =>
        base64ToFile(data, name, options),
      ),
    );

    const password = generateFilePassword();
    const file = await createZipFile(convertedFiles, password);

    const formData = await createFormData({
      file,
      password,
    });

    const response = uploadFile(formData);
    const key = await response.unwrap();

    dispatch(actions.setFileKeyOrPassword({ key, password }));
    navigate('/share', { replace: true });
  }, [files]);

  return (
    <section>
      <Typography component="h1" gutterBottom variant="h6">
        Encrypt file
      </Typography>

      <Dropzone />

      <Previews />

      <Button
        disabled={!files.length || uploadFileResult.isLoading}
        onClick={handleClick}
        sx={{ marginTop: 2 }}
        variant="contained"
      >
        Upload
      </Button>
    </section>
  );
}
