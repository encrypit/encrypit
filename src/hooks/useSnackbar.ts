import { useCallback } from 'react';
import { actions } from 'src/store';
import type { State } from 'src/store/slices/snackbarSlice';

import { useDispatch } from './useDispatch';

/**
 * Use snackbar.
 */
export function useSnackbar() {
  const dispatch = useDispatch();
  const snackbar = useCallback(
    (state: State) => dispatch(actions.setSnackbar(state)),
    [dispatch],
  );
  return snackbar;
}
