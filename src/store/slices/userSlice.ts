import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from 'src/types';

export const initialState: User = {
  email: '',
  id: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    resetUser: () => {
      return initialState;
    },

    setUser: (state, action: PayloadAction<Partial<User>>) => {
      const user = action.payload;
      Object.assign(state, user);
    },
  },
});
