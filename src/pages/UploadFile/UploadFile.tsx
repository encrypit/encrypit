import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateFilePassword } from 'shared/id';
import Dropzone from 'src/components/Dropzone';
import Previews from 'src/components/Previews';
import { useDispatch, useSelector, useUploadFileMutation } from 'src/hooks';
import { actions } from 'src/store';
import { base64ToFile, createFormData, createZipFile } from 'src/utils';

export default function UploadFile() {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.file.files) || [];
  const navigate = useNavigate();
  const [uploadFile] = useUploadFileMutation();

  const handleClick = useCallback(async () => {
    /* istanbul ignore next */
    if (!files.length) {
      return;
    }

    const convertedFiles = await Promise.all(
      files.map(({ data, name, ...options }) =>
        base64ToFile(data, name, options)
      )
    );
    const file = await createZipFile(convertedFiles);

    const password = generateFilePassword();
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
        New file
      </Typography>

      <Dropzone />

      <Previews />

      <Button
        disabled={!files.length}
        onClick={handleClick}
        sx={{ marginTop: 2 }}
        variant="contained"
      >
        Upload
      </Button>
    </section>
  );
}
