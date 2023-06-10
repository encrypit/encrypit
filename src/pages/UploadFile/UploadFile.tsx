import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropzone from 'src/components/Dropzone';
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
    const formData = createFormData({ file });

    const fileKey = await uploadFile(formData).unwrap();
    dispatch(actions.setFileKey(fileKey));

    navigate('/share', { replace: true });
  }, [files]);

  return (
    <>
      <Typography component="h1" gutterBottom variant="h6">
        New file
      </Typography>

      <Dropzone />

      <Button
        disabled={!files.length}
        onClick={handleClick}
        sx={{ marginTop: 2 }}
        variant="contained"
      >
        Upload
      </Button>
    </>
  );
}
