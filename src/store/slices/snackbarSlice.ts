import type { SnackbarProps } from '@mui/material/Snackbar';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type State = Pick<
  SnackbarProps,
  'anchorOrigin' | 'autoHideDuration' | 'message' | 'open'
>;

export const initialState: State = {
  anchorOrigin: {
    horizontal: 'center',
    vertical: 'top',
  },
  autoHideDuration: 6000, // six seconds
  message: '',
  open: false,
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,

  reducers: {
    resetSnackbar: () => {
      return initialState;
    },

    setSnackbar: (state, action: PayloadAction<State>) => {
      Object.assign(state, action.payload);
    },
  },
});
