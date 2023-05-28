import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { DEV } from 'src/config';

import { fileApi } from './api';
import { fileSlice, userSlice } from './slices';

export const store = configureStore({
  reducer: {
    [fileSlice.name]: fileSlice.reducer,
    [fileApi.reducerPath]: fileApi.reducer,
    [userSlice.name]: userSlice.reducer,
  },
  middleware: getDefaultMiddleware().concat(fileApi.middleware),
  devTools: DEV,
});
