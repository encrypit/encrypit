import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropzone from 'src/components/Dropzone';
import { useDispatch, useSelector, useUploadFileMutation } from 'src/hooks';
import { actions } from 'src/store';
import { base64ToBlob, createFormData } from 'src/utils';

export default function UploadFile() {
  const dispatch = useDispatch();
  const file = useSelector((state) => state.file.file);
  const navigate = useNavigate();
  const [uploadFile] = useUploadFileMutation();

  const handleClick = useCallback(async () => {
    /* istanbul ignore next */
    if (!file) {
      return;
    }

    const formData = createFormData({
      file: await base64ToBlob(file),
    });

    dispatch(
      actions.setFile({
        file: undefined,
        key: await uploadFile(formData).unwrap(),
      })
    );

    navigate('/share', { replace: true });
  }, [file]);

  return (
    <>
      <Typography component="h1" gutterBottom variant="h6">
        New file
      </Typography>

      <Dropzone />

      <Button
        disabled={!file}
        onClick={handleClick}
        sx={{ marginTop: 3 }}
        variant="contained"
      >
        Upload
      </Button>
    </>
  );
}
