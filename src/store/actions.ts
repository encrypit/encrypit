import { fileSlice, snackbarSlice, userSlice } from './slices';

export const actions = {
  ...fileSlice.actions,
  ...snackbarSlice.actions,
  ...userSlice.actions,
};

export const resetActions = [
  actions.resetFile,
  actions.resetSnackbar,
  actions.resetUser,
];
