import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { FileData } from 'src/types';

export const initialState: FileData = {
  files: [],
  key: '',
};

export const fileSlice = createSlice({
  name: 'file',
  initialState,

  reducers: {
    resetFile: () => initialState,

    setFile: (state, action: PayloadAction<FileData>) => {
      Object.assign(state, action.payload);
    },

    addFiles: (state, action: PayloadAction<FileData['files']>) => {
      state.files.push(...action.payload);
    },

    setFileKey: (state, action: PayloadAction<string>) => {
      state.key = action.payload;
      state.files = [];
    },
  },
});
