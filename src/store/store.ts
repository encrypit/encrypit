import { configureStore } from '@reduxjs/toolkit';
import { DEV } from 'src/config';

import { userSlice } from './slices';

export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
  },
  devTools: DEV,
});
