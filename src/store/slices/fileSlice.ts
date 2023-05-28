import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { FileData } from 'src/types';

export const initialState: FileData = {};

export const fileSlice = createSlice({
  name: 'file',
  initialState,

  reducers: {
    resetFile: () => {
      return initialState;
    },

    setFile: (state, action: PayloadAction<FileData>) => {
      const file = action.payload;
      Object.assign(state, file);
    },
  },
});
