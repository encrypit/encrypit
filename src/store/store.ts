import { configureStore } from '@reduxjs/toolkit';
import { DEV } from 'src/config';

import { fileApi } from './api';
import { fileSlice, snackbarSlice, userSlice } from './slices';

export const store = configureStore({
  reducer: {
    [fileApi.reducerPath]: fileApi.reducer,
    [fileSlice.name]: fileSlice.reducer,
    [snackbarSlice.name]: snackbarSlice.reducer,
    [userSlice.name]: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fileApi.middleware),
  devTools: DEV,
});
