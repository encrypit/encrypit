import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import { type SyntheticEvent, useCallback } from 'react';
import { useDispatch, useSelector } from 'src/hooks';
import { actions } from 'src/store';

export default function GlobalSnackbar() {
  const dispatch = useDispatch();
  const snackbar = useSelector((state) => state.snackbar);

  const handleClose = useCallback(
    (event: Event | SyntheticEvent, reason?: string) =>
      reason !== 'clickaway' && dispatch(actions.resetSnackbar()),
    [dispatch, actions],
  );

  const action = (
    <IconButton
      size="small"
      aria-label="Close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return <Snackbar action={action} onClose={handleClose} {...snackbar} />;
}
