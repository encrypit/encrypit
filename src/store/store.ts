import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { DEV } from 'src/config';

import { fileApi } from './api';
import { userSlice } from './slices';

export const store = configureStore({
  reducer: {
    [fileApi.reducerPath]: fileApi.reducer,
    [userSlice.name]: userSlice.reducer,
  },
  middleware: getDefaultMiddleware().concat(fileApi.middleware),
  devTools: DEV,
});
