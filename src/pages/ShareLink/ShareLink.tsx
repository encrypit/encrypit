import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import DeleteDialog from 'src/components/DeleteDialog';
import { useDeleteFileMutation, useDispatch, useSelector } from 'src/hooks';
import { actions } from 'src/store';

export default function ShareLink() {
  const dispatch = useDispatch();
  const file = useSelector((state) => state.file);
  const navigate = useNavigate();
  const link = `${location.origin}/${file.key}#${file.password}`;
  const [deleteFile] = useDeleteFileMutation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (!file.key) {
      navigate('/', { replace: true });
    }
  }, [file.key]);

  const copyLink = useCallback(
    () => navigator.clipboard.writeText(link),
    [link],
  );

  const openDialog = useCallback(() => setIsDialogOpen(true), []);
  const closeDialog = useCallback(() => setIsDialogOpen(false), []);
  const handleDeleteFile = useCallback(async () => {
    let status = 200;

    try {
      await deleteFile(file.key!).unwrap();
    } catch (error: unknown) {
      status = (error as { status: number }).status;
    }

    /* istanbul ignore else */
    if (status === 200 || status === 404) {
      setIsDialogOpen(false);
      dispatch(actions.resetFile());
    }
  }, [file.key]);

  if (!file.key) {
    return null;
  }

  return (
    <>
      <Typography component="h1" gutterBottom variant="h6">
        File link ready
      </Typography>

      <Alert severity="warning" sx={{ marginBottom: 2 }}>
        File will be deleted after download. (
        <em>Or it will expire after 7 days.</em>)
      </Alert>

      <Link component={RouterLink} replace to={link}>
        {link}
      </Link>

      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ marginTop: 2 }}
      >
        <Stack direction="row" spacing={1}>
          <Button onClick={copyLink} variant="outlined">
            Copy link
          </Button>

          <Button
            component="a"
            href={`mailto:?body=${link}`}
            variant="outlined"
          >
            Email link
          </Button>
        </Stack>

        <Button onClick={openDialog} variant="contained">
          Delete file
        </Button>

        <DeleteDialog
          content="This action cannot be undone."
          id={file.key}
          onClose={closeDialog}
          onDelete={handleDeleteFile}
          open={isDialogOpen}
          title="Are you sure you want to delete this file?"
        />
      </Stack>
    </>
  );
}
